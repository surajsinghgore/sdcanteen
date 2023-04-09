import mongoose from "mongoose";
const Prices = new mongoose.Schema({
  sizeName: { type: String, required: true ,lowercase:true},
  Price: { type: Number, required: true }
});


const AddFoodSchema = new mongoose.Schema(
  {
    FoodName: {
      type: String,
      required: true, trim:true
    },
   Qty: {
      type: String,
      default:'1'
    },
    Category: {
      type: String, trim:true,
      required:true
    },
     Active:{
    type:String,
    required:true,
    },
     ItemCost: [Prices],
    Description: {
      type: String,
      required: true
    },  ImageName:{
      type: String,
    
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
