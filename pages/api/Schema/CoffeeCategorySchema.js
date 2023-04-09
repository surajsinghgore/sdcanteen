import mongoose from "mongoose";

const AddCoffeeCategorySchema = new mongoose.Schema(
  {
    CoffeeCategoryName: {
      type: String,
      required: true, trim:true
    },
  },
  { timestamps: true }
);
mongoose.models = {};

const CoffeeCategorySchema =
  mongoose.models.CoffeeCategory ||
  mongoose.model("CoffeeCategory", AddCoffeeCategorySchema);
export default CoffeeCategorySchema;
