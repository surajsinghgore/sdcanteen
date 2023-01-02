import DbConnection from "./Middleware/DbConnection";
import JuiceItemSchema from "./Schema/JuiceItemSchema";

export default async function ShowJuiceItemById(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
         let id=req.query.id;
      let data = await JuiceItemSchema.findById(id).select('-createdAt -updatedAt');
      res.status(201).json({ data, status: "201" });
    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
