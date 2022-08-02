import DbConnection from "./Middleware/DbConnection";
import CoffeeItemSchema from "./Schema/CoffeeItemSchema";

export default async function ShowCoffeeItem(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      let data = await CoffeeItemSchema.find();
      res.status(201).json({ data, status: "201" });
    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
