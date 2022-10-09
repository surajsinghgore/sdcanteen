import DbConnection from "./Middleware/DbConnection";
import JuiceCategorySchema from "./Schema/JuicesCategorySchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
export default async function UpdateJuiceCategory(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
 
let verify=await VerifyAdmin(req, res);
 if(verify==undefined){

    return res.status(401).json({ message: "Please login with admin credentails" });
    }

      let _id = req.body._id;
      let JuiceCategoryName = req.body.JuiceCategoryName;

      if (!_id) {
        return res
          .status(400)
          .json({ message: "Not Match With This Id", status: "400" });
      }
      //    not get food name
      if (!JuiceCategoryName) {
        return res
          .status(400)
          .json({ message: "Please Enter Juice Category Name", status: "400" });
      }

      let match = await JuiceCategorySchema.find();

      let IdMatching = await JuiceCategorySchema.findById(_id);
      // id not exits in database
      if (!IdMatching) {
        res
          .status(400)
          .json({
            message: "This Id Is Not Present In DataBase",
            status: "400",
          });
      }
      // same name not send
      if (IdMatching.JuiceCategoryName == JuiceCategoryName) {
        return res
          .status(400)
          .json({
            message: "Please Enter New Juice Category Name Not Same Juice Name",
            status: "400",
          });
      }
      // same category name not dublicate
      let state = true;

      for (let i = 0; i < match.length; i++) {
        if (match[i].JuiceCategoryName == JuiceCategoryName) {
          state = false;
          res
            .status(400)
            .json({
              message: "This Juice Category Is Already Exits",
              status: "400",
            });
        }
      }

      if (state) {
        // successfully send
        await JuiceCategorySchema.findByIdAndUpdate(_id, {
          JuiceCategoryName: JuiceCategoryName,
        });
        res
          .status(201)
          .json({ message: "Successfully Updated", status: "201" });
      }
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
