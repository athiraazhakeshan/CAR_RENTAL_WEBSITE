import adminModel from "../models/adminModel.js";

import generateToken from "../util/token.js";
import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'


//admin registration
export const adminSignup = async(req,res,next)=>{
  try {
      console.log(req.body,"body");
      const {email,password}=req.body;
    if(!email||!password){
     return res.status(400).json({message:"All fields are required"})
    }
    const isuserExist = await adminModel.findOne({email})
    if(isuserExist)
      {
         return  res.status(400).json({error:"user already exist"})
      }
    
    

 

      const newUser =new adminModel({
         email,password,role:'admin'
      })
      const savedAdmin= await newUser.save()

      if(savedAdmin){
        const token = generateToken(isuserExist._id);
        res.cookie("token", token, { sameSite:"None", httpOnly: true ,
          secure:true
        });
        return res.json({
            message: "Logged in successfully",
            role: isuserExist.role})

         // return res.status(200).json({message:"admin registration successfull",savedUser,token})
      }
      return res.status(400).json({error:"something went wrong"})
  } 
  catch (error) {
      console.log(error);
      res.status(error.status||500).json({error:error.message || "internal server error"})
      
  }
}



//adminsignin
export const adminSignin=async(req,res)=>{
  try{
    const {email,password}=req.body;
    const isuserExist=await adminModel.findOne({email});
    
    if(!isuserExist){
      return res.send("admin not exist");
      }
    // const matchpassword=await bcrypt.compare(password,isuserExist.password);
    // if(!matchpassword){
    //   return res.status(400).json({error:"Password incorrect"})
    //   }
     // Exclude password from response
    // const { password: _, ...userWithoutPassword } = isuserExist.toObject();

    //  return res.json({
    //      message: "Logged in successfully",
    //      role: userWithoutPassword.role})

    
         const token=await generateToken(isuserExist._id)
         res.cookie("token", token, { sameSite:"None", httpOnly: true ,
          secure:true
        });
         return res.json({ 
           message: "Logged in successfully",  
           role:isuserExist.role
         })

  
  }
  catch(error){
    console.log("error",error)
    res.status(error.status||500).json({error:error.message || "internal server error"})
  }
  
  
  }






//get all users
export const getAllUsers = async (req, res) => {
    const users = await UserModel.find();
    res.send(users);
  };
  //update user roll as admin
  export const updateUser = async (req, res) => {
    const id = req.params.id;
    console.log("hit");
    console.log(id);


    const { address, city, state, country, pin, countryCode, contactNumber } = req.body;
    console.log(req.body, "body");

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: id },
            { address, city, state, country, pin, countryCode, contactNumber },
            { new: true, select: '-password' }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User is not updated" });
        }

        console.log(updatedUser);
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "An error occurred while updating the user" });
    }
};
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
    const {admin}=req
  const userData = await adminModel.findById(admin.id).select('-password')




    res.json({success:true,message:"admin profile fetched",userData})
  } 
  catch (error) {
      console.log(error);
      res.status(error.status||500).json({error:error.message || "internal server error"})
      
  }}


  export const admin_Logout =async (req, res, next) => {

    try{
      res.clearCookie('token', { sameSite:"None", httpOnly: true ,
        secure:true
      });
      res.json({success:true,message:"admin logged out"})
    }catch(error){
      console.log(error)
      res.status(error.status||500).json({error:error.message || "internal server error"})
  
    }
    };
   

  //checkadmin
  export const checkAdmin = async (req, res, next) => {
    try {

        res.json({ success: true, message: "admin autherized" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};
   