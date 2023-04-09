import DbConnection from "./Middleware/DbConnection";
import FoodItemSchema from "./Schema/FoodItemSchema";

export default async function ShowFoodItemById(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      let id=req.query.id;
      let data = await FoodItemSchema.findById(id).select('-createdAt -updatedAt');
      return res.status(201).json({ data, status: "201" });
    } catch (error) {
    console.log(error)
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
