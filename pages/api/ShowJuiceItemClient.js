import DbConnection from "./Middleware/DbConnection";
import JuiceItemSchema from "./Schema/JuiceItemSchema";

export default async function ShowJuicesItem(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
           let data = await JuiceItemSchema.find({Active:"ON"}).select('-createdAt -updatedAt');
      res.status(201).json({ data, status: "201" });
    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
