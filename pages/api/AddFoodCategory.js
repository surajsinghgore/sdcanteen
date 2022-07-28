

import DbConnection from '../Middleware/DbConnection';
import FoodCategory from '../Schema/FoodCategorySchema';

export default async function  AddFoodCategory(req,res) {


if(req.method=='POST'){
try {
DbConnection();
   let foodName=req.body.FoodCategoryName;
    if(!foodName){
res.status(402).json({message:'Please Enter Food Category Name',status:"402"})
    
    }
    // matching dublicate problem
    let match=await FoodCategory.findOne({FoodCategoryName:foodName});
    if(match){
    return res.status(400).json({message:"This Food Category Name Is Already Exits",status:"400"});
    }
const data=new FoodCategory({
FoodCategoryName:foodName
})
// save data to database
await data.save();
res.status(201).json({message:"succesully added",status:"201"})
} catch (error) {
 res.status(501).json({message:error,status:'501'})

}

}




}
