import mongoose from "mongoose";

const OrderOnOffStatusSchema = new mongoose.Schema(
  {
    Status: {
      type: String,
      required: true, 
      trim:true,
      lowercase:true
    }
  },
  { timestamps: true }
);
mongoose.models = {};

const OrderOnOffStatus =
  mongoose.models.OrderOnOffStatus || mongoose.model("OrderOnOffStatus", OrderOnOffStatusSchema);


export default OrderOnOffStatus;
