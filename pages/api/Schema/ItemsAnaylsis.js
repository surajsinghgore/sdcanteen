import mongoose from "mongoose";

const ItemReviwers = new mongoose.Schema({
  Rate: { type: String, required: true },
  userName: { type: String, required: true ,lowercase:true},
  userId: { type: mongoose.Schema.Types.ObjectId,
      ref: "ClientData",
      required: true,},
  Message:{ type: String ,required:true,lowercase:true},
  QualityRate: { type: String, required: true },
  ServiceRate: { type: String, required: true },
  PriceRate: { type: String, required: true },
});


const anaylsisItems = new mongoose.Schema(
  {
  
   ProductId: {
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

const ItemRatings =
  mongoose.models.anaylsisItems || mongoose.model("anaylsisItems", anaylsisItems);

export default ItemRatings;
