import UserModel from "../models/userModel.js";
//import bcrypt from "bcrypt";
import generateToken from "../util/token.js";
import { cloudinaryInstance } from "../config/cloudinary.js";


// export const Signup = async(req,res,next)=>{
//     try {
//       let imageUrl="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";;
        
//         const {firstName,lastName,email,password,address,city,state,country,contactNumber,profilePicture}=req.body;
//         console.log('image====',req.file);
//         if(req.file){
//           const cloudinaryRes=await cloudinaryInstance.uploader.upload(req.file.path)
//           imageUrl=cloudinaryRes.url;
//          //imageUrl=await handleImageUpload(req.file.path)
//         }
 
//      console.log(imageUrl,"===imagrUrl");
         
//       if(!firstName||!lastName||!email||!password||!address||!city||!state||!country){
//        return res.status(400).json({message:"All fields are required"})
//       }
//       const userExist = await UserModel.findOne({email})
     
      
//       if(userExist)
//         {
//            return  res.status(400).json({error:"user already exist"})
//         }
      
//     //     const salt = await bcrypt.genSalt(10)
//     //     const hashPassword=await bcrypt.hash(password,salt);

//     //  console.log(hashPassword,"hashedpassword");


    

//     //  return res.json({
//        //   message: "signed up successfully",
//          // role: userWithoutPassword.role})
 



//         const newUser =new UserModel({
//             firstName,lastName,email,password,address,city,state,country,contactNumber,profilePicture:imageUrl
//         })
//         const savedUser= await newUser.save()

//         if(savedUser){
//             const token= await  generateToken(savedUser._id)
            
//             res.cookie("token", token, { sameSite:"None", httpOnly: true ,
//               secure:true
//             });
//             return res.status(200).json({message:"user registration successfull",savedUser})
           
//         }
//         return res.status(400).json({error:"something went wrong"})
//     } 
//     catch (error) {
//         console.log(error);
//         res.status(error.status||500).json({error:error.message || "internal server error"})
        
//     }
// }
export const Signup = async (req, res, next) => {
  try {
      let imageUrl = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"; // Default image URL
      
      const { firstName, lastName, email, password, address, city, state, country, contactNumber } = req.body;

      console.log('image====', req.file);

      // If a file is uploaded, upload it to Cloudinary
      if (req.file) {
          const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
          imageUrl = cloudinaryRes.url;
      }

      console.log(imageUrl, "===imageUrl");

      // Validate required fields
      if (!firstName || !lastName || !email || !password || !address || !city || !state || !country) {
          return res.status(400).json({ message: "All fields are required" });
      }

      // Check if the user already exists
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
          return res.status(400).json({ error: "User already exists" });
      }

      // Create a new user with the provided details
      const newUser = new UserModel({
          firstName,
          lastName,
          email,
          password,
          address,
          city,
          state,
          country,
          contactNumber,
          profilePicture: imageUrl, // Use the default or uploaded image URL
      });

      const savedUser = await newUser.save();

      if (savedUser) {
          const token = await generateToken(savedUser._id);

          // Set the token as a cookie
          res.cookie("token", token, {
              sameSite: "None",
              httpOnly: true,
              secure: true,
          });

          return res.status(200).json({
              message: "User registration successful",
              savedUser,
          });
      }

      return res.status(400).json({ error: "Something went wrong" });
  } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({
          error: error.message || "Internal server error",
      });
  }
};

export const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const userExist = await UserModel.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Compare plain-text passwords
    if (userExist.password !== password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = await generateToken(userExist._id);

    // Set the token as a cookie
    res.cookie("token", token, {
      sameSite: "None",
      httpOnly: true,
      secure: true,
    });

    // Send user information as response
    return res.json({
      message: "Logged in successfully",
      token,
      userId: userExist._id,
      role: userExist.role,
      firstName: userExist.firstName,
      email: userExist.email,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//      //signin
// export const Signin=async(req,res)=>{
//     try{
//       const {email,password}=req.body;
//       const userExist=await UserModel.findOne({email});
      
//       if(!userExist){
//         return res.send("user not exist");
//         }
      

     

//     //  const matchpassword=await bcrypt.compare(password,userExist.password);
      
//       // if(!matchpassword){
//       //   return res.status(400).json({error:"Password incorrect"})
    
    
//       // }
      
//       const token=await generateToken(userExist._id)
//       res.cookie("token", token, { sameSite:"None", httpOnly: true ,
//         secure:true
//       });
//       return res.json({ 
//         message: "Logged in successfully",token, 
//         userId:userExist._id, 
//         role:userExist.role,
//         firstName: userExist.firstName,
//         email:userExist.email,
//           user:[userExist._id 
            
//           ]     

//             })
      
//     }
//     catch(error){
//       console.log("error",error)
//       res.status(error.status||500).json({error:error.message || "internal server error"})
//     }
    
    
//     }


    //userprofile
    export const Profile = async (req, res, next) => {
  //     try {
        
  //       const {user} = req;
        
  //         const userData = await UserModel.findById(user.id).select('-password')
            
          
  
  //         res.json({ success: true, message: "user profile fetched",userData });
  //     } catch (error) {
  //         console.log(error);
  //         res.status(error.statusCode || 500).json(error.message || 'Internal server error')
  //     }
  // };
  try {
    // The userId is now available in req.user because of the authUser middleware
    const userId = req.user.id; // Assuming the token includes userId
    const userData = await UserModel.findById(userId).select('-password').select('-order'); // Exclude password from the response
   
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Send back the user data in the response
    res.json({
      success: true,
      message: 'User profile fetched successfully.',
      userData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//update user
  export const userUpdate = async (req, res) => {
    const id = req.params.id;
    console.log("hit");
    console.log(id);

    let imageUrl;
    const { firstName,lastName,email,address, city, state, country, pin, countryCode, contactNumber,profilePicture } = req.body;
    console.log('image====',req.file);
        if(req.file){
          const cloudinaryRes=await cloudinaryInstance.uploader.upload(req.file.path)
          imageUrl=cloudinaryRes.url;
         //imageUrl=await handleImageUpload(req.file.path)
        }
 
     console.log(imageUrl,"===imagrUrl");
    

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            { _id: id },
            { firstName,lastName,email,address, city, state, country, pin, countryCode, contactNumber,profilePicture:imageUrl },
            { new: true, select: '-password' }
            
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User is not updated" });
        }

        console.log(updatedUser);
       
        res.json({ success: true, message: "user updated" ,data:updatedUser});
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "An error occurred while updating the user" });
    }
};
  



      
  export const User_Logout =async (req, res, next) => {

  try{
    res.clearCookie("token",{
      sameSite:"None",
      secure:true,
      httpOnly:true
  });
    res.json({success:true,message:"user logged out "})
  }catch(error){
    console.log(error)
    res.status(error.status||500).json({error:error.message || "internal server error"})

  }
  };

  //checkuser
  // export const checkUser = async (req, res, next) => {
  //   try {

  //       res.json({ success: true, message: "user autherized" });
  //   } catch (error) {
  //       console.log(error);
  //       res.status(error.statusCode || 500).json(error.message || 'Internal server error')
  //   }
  export const checkUser = async (req, res, next) => {
    try {
        // Assuming req.user contains user information, including user ID
        if (req.user && req.user.id) {
            console.log(`User ID: ${req.user.id}`);
        } else {
            console.log("User ID not found.");
        }

        res.json({ success: true, message: "User authorized"});
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error');
    }
};


     