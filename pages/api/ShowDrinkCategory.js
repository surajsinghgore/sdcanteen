
import DbConnection from '../Middleware/DbConnection';
import DrinkCategorySchema from '../Schema/DrinksCategorySchema';
export default async function  ShowDrinksCategory(req,res) {


if(req.method=='GET'){
try {
DbConnection();
    let data=await DrinkCategorySchema.find();
res.status(201).json({data,status:"201"})
} catch (error) {
console.log(error)
 res.status(501).json({message:error,status:'501'})
}

}




}
