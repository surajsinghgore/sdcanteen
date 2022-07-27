import DbConnection from '../Middleware/DbConnection';
import FoodCategory from '../Schema/FoodCategorySchema';


export default async function  AddFoodCategory(req,res) {


if(req.method=='POST'){
try {
DbConnection();
let _id=req.body._id;
let FoodCategoryName=req.body.FoodCategoryName;

// not get id
if(!_id){
 return res.status(400).json({message:'Not Match With This Id',status:'400'})

}
//    not get food name
if(!FoodCategoryName){
 return res.status(400).json({message:'Please Enter Food Category Name',status:'400'})
}
// match weather same Food name is not entered 
    let match=await FoodCategory.find({_id});
    if(match[0].FoodCategoryName==FoodCategoryName){
 res.status(400).json({message:"Please Enter New Food Name Not Current Food Name",status:"400"})
    }
    else{
      let data=await FoodCategory.findByIdAndUpdate(_id, { FoodCategoryName: FoodCategoryName });
 res.status(201).json({message:"Successfully Updated",status:"201"})
    }
  


} catch (error) {
console.log(error)
 res.status(501).json({message:error,status:'501'})

}






}


}