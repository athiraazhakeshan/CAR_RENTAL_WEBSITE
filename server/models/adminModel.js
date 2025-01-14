import mongoose from 'mongoose'
const adminSchema = new mongoose.Schema({

  
  email:{
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true


},
password:{
    type:String,
    required:true,
    minlength:8
},
profilePicture: {
    type:String,
     default:"https://st3.depositphotos.comhttps://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
},
contactNumber: {
    type: Number,
},
address: {
    type:String,
    default: ''
},
role: {
    type: String,
    enum: [ 'owner','admin'],
    default: 'admin'
}

} );
    const adminModel = mongoose.model('adminModel', adminSchema);
    export default adminModel;