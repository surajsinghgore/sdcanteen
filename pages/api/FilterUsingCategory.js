import DbConnection from "./Middleware/DbConnection";
import CoffeeItemSchema from './Schema/CoffeeItemSchema'
import DrinkItemSchema from './Schema/DrinkItemSchema'
import FoodItemSchema from './Schema/FoodItemSchema'
import JuiceItemSchema from './Schema/JuiceItemSchema'


export default async function FilterUsingCategory(req, res) {

    try {
      DbConnection();
      let search=req.query.value;
let foodRes=await FoodItemSchema.find({'Category':{$regex : search},Active:"ON"}).select("-Active -createdAt -updatedAt")
let coffeeRes=await CoffeeItemSchema.find({'Category':{$regex : search},Active:"ON"}).select("-Active -createdAt -updatedAt")
let drinkRes=await DrinkItemSchema.find({'Category':{$regex : search},Active:"ON"}).select("-Active -createdAt -updatedAt")
let juiceRes=await JuiceItemSchema.find({'Category':{$regex : search},Active:"ON"}).select("-Active  -createdAt -updatedAt")

return res.status(201).json({foodRes,coffeeRes,drinkRes,juiceRes})

}
 catch (error) {
    console.log(error)
      res.status(501).json({ message: error, status: "501" });
    }
  }

