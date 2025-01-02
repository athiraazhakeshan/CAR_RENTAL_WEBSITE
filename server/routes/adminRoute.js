import express from 'express';
import { admin_Logout, adminprofile, adminSignin, adminSignup, checkAdmin, deleteUserAcount, getAllUsers, updateUser } from '../controllers/adminController.js';

import { createCar, deleteCar, getcarbyid, getCars, updateCar } from '../controllers/carController.js';
import { upload } from '../middlewares/multer.js';

import authAdmin from '../middlewares/authAdmin.js';
import { addOffice, deleteOffice, getAllOffice, getofficebyid, updateOffice } from '../controllers/officeController.js';
//import { getuserAllOrders } from '../controllers/orderController.js';
const router = express.Router();
router.post('/adminsignup',adminSignup)
router.post('/adminlogin',adminSignin)
router.get('/profile',authAdmin,adminprofile)
router.put('/updateuser/:id',updateUser)
router.delete('/deleteuser/:id',deleteUserAcount)
router.get('/getallusers',getAllUsers)
router.get('/checkadmin',checkAdmin)
router.post("/adminlogout",admin_Logout)

//admin actions
//carController
router.post("/add-cars",upload.single('carPicture'),createCar)
router.patch("/updatecar/:id",upload.single('carPicture'),updateCar)
router.delete("/deletecar/:id",deleteCar)
router.get('/getcars',getCars)
router.get('/getcarbyid/:id',getcarbyid)

//orderController
//router.get("/getorder/:id",authAdmin,getuserAllOrders)

//officeController
router.post("/addOfficeLocation",addOffice);
router.get("/getAllOffices",getAllOffice)
router.get("/getooficebyid/:id",getofficebyid)
router.patch("/updateOffice/:id",updateOffice)
router.delete("/deleteOffice/:id",deleteOffice)


export {router as adminRouter};