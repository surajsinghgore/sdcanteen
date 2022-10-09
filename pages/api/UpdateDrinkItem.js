import DbConnection from "./Middleware/DbConnection";
import DrinkItemSchema from "./Schema/DrinkItemSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
export default async function UpdateDrinkItem(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
   let verify=await VerifyAdmin(req, res);
 if(verify==undefined){
    return res.status(401).json({ message: "Please login with admin credentails" });
    }

      let _id = req.body._id;
      let DrinkName = req.body.DrinkName;
      let Price = req.body.Price;
      let Qty = req.body.Qty;
      let Category = req.body.Category;
    let Description = req.body.Description;
      if (!_id) {
        res.status(400).json({ message: "Please Provide Id" });
      } else if (!DrinkName) {
        res.status(400).json({ message: "Please Enter Drink Name" });
      } else if (!Price) {
        res.status(400).json({ message: "Please Enter Price Of Item" });
      }
else if (!Description) {
        res.status(400).json({ message: "Please Enter Description Of Item" });
      }
      let ress = await DrinkItemSchema.findByIdAndUpdate(_id, {
        DrinkName: DrinkName,
        Price: Price,
        Qty,   Description,
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
