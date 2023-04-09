import DbConnection from "./Middleware/DbConnection";
import JuiceItemSchema from "./Schema/JuiceItemSchema";
import CoffeeItemSchema from "./Schema/CoffeeItemSchema";
import FoodItemSchema from "./Schema/FoodItemSchema";
import DrinkItemSchema from "./Schema/DrinkItemSchema";

export default async function ShowSingleItem(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      let itemName=req.query.item;
      let juiceData = await JuiceItemSchema.find({"JuiceName":itemName}).select('-createdAt -updatedAt');
      let coffeeData = await CoffeeItemSchema.find({"CoffeeName":itemName}).select('-createdAt -updatedAt');
      let foodData = await FoodItemSchema.find({"FoodName":itemName}).select('-createdAt -updatedAt');
      let drinkData = await DrinkItemSchema.find({"DrinkName":itemName}).select('-createdAt -updatedAt');
      if(foodData.length!=0){
       return res.status(201).json({ data:foodData });
      }
       else if(coffeeData.length!=0){
       return res.status(201).json({ data:coffeeData });
      }
       else if(drinkData.length!=0){
       return res.status(201).json({ data:drinkData });
      }
      else if(juiceData.length!=0){
      return  res.status(201).json({ data:juiceData });
      }

       return res.status(404).json({ data:"Not Found"});
     
    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
