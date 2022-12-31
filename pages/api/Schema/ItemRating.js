import mongoose from "mongoose";

const ItemRates = new mongoose.Schema({
  OverAllRate: { type: String, required: true },
  userName: { type: String, required: true, lowercase: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  ref: "clientdata",
    required: true,
  },
  Message: { type: String, lowercase: true },
  QualityRate: { type: String, required: true },
  ServiceRate: { type: String, required: true },
  PriceRate: { type: String, required: true },
  Time: {type:String,required:true},
  CDate:{
      type: Number,
      required: true,
    },
  CMonth:{
      type: Number,
      required: true,
    },
  CYear:{
      type: Number,
      required: true,
    },
  CHours:{
      type: Number,
      required: true,
    },
  CMins:{
      type: Number,
      required: true,
    },
  LocalString:{
      type: String,
      required: true,
    },
  Date:{type:String, required:true}
});

const ItemRating = new mongoose.Schema(
  {
    ProductId: {
      type: String,
      required: true,
    },

    Rating: {
      type: String,
      required: true,
    },
    NumberOfReviews: {
      type: Number,
      required: true,
    },
    ItemsReviwers: [ItemRates],
  }
);

mongoose.models = {};

const ItemRatings =
  mongoose.models.ItemRating || mongoose.model("ItemRating", ItemRating);

export default ItemRatings;
