import express from 'express';
import { checkUser, profile, Signin, Signup, updateUser, User_Logout } from '../controllers/userControllers.js';
import authUser from '../middlewares/authUser.js';
import { getcarbyid, getCars } from '../controllers/carController.js';

const router = express.Router();

router.post("/signup",Signup)
router.post("/signin",Signin)
router.get('/profile',authUser,profile)
router.patch('/updateuser/:id',authUser,updateUser)
router.post("/logout",User_Logout,authUser)
/router.get('/checkuser',authUser,checkUser)


//carcontroller
router.get('/getcars',getCars,authUser)
router.get('/getcarbyid/:id',getcarbyid,authUser)
router.get("/getcarbylocation/:city",(req, res) => {})

//officecontroller
router.get("/getOfficebylocation/:city",(req, res) => {})
router.get("/getAllOffices",(req, res) => {})

//ordercontroller
router.post("/createorder",(req, res) => {})
router.get("/getorderbyid/:id",(req, res) => {})
router.get("/getorder",(req, res) => {})


export {router as userRouter};