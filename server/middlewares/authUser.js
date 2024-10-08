import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import UserModel from "../models/userModel.js";
dotenv.config();

export const authUser = (req, res, next)=>{

try{
    
      const {token} = req.cookies;
      if(!token){
        return res.status(401).json({message:`Please login again.`})
      }

      const decoded = jwt.verify(token,"SECRET_CODE");
      if(!decoded){
        return res.status(401).json({message:`Please login again.`})
    }
      
      console.log(decoded,'====tocken varified')
      req.user=decoded
    
      next()

  }catch(error){
    return res.status(401).json({message:`Please login again.`})
}
  }
export default authUser