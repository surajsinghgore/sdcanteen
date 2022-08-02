import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import DbConnection from "./Middleware/DbConnection";
import DrinkItemSchema from "./Schema/DrinkItemSchema";
var fs = require("fs");

export default async function DeleteDrinkItem(req, res) {
  if (req.method == "DELETE") {
    try {
      DbConnection();
      await VerifyAdmin(req, res);

      let _id = req.body._id;
      let imagePath = req.body.imagePath;
      var filePath = `./public/DrinkItemImages/${imagePath}`;

      // not get id
      if (!_id) {
        return res
          .status(400)
          .json({ message: "Please Provide Id", status: "400" });
      }
      if (!imagePath) {
        return res
          .status(400)
          .json({ message: "Please Provide Image", status: "400" });
      }

      // match weather same Food name is not entered
      let match = await DrinkItemSchema.findById(_id);

      if (match) {
        await DrinkItemSchema.findByIdAndDelete(_id);
        await fs.unlinkSync(filePath);
        res
          .status(201)
          .json({ message: "successfully Deleted", status: "201" });
      } else {
        res.status(400).json({
          message: "Sorry This Id Is Not Match In Database",
          status: "400",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
