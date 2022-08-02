import mongoose from "mongoose";

const AddCoffeeSchema = new mongoose.Schema(
  {
    CoffeeName: {
      type: String,
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
      type: String,
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
