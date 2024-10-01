import mongoose from 'mongoose'
export const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://athiraazhakeshan:xpATODwzBC6a4UR4@cluster0.18d1l.mongodb.net/CAR_RENTAL_WEBSITE');
        console.log('db connected successfully');
    } catch (error) {
        console.log(error);
        
    }
}