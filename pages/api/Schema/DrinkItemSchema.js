import mongoose from "mongoose";

const AddDrinkSchema = new mongoose.Schema(
  {
    DrinkName: {
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

const DrinkItemSchema =
  mongoose.models.DrinkItems || mongoose.model("DrinkItems", AddDrinkSchema);
export default DrinkItemSchema;
