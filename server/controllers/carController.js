import Car from "../models/carModel.js";




//createcar

export const createCar = async (req, res) => {
    try {

      const { carName, carModel,transmission, carCompany, carPicture,carCategory,
        carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge } = req.body;
        //const carPicture=req.body
        console.log('image====',req.file);

        console.log('carName:', carName);
        console.log('carModel:', carModel);
        console.log('transmission:', transmission);
        console.log('carCompany:', carCompany);
        console.log('carPicture:', carPicture);
        console.log('carCategory:', carCategory);
        console.log('carEngine:', carEngine);
        console.log('carMileage:', carMileage);
        console.log('carSeatCapacity:', carSeatCapacity);
        console.log('carFuelType:', carFuelType);
        console.log('rentalPriceCharge:', rentalPriceCharge);
    
        
       

        const createCar = new Car({carName, carModel,transmission, carCompany,carPicture, carCategory,
            carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge});
           
        
            const newCarCreated = await createCar.save();;
        if (!newCarCreated) {
          return res.send("car is not created");
        }
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
  console.log("hitt")
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
    return res.send(updatedCar);
 };


  //delete

  export const deleteCar = async (req, res) => {
    const id = req.params.id;
    console.log("hitted")
    const deleteId = await Car.deleteOne({ _id: id });
    if (!deleteId) {
      return res.send("not deleted");
    }
    res.send("deleted car");
  };

