const mongoose =require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    First_Name: {
        type: String,
        required: true,
      },
      Email:{
        type: String,
        required: true,
      },
      Phone:{
        type: Number,
        required: true,
      },
      UserType:{
        type: String,
        required: true,
      },
      Password: {
        type: String,
        required:  true,
      },
      Send_Mail: {
        type: Boolean,
        required:  true,
      },
      
    
})
module.exports=mongoose.model("users",userSchema);