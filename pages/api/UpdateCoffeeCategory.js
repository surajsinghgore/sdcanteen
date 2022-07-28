import DbConnection from "../Middleware/DbConnection";
import CoffeeCategorySchema from "../Schema/CoffeeCategorySchema";

export default async function UpdateCoffeeCategory(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
      let _id = req.body._id;
      let CoffeeCategoryName = req.body.CoffeeCategoryName;

      // not get id
      if (!_id) {
        return res
          .status(400)
          .json({ message: "Not Match With This Id", status: "400" });
      }
      //    not get food name
      if (!CoffeeCategoryName) {
        return res
          .status(400)
          .json({ message: "Please Enter Coffee Category Name", status: "400" });
      }
      
      let match = await CoffeeCategorySchema.find();
let IdMatching=await CoffeeCategorySchema.findById(_id);


// id not exits in database
if(!IdMatching){
      res.status(400).json({ message: 'This Id Is Not Present In DataBase', status: "400" });
}
// same name not send
if(IdMatching.CoffeeCategoryName==CoffeeCategoryName){
return res.status(400).json({ message: 'Please Enter New Coffee Category Name Not Same Coffee Name', status: "400" });
}

  // same category name not dublicate
for(let i=0;i<match.length;i++){

if(match[i].CoffeeCategoryName==CoffeeCategoryName){
 return res.status(400).json({ message: 'This Coffee Category Is Already Exits', status: "400" });
}
else{
await CoffeeCategorySchema.findByIdAndUpdate(_id, {
          CoffeeCategoryName: CoffeeCategoryName,
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
