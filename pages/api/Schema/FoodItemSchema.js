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
    },
    Category: {
      type: String, trim:true
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
