import DbConnection from "./Middleware/DbConnection";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import ItemRatings from "./Schema/ItemRating";
import OrderSchemaDataBase from "./Schema/OrderSchema";
import CoffeeItemSchema from "./Schema/CoffeeItemSchema";
import DrinkItemSchema from "./Schema/DrinkItemSchema";
import FoodItemSchema from "./Schema/FoodItemSchema";
import JuiceItemSchema from "./Schema/JuiceItemSchema";

export default async function ValidateRatingOrNot(req, res) {
  try {
    DbConnection();
    let res1 = await VerifyClientUser(req, res);
    if (res1 == undefined) {
      return res
        .status(401)
        .json({ message: "Please login with Client credentails" });
    }
    let id = req.cookies.clinetId;
    if (!id) {
      return res
        .status(401)
        .json({ message: "please Provide Id To Find Record Of User" });
    }
    let productId = req.query.productId;
    if (productId == "") {
      return res.status(498).json({ message: "Please Provide Product Id " });
    }

    let productName = null;
    //!  filter product with id to get product name
    let Coffeedata = await CoffeeItemSchema.findById(productId);
    let Drinkdata = await DrinkItemSchema.findById(productId);
    let Fooddata = await FoodItemSchema.findById(productId);
    let Juicedata = await JuiceItemSchema.findById(productId);
    if (Coffeedata != null) {
      productName = Coffeedata.CoffeeName;
    }
    if (Drinkdata != null) {
      productName = Drinkdata.DrinkName;
    }
    if (Fooddata != null) {
      productName = Fooddata.FoodName;
    }
    if (Juicedata != null) {
      productName = Juicedata.JuiceName;
    }
    if (productName == null) {
      return res
        .status(498)
        .json({ message: "Please Provide valid product id" });
    }

    //! check weather user eat or not
    let checkUserEatthisProduct = await OrderSchemaDataBase.find({
      UserId: id,
      OrderStatus: "complete",
    });

let findProduct=await ItemRatings.find({ProductId:productId});
var filterProduct = findProduct
.filter(element => element.ItemsReviwers
  .some(subElement => subElement.userId == id)
)
.map(element => {
  let n = Object.assign({}, element, {'ItemsReviwers': element.ItemsReviwers.filter(
    subElement => subElement.userId == id
  )})
  return n;
})

// if res get means already comment
if(filterProduct.length!==0 ){
return res.status(404).send('sorry not allowed');
}







// get name with id if eat or not the item
var filteredArray = checkUserEatthisProduct
.filter(element => element.ItemsOrder
  .some(subElement => subElement.ItemName === productName)
)
.map(element => {
  let n = Object.assign({}, element, {'ItemsOrder': element.ItemsOrder.filter(
    subElement => subElement.ItemName === productName
  )})
  return n;
})

// if null means not eat
if(filteredArray==null|| filteredArray==undefined|| filteredArray.length==0){
return res.status(404).send('not allowed');
}

      return res.status(201).send('allowed');

  } catch (error) {
    res.status(501).json({ message: error, status: "501" });
  }
}
