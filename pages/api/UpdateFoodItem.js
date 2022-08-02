import DbConnection from './Middleware/DbConnection';
import FoodItemSchema from './Schema/FoodItemSchema';
import VerifyAdmin from './Middleware/MiddlewareAdminVerify';
export default async function AddFoodCategory(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
await VerifyAdmin(req,res)

  let _id = req.body._id;
let FoodName=req.body.FoodName;
let Price=req.body.Price;
let Qty=req.body.Qty;
let Category=req.body.Category;

if(!_id){
res.status(400).json({message:"Please Provide Id"});
}
else if(!FoodName){
res.status(400).json({message:"Please Enter Food Name"});
}
else if(!Price){
res.status(400).json({message:"Please Enter Price Of Item"});
}


 let ress=await FoodItemSchema.findByIdAndUpdate(_id,{ FoodName:FoodName,Price:Price ,Qty,Category:Category});
if(ress){
res.status(201).json({ress,status:"201"})
}
} catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }

}



