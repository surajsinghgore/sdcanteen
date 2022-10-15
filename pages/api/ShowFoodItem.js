import DbConnection from "./Middleware/DbConnection";
import FoodItemSchema from "./Schema/FoodItemSchema";

export default async function ShowFoodItem(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      let data = await FoodItemSchema.find().select('-createdAt -updatedAt');
      res.status(201).json({ data, status: "201" });
    } catch (error) {
    console.log(error)
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
