import express from "express";
import { createRazorpayOrder,verifyRazorpayPayment } from "../controllers/paymentController";
const router = express.Router();

router.post("/create-order", createRazorpayOrder);
router.post("/verify-payment", verifyRazorpayPayment);

export default router;
