import express from 'express';
import { admin_Logout, adminprofile, checkAdmin, deleteUserAcount, getAllUsers, Updateuserasadmin } from '../controllers/adminController.js';
import { authAdmin } from '../middlewares/authAdmin.js';
import { createCar, deleteCar, getcarbyid, getCars, updateCar } from '../controllers/carController.js';
import { upload } from '../middlewares/multer.js';
const router = express.Router();

router.get('/profile',adminprofile,authAdmin)
router.put('/updateuser/:id',Updateuserasadmin,authAdmin)
router.delete('/deleteuser/:id',deleteUserAcount,authAdmin)
router.get('/getallusers',getAllUsers,authAdmin)
router.get('/checkadmin',checkAdmin,authAdmin)
router.post("/adminlogout",admin_Logout,authAdmin)

//admin actions
//carController
router.post("/add-cars",createCar,upload.single('image'),authAdmin);
router.patch("/updatecar/:id",updateCar,authAdmin)
router.delete("/deletecar/:id",deleteCar,authAdmin)
router.get('/getcars',getCars,authAdmin);
router.get('/getcarbyid/:id',getcarbyid,authAdmin)

//orderController
router.get("/getorder/:id",(req, res) => {})

//officeController
router.post("/addOfficeLocation",(req, res) => {});
router.get("/getAllOffices",(req, res) => {})
router.get("/getooficebyid/:id",(req, res) => {})
router.patch("/updateOffice/:id",(req, res) => {})
router.delete("/deleteOffice/:id",(req, res) => {})


export {router as adminRouter};