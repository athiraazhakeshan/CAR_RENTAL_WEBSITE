import express from 'express';
import { checkUser, profile, Signin, Signup, updateUser, User_Logout } from '../controllers/userControllers.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post("/signup",Signup)
router.post("/signin",Signin)
router.get('/profile',authUser,profile)
router.patch('/updateuser/:id',authUser,updateUser)
router.post("/logout",User_Logout,authUser)
/router.get('/checkuser',authUser,checkUser)

export {router as userRouter};