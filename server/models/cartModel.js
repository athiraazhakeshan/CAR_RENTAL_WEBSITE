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


cartSchema.methods.calculateTotalPrice = function() {
    if (!this.car || !Array.isArray(this.car)) {
        this.totalPrice = 0;
    } else {
        this.totalPrice = this.car.reduce((total, item) => {
            const itemPrice = item.price || 0; // Ensure item.price is a number
            return total + itemPrice;
        }, 0);
    }
};

 export const Cart =mongoose. model("Cart", cartSchema);
 ;
