import mongoose from "mongoose";

const ItemReviwers = new mongoose.Schema({
  userName: { type: String, required: true ,lowercase:true},
  Rate: { type: String, required: true },
  Message:{ type: String ,required:true,lowercase:true}
});


const anaylsisItems = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
Rating:{
type: String,
required: true,
},
NumberOfOrders:{
type:Number,
required:true
},
  ItemsReviwes: [ItemReviwers],
  },
  { timestamps: true }
);

mongoose.models = {};

const OrderSchemaDataBase =
  mongoose.models.anaylsisItems || mongoose.model("anaylsisItems", anaylsisItems);

export default OrderSchemaDataBase;
