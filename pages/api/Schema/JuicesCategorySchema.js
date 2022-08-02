import mongoose from "mongoose";

const AddJuiceCategorySchema = new mongoose.Schema(
  {
    JuiceCategoryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.models = {};

const JuiceCategorySchema =
  mongoose.models.JuiceCategory ||
  mongoose.model("JuiceCategory", AddJuiceCategorySchema);
export default JuiceCategorySchema;
