import mongoose from "mongoose";

const WebsiteCounterSchema = new mongoose.Schema(
  {
    Browser: {
      type: String,
      required: true, trim:true
    },
    HitFullDate: {
      type: String,
      required: true, 
    },
    HitFullTime: {
      type: String,
      required: true, 
    }
  },
  { timestamps: true }
);

const websiteCounter =
  mongoose.models.websiteCounter ||
  mongoose.model("websiteCounter", WebsiteCounterSchema);
export default websiteCounter;
