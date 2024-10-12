import express from 'express';
import { admin_Logout, adminprofile, adminSignin, adminSignup, checkAdmin, deleteUserAcount, getAllUsers, updateUser } from '../controllers/adminController.js';
//import authToken from '../middlewares/authToken.js';
import { createCar, deleteCar, getcarbyid, getCars, updateCar } from '../controllers/carController.js';
import { upload } from '../middlewares/multer.js';
//import authUser from '../middlewares/authUser.js';
//import authMiddleware from '../middlewares/authToken.js';
import authAdmin from '../middlewares/authAdmin.js';
const router = express.Router();
router.get('/adminsignup',adminSignup)
router.get('/adminlogin',adminSignin)
router.get('/profile',authAdmin,adminprofile)
router.put('/updateuser/:id',updateUser)
router.delete('/deleteuser/:id',deleteUserAcount)
router.get('/getallusers',getAllUsers)
router.get('/checkadmin',checkAdmin)
router.post("/adminlogout",admin_Logout)

//admin actions
//carController
router.post("/add-cars",upload.single('carPicture'),createCar)
router.patch("/updatecar/:id",updateCar)
router.delete("/deletecar/:id",deleteCar)
router.get('/getcars',getCars)
router.get('/getcarbyid/:id',getcarbyid)

//orderController
router.get("/getorder/:id",(req, res) => {})

//officeController
router.post("/addOfficeLocation",(req, res) => {});
router.get("/getAllOffices",(req, res) => {})
router.get("/getooficebyid/:id",(req, res) => {})
router.patch("/updateOffice/:id",(req, res) => {})
router.delete("/deleteOffice/:id",(req, res) => {})


export {router as adminRouter};