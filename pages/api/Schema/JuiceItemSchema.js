import mongoose from "mongoose";

const AddJuiceSchema = new mongoose.Schema(
  {
    JuiceName: {
      type: String,
      required: true, trim:true
    },
    Price: {
      type: Number,
      required: true,
    },
    Qty: {
      type: String,
    },
    Category: {
      type: String, trim:true
    },
    Description: {
      type: String,
      required: true
    },
    Image: {
      type: String,
    },
  },
  { timestamps: true }
);
mongoose.models = {};

const JuiceItemSchema =
  mongoose.models.JuiceItems || mongoose.model("JuiceItems", AddJuiceSchema);
export default JuiceItemSchema;
