import mongoose from "mongoose";

const ForgetPassword = new mongoose.Schema(
  {
    EmailId: {
      type: String,
      required: true, 
    },
    Otp:{
    type:Number,
    
    }
  },
  { timestamps: true }
);
mongoose.models = {};

const ForgetPasswordSchema =
  mongoose.models.ForgetPasswords ||
  mongoose.model("ForgetPasswords", ForgetPassword);
export default ForgetPasswordSchema;
