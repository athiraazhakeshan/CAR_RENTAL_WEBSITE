
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import UserModel from "../models/userModel.js";
dotenv.config();

export const authAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: 'Please login again.' });
    }

    const secret = process.env.SECRET_CODE || 'SECRET_CODE'; // Ensure this matches the secret used in token generation
    const tokenVarified = jwt.verify(token, secret);
    
    if (!tokenVarified) {
      return res.status(401).json({ message: 'Invalid token. Please login again.' });
    }

    console.log(tokenVarified, '==== Token verified');
    req.admin = tokenVarified;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized. Please login again.' });
  }
};

export default authAdmin;
