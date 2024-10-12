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
role: {
    type: String,
    enum: [ 'owner','admin'],
    default: 'admin'
}

} );
    const adminModel = mongoose.model('adminModel', adminSchema);
    export default adminModel;