import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../util/token.js";


export const Signup = async(req,res,next)=>{
    try {
        console.log(req.body,"body");
        const {firstName,lastName,email,password,address,city,state,country}=req.body;
      if(!firstName||!lastName||!email||!password||!address||!city||!state||!country){
       return res.status(400).json({message:"All fields are required"})
      }
      const userExist = await UserModel.findOne({email})
      if(userExist)
        {
           return  res.status(400).json({error:"user already exist"})
        }
      
        const salt = await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt);

     console.log(hashPassword,"hashedpassword");






        const newUser =new UserModel({
            firstName,lastName,email,password:hashPassword,address,city,state,country
        })
        const savedUser= await newUser.save()

        if(savedUser){
            const token=await  generateToken(savedUser._id)
            res.cookie("token",token)
            return res.status(200).json({message:"user registration successfull",savedUser,token})
        }
        return res.status(400).json({error:"something went wrong"})
    } 
    catch (error) {
        console.log(error);
        res.status(error.status||500).json({error:error.message || "internal server error"})
        
    }
}

     //signin
export const Signin=async(req,res)=>{
    try{
      const {email,password}=req.body;
      const userExist=await UserModel.findOne({email});
      if(!userExist){
        return res.send("user not exist");
        }
      const matchpassword=await bcrypt.compare(password,userExist.password);
      if(!matchpassword){
      return res.status(400).json({error:"Password incorrect"})
      }
      const token=await generateToken(userExist._id)
      res.cookie("token",token)
      return res.json({ 
        message: "Logged in successfully",  
        role:userExist.role
      })
    }
    catch(error){
      console.log("error",error)
      res.status(error.status||500).json({error:error.message || "internal server error"})
    }
    
    
    }


    //userprofile
    export const profile = async(req,res,next)=>{
      try {
        const {user}=req
      const userData = await UserModel.findById(user.id).select('-password')
     

   



        res.json({success:true,message:"user profile fetched",userData})
      } 
      catch (error) {
          console.log(error);
          res.status(error.status||500).json({error:error.message || "internal server error"})
          
      }
  }

  export const updateUser = async(req, res)=>{
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
  



      
  export const User_Logout =async (req, res, next) => {

  try{
    res.clearCookie('token')
    res.json({success:true,message:"user logged out",userData})
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
     