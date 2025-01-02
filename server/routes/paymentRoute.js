// import e from "express";
// import Stripe from "stripe";
// const router = e.Router();
// const stripe = new Stripe(process.env.Stripe_Private_Api_Key);
// const client_domain = process.env.CLIENT_DOMAIN;

// router.post("/create-checkout-session", async (req, res, next) => {
//     try {
//         const { products, totalPrice } = req.body; // Accept totalPrice from frontend

//         // Ensure that totalPrice is valid
//         const validTotalPrice = Number(totalPrice);
//         if (isNaN(validTotalPrice) || validTotalPrice <= 0) {
//             throw new Error("Invalid total price");
//         }

//         const lineItems = products.map((product) => {
//             const unitPrice = Number(product?.rentalPriceCharge); // Get price of each item
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
//                     unit_amount: Math.round(totalPrice*100), // Convert to smallest currency unit
//                 },
//                 quantity: 1,
//             };
//         });

//         // Create the Stripe session
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             // Set total price in the session metadata
//             metadata: { totalPrice: validTotalPrice },
//             success_url: `${client_domain}/user/payment/success`,
//             cancel_url: `${client_domain}/user/payment/cancel`,
//         });

//         // Send the session ID back to the frontend
//         res.json({ success: true, sessionId: session.id });
//     } catch (error) {
//         console.error("Error creating checkout session:", error);
//         res.status(error.statusCode || 500).json(error.message || "Internal server error");
//     }
// });

// router.get("/session-status", async (req, res) => {
//     try {
//         const sessionId = req.query.session_id;
//         const session = await stripe.checkout.sessions.retrieve(sessionId);

//         res.send({
//             status: session?.status,
//             customer_email: session?.customer_details?.email,
//         });
//     } catch (error) {
//         console.error("Error retrieving session status:", error);
//         res.status(error?.statusCode || 500).json(error.message || "Internal server error");
//     }
// });

// export { router as paymentRouter };



import e from "express";
import Stripe from "stripe";
import { Cart } from "../models/cartModel";
import { Order } from "../models/orderModel"; // Import the Order model

const router = e.Router();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);
const client_domain = process.env.CLIENT_DOMAIN;

router.post("/create-checkout-session", async (req, res, next) => {
    try {
        const { products, totalPrice } = req.body;

        const validTotalPrice = Number(totalPrice);
        if (isNaN(validTotalPrice) || validTotalPrice <= 0) {
            throw new Error("Invalid total price");
        }

        const lineItems = products.map((product) => {
            const unitPrice = Number(product?.rentalPriceCharge);
            if (isNaN(unitPrice)) {
                throw new Error(`Invalid price for product: ${product?.carId?.carName}`);
            }

            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product?.carId?.carName,
                        images: [product?.carId?.carPicture],
                    },
                    unit_amount: Math.round(unitPrice * 100),
                },
                quantity: 1,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            client_reference_id: req.user.id,
            metadata: { totalPrice: validTotalPrice },
            success_url: `${client_domain}/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });

        res.json({ success: true, sessionId: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
});

router.get("/session-status", async (req, res) => {
    try {
        const sessionId = req.query.session_id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session?.payment_status === "paid") {
            // Find the user's cart
            const cart = await Cart.findOne({ userId: session.client_reference_id }).populate("car.carId");

            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }

            // Create an order
            const order = new Order({
                userId: cart.userId,
                car: cart.car,
                totalPrice: cart.totalPrice,
                stripePaymentIntentId: session.id,
                pickedAt: cart.pickedAt,
                returnedAt: cart.returnedAt,
            });

            await order.save();
            console.log(order)
            // Clear the cart
            cart.car = [];
            cart.totalPrice = 0;
            await cart.save();
        }

        res.send({
            status: session?.status,
            customer_email: session?.customer_details?.email,
        });
    } catch (error) {
        console.error("Error retrieving session status:", error);
        res.status(error?.statusCode || 500).json(error.message || "Internal server error");
    }
});

export { router as paymentRouter };
