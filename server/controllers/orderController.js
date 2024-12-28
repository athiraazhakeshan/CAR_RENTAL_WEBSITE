


import Car from "../models/carModel.js";
import OfficeLocation from "../models/officelocationModel.js";
import Order from "../models/orderModel.js";
import UserModel from "../models/userModel.js";

export const OrderCreation = async(req, res) =>{
    const { officeLocation,car, totalPrice, pickedat, returnedat } = req.body;
    const userId = req.user.id;
    console.log(req.body);
    

    try {
        const carid = await Car.findById(car);
        if (!carid) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }
        const usr = await UserModel.findById(userId);
        if (!usr) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const office = await OfficeLocation.findById(officeLocation);
        if (!office) {
            return res.status(404).json({ success: false, message: "Office Location not found" });
        }

        const order = new Order({
            officeLocation: office._id,
            car: carid._id,
            totalPrice: totalPrice,
            pickedAt: pickedat,
            returnedAt: returnedat,
           userId: usr.id,
        });

        await order.save();

        // Initialize orders array if it doesn't exist
        if (!carid.order) {
            carid.order = [];
        }
        carid.order.push(order._id);
        await carid.save();

        if (!usr.order) {
            usr.order = [];
        }
        usr.order.push(order._id);
        await usr.save();

        res.status(201).json({ success: true, message: "Order created successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const orderid = req.params.id; // Get order ID from the request params
        const order = await Order.findById(orderid);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const getuserAllOrders = async (req, res) => {
    try {
        const user = req.user; // Assuming user info is populated in the request object
        const usr = await UserModel.findById(user.id).populate('order').select('-password -profilePicture');
        if (!usr) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, message: "User orders fetched", orders: usr.order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
