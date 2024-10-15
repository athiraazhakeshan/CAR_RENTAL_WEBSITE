import Car from "../models/carModel.js";
import OfficeLocation from "../models/officelocationModel.js";
import Order from "../models/orderModel.js";
import UserModel from "../models/userModel.js";

export const OrderCreation = async(req, res) =>{
    const { officeLocation, car,user, totalPrice,pickedat,returnedat } = req.body;
console.log(req.body);
   

   
    const carid = await Car.findById(car);
        if (!carid) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }
        const usr = await UserModel.findById(user);
        if (!usr) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const office = await OfficeLocation.findById(officeLocation);
        if (!office) {
            return res.status(404).json({ success: false, message: "Office Location not found" });
        }

    // if (orderExist && orderExist.orderStatus==='Processing') {
    //     return ("Order Already Placed", 400);
    // }

    const order = new Order({
        officeLocation: office._id,
        car: carid._id,

        totalPrice: totalPrice,
        pickedAt: pickedat,
        returnedAt: returnedat,

        user: usr._id,
    });
    
    await order.save();

    carid.orders.push(order._id);
    await carid.save();
    usr.orders.push(order._id);
    await usr.save();

    res.status(201).json({ success: true, message: "Order created successfully",order });
}
export const getOrderById = async (req, res) => {
    try {
        const orderid =  req.params.id; // Get user ID from the authenticated user
        const orders = await Order.findOne({ _id:orderid });
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const getuserAllOrders = async (req, res, next) => {
    try {
      
      const {user} = req;//
      
        const orders = await UserModel.findById(user.id).select('-password').select('-address').select('-country').select('-city').select('-state').select('-profilePicture')
          
        

        res.json({ success: true, message: "user orders fetched",orders });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};