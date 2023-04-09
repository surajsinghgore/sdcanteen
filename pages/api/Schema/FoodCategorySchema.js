import mongoose from "mongoose";

const AddFoodSchema = new mongoose.Schema(
  {
    FoodCategoryName: {
      type: String, trim:true,
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.models = {};

const FoodCategory =
  mongoose.models.FoodCategory || mongoose.model("FoodCategory", AddFoodSchema);
export default FoodCategory;
