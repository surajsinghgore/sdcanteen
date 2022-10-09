import mongoose from "mongoose";

const AddCoffeeSchema = new mongoose.Schema(
  {
    CoffeeName: {
      type: String, trim:true,
      required: true,
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

const CoffeeItemSchema =
  mongoose.models.CoffeeItems || mongoose.model("CoffeeItems", AddCoffeeSchema);
export default CoffeeItemSchema;
