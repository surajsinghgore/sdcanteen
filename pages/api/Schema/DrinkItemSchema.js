import mongoose from "mongoose";
const Prices = new mongoose.Schema({
  sizeName: { type: String, required: true ,lowercase:true},
  Price: { type: Number, required: true }
});


const AddDrinkSchema = new mongoose.Schema(
  {
    DrinkName: {
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
    },
    Image: {
      type: String,
    },
      ImageName:{
      type: String,
    
    },
  },
  { timestamps: true }
);
mongoose.models = {};

const DrinkItemSchema =
  mongoose.models.DrinkItems || mongoose.model("DrinkItems", AddDrinkSchema);
export default DrinkItemSchema;
