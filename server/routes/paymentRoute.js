// import e from "express";
// import Stripe from "stripe";
// import { Cart } from "../models/cartModel.js";
// import { Order } from "../models/orderModel.js"; // Import the Order model
// import authUser from "../middlewares/authUser.js";
// import { areIntervalsOverlapping } from "date-fns";

// const router = e.Router();
// const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);
// const client_domain = process.env.CLIENT_DOMAIN;

// router.post("/create-checkout-session", authUser, async (req, res) => {
//     try {
//         const { user } = req; // Authenticated user's data
//         const { products, totalPrice } = req.body;

//         const validTotalPrice = Number(totalPrice);
//         if (isNaN(validTotalPrice) || validTotalPrice <= 0) {
//             throw new Error("Invalid total price");
//         }

//         const lineItems = products.map((product) => {
//             const unitPrice = Number(product?.rentalPriceCharge);
//             if (isNaN(unitPrice)) {
//                 throw new Error(`Invalid price for product: ${product?.carId?.carName}`);
//             }

//             return {
//                 price_data: {
//                     currency: "inr",
//                     product_data: {
//                         name: product?.carId?.carName,
//                         images: [product?.carId?.carPicture],
//                     },
//                     unit_amount: Math.round((validTotalPrice * 100)), // Fixed: Unit price per product
//                 },
//                 quantity: 1,
//             };
//         });

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             client_reference_id: user.id,
//             metadata: { totalPrice: validTotalPrice },
//             success_url: `${client_domain}/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
//             cancel_url: `${client_domain}/user/payment/cancel`,
//         });

//         const cart = await Cart.findOne({ userId: session.client_reference_id }).populate("car.carId");
//         if (!cart || cart.car.length === 0) {
//             return res.status(400).json({ message: "Cart is empty or invalid" });
//         }

//         // Create the order
//         const order = new Order({
//             userId: cart.userId,
//             car: cart.car,
//             totalPrice: cart.totalPrice,
//             sessionId: session.id,
//             pickedAt: cart.pickedAt || new Date(),
//             returnedAt: cart.returnedAt || null,
//             orderStatus: "processing",
//         });
//         await order.save();
//         console.log("Order saved successfully");

//         // Delete the cart after the order is created
//         const deletedCart = await Cart.findOneAndDelete({ userId: session.client_reference_id });
//         if (!deletedCart) {
//             return res.status(404).json({ message: "Cart not found or already deleted" });
//         }
//         console.log("Cart successfully deleted after order creation");

//         res.status(200).json({ sessionId: session.id });
//     } catch (error) {
//         console.error("Error creating checkout session:", error);
//         res.status(500).json({ message: error.message || "Failed to create checkout session" });
//     }
// });

// export const getSessionStatus = async (req, res) => {
//     try {
//         const { orderId } = req.query;
//         if (!orderId) {
//             return res.status(400).json({ message: "Order ID is required" });
//         }

//         const orderDetails = await Order.findById(orderId);
//         if (!orderDetails) {
//             return res.status(404).json({ message: "Order not found" });
//         }

//         const session = await stripe.checkout.sessions.retrieve(orderDetails.sessionId);
//         res.json({
//             status: session?.status,
//             customer_email: session?.customer_details?.email,
//             session_data: session,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message || "Internal server error" });
//     }
// };

// router.get('/session-status', authUser, getSessionStatus);
// export { router as paymentRouter };

import express from 'express';
import Stripe from 'stripe';
import { Cart } from '../models/cartModel.js';
import { Order } from '../models/orderModel.js'; // Import Order model
import authUser from '../middlewares/authUser.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);

// Create Checkout Session
router.post('/create-checkout-session', authUser, async (req, res) => {
    try {
        const { user } = req;
        const { products, totalPrice } = req.body;

        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'inr',
                product_data: { name: product.carName },
                unit_amount: product.rentalPriceCharge * 100,
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            client_reference_id: user.id,
            success_url: `${process.env.CLIENT_DOMAIN}/success`,
            cancel_url: `${process.env.CLIENT_DOMAIN}/cancel`,
        });

        const order = new Order({
            userId: user.id,
            car: products,
            totalPrice,
            sessionId: session.id,
            orderStatus: 'processing',
        });
        await order.save();

        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get Session Status
router.get('/session-status', authUser, async (req, res) => {
    try {
        const { orderId } = req.query;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const session = await stripe.checkout.sessions.retrieve(order.sessionId);
        res.json({ status: session.status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Verify Order (Admin)
router.post('/verify-order', authUser, async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderStatus = 'completed';
        await order.save();

        res.status(200).json({ message: 'Order marked as completed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { router as paymentRouter };
