import DbConnection from "./Middleware/DbConnection";
import CoffeeItemSchema from "./Schema/CoffeeItemSchema";
import DrinkItemSchema from "./Schema/DrinkItemSchema";
import FoodItemSchema from "./Schema/FoodItemSchema";
import JuiceItemSchema from "./Schema/JuiceItemSchema";
export default async function CheckItemTempering(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
      let gets = req.body.data;

      if (gets == null || gets == undefined) {
        return res.status(400).json({ message: "please provide data in cart" });
      }
      let array = [];
             let sum = 0;
      let allItems = gets.items;
      for (let i = 0; i < allItems.length; i++) {
      //! foodItems Filter
        if (allItems[i].FoodName) {
          let findFoodData = await FoodItemSchema.findOne({
            FoodName: allItems[i].FoodName,
            Category: allItems[i].Category,
          });
          let QtyBook = allItems[i].QtyBook;
          let pricesFilter = await findFoodData.ItemCost.filter((item) => {
            return item._id == allItems[i].subId;
          });
          let OriginalPrice = pricesFilter[0].Price;
          let Size = pricesFilter[0].sizeName;
          let ItemName = findFoodData.FoodName;
          let Qty = QtyBook;
          sum += QtyBook * OriginalPrice;
          let Category = findFoodData.Category;
          let ProductOriginalAmount = OriginalPrice;
          let Amount = QtyBook * OriginalPrice;
          let CategoryPrimary = "foodcategory";
          let id=findFoodData._id;
          array.push({
            ItemName,
            Qty,
            Amount,
            Category,
            Size,
            id,
            ProductOriginalAmount,
            CategoryPrimary,
          });
        }
// ! coffee items
        if (allItems[i].CoffeeName) {
    let findCoffeeData = await CoffeeItemSchema.findOne({
            CoffeeName: allItems[i].CoffeeName,
            Category: allItems[i].Category,
          });
          let QtyBook = allItems[i].QtyBook;
          let pricesFilter = await findCoffeeData.ItemCost.filter((item) => {
            return item._id == allItems[i].subId;
          });
          let OriginalPrice = pricesFilter[0].Price;
          let Size = pricesFilter[0].sizeName;
          let ItemName = findCoffeeData.CoffeeName;
          let Qty = QtyBook;
          sum += QtyBook * OriginalPrice;
          let Category = findCoffeeData.Category;
          let ProductOriginalAmount = OriginalPrice;
          let Amount = QtyBook * OriginalPrice;
           let id=findCoffeeData._id;
          let CategoryPrimary = "coffeecategory";
          array.push({
            ItemName,
            Qty,
            Amount,id,
            Category,
            Size,
            ProductOriginalAmount,
            CategoryPrimary,
          });


        }
        // ! Juice Itmes
        if (allItems[i].JuiceName) {
 let findJuiceData = await JuiceItemSchema.findOne({
            JuiceName: allItems[i].JuiceName,
            Category: allItems[i].Category,
          });
          let QtyBook = allItems[i].QtyBook;
          let pricesFilter = await findJuiceData.ItemCost.filter((item) => {
            return item._id == allItems[i].subId;
          });
          let OriginalPrice = pricesFilter[0].Price;
          let Size = pricesFilter[0].sizeName;
          let ItemName = findJuiceData.JuiceName;
          let Qty = QtyBook;   let id=findJuiceData._id;
          sum += QtyBook * OriginalPrice;
          let Category = findJuiceData.Category;
          let ProductOriginalAmount = OriginalPrice;
          let Amount = QtyBook * OriginalPrice;
          let CategoryPrimary = "juicecategory";
          array.push({
            ItemName,
            Qty,
            Amount,
            Category,
            Size,id,
            ProductOriginalAmount,
            CategoryPrimary,
          });



        }
        //! Drink Name
        if (allItems[i].DrinkName) {
let findDrinkData = await DrinkItemSchema.findOne({
            DrinkName: allItems[i].DrinkName,
            Category: allItems[i].Category,
          });
          let QtyBook = allItems[i].QtyBook;
          let pricesFilter = await findDrinkData.ItemCost.filter((item) => {
            return item._id == allItems[i].subId;
          });
          let OriginalPrice = pricesFilter[0].Price;
          let Size = pricesFilter[0].sizeName;
          let ItemName = findDrinkData.DrinkName;
          let Qty = QtyBook;  let id=findDrinkData._id;
          sum += QtyBook * OriginalPrice;
          let Category = findDrinkData.Category;
          let ProductOriginalAmount = OriginalPrice;
          let Amount = QtyBook * OriginalPrice;
          let CategoryPrimary = "drinkcategory";
          array.push({
            ItemName,
            Qty,
            Amount,
            Category,
            Size,id,
            ProductOriginalAmount,
            CategoryPrimary,
          });

        
        }
      }
     
      return res.status(201).json({ data: array ,sum:sum});
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
