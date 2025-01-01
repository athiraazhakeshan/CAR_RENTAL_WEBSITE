import express from "express";
const router = express.Router();
import { userRouter } from "./userRoute.js";
import { adminRouter } from "./adminRoute.js";
import { cartRouter } from "./cartRoute.js";
import { paymentRouter } from "./paymentRoute.js";


router.use('/user',userRouter)

router.use('/admin',adminRouter)

router.use('/cart',cartRouter)

router.use("/payment", paymentRouter);

export {router as apiRouter}