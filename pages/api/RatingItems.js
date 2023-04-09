import DbConnection from "./Middleware/DbConnection";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import ItemRatings from './Schema/ItemRating'
import OrderSchemaDataBase from './Schema/OrderSchema'
import CoffeeItemSchema from './Schema/CoffeeItemSchema'
import DrinkItemSchema from './Schema/DrinkItemSchema'
import FoodItemSchema from './Schema/FoodItemSchema'
import JuiceItemSchema from './Schema/JuiceItemSchema'


export default async function RatingItems(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
 let res1=await VerifyClientUser(req, res);
   if(res1==undefined){
    return res.status(401).json({ message: "Please login with Client credentails" });
    }
      let id=req.cookies.clinetId;
      if(!id){
      res.status(401).json({ message: "please Provide Id To Find Record Of User" });
      }
    
let userName=req.body.userName;
let productId=req.body.productId;
let userMessage=req.body.userMessage;
let serviceRate=req.body.serviceRate;
let priceRate=req.body.priceRate;
let qualityRate=req.body.qualityRate;
let overallRate=req.body.overallRate;
 let NumberOfReviews;
 

 let OverAllProuctRate;
if(id==undefined){
return res.status(498).json({message:"Please Login with Valid Client Id"})
}
if(userName==""){
return res.status(400).json({message:"Please Provide User Name"})

}
if(productId==""){
return res.status(498).json({message:"Please Provide Product Id "})}
if(userMessage==""){return res.status(400).json({message:"Please Fill User Message field"})}
if(serviceRate==""){return res.status(400).json({message:"Please give service rate field"})}
if(priceRate==""){return res.status(400).json({message:"Please give price rate field"})}
if(overallRate==""){return res.status(400).json({message:"Please give overall rate field"})}
if(qualityRate==""){return res.status(400).json({message:"Please give quality rate field"})}

//set default time and date
let dates=new Date();
let Dates=dates.getDate()+"-"+(dates.getMonth()+1)+"-"+dates.getFullYear();
 let LocalString=dates.toLocaleString()
let hours=dates.getHours();
let OrderTimes;
let m=parseInt(dates.getMinutes());
if(m<=9){
m = '0'+m;
}
if(hours>=12){
OrderTimes=dates.getHours()+"-"+m+" PM";
}
else{
OrderTimes=dates.getHours()+"-"+m+" AM";
}
let Times=OrderTimes;

let CDate=parseInt(dates.getDate());
let CMonth=parseInt(dates.getMonth()+1);
let CYear=parseInt(dates.getFullYear());
let CHours=parseInt(dates.getHours());
let CMins=parseInt(m);


// merge ReviwerFields
let array=[{OverAllRate:overallRate,userName:userName,userId:id,Message:userMessage,QualityRate:qualityRate,ServiceRate:serviceRate,PriceRate:priceRate,Time:Times,Date:Dates,CDate,CMonth,CYear,CHours,CMins,LocalString}];

let productName=null;
//!  filter product with id to get product name
 let Coffeedata=await CoffeeItemSchema.findById(productId) 
 let Drinkdata=await DrinkItemSchema.findById(productId)  
 let Fooddata=await FoodItemSchema.findById(productId)  
 let Juicedata=await JuiceItemSchema.findById(productId) 
if(Coffeedata!=null){productName=Coffeedata.CoffeeName}
if(Drinkdata!=null){productName=Drinkdata.DrinkName}
if(Fooddata!=null){productName=Fooddata.FoodName; }
if(Juicedata!=null){productName=Juicedata.JuiceName}
if(productName==null){
return res.status(498).json({message:"Please Provide valid product id"})
}

//! check weather user eat or not
let checkUserEatthisProduct=await OrderSchemaDataBase.find({UserId:id,OrderStatus:"complete"})

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
return res.status(400).json({message:"You Not Taste this Item from Us"});
}





//find wheather product already added or not [fresh food review]
let findProduct=await ItemRatings.find({ProductId:productId});
// ! new enter
if(findProduct==null||findProduct==undefined||findProduct.length==0){
// Number of orders controll
NumberOfReviews=1;
// Overall Product Rate Manage
OverAllProuctRate=qualityRate;

const data = new ItemRatings({
       ProductId:productId,
       Rating:OverAllProuctRate,
       NumberOfReviews:NumberOfReviews,
       ItemsReviwers:array
      });
await data.save(); 
return res.status(201).json({message:"review Successfully Send"});
}
// ! add cooments inside products
else{
let ZeroPointFive=0;
let OnePointFive=0;
let TwoPointFive=0;
let ThreePointFive=0;
let FourPointFive=0;
let One=0;
let two=0;
let three=0;
let four=0;
let five=0;
findProduct[0].ItemsReviwers.map((item)=>{
if(item.QualityRate=="0.5"){ZeroPointFive++;}
if(item.QualityRate=="1"){One++;}
if(item.QualityRate=="1.5"){OnePointFive++;}
if(item.QualityRate=="2"){two++;}
if(item.QualityRate=="2.5"){TwoPointFive++;}
if(item.QualityRate=="3"){three++;}
if(item.QualityRate=="3.5"){ThreePointFive++;}
if(item.QualityRate=="4"){four++;}
if(item.QualityRate=="4.5"){FourPointFive++;}
if(item.QualityRate=="5"){five++;}
})

if(qualityRate=="0.5"){ZeroPointFive++;}
if(qualityRate=="1"){One++;}
if(qualityRate=="1.5"){OnePointFive++;}
if(qualityRate=="2"){two++;}
if(qualityRate=="2.5"){TwoPointFive++;}
if(qualityRate=="3"){three++;}
if(qualityRate=="3.5"){ThreePointFive++;}
if(qualityRate=="4"){four++;}
if(qualityRate=="4.5"){FourPointFive++;}
if(qualityRate=="5"){five++;}

// Number of orders controll
NumberOfReviews=Number(findProduct[0].NumberOfReviews);
NumberOfReviews=NumberOfReviews+1;
// Overall Product Rate Manage
OverAllProuctRate=(5*five + 4.5*FourPointFive +4*four +3.5*ThreePointFive + 3*three +2.5*TwoPointFive + 2*two +1.5*OnePointFive + 1*One+0.5*ZeroPointFive) /NumberOfReviews;

// check wheather already comment on the same product
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
return res.status(403).json({message:"Sorry, You Already Give Rating on This Product"})
}
else{
// new comment to existing product by new user add
await ItemRatings.updateOne({ProductId:productId}, {$push: {ItemsReviwers: array},NumberOfReviews:NumberOfReviews,Rating:OverAllProuctRate});
return res.status(201).json({message:"review Successfully Send"});
}

}


    } catch (error) {
    console.log(error)
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
