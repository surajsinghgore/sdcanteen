import mongoose from "mongoose";

const ClientData = new mongoose.Schema(
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
      Profile: {
      type: String,
    
    },
      Password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.models = {};


const ClientDatas =
  mongoose.models.ClientData ||
  mongoose.model("ClientData", ClientData);
export default ClientDatas;
