import mongoose from "mongoose";

const ClientRegistration = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
    },
      Age: {
      type: Number,
      required: true,
    },
      Email: {
      type: String,
      required: true,
    },
      Mobile: {
      type: Number,
      required: true,
    },
      Gender: {
      type: String,
      required: true,
    },
      FullAddress: {
      type: String,
      required: true,
    },
      Password: {
      type: String,
      required: true,
    },
    Verify:{
    type:Boolean,
    default: false,
    },
    Otp:{
    type:Number,
    }
  },
  { timestamps: true }
);
mongoose.models = {};

const ClientRegistrationTemporary =
  mongoose.models.ClientRegistrationTemp ||
  mongoose.model("ClientRegistrationTemp", ClientRegistration);


export default ClientRegistrationTemporary;
