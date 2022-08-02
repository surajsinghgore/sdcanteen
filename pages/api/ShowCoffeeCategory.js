
import DbConnection from './Middleware/DbConnection';
import CoffeeCategorySchema from './Schema/CoffeeCategorySchema';

export default async function  ShowCoffeeCategory(req,res) {


if(req.method=='GET'){
try {
DbConnection();
    let data=await CoffeeCategorySchema.find();
res.status(201).json({data,status:"201"})
} catch (error) {
console.log(error)
 res.status(501).json({message:error,status:'501'})
}

}




}
