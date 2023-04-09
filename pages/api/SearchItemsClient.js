import DbConnection from "./Middleware/DbConnection";
import FoodItemSchema from "./Schema/FoodItemSchema";
import CoffeeItemSchema from "./Schema/CoffeeItemSchema";
import DrinkItemSchema from "./Schema/DrinkItemSchema";
import JuiceItemSchema from "./Schema/JuiceItemSchema";

export default async function SearchItemsClient(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
       let search=req.query.search;
        let category=req.query.category;
        if(category==null||category==undefined){
        return res.status(400).json({message:"please provide category"})
        }
        if(category=='foodItems'){
        
        let Res=await FoodItemSchema.find({'FoodName':{$regex : search},Active:"ON"}).select("-Active -createdAt -updatedAt")
        let data=await Res.slice(0,15);
     return res.status(201).json({ data });
        }
        if(category=='coffeeItems'){  
         let Res=await CoffeeItemSchema.find({'CoffeeName':{$regex : search},Active:"ON"}).select("-Active -createdAt -updatedAt")
        let data=await Res.slice(0,15);
     return res.status(201).json({ data });
        }
        if(category=='juiceItems'){
        
         let Res=await JuiceItemSchema.find({'JuiceName':{$regex : search},Active:"ON"}).select("-Active -createdAt -updatedAt")
        let data=await Res.slice(0,15);
     return res.status(201).json({ data });
        }
        if(category=='drinkItems'){
        
         let Res=await DrinkItemSchema.find({'DrinkName':{$regex : search},Active:"ON"}).select("-Active -createdAt -updatedAt")
        let data=await Res.slice(0,15);
     return res.status(201).json({ data });
        }

          
     
     
    } catch (error) {
    console.log(error)
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
