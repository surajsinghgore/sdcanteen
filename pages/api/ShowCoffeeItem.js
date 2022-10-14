import DbConnection from "./Middleware/DbConnection";
import CoffeeItemSchema from "./Schema/CoffeeItemSchema";

export default async function ShowCoffeeItem(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      let data = await CoffeeItemSchema.find().select('-createdAt -updatedAt');
      let dataClient = await CoffeeItemSchema.find({Active:"ON"}).select('-createdAt -updatedAt');
      res.status(201).json({ data, status: "201",dataClient });
    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
