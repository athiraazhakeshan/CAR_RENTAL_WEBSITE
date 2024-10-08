import express from "express";
const router = express.Router();
import { userRouter } from "./userRoute.js";
import { adminRouter } from "./adminRoute.js";

router.use('/user',userRouter)

router.use('/admin',adminRouter)


export {router as apiRouter}