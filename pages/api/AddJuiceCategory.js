
import VerifyAdmin from './MiddlewareAdminVerify';

import DbConnection from '../Middleware/DbConnection';
import JuiceCategorySchema from '../Schema/JuicesCategorySchema';

export default async function  AddJuiceCategory(req,res) {


if(req.method=='POST'){
try {
DbConnection();await VerifyAdmin(req,res)
   let JuiceCategoryName=req.body.JuiceCategoryName;
    if(!JuiceCategoryName){
res.status(402).json({message:'Please Enter Juice Category Name',status:"402"})
    
    }
    // matching dublicate problem
    let match=await JuiceCategorySchema.findOne({JuiceCategoryName:JuiceCategoryName});
    if(match){
    return res.status(400).json({message:"This Juice Category Name Is Already Exits",status:"400"});
    }
const data=new JuiceCategorySchema({
JuiceCategoryName:JuiceCategoryName
})
// save data to database
await data.save();
res.status(201).json({message:"succesully added",status:"201"})
} catch (error) {
 res.status(501).json({message:error,status:'501'})

}
}
}
