import { Cart } from "../models/cartModel.js";
import Car from "../models/carModel.js";
import { differenceInDays } from "date-fns";

export const getCart = async (req, res, next) => {
    try {
        const { user } = req;
        const cart = await Cart.findOne({ userId: user.id }).populate("car.carId");

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

        // Log the cart object to inspect its structure
        console.log("Fetched Cart:", cart);

        // Ensure that car array exists and has data
        if (cart.car && cart.car.length > 0) {
            res.json({ message: "Cart details fetched", data: cart.car });
        } else {
            res.status(404).json({ message: "No cars in cart" });
        }
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};


// export const addCarToCart = async (req, res) => {
//     try {
//         const {carId, totalPrice, pickedat, returnedat } = req.body;
//         const userId = req.user.id;
//         // const { carId } = req.body;

//         // Log input values for debugging
//         console.log('userId:', userId);
//         console.log('carId:', carId);

//         // Find the car to ensure it exists and fetch its price
//         const car = await Car.findById(carId);
//         if (!car) {
//             console.error('Car not found for carId:', carId);
//             return res.status(404).json({ message: "Car not found" });
//         }

//         // Log the retrieved car details for debugging
//         console.log('Retrieved car:', car);

//         // Find the user's cart or create a new one if it doesn't exist
//         let cart = await Cart.findOne({ userId });
//         if (!cart) {
//             cart = new Cart({ userId, car: [], totalPrice: totalPrice,
//                 pickedAt: pickedat,
//                 returnedAt: returnedat});
//         }

//         // Check if the car is already in the cart
//         const carExists = cart.car.some((item) => item.carId.equals(carId));
//         if (carExists) {
//             console.warn('Car already in cart for carId:', carId);
//             return res.status(400).json({ message: "Car already in cart" });
//         }

//         // Log the car price before adding it to the cart
//         //console.log('Car rental price:', car.rentalPriceCharge);

//         // Add the car to the cart
//         cart.car.push({
//             carId,
//             price: car.price,
//             pickedAt: pickedat,
//             returnedAt: returnedat,
//             // price: car.rentalPriceCharge, // Ensure price is correctly assigned
//         });

//         // Recalculate the total price
//         // cart.calculateTotalPrice();

//         await cart.save();

//         console.log('Car added to cart:', cart);
//         res.status(200).json({ message: "Added to cart", data: cart });
//     } catch (error) {
//         console.error('Internal server error:', error);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };

export const addCarToCart = async (req, res) => {
    try {
        const { carId,totalPrice,pickedat, returnedat } = req.body;
        const userId = req.user.id;

        // Log input values for debugging
        console.log('userId:', userId);
        console.log('carId:', carId);

        // Find the car to ensure it exists and fetch its rent per day
        const car = await Car.findById(carId);
        if (!car) {
            console.error('Car not found for carId:', carId);
            return res.status(404).json({ message: "Car not found" });
        }

        // Log the retrieved car details for debugging
        console.log('Retrieved car:', car);

        // Find the user's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, car: [], totalPrice,pickedAt: pickedat, returnedAt: returnedat });
        }

        // Check if the car is already in the cart
        const carExists = cart.car.some((item) => item.carId.equals(carId));
        if (carExists) {
            console.warn('Car already in cart for carId:', carId);
            return res.status(400).json({ message: "Car already in cart" });
        }

        // Calculate the number of rental days
       

        // Add the car to the cart with the rent per day
        cart.car.push({
            carId,
            rentalPriceCharge: car.rentalPriceCharge,
           totalPrice:totalPrice
            
        });

        // Update pickedAt and returnedAt dates
        cart.pickedAt = pickedat;
        cart.returnedAt = returnedat;

        // Recalculate the total price
        cart.calculateTotalPrice();

        await cart.save();

        console.log('Car added to cart:', cart);
        res.status(200).json({ message: "Added to cart", data: cart });
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
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
