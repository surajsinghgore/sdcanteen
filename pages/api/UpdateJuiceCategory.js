import DbConnection from "../Middleware/DbConnection";
import JuiceCategorySchema from "../Schema/JuicesCategorySchema";

export default async function UpdateJuiceCategory(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
      let _id = req.body._id;
      let JuiceCategoryName = req.body.JuiceCategoryName;

      // not get id
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
let IdMatching=await JuiceCategorySchema.findById(_id);


// id not exits in database
if(!IdMatching){
      res.status(400).json({ message: 'This Id Is Not Present In DataBase', status: "400" });
}
// same name not send
if(IdMatching.JuiceCategoryName==JuiceCategoryName){
return res.status(400).json({ message: 'Please Enter New Juice Category Name Not Same Juice Name', status: "400" });
}

  // same category name not dublicate
for(let i=0;i<match.length;i++){

if(match[i].JuiceCategoryName==JuiceCategoryName){
 return res.status(400).json({ message: 'This Juice Category Is Already Exits', status: "400" });
}
else{
await JuiceCategorySchema.findByIdAndUpdate(_id, {
          JuiceCategoryName: JuiceCategoryName,
        });
        res
          .status(201)
          .json({ message: "Successfully Updated", status: "201" });
}
}
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
