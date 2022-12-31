import DbConnection from "./Middleware/DbConnection";
import CoffeeItemSchema from './Schema/CoffeeItemSchema'
import DrinkItemSchema from './Schema/DrinkItemSchema'
import FoodItemSchema from './Schema/FoodItemSchema'
import JuiceItemSchema from './Schema/JuiceItemSchema'


export default async function MainSearch(req, res) {

    try {
      DbConnection();
      let search=req.query.search;
let foodData=await FoodItemSchema.find({'FoodName':{$regex : search}}).select("-Active -Category -Description -Image -ItemCost -Qty -createdAt -updatedAt -_id")
let coffeeData=await CoffeeItemSchema.find({'CoffeeName':{$regex : search}}).select("-Active -Category -Description -Image -ItemCost -Qty -createdAt -updatedAt -_id")
let drinkData=await DrinkItemSchema.find({'DrinkName':{$regex : search}}).select("-Active -Category -Description -Image -ItemCost -Qty -createdAt -updatedAt -_id")
let juiceData=await JuiceItemSchema.find({'JuiceName':{$regex : search}}).select("-Active -Category -Description -Image -ItemCost -Qty -createdAt -updatedAt -_id")
return res.status(201).json({foodData,coffeeData,drinkData,juiceData})

}
 catch (error) {
    console.log(error)
      res.status(501).json({ message: error, status: "501" });
    }
  }

