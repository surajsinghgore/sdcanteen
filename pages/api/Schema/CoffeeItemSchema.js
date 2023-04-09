import mongoose from "mongoose";
const Prices = new mongoose.Schema({
  sizeName: { type: String, required: true ,lowercase:true},
  Price: { type: Number, required: true }
});


const AddCoffeeSchema = new mongoose.Schema(
  {
    CoffeeName: {
      type: String, trim:true,
      required: true,
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

const CoffeeItemSchema =
  mongoose.models.CoffeeItems || mongoose.model("CoffeeItems", AddCoffeeSchema);
export default CoffeeItemSchema;
