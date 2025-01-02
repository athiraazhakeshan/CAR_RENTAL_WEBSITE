import mongoose from 'mongoose';


const carSchema = new mongoose.Schema(
    {
        carName: {
            type: String,
            required: true,
        },                       
        carModel: {
            type: String,
            required: true,
        },
        carCompany: {
            type: String,
            required: true,
        },
        carPicture: {
            type:String,
             default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLGtEd0MJro4X9wDmT2vrvLT-HjKkyyWVmg&s"
    
        },
        carCategory: {
            type: String,
            required: true,
        },
        carEngine: {
            type: String,
            required: true,
        },
        transmission:{
            type:String,
            required:true,
        },
        carMileage: {
            type: String,
            required: true,
        },     
        carSeatCapacity: {
            type: Number,
            required: true,
        },
        carFuelType: {
            type: String,                                            
            required: true,
        },
       
        rentalPriceCharge: {
            type: Number,
            required: true,
        },
        // totalPrice: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Cart',
        //     },
        // ],
     office:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'OfficeLocation',required:true,
               }
     ]
    },
    {
        timeStamps: true,        
        toJSON: { virtuals: true },
    }
)

const Car = mongoose.model('Car', carSchema)

export default Car;