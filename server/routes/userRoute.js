import express from 'express';
import { checkUser, Profile, Signin, Signup, User_Logout, userUpdate } from '../controllers/userControllers.js';
//import authUser from '../middlewares/authUser.js';
import { getcarbyid, getCars } from '../controllers/carController.js';
import authMiddleware from '../middlewares/authToken.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post("/signup",Signup)
router.post("/signin",Signin)
router.get('/profile',authUser,Profile)
router.patch('/updateuser/:id',userUpdate)
router.post("/logout",User_Logout)
/router.get('/checkuser',checkUser)


//carcontroller
router.get('/getcars',getCars)
router.get('/getcarbyid/:id',getcarbyid)
router.get("/getcarbylocation/:city",(req, res) => {})

//officecontroller
router.get("/getOfficebylocation/:city",(req, res) => {})
router.get("/getAllOffices",(req, res) => {})

//ordercontroller
router.post("/createorder",(req, res) => {})
router.get("/getorderbyid/:id",(req, res) => {})
router.get("/getorder",(req, res) => {})


export {router as userRouter};