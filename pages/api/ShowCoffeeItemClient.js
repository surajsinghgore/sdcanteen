import DbConnection from "./Middleware/DbConnection";
import CoffeeItemSchema from "./Schema/CoffeeItemSchema";

export default async function ShowCoffeeItemClient(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      let data = await CoffeeItemSchema.find({Active:"ON"}).select('-createdAt -updatedAt');

      res.status(201).json({ status: "201",data });
    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
