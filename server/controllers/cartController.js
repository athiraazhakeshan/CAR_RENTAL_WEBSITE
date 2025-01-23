import { Cart } from "../models/cartModel.js";
import Car from "../models/carModel.js";
import { differenceInDays } from "date-fns";
import { Order } from "../models/orderModel.js";
import mongoose from "mongoose";
import moment from "moment";

export const getCart = async (req, res, next) => {
    try {
        const { user } = req;
        const cart = await Cart.findOne({ userId: user.id }).populate("car.carId").populate("userId");

        if (!cart) {
            return res.status(404).json({ message: "cart is empty" });
        }

        res.json({ message: "cart details fetched", data: cart });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};
export const getCartItems = async (req, res, next) => {
    try {
        const { user } = req;
        const cart = await Cart.findOne({ userId: user.id }).populate("car.carId");

        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        // Calculate totalPrice from car items in the cart
        let totalPrice = 0;
        if (cart.car && cart.car.length > 0) {
            cart.car.forEach(item => {
                totalPrice += item.rentalPriceCharge; // Sum the rental price of all cars in the cart
            });
        }

        // Add totalPrice to the response data
        res.json({
            message: "Cart details fetched",
            data: {
                car: cart.car,
                totalPrice: totalPrice
            }
        });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};
export const addCarToCart = async (req, res) => {
    try {
        const { carId, totalPrice, pickedat, returnedat} = req.body;
        const userId = req.user.id;
        const formattedPickedAt = moment(pickedat).format("DD/MM/YYYY");
        const formattedReturnedAt = moment(returnedat).format("DD/MM/YYYY");

        console.log("Picked At:", formattedPickedAt); // Output: Picked At: 23/01/2025
        console.log("Returned At:", formattedReturnedAt);

        // Check if the car exists
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // Find or create the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, car: [], totalPrice: 0, pickedAt: pickedat, returnedAt: returnedat });
        }

        // Enforce one-item limit
        if (cart.car.length > 0) {
            return res.status(400).json({ message: "Only one car can be added to the cart at a time." });
        }

        // Add the car to the cart
        cart.car.push({ carId, rentalPriceCharge: car.rentalPriceCharge });

        // Recalculate total price
        cart.calculateTotalPrice();
        await cart.save();

        res.status(200).json({ message: "Car added to cart", data: cart });
    } catch (error) {
        console.error("Error adding car to cart:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};


export const removeCarFromCart = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find and delete the user's cart
        const cart = await Cart.findOneAndDelete({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.error("Error deleting cart:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
   


export const checkCarAvailability = async (req, res) => {
    try {
        const { carId, pickedAt, returnedAt } = req.body;

        // Validate inputs
        if (!carId || !pickedAt || !returnedAt) {
            return res.status(400).json({ message: "Car ID, pickedAt, and returnedAt are required" });
        }

        // Check if carId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({ message: "Invalid car ID" });
        }

        // Check if the car exists
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // Check for overlapping bookings
        const overlappingBookings = await Order.find({
            car: { $elemMatch: { carId } },
            $or: [
                { pickedAt: { $lte: returnedAt }, returnedAt: { $gte: pickedAt } },
            ],
        });

        if (overlappingBookings.length > 0) {
            const latestBooking = overlappingBookings.sort(
                (a, b) => new Date(b.returnedAt) - new Date(a.returnedAt)
            )[0];
            return res.status(200).json({
                available: false,
                availableUntil: latestBooking.returnedAt,
                message: `The car is already booked until ${latestBooking.returnedAt}`,
            });
        }

        res.status(200).json({
            available: true,
            message: "The car is available for the selected dates",
        });
    } catch (error) {
        console.error("Error checking car availability:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
