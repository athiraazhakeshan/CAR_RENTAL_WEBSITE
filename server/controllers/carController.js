import { cloudinaryInstance } from "../config/cloudinary.js";
import Car from "../models/carModel.js";
import { handleImageUpload } from "../util/imageupload.js";




//createcar

export const createCar = async (req, res) => {
    try {



      let imageUrl;
      const { carName, carModel,transmission, carCompany,carPicture,carCategory,
        carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge } = req.body;
   
        console.log('image====',req.file);

       if(req.file){
         const cloudinaryRes=await cloudinaryInstance.uploader.upload(req.file.path)
         imageUrl=cloudinaryRes.url;
        //imageUrl=await handleImageUpload(req.file.path)
       }

    console.log(imageUrl,"===imagrUrl");
        
       

        const createCar = new Car({carName, carModel,transmission, carCompany,carPicture:imageUrl, carCategory,
            carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge});
           
        
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



    //update 
  
export const updateCar = async (req, res) => {
    const id = req.params.id
    console.log("updated")
  console.log(id)
      const body = req.body;
      console.log(body, "body");
  const {carName, carModel,transmission, carCompany,carCategory,carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge}=req.body;
    const updatedCar = await Car.findOneAndUpdate(
      { _id: id },
      { carName, carModel,transmission, carCompany, carCategory,carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge },
      {
        new: true,
      }
    );
  
    if (!updatedCar) {
      return res.send("Car is not updated");
    }
    console.log(updatedCar);
    return res.send({data:updatedCar,message:"car is updated"});
    
 };


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

