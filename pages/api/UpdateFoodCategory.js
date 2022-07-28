import DbConnection from "../Middleware/DbConnection";
import FoodCategory from "../Schema/FoodCategorySchema";

export default async function AddFoodCategory(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
      let _id = req.body._id;
      let FoodCategoryName = req.body.FoodCategoryName;
      // // not get id
      if (!_id) {
        return res
          .status(400)
          .json({ message: "Not Match With This Id", status: "400" });
      }
      //    not get food name
      if (!FoodCategoryName) {
        return res
          .status(400)
          .json({ message: "Please Enter Food Category Name", status: "400" });
      }
    
      let match = await FoodCategory.find();
let IdMatching=await FoodCategory.findById(_id);


// id not exits in database
if(!IdMatching){
      res.status(400).json({ message: 'This Id Is Not Present In DataBase', status: "400" });
}
// same name not send
if(IdMatching.FoodCategoryName==FoodCategoryName){
return res.status(400).json({ message: 'Please Enter New Food Category Name Not Same Food Name', status: "400" });
}

  // same category name not dublicate
for(let i=0;i<match.length;i++){

if(match[i].FoodCategoryName==FoodCategoryName){
 return res.status(400).json({ message: 'This Food Category Is Already Exits', status: "400" });
}
else{
await FoodCategory.findByIdAndUpdate(_id, {
          FoodCategoryName: FoodCategoryName,
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


