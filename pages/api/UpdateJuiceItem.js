import DbConnection from "./Middleware/DbConnection";
import JuiceItemSchema from "./Schema/JuiceItemSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
export default async function UpdateJuiceItem(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
      await VerifyAdmin(req, res);

      let _id = req.body._id;
      let JuiceName = req.body.JuiceName;
      let Price = req.body.Price;
      let Qty = req.body.Qty;
      let Category = req.body.Category;

      if (!_id) {
        res.status(400).json({ message: "Please Provide Id" });
      } else if (!JuiceName) {
        res.status(400).json({ message: "Please Enter Juice Name" });
      } else if (!Price) {
        res.status(400).json({ message: "Please Enter Price Of Item" });
      }

      let ress = await JuiceItemSchema.findByIdAndUpdate(_id, {
        JuiceName: JuiceName,
        Price: Price,
        Qty,
        Category: Category,
      });
      if (ress) {
        res.status(201).json({ ress, status: "201" });
      }
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
