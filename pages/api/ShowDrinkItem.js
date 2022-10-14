import DbConnection from "./Middleware/DbConnection";
import DrinkItemSchema from "./Schema/DrinkItemSchema";

export default async function ShowDrinkItem(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      let data = await DrinkItemSchema.find().select('-createdAt -updatedAt');
      let dataClient = await DrinkItemSchema.find({Active:"ON"}).select('-createdAt -updatedAt');
      res.status(201).json({ data, status: "201" ,dataClient});
    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
