import DbConnection from "../Middleware/DbConnection";
import DrinkCategorySchema from "../Schema/DrinksCategorySchema";

export default async function UpdateDrinksCategory(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
      let _id = req.body._id;
      let DrinkCategoryName = req.body.DrinkCategoryName;

      // not get id
      if (!_id) {
        return res
          .status(400)
          .json({ message: "Not Match With This Id", status: "400" });
      }
      //    not get food name
      if (!DrinkCategoryName) {
        return res
          .status(400)
          .json({ message: "Please Enter Drinks Category Name", status: "400" });
      }
      let match = await DrinkCategorySchema.find();
let IdMatching=await DrinkCategorySchema.findById(_id);


// id not exits in database
if(!IdMatching){
      res.status(400).json({ message: 'This Id Is Not Present In DataBase', status: "400" });
}
// same name not send
if(IdMatching.DrinkCategoryName==DrinkCategoryName){
return res.status(400).json({ message: 'Please Enter New Drink Category Name Not Same Drink Name', status: "400" });
}

  // same category name not dublicate
for(let i=0;i<match.length;i++){

if(match[i].DrinkCategoryName==DrinkCategoryName){
 return res.status(400).json({ message: 'This Drink Category Is Already Exits', status: "400" });
}
else{
await DrinkCategorySchema.findByIdAndUpdate(_id, {
          DrinkCategoryName: DrinkCategoryName,
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
