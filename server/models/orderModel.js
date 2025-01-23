


import mongoose, { Schema } from "mongoose";
import moment from "moment";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserModel", // Ensure 'User' model is correct
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    car: [
      {
        carId: {
          type: Schema.Types.ObjectId,
          ref: "Car", // Ensure 'Car' model is correct
          required: true,
        },
        rentalPriceCharge: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    pickedAt: { type: String, set: (value) => moment(value).format('YYYY-MM-DD') },
    returnedAt: { type: String, set: (value) => moment(value).format('YYYY-MM-DD') },
    orderStatus: {
      type: String,
      enum: [
        "processing",
        "success",
        "shipping",
        "out for delivery",
        "delivered",
        "completed",
      ],
      default: "success",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
