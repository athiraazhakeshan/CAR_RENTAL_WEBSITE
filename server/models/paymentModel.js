// //Create a new order
// export const createOrder = async (req, res) => {
//     try {
//         const { items, totalAmount } = req.body;
//         const userId = req.user.id; // Get user ID from the authenticated user
//         //Check if items are provided
//         if (!items || items.length === 0) {
//             return res.status(400).json({ success: false, message: "No items provided" });
//         }
//          //Create the order
//         const newOrder = new Order({
//             userId,
//             items,
//             totalAmount
//         });
//         await newOrder.save();
//         res.status(201).json({ success: true, message: "Order created successfully", order: newOrder });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };
// //Get all orders for a user
// export const getOrders = async (req, res) => {
//     try {
//         const userId = req.user.id; // Get user ID from the authenticated user
//         const orders = await Order.find({ userId }).populate('items.itemId'); //Populate food items
//         res.json({ success: true, orders });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };
// //Update an order
// export const updateOrder = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const { status } = req.body;
//         const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
//         if (!updatedOrder) {
//             return res.status(404).json({ success: false, message: "Order not found" });
//         }
//         res.json({ success: true, message: "Order updated successfully", order: updatedOrder });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };
// //Delete an order
// export const deleteOrder = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const deletedOrder = await Order.findByIdAndDelete(orderId);
//         if (!deletedOrder) {
//             return res.status(404).json({ success: false, message: "Order not found" });
//         }
//         res.json({ success: true, message: "Order deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };

import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

export const Payment = mongoose.model("Payment", paymentSchema);