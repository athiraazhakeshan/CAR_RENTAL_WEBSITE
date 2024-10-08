import express from 'express';
import { admin_Logout, adminprofile, checkAdmin, deleteUserAcount, getAllUsers, Updateuserasadmin } from '../controllers/adminController.js';
import { authAdmin } from '../middlewares/authAdmin.js';
const router = express.Router();

router.get('/profile',adminprofile,authAdmin)
router.put('/updateuser/:id',Updateuserasadmin,authAdmin)
router.delete('/deleteuser/:id',deleteUserAcount,authAdmin)
router.get('/getallusers',getAllUsers,authAdmin)
router.get('/checkadmin',checkAdmin,authAdmin)


router.post("/adminlogout",admin_Logout,authAdmin)


export {router as adminRouter};