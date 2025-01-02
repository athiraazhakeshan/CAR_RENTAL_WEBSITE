import { Cart } from "../models/cartModel.js";
import Car from "../models/carModel.js";
import { differenceInDays } from "date-fns";

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
        const { carId, totalPrice, pickedat, returnedat } = req.body;
        const userId = req.user.id;

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, car: [], totalPrice: 0, pickedAt: pickedat, returnedAt: returnedat });
        }

        cart.car.push({ carId, rentalPriceCharge: car.rentalPriceCharge });

        // Recalculate total price
        cart.calculateTotalPrice();
        await cart.save();

        res.status(200).json({ message: "Car added to cart", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};



export const removeCarFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { carId } = req.body;

        // Find the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        console.log("carId====", carId, typeof carId);

        // Remove the course from the cart
        cart.car = cart.car.filter((item) => !item?.carId == carId);

        // Recalculate the total price
        cart.calculateTotalPrice();

        // Save the cart
        await cart.save();

        res.status(200).json({ message: "car removed from cart", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// const clearCart = async (req, res) => {
//     try {
//         const userId = req.user._id;

//         const cart = await Cart.findOne({ userId });
//         cart.courses = [];
//         cart.calculateTotalPrice();
//         await cart.save();

//         res.status(200).json({ message: "cart cleared successfully", data: cart });
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error", error });
//     }
// };

// module.exports = { getCart, addCarToCart, removeCarFromCart, clearCart };
