import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import DbConnection from "./Middleware/DbConnection";
import JuiceItemSchema from "./Schema/JuiceItemSchema";
import ItemRatings from "./Schema/ItemRating";
import TopSearchSchema from "./Schema/NumberOfSearch";
const cloudinary = require("cloudinary").v2;
let CLOUDNAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
let CLOUDAPIKEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
let CLOUDAPISECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
// cloudnairy Configuration
cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: CLOUDAPIKEY,
  api_secret: CLOUDAPISECRET,
});
export default async function DeleteJuiceItem(req, res) {
  if (req.method == "DELETE") {
    try {
      DbConnection();
      let verify = await VerifyAdmin(req, res);
      if (verify == undefined) {
        return res
          .status(401)
          .json({ message: "Please login with admin credentails" });
      }
      let _id = req.body._id;

      // not get id
      if (!_id) {
        return res
          .status(400)
          .json({ message: "Please Provide Id", status: "400" });
      }

      // match weather same Food name is not entered
      let match = await JuiceItemSchema.findById(_id);

      if (match) {
        let ImageToDelete = match.ImageName;

        await cloudinary.uploader.destroy(
          ImageToDelete,
          function (error, result) {
            if (error) {
              return res
                .status(400)
                .json({ message: "Please Try Again", status: "400" });
            }
          }
        );
        await JuiceItemSchema.findByIdAndDelete(_id);
        await ItemRatings.findOneAndDelete({ ProductId: _id });
        await TopSearchSchema.findOneAndDelete({ ItemName: match.JuiceName });

        return res
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
