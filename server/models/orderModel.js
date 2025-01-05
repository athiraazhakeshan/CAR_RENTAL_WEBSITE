// import mongoose, { Schema } from "mongoose";

// const orderSchema = new Schema(
//   {
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "UserModel",
//       required: true,
//     },
//     car: [
//       {
//         carId: {
//           type: Schema.Types.ObjectId,
//           ref: "Car",
//           required: true,
//         },
//         rentalPriceCharge: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     totalPrice: {
//       type: Number,
//       required: true,
//     },
//     stripePaymentIntentId: {
//       type: String,
//       required: true,
//     },
//     pickedAt: Date,
//     returnedAt: Date,
//   },
//   {
//     timestamps: true,
//   }
// );

// export const Order = mongoose.model("Order", orderSchema);


import mongoose, { Schema } from "mongoose";

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
    pickedAt: { type: Date, default: null }, 
    returnedAt: { type: Date, default: null }, 
    orderStatus: {
      type: String,
      enum: [
        "processing",
        "success",
        "shipping",
        "out for delivery",
        "delivered",
      ],
      default: "success",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
