import e from "express";
import Stripe from "stripe";
import { Cart } from "../models/cartModel.js";
import { Order } from "../models/orderModel.js"; // Import the Order model
import authUser from "../middlewares/authUser.js";

const router = e.Router();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);
const client_domain = process.env.CLIENT_DOMAIN;

// Apply authUser middleware to ensure req.user is set
router.post("/create-checkout-session", authUser, async (req, res) => {
    try {
        const { user } = req;  // Use req.user to get the authenticated user's data
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
                    unit_amount: Math.round(validTotalPrice * 100), // Corrected: should be validTotalPrice instead of totalPrice
                },
                quantity: 1,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            client_reference_id: user.id,  // user is now available from req.user
            metadata: { totalPrice: validTotalPrice },
            success_url: `${client_domain}/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });
        const cart = await Cart.findOne({ userId: session.client_reference_id }).populate("car.carId");
      
      // Create an order
            const order = new Order({
                userId: cart.userId,
                car: cart.car,
                totalPrice: cart.totalPrice,
                sessionId: session.id,
                pickedAt: cart.pickedAt,
                returnedAt: cart.returnedAt,
                orderStatus:"success"
            });
       // await order.save();
       try {
                        await order.save();
                        console.log("Order saved successfully");
        
                        // Clear the cart
                        cart.car = [];
                        cart.totalPrice = 0;
                        await cart.save();
                        console.log("Cart cleared after order creation");
                    } catch (error) {
                        console.error("Error saving the order:", error);
                        return res.status(500).json({ message: "Error saving the order" });
                    }

        // Send response to the client
        res.json({ success: true, sessionId: session.id });
        console.log("sessionid", session.id);
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
});

// Get session status
export const getSessionStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderDetails = await Order.findOne({ userId });
        const sessionId = orderDetails.sessionId;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        res.json({
            status: session?.status,
            customer_email: session?.customer_details?.email,
            session_data: session,
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};
router.get('/session-status', authUser,getSessionStatus);

export { router as paymentRouter };

