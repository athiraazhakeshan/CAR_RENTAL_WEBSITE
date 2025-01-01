// import e from "express";
// import Stripe from "stripe";
// const router = e.Router();
// const stripe = new Stripe(process.env.Stripe_Private_Api_Key);
// const client_domain = process.env.CLIENT_DOMAIN;

// router.post("/create-checkout-session", async (req, res, next) => {
//     try {
//       const { products, totalPrice } = req.body;
  
//       // Ensure totalPrice is a valid number
//       const parsedTotalPrice = isNaN(totalPrice) || totalPrice <= 0 ? 0 : Number(totalPrice);  // Set fallback to 0 if NaN
  
//       if (!products || products.length === 0) {
//         return res.status(400).json({ error: "No products provided" });
//       }
  
//       const lineItems = products.map((product) => {
//         const price = isNaN(Number(product?.totalPrice)) || product?.totalPrice <= 0 ? 0 : Number(product?.totalPrice); // Handle invalid price
  
//         return {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: product?.carId?.carName,
//               images: [product?.carId?.carPicture],
//             },
//             unit_amount: Math.round(price * 100), // Stripe expects price in the smallest unit
//           },
//           quantity: 1,
//         };
//       });
  
//       // Create checkout session with Stripe
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: lineItems,
//         mode: "payment",
//         success_url: `${client_domain}/user/payment/success`,
//         cancel_url: `${client_domain}/user/payment/cancel`,
//         metadata: {
//           totalPrice: parsedTotalPrice,  // Store totalPrice as metadata (optional)
//         }
//       });
  
//       res.json({ success: true, sessionId: session.id });
//     } catch (error) {
//       console.error("Error creating checkout session:", error);
//       res.status(error.statusCode || 500).json({ error: error.message || "Internal server error" });
//     }
//   });
//   router.get("/session-status", async (req, res) => {
//         try {
//             const sessionId = req.query.session_id;
//             const session = await stripe.checkout.sessions.retrieve(sessionId);
    
//             res.send({
//                 status: session?.status,
//                 customer_email: session?.customer_details?.email,
//             });
//         } catch (error) {
//             console.error("Error retrieving session status:", error);
//             res.status(error?.statusCode || 500).json(error.message || "Internal server error");
//         }
//     });
  
// export { router as paymentRouter };








// import e from "express";
// import Stripe from "stripe";
// const router = e.Router();
// const stripe = new Stripe(process.env.Stripe_Private_Api_Key);
// const client_domain = process.env.CLIENT_DOMAIN;

// router.post("/create-checkout-session", async (req, res, next) => {
//     try {
//         const { products } = req.body;

//         const lineItems = products.map((product) => {
//             const totalPrice = Number(product?.carId?.rentalPriceCharge);
//             if (isNaN(totalPrice)) {
//                 throw new Error(`Invalid price for product: ${product?.carId?.carName}`);
//             }

//             return {
//                 price_data: {
//                     currency: "inr",
//                     product_data: {
//                         name: product?.carId?.carName,
//                         images: [product?.carId?.carPicture],
//                     },
//                     unit_amount: Math.round(totalPrice * 100), // Convert to the smallest currency unit
//                 },
//                 quantity: 1,
//             };
//         });

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: `${client_domain}/user/payment/success`,
//             cancel_url: `${client_domain}/user/payment/cancel`,
//         });

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
const router = e.Router();
const stripe = new Stripe(process.env.Stripe_Private_Api_Key);
const client_domain = process.env.CLIENT_DOMAIN;

router.post("/create-checkout-session", async (req, res, next) => {
    try {
        const { products, totalPrice } = req.body; // Accept totalPrice from frontend

        // Ensure that totalPrice is valid
        const validTotalPrice = Number(totalPrice);
        if (isNaN(validTotalPrice) || validTotalPrice <= 0) {
            throw new Error("Invalid total price");
        }

        const lineItems = products.map((product) => {
            const unitPrice = Number(product?.rentalPriceCharge); // Get price of each item
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
                    unit_amount: Math.round(totalPrice*100), // Convert to smallest currency unit
                },
                quantity: 1,
            };
        });

        // Create the Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            // Set total price in the session metadata
            metadata: { totalPrice: validTotalPrice },
            success_url: `${client_domain}/user/payment/success`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });

        // Send the session ID back to the frontend
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
