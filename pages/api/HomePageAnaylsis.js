import websiteCounter from "./Schema/WebsiteCounterSchema";
import ItemRatings from './Schema/ItemRating'
import OrderSchemaDataBase from './Schema/OrderSchema'
import CoffeeItemSchema from './Schema/CoffeeItemSchema'
import DrinkItemSchema from './Schema/DrinkItemSchema'
import FoodItemSchema from './Schema/FoodItemSchema'
import JuiceItemSchema from './Schema/JuiceItemSchema'
import TopSearchSchema from './Schema/NumberOfSearch'
import ClientData from "./Schema/ClientData";


export default async function HomePageAnaylsis(req,res) {
   if (req.method == "GET") {
      try{
   
   let TopFood=await ItemRatings.find().sort({"Rating":-1})
let TopRatedFoodData=TopFood.slice(0,5)
let visitorDataCount=await websiteCounter.find().count();
let HappyClients=await ClientData.find().count();
let orderDataCount=await OrderSchemaDataBase.find().count();
let topSearch=await TopSearchSchema.find().sort({"NumberOfSearch":-1})
let TopSearchData=topSearch.slice(0,5)
let coffeecount=await CoffeeItemSchema.find().count()
let drinkcount=await DrinkItemSchema.find().count()
let foodcount=await FoodItemSchema.find().count()
let juicecount=await JuiceItemSchema.find().count()
let allItemsCount=coffeecount+drinkcount+foodcount+juicecount;
let TopTrendingItems=[]
// find top data details with avg rating
for(let i=0;i<TopSearchData.length;i++){
let fooddata=await FoodItemSchema.findOne({FoodName:TopSearchData[i].ItemName}).select("-Active -createdAt -updatedAt -Qty -Category -ItemCost");
let juicedata=await JuiceItemSchema.findOne({JuiceName:TopSearchData[i].ItemName}).select("-Active -createdAt -updatedAt -Qty -Category -ItemCost");
let coffeedata=await CoffeeItemSchema.findOne({CoffeeName:TopSearchData[i].ItemName}).select("-Active -createdAt -updatedAt -Qty -Category -ItemCost");
let drinkdata=await DrinkItemSchema.findOne({DrinkName:TopSearchData[i].ItemName}).select("-Active -createdAt -updatedAt -Qty -Category -ItemCost");
if(fooddata!=null){TopTrendingItems.push(fooddata)}
if(juicedata!=null){TopTrendingItems.push(juicedata)}
if(coffeedata!=null){TopTrendingItems.push(coffeedata)}
if(drinkdata!=null){TopTrendingItems.push(drinkdata)}
}

   return res.status(201).json({TopTrendingItems,TopRatedFoodData,visitorDataCount,orderDataCount,HappyClients,allItemsCount})
  } catch (error) {
    console.log(error)
      res.status(501).json({ message: error });
    }
   }
}
