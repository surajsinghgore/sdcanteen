import DbConnection from "./Middleware/DbConnection";
import DrinkItemSchema from "./Schema/DrinkItemSchema";

export default async function ShowDrinkItemClient(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
       let data = await DrinkItemSchema.find({Active:"ON"}).select('-createdAt -updatedAt');
      res.status(201).json({status: "201" ,data});
    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
