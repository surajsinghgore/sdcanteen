import DbConnection from "./Middleware/DbConnection";
import CoffeeCategorySchema from "./Schema/CoffeeCategorySchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";

export default async function DeleteCoffeeCategory(req, res) {
  if (req.method == "DELETE") {
    try {
      DbConnection();
     let verify=await VerifyAdmin(req, res);
 if(verify==undefined){

    return res.status(401).json({ message: "Please login with admin credentails" });
    }

      let _id = req.body._id;

      // not get id
      if (!_id) {
        return res
          .status(400)
          .json({ message: "Not Match With This Id", status: "400" });
      }

      // match weather same Food name is not entered
      let match = await CoffeeCategorySchema.findById(_id);

      if (match) {
        await CoffeeCategorySchema.findByIdAndDelete(_id);
        res
          .status(201)
          .json({ message: "successfully Deleted", status: "201" });
      } else {
        res
          .status(400)
          .json({
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
