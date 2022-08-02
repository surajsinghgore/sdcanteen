import VerifyAdmin from './Middleware/MiddlewareAdminVerify';
import DbConnection from './Middleware/DbConnection';
import CoffeeCategorySchema from './Schema/CoffeeCategorySchema';

export default async function  AddCoffeeCategory(req,res) {


if(req.method=='POST'){
try {
DbConnection();
await VerifyAdmin(req,res)
   let CoffeeCategoryName=req.body.CoffeeCategoryName;
    if(!CoffeeCategoryName){
res.status(402).json({message:'Please Enter Coffee Category Name',status:"402"})
    
    }
    // matching dublicate problem
    let match=await CoffeeCategorySchema.findOne({CoffeeCategoryName:CoffeeCategoryName});
    if(match){
    return res.status(400).json({message:"This Coffee Category Name Is Already Exits",status:"400"});
    }
const data=new CoffeeCategorySchema({
CoffeeCategoryName:CoffeeCategoryName
})
// save data to database
await data.save();
res.status(201).json({message:"succesully added",status:"201"})
} catch (error) {
 res.status(501).json({message:error,status:'501'})

}
}
}
