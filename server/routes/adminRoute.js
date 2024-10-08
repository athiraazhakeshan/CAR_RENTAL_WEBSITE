import express from 'express';
const router = express.Router();


router.post("/signup",(req,res,next)=>{

})
router.post("/signin",(req,res,next)=>{

})
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


export {router as adminRouter};