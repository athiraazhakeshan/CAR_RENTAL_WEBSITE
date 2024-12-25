import OfficeLocation from "../models/officelocationModel.js";

//add an ofice
export const addOffice = async (req, res) => {
    try {
      console.log("hitted");
      
        const body = req.body;
   
        console.log(body, "body");
  
        const { email,address,city,state,country,pin,contact } = body;
          
                 
        const createOffice = new OfficeLocation({
            email,address,city,state,country,pin,contact
        });
        
        
        const newCarCreated = await createOffice.save();
        if (!newCarCreated) {
          return res.send("office is not created");
        }
        return res.send(newCarCreated);
      
    } catch (error) {
      console.log("something went wrong", error);
      res.send("failed to create office");
    }
}

  //get all office
  export const getAllOffice = async (req, res) => {
    const office = await OfficeLocation.find();
    res.send(office);
  };
  //get an office by id
  export const getofficebyid = async(req, res, next)=>{

    const officeID = req.params.id
    const office = await OfficeLocation.find({_id:officeID});

    if(!office){
        return next(new ErrorHandler(`Office doesn't exist`, 400))
    }
return res.send(office);
   
}
  //get an by location


  // Get office by location
  export const getOfficebylocation = async (req, res) => {
    try {
      const officelocation = req.params.city;
      console.log(`Requested office location: ${officelocation}`);
  
      const office = await OfficeLocation.find({ city: officelocation });
      console.log(`Office data retrieved from database: ${JSON.stringify(office)}`);
  
      if (!office || office.length === 0) {
        console.log("No office found for the specified location.");
        return res.status(404).json({ success: false, message: "No office found." });
      }
  
      return res.status(200).json({
        success: true,
        message: "Office Found.",
        office,
      });
    } catch (error) {
      console.error("Error fetching office:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  };
  


//update location
export const updateOffice = async (req, res) => {
    const id = req.params.id;
  console.log("hitt")
  console.log(id)
  const {email,address,city,state,country,pin,contact }=req.body;
    const updatedoffice = await OfficeLocation.findOneAndUpdate(
      { _id: id },
      { email,address,city,state,country,pin,contact  },
      {
        new: true,
      }
    );
  
    if (!updatedoffice) {
      return res.send("office is not updated");
    }
    console.log(updatedoffice);
    return res.send(updatedoffice);
  };
  //delete location
  export const deleteOffice = async (req, res) => {
    const id = req.params.id;
    const deleteId = await OfficeLocation.deleteOne({ _id: id });
    if (!deleteId) {
      return res.send("not deleted");
    }
    res.send("deleted Office");
  };
