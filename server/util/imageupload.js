import { cloudinaryInstance } from "../config/cloudinary.js";
export const handleImageUpload = async (path) =>{
    try{
        const uploadResult=await cloudinaryInstance.uploader.upload(path);
       return uploadResult.utl;
    }catch(error){
     next(error);
    }
}
