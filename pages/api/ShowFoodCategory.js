import DbConnection from "./Middleware/DbConnection";
import FoodCategory from "./Schema/FoodCategorySchema";

export default async function ShowFoodCategory(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();

      let data = await FoodCategory.find();
      res.status(201).json({ data, status: "201" });
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
