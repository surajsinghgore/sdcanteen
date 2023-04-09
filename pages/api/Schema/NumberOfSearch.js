import mongoose from "mongoose";

const NumberOfSearch = new mongoose.Schema(
  {
    ItemName: {
      type: String,
      required: true,
    },
    NumberOfSearch: {
      type: Number,
      default:1
    }
}
)

const TopSearchSchema =
  mongoose.models.TopSearch || mongoose.model("TopSearch", NumberOfSearch);
export default TopSearchSchema;
