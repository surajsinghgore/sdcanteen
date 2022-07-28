

import DbConnection from '../Middleware/DbConnection';
import DrinkCategorySchema from '../Schema/DrinksCategorySchema';

export default async function  AddDrinkCategory(req,res) {


if(req.method=='POST'){
try {
DbConnection();
   let DrinkCategoryName=req.body.DrinkCategoryName;
    if(!DrinkCategoryName){
res.status(402).json({message:'Please Enter Drink Category Name',status:"402"})
    
    }
    // matching dublicate problem
    let match=await DrinkCategorySchema.findOne({DrinkCategoryName:DrinkCategoryName});
    if(match){
    return res.status(400).json({message:"This Drink Category Name Is Already Exits",status:"400"});
    }
const data=new DrinkCategorySchema({
DrinkCategoryName:DrinkCategoryName
})
// save data to database
await data.save();
res.status(201).json({message:"succesully added",status:"201"})
} catch (error) {
 res.status(501).json({message:error,status:'501'})

}
}
}
