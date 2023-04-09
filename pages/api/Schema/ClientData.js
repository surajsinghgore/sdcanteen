import mongoose from "mongoose";

const ClientData = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
      trim:true
    },
      Age: {
      type: Number,
      required: true,
    },
      Email: 
      {
       type: String, require: true, index:true, unique:true,
       trim:true, 
    },
      Mobile: {
      type: Number,
      required: true, trim:true
    },
      Gender: {
      type: String,
      required: true
    },
      FullAddress: {
      type: String,
      required: true, trim:true
    },
      Profile: {
      type: String,
    
    },
    ProfileName:{
      type: String,
    
    },
      Password: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);
mongoose.models = {};


const ClientDatas =
  mongoose.models.ClientData ||
  mongoose.model("ClientData", ClientData);
export default ClientDatas;
