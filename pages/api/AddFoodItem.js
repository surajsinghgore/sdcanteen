import DbConnection from '../Middleware/DbConnection';
import FoodItemSchema from '../Schema/FoodItemSchema';


export default async function AddFoodItem(req,res) {
 

if(req.method=='POST'){
try {
DbConnection();
  let FoodName=req.body.FoodName;
  let Price=req.body.Price;
  let Qty=req.body.Qty;
  let Category=req.body.Category;
  let Image=req.body.Image;

if(!FoodName){
res.status(400).json({message:"Please Enter FoodName"})
}
else if(!Price){
res.status(400).json({message:"Please Enter Price"})
}
else if(!Image){
res.status(400).json({message:"Please Enter Image"})
}
let newData=new FoodItemSchema({
 FoodName,
 Price,
 Qty,
 Category,
 Image,
})


await newData.save();
res.status(201).json({message:"success",status:"201"})
} catch (error) {
 res.status(501).json({message:error,status:'501'})

}

}

}
