
import mongoose, { Schema, model } from "mongoose";
import { differenceInDays } from 'date-fns';

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
                rentalPriceCharge: {
                    type: Number,
                    required: true,
                    ref:"Car"
                },
            },
        ],
        totalPrice: {
            type: Number,
            // required: true,
            default: 0
        },
       
        razorpayOrderId: {
            type: String,
        },
        pickedAt: Date,
        returnedAt: Date,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

// Method to calculate the total price
// cartSchema.methods.calculateTotalPrice = function () {
//     if (this.pickedAt && this.returnedAt) {
//         const totalDays = differenceInDays(new Date(this.returnedAt), new Date(this.pickedAt));
//         this.totalPrice = this.car.reduce((total, car) => total + (car.rentalPriceCharge * totalDays), 0);
//     }
// };
cartSchema.methods.calculateTotalPrice = function () {
    if (this.pickedAt && this.returnedAt) {
      const totalDays = differenceInDays(new Date(this.returnedAt), new Date(this.pickedAt));
      
      // Calculate total price for all cars based on rentalPriceCharge * totalDays
      this.totalPrice = this.car.reduce((total, car) => {
        // For each car, multiply rentalPriceCharge by the number of days
        const rentalAmount = car.rentalPriceCharge * totalDays;
        return total + rentalAmount;
      }, 0);
    }
  };
  

// Pre-save hook to calculate the total price before saving
cartSchema.pre('save', function (next) {
    this.calculateTotalPrice();
    next();
});

export const Cart = mongoose.model("Cart", cartSchema);
