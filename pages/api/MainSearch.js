import DbConnection from "./Middleware/DbConnection";
import CoffeeItemSchema from './Schema/CoffeeItemSchema'
import DrinkItemSchema from './Schema/DrinkItemSchema'
import FoodItemSchema from './Schema/FoodItemSchema'
import JuiceItemSchema from './Schema/JuiceItemSchema'


export default async function MainSearch(req, res) {

    try {
      DbConnection();
      let search=req.query.search;
let foodRes=await FoodItemSchema.find({'FoodName':{$regex : search},Active:"ON"}).select("-Active -Category -Description -Image -ItemCost -Qty -createdAt -updatedAt -_id")
let coffeeRes=await CoffeeItemSchema.find({'CoffeeName':{$regex : search},Active:"ON"}).select("-Active -Category -Description -Image -ItemCost -Qty -createdAt -updatedAt -_id")
let drinkRes=await DrinkItemSchema.find({'DrinkName':{$regex : search},Active:"ON"}).select("-Active -Category -Description -Image -ItemCost -Qty -createdAt -updatedAt -_id")
let juiceRes=await JuiceItemSchema.find({'JuiceName':{$regex : search},Active:"ON"}).select("-Active -Category -Description -Image -ItemCost -Qty -createdAt -updatedAt -_id")

let foodData=await foodRes.slice(0,2); 
let coffeeData=await coffeeRes.slice(0,2);
let drinkData=await drinkRes.slice(0,2)
let juiceData=await juiceRes.slice(0,2)
return res.status(201).json({foodData,coffeeData,drinkData,juiceData})

}
 catch (error) {
    console.log(error)
      res.status(501).json({ message: error, status: "501" });
    }
  }

