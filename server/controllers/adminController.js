import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../util/token.js";
import jwt from 'jsonwebtoken'

//get all users
export const getAllUsers = async (req, res) => {
    const users = await UserModel.find();
    res.send(users);
  };
  //update user roll as admin
  export const Updateuserasadmin = async(req, res)=>{
    const {role}=req.body;
    const id=req.params.id;
    console.log(id)
    console.log(role)

const updateduser = await UserModel.findOneAndUpdate(
    { _id: id },
    { role },
    {
      new: true,
    }
  );
  if (!updateduser) {
    return res.send("USer is not updated");
  }
  console.log(updateduser);

  res.status(200).json({
    success: true,
    updateduser,
});
}
//delete a user
export const deleteUserAcount = async(req, res)=>{
    const user = await UserModel.findById(req.params.id);

    if(!user) {
        return res.send(`User doesn't exist with id: ${req.params.id}`, 404)
    }

    await UserModel.findByIdAndDelete(req.params.id)

    return res.status(200).json({
        success: true
    });
}
//logout

//userprofile
export const adminprofile = async(req,res,next)=>{
    try {
      const {user}=req
    const userData = await UserModel.findById(user.id).select('-password')
      res.json({success:true,message:"admin profile fetched",userData})
    } 
    catch (error) {
        console.log(error);
        res.status(error.status||500).json({error:error.message || "internal server error"})
        
    }
}   



  export const admin_Logout =async (req, res, next) => {

    try{
      res.clearCookie('token')
      res.json({success:true,message:"admin logged out"})
    }catch(error){
      console.log(error)
      res.status(error.status||500).json({error:error.message || "internal server error"})
  
    }
    };
    export const checkUser = async (req, res, next) => {
      try {
  
          res.json({ success: true, message: "user autherized" });
      } catch (error) {
          console.log(error);
          res.status(error.statusCode || 500).json(error.message || 'Internal server error')
      }
  };

  //checkuser
  export const checkAdmin = async (req, res, next) => {
    try {

        res.json({ success: true, message: "admin autherized" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};
   