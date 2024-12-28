import express from 'express';
import { checkUser, Profile, Signin, Signup, User_Logout, userUpdate } from '../controllers/userControllers.js';
import { getcarbyid, getcarbylocation, getCars } from '../controllers/carController.js';
import authUser from '../middlewares/authUser.js';
import { upload } from '../middlewares/multer.js';
import { getAllOffice, getOfficebylocation } from '../controllers/officeController.js';
import { getOrderById, getuserAllOrders, OrderCreation } from '../controllers/orderController.js';

const router = express.Router();

router.post("/signup",Signup)
router.post("/signin",Signin)
router.get('/profile',authUser,Profile)
router.patch('/updateuser/:id',userUpdate)
router.post("/logout",User_Logout)
router.get('/checkuser',checkUser)


//carcontroller
router.get('/getcars',getCars)
router.get('/getcarbyid/:id',getcarbyid)
router.get("/getcarbylocation/:city",getcarbylocation)//officeController

//officecontroller
router.get("/getOfficebylocation/:city",getOfficebylocation)
router.get("/getAllOffices",getAllOffice)

//ordercontroller
router.post("/createorder",authUser,OrderCreation)
router.get("/getorderbyid/:id",authUser,getOrderById)
router.get("/getorder",authUser,getuserAllOrders)


//cartcontroller




export {router as userRouter};