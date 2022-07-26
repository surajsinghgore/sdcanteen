
import DbConnection from '../Middleware/DbConnection';
import FoodCategory from '../Schema/FoodCategorySchema';


export default async function  DeleteFoodCategory(req,res) {


if(req.method=='DELETE'){
try {
DbConnection();
let _id=req.body.id;


// not get id
if(!_id){
 return res.status(400).json({message:'Not Match With This Id',status:'400'})

}

// match weather same Food name is not entered 
    let match=await FoodCategory.find({_id});
    if(!match){
 res.status(400).json({message:"Sorry Id Is Not Match In Database",status:"400"})
    }
    else{
      let data=await FoodCategory.findByIdAndDelete(_id);
 res.status(201).json({message:"successfully Deleted",status:"201"})
    }
} catch (error) {
console.log(error)
 res.status(501).json({message:error,status:'501'})

}






}


}