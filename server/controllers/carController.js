import { cloudinaryInstance } from "../config/cloudinary.js";
import Car from "../models/carModel.js";
import OfficeLocation from "../models/officelocationModel.js";





//createcar

export const createCar = async (req, res) => {
    try {



      let imageUrl;
      const { carName, carModel,transmission, carCompany,carPicture,carCategory,
        carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge,office } = req.body;
        const { city } = office;
        const findlocation = await OfficeLocation.findOne({ office:city });
        console.log(findlocation)
                if (!findlocation) {
                  return res.send("please add instructor first");
                }
          
   
        console.log('image====',req.file);

       if(req.file){
         const cloudinaryRes=await cloudinaryInstance.uploader.upload(req.file.path)
         imageUrl=cloudinaryRes.url;
        //imageUrl=await handleImageUpload(req.file.path)
       }

    console.log(imageUrl,"===imagrUrl");
        
       

        const createCar = new Car({carName, carModel,transmission, carCompany,carPicture:imageUrl, carCategory,
            carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge,office:findlocation._id});
           
         
            const newCarCreated = await createCar.save();;
        if (!newCarCreated) {
          return res.send("car is not created");
        }
        //    const {id}=req.params;
        // const carExist = await Car.findById(id)
        // if(carExist)
        //   {
        //      return  res.status(400).json({error:"car already exist"})
        //   }
        
      res.json({message:"car is created",data:newCarCreated});
      
    }catch(error){
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "internal server error");
    }
};


 //get all cars
 export const getCars = async (req, res) => {
    try{
    const cars = await Car.find();
    res.json({message:"all cars fetched",data:cars});
    }catch(error){
    console.log(error);
    res.status(error.statusCode || 500).json(error.message || "internal server error");

}};
  


  //getcar by id
  export const getcarbyid = async(req, res, next)=>{
   try{
    const carID = req.params.id
    const car = await Car.findOne({_id:carID});
    res.json({message:" car details fetched",data:car});
    if(!car){
        return next(new ErrorHandler(`Car doesn't exist`, 400))
    }
   
}catch(error){
    console.log(error);
    res.status(error.statusCode || 500).json(error.message || "internal server error");
}};


//getcarby officelocation ref:pfficelocation
 
  export const getcarbylocation=async  (req,res)=>{
    const officeLocation= req.params.city
    console.log(officeLocation)
    console.log(officeLocation)
    try {
      if (typeof officeLocation !== 'string') {
        throw new Error(`officeLocation is not a string: ${typeof officeLocation}`);
      }
      const offices = await OfficeLocation.find({ city: officeLocation });
      
      const officeIds = offices.map(office => office._id);
      console.log(officeIds)
  
      const cars = await Car.find({ office: { $in: officeIds } }).populate('office');
  
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cars', error });
    }
  };
  




    //update 
    export const updateCar = async (req, res) => {
      try {
          const id = req.params.id;
          const { carName, carModel, transmission, carCompany, carCategory, carEngine, carMileage, carFuelType, rentalPriceCharge } = req.body;
  
          let imageUrl = null;
  
          // Handle image upload if file exists
          if (req.file) {
              const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
              imageUrl = cloudinaryRes.url;
          }
  
          // Update car details
          const updatedCar = await Car.findByIdAndUpdate(
              { _id: id },
              {
                  carName,
                  carModel,
                  transmission,
                  carCompany,
                  carCategory,
                  carEngine,
                  carMileage,
                  carFuelType,
                  rentalPriceCharge,
                  ...(imageUrl && { carPicture: imageUrl }),
              },
              { new: true }
          );
  
          if (!updatedCar) {
              return res.status(404).json({ message: "Car not found or update failed" });
          }
  
          res.status(200).json({ message: "Car updated successfully", data: updatedCar });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error", error });
      }
  };
// export const updateCar = async (req, res) => {
//   const id = req.params.id;
//     console.log("updated")
//   console.log(id)
//       const body = req.body;
//       console.log(body, "body");
//       let imageUrl;
//       // const { city } = office;
//   const {carName, carModel,transmission, carCompany,carPicture,carCategory,carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge,office}=req.body;
//   // const findlocation = await OfficeLocation.findOne({ city:office });
//   // console.log(findlocation)
//   //         if (!findlocation) {
//   //           return res.send("please add instructor first");
//   //         }
//   // console.log('image====',req.file);

//   if(req.file){
//     const cloudinaryRes=await cloudinaryInstance.uploader.upload(req.file.path)
//     imageUrl=cloudinaryRes.url;
//    //imageUrl=await handleImageUpload(req.file.path)
//   }

// console.log(imageUrl,"===imagrUrl");  
//   const updatedCar = await Car.findByIdAndUpdate(
//       { _id: id },
//       { carName, carModel,transmission, carCompany,carPicture:imageUrl, carCategory,carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge},
//       {
//         new: true,
//       }
//     );
  
//     if (!updatedCar) {
//       return res.send("Car is not updated");
//     }
//     console.log(updatedCar);
//     return res.send({data:updatedCar,message:"car is updated"});
    
//  };


  //delete

  export const deleteCar = async (req, res) => {
    const id = req.params.id;
    console.log("deleted")
    const deleteId = await Car.deleteOne({ _id: id });
    if (!deleteId) {
      return res.send("not deleted");
    }
    return res.send({data:deleteId,message:"car is deleted"});
  };

