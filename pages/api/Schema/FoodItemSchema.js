import mongoose from "mongoose";

const AddFoodSchema = new mongoose.Schema(
  {
    FoodName: {
      type: String,
      required: true, trim:true
    },
    Price: {
      type: Number,
      required: true,
    },
    Qty: {
      type: String,
      default: "1",
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

const FoodItemSchema =
  mongoose.models.FoodItems || mongoose.model("FoodItems", AddFoodSchema);
export default FoodItemSchema;
