
import mongoose, { Schema } from "mongoose";
import { differenceInDays } from "date-fns";

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
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
      set(value) {
        // Ensure the value is always a number
        return isNaN(value) ? 0 : value;
      },
    },
    razorpayOrderId: {
      type: String,
    },
    pickedAt: { type: Date, default: null }, 
    returnedAt: { type: Date, default: null }, 
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Method to calculate the total price
cartSchema.methods.calculateTotalPrice = function () {
  if (this.pickedAt && this.returnedAt && this.pickedAt < this.returnedAt) {
    const totalDays = differenceInDays(new Date(this.returnedAt), new Date(this.pickedAt));

    if (totalDays <= 0) {
      throw new Error("The return date must be after the pickup date.");
    }

    // Calculate total price for all cars based on rentalPriceCharge * totalDays
    this.totalPrice = this.car.reduce((total, car) => {
      if (car.rentalPriceCharge <= 0) {
        throw new Error("Invalid rental price charge");
      }
      const rentalAmount = car.rentalPriceCharge * totalDays;
      return total + rentalAmount;
    }, 0);
  } else {
    throw new Error("Invalid dates provided for pickup and return");
  }

  // Ensure totalPrice is a number
  this.totalPrice = isNaN(this.totalPrice) ? 0 : this.totalPrice;
};

// Pre-save hook to calculate the total price before saving
cartSchema.pre("save", function (next) {
  this.calculateTotalPrice();
  next();
});

export const Cart = mongoose.model("Cart", cartSchema);
