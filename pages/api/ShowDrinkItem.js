import DbConnection from "./Middleware/DbConnection";
import DrinkItemSchema from "./Schema/DrinkItemSchema";

export default async function ShowDrinkItem(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      let data = await DrinkItemSchema.find();
      res.status(201).json({ data, status: "201" });
    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
