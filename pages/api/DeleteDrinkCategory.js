
import DbConnection from '../Middleware/DbConnection';
import DrinkCategorySchema from '../Schema/DrinksCategorySchema';

import VerifyAdmin from './MiddlewareAdminVerify';

export default async function  DeleteDrinkCategory(req,res) {


if(req.method=='DELETE'){
try {
DbConnection();
await VerifyAdmin(req,res)
let _id=req.body._id;


// not get id
if(!_id){
 return res.status(400).json({message:'Not Match With This Id',status:'400'})

}

// match weather same Food name is not entered 
     let match=await DrinkCategorySchema.findById(_id)

    if(match){
        await DrinkCategorySchema.findByIdAndDelete(_id);
 res.status(201).json({message:"successfully Deleted",status:"201"})
    }
    else{
 res.status(400).json({message:"Sorry This Id Is Not Match In Database",status:"400"})
    }
} catch (error) {
console.log(error)
 res.status(501).json({message:error,status:'501'})

}


}

}