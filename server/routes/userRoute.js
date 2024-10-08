import express from 'express';
import { Signin, Signup } from '../controllers/userControllers.js';
const router = express.Router();

router.post("/signup",Signup)
router.post("/signin",Signin)
router.get('/getcars',(req,res,next)=>{

})
router.get('/getcarbyid/:id',(req,res,next)=>{

})
router.get("/getOfficebylocation/:city",(req,res,next)=>{

})
router.get("/getAllOffices",(req,res,next)=>{

})
router.get("/getcarbylocation/:city",(req,res,next)=>{

})
router.get("/logout",(req,res,next)=>{

})

export {router as userRouter};