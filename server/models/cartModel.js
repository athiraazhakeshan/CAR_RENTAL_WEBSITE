import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "UserModel",
            required: true,
        },
        car: [
            {
                carId: {
                    type: Schema.Types.ObjectId,
                    ref: "Car",
                    required: true, // Ensure the name matches the car model name
                },
                price: {
                    type: Number,
                    required: true,
                },
              
            },
        ],
        totalPrice: {
            type: Number,
            // required: true,
            default: 0
        },razorpayOrderId:{
type:String,
        },
        pickedAt: Date,
        returnedAt: Date,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);


cartSchema.methods.calculateTotalPrice = function () {
    this.totalPrice = this.car.reduce((total, car) => total + car.price, 0);
};


 export const Cart =mongoose. model("Cart", cartSchema);
 ;
