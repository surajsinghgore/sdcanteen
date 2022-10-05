import mongoose from "mongoose";

// items Order Schema
const ItemsOrderSchema = new mongoose.Schema({
  ItemName: { type: String, required: true },
  Qty: { type: Number, required: true },
  ProductOriginalAmount: { type: Number, required: true },
  Amount: { type: Number, required: true },
  Category: { type: String },
  OrderStatus: { type: String, default: "Pending", required: true },
  AmountReceived: { type: Number, default: 0, required: true },
});
const OrderSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientData",
      required: true,
    },

    FullName: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      lowercase: true,
      required: true,
    },
    Mobile: {
      type: Number,
      required: true,
    },
    FullAddress: {
      type: String,
      lowercase: true,
      required: true,
    },
    PickUpTime: {
      type: String,
      required: true,
      lowercase: true,
    },
    OrderTime: {
      type: String,
      lowercase: true,
    },
    OrderDate: {
      type: String,
      lowercase: true,
    },
    PaymentMethod: {
      type: String,
      lowercase: true,
      required: true,
    },
    TotalAmount: { type: Number, required: true },
    OrderStatus: { type: String, default: "Pending", required: true },
    AmountReceived: { type: Number, default: 0, required: true },
    TokenNumber: {
      type: String,
      required: true,
      maxlength: 16,
      minlength: 16,
      lowercase: true,
    },
    TokenUser: {
      type: String,
      required: true,
      maxlength: 6,
      minlength: 6,
      lowercase: true,
    },
    ItemsOrder: [ItemsOrderSchema],
  },
  { timestamps: true }
);

mongoose.models = {};

const OrderSchemaDataBase =
  mongoose.models.OrderSchema || mongoose.model("OrderItems", OrderSchema);

export default OrderSchemaDataBase;
