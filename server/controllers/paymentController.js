// import razorpayInstance from "../config/razorpay.js";
import Razorpay from 'razorpay'
import Order from "../models/orderModel.js";
import Car from "../models/carModel.js";
import crypto from 'crypto'
import OfficeLocation from "../models/officelocationModel.js";
import UserModel from "../models/userModel.js";
import dotenv from 'dotenv';
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_Z7ni2qIKcSqKiS",
    key_secret: "LoxHSBXFSMZnqHiueubO7qbg"
});

// Controller to create Razorpay order and handle payment
export const createRazorpayOrder = async (req, res) => {
    try {
        const { officeLocationId, carId, userId, totalAmount, pickedat, returnedat } = req.body;

        console.log('Received data:', req.body); // Log received data
console.log(totalAmount)
        const car = await Car.findById(carId);
        const usr = await UserModel.findById(userId);
        const office = await OfficeLocation.findById(officeLocationId);

        if (!car || !usr || !office) {
            return res.status(400).json({ success: false, message: "Invalid data provided" });
        }

        // Create Razorpay order
        const options = {
            amount: totalAmount * 100, // amount in smallest currency unit
            currency: "INR",
            // receipt: `receipt_order_${Date.now()}`,
            receipt:"receipt#1",
            payment_capture:1
        };

        console.log('Razorpay order options:', options); // Log Razorpay options

        const razorpayOrder = await razorpayInstance.orders.create(options);

        if (!razorpayOrder) {
            return res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
        }

        // Create order in database
        const order = await Order.create({
            officeLocation: office._id,
            car: car._id,
            totalPrice: totalAmount,
            pickedAt: pickedat,
            returnedAt: returnedat,
            user: usr._id,
            razorpayOrderId: razorpayOrder.id,
            orderStatus: 'Processing',
        });

        car.order.push(order.id);
        await car.save();
        usr.order.push(order.id);
        await usr.save();

        res.status(201).json({
            success: true,
            order,
            razorpayOrder,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const verifyRazorpayPayment = async (req, res) => {
    console.log("hitedvarify")
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        console.log('RAZORPAY_KEY_SECRET:', "LoxHSBXFSMZnqHiueubO7qbg");  // Debugging line

        if (!process.env.KEY_SECRET) {
            return res.status(500).json({ message: 'Razorpay secret key not found' });
        }

        const hmac = crypto.createHmac('sha256', "LoxHSBXFSMZnqHiueubO7qbg");

        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generated_signature = hmac.digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        // Update order status in database
        const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.orderStatus = 'Completed';
        await order.save();

        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
