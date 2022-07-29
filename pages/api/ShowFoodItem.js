import DbConnection from '../Middleware/DbConnection';
import FoodItemSchema from '../Schema/FoodItemSchema';


export default async function AddFoodItem(req,res) {
 

if(req.method=='GET'){
try {
DbConnection();

let data=await FoodItemSchema.find();
res.status(201).json({data,status:"201"})
} catch (error) {
 res.status(501).json({message:error,status:'501'})

}

}

}
