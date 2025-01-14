
import adminModel from "../models/adminModel.js";
import generateToken from "../util/token.js";
import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { cloudinaryInstance } from "../config/cloudinary.js";
dotenv.config();

// admin registration
export const adminSignup = async (req, res, next) => {
  try {
    let imageUrl = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"; // Default image URL
    console.log(req.body, "body");
    const { email, password,address,contactNumber,profilePicture } = req.body;
     console.log('image====',req.file);
            if(req.file){
              const cloudinaryRes=await cloudinaryInstance.uploader.upload(req.file.path)
              imageUrl=cloudinaryRes.url;
             //imageUrl=await handleImageUpload(req.file.path)
            }
     
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const isUserExist = await adminModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new adminModel({
      email,
      password,address,contactNumber,profilePicture:imageUrl ,
      role: 'admin'
    });
    const savedAdmin = await newUser.save();

    if (savedAdmin) {
      const token = generateToken(savedAdmin._id);
      res.cookie("token", token, { 
        sameSite: "None", 
        httpOnly: true,
        secure: true 
      });
      return res.json({
        message: "Logged in successfully",
        role: savedAdmin.role
      });
    }
    return res.status(400).json({ error: "Something went wrong" });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message || "Internal server error" });
  }
};

// admin signin
export const adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await adminModel.findOne({ email });

    if (!isUserExist) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (isUserExist.password !== password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = generateToken(isUserExist._id);
    res.cookie("token", token, { 
      sameSite: "None", 
      httpOnly: true,
      secure: true 
    });
    return res.json({ 
      message: "Logged in successfully",  
      role: isUserExist.role 
    });
  } catch (error) {
    console.log("error", error);
    res.status(error.status || 500).json({ error: error.message || "Internal server error" });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
};

// update user roll as admin
export const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log("hit");
  console.log(id);
let imageUrl;
  const {email,profilePicture,address, contactNumber } = req.body;
  console.log('image====',req.file);
  if(req.file){
    const cloudinaryRes=await cloudinaryInstance.uploader.upload(req.file.path)
    imageUrl=cloudinaryRes.url;
   //imageUrl=await handleImageUpload(req.file.path)
  }

console.log(imageUrl,"===imagrUrl");
  console.log(req.body, "body");

  try {
    const updatedUser = await adminModel.findByIdAndUpdate(
      { _id: id },
      { email,profilePicture:imageUrl,address, contactNumber },
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

// delete a user
export const deleteUserAcount = async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: `User doesn't exist with id: ${req.params.id}` });
  }

  await UserModel.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true
  });
};

// logout
export const adminLogout = async (req, res, next) => {
  try {
    res.clearCookie('token', { sameSite: "None", httpOnly: true, secure: true });
    res.json({ success: true, message: "Admin logged out" });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message || "Internal server error" });
  }
};

// admin profile
export const adminProfile = async (req, res, next) => {
  try {
    const { admin } = req;
    const userData = await adminModel.findById(admin.id).select('-password');
    res.json({ success: true, message: "Admin profile fetched", userData });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message || "Internal server error" });
  }
};

// check admin
export const checkAdmin = async (req, res, next) => {
  try {
    res.json({ success: true, message: "Admin authorized" });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
  }
};


