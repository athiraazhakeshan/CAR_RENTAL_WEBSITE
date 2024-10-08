import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const generateToken=(id,role)=>{
   const token=jwt.sign({id:id,role:role||'user'},"SECRET_CODE",{expiresIn :"1d"});
   return token
};
export default generateToken;  