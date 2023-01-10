import websiteCounter from "./Schema/WebsiteCounterSchema";
import ItemRatings from './Schema/ItemRating'
import OrderSchemaDataBase from './Schema/OrderSchema'
import CoffeeItemSchema from './Schema/CoffeeItemSchema'
import DrinkItemSchema from './Schema/DrinkItemSchema'
import FoodItemSchema from './Schema/FoodItemSchema'
import JuiceItemSchema from './Schema/JuiceItemSchema'
import TopSearchSchema from './Schema/NumberOfSearch'
import ClientData from "./Schema/ClientData";


export default async function HomeAdminAnaylsis(req,res) {
   if (req.method == "POST") {
      try{

let year=req.body.Year;

    //!1.   monthwise visitors count
    let AllCountVisitorRawData=[]
 let Opera=0;
 let Edge=0;
 let Chrome=0;
 let Safari=0;
 let Firefox=0;
 let IE=0;
 let other=0;

    let VisitorJan=0;
    let VisitorFeb=0;
    let VisitorMar=0;
    let VisitorApl=0;
    let VisitorMay=0;
    let VisitorJun=0;
    let VisitorJul=0;
    let VisitorAug=0;
    let VisitorSep=0;
    let VisitorOct=0;
    let VisitorNov=0;
    let VisitorDec=0;
  let AllCountVisitorData=await websiteCounter.find();
for(let i=0;i<AllCountVisitorData.length;i++){
 let allDated=AllCountVisitorData[i].HitFullDate.split("/");
      //[ 0 Date| 1 Month | 2 Year ] split function
if((allDated[2]==year)){
AllCountVisitorRawData.push(AllCountVisitorData[i])
}
//    broweser count gets
if((AllCountVisitorData[i].Browser=="Opera")&&(allDated[2]==year)){Opera++;}
if((AllCountVisitorData[i].Browser=="Edge")&&(allDated[2]==year)){Edge++;}
if((AllCountVisitorData[i].Browser=="Chrome")&&(allDated[2]==year)){Chrome++;}
if((AllCountVisitorData[i].Browser=="Safari")&&(allDated[2]==year)){Safari++;}
if((AllCountVisitorData[i].Browser=="Firefox")&&(allDated[2]==year)){Firefox++;}
if((AllCountVisitorData[i].Browser=="IE")&&(allDated[2]==year)){IE++;}
if((AllCountVisitorData[i].Browser=="other Browser")&&(allDated[2]==year)){other++;}
if((allDated[1]==1)&&(allDated[2]==year)){
VisitorJan++;
}
if((allDated[1]==2)&&(allDated[2]==year)){
VisitorFeb++;
}
if((allDated[1]==3)&&(allDated[2]==year)){
VisitorMar++;
}
if((allDated[1]==4)&&(allDated[2]==year)){
VisitorApl++;
}
if((allDated[1]==5)&&(allDated[2]==year)){
VisitorMay++;
}
if((allDated[1]==6)&&(allDated[2]==year)){
VisitorJun++;
}
if((allDated[1]==7)&&(allDated[2]==year)){
VisitorJul++;
}
if((allDated[1]==8)&&(allDated[2]==year)){
VisitorAug++;
}
if((allDated[1]==9)&&(allDated[2]==year)){
VisitorSep++;
}
if((allDated[1]==10)&&(allDated[2]==year)){
VisitorOct++;
}
if((allDated[1]==11)&&(allDated[2]==year)){
VisitorNov++;
}
if((allDated[1]==12)&&(allDated[2]==year)){
VisitorDec++;
}
}
// monthwise data push in single array
let AllVisitorMonthWise=[];
AllVisitorMonthWise.push(VisitorJan)
AllVisitorMonthWise.push(VisitorFeb)
AllVisitorMonthWise.push(VisitorMar)
AllVisitorMonthWise.push(VisitorApl)
AllVisitorMonthWise.push(VisitorMay)
AllVisitorMonthWise.push(VisitorJun)
AllVisitorMonthWise.push(VisitorJul)
AllVisitorMonthWise.push(VisitorAug)
AllVisitorMonthWise.push(VisitorSep)
AllVisitorMonthWise.push(VisitorOct)
AllVisitorMonthWise.push(VisitorNov)
AllVisitorMonthWise.push(VisitorDec)
let AllVisitorMonthWiseLen=VisitorJan+VisitorFeb+VisitorMar+VisitorApl+VisitorMay+VisitorJun+VisitorJul+VisitorAug+VisitorSep+VisitorOct+VisitorNov+VisitorDec;
// browser market share
let AllBrowser=[]
AllBrowser.push(Opera)
AllBrowser.push(Edge)
AllBrowser.push(Chrome)
AllBrowser.push(Safari)
AllBrowser.push(Firefox)
AllBrowser.push(IE)
AllBrowser.push(other)
let AllBrowserLen=Opera+Edge+Chrome+Safari+Firefox+IE+other;







// ! 2. All Order Related Calculations
    let ordersJan=0,totalEarnJan=0;
    let ordersFeb=0,totalEarnFeb=0;
    let ordersMar=0,totalEarnMar=0;
    let ordersApl=0,totalEarnApl=0;
    let ordersMay=0,totalEarnMay=0;
    let ordersJun=0,totalEarnJun=0;
    let ordersJul=0,totalEarnJul=0;
    let ordersAug=0,totalEarnAug=0;
    let ordersSep=0,totalEarnSep=0;
    let ordersOct=0,totalEarnOct=0;
    let ordersNov=0,totalEarnNov=0;
    let ordersDec=0,totalEarnDec=0;
let orderData=await OrderSchemaDataBase.find();
for(let i=0;i<orderData.length;i++){
let fullDate=orderData[i].OrderDate.split('.');
if((fullDate[1]==1)&&(fullDate[2]==year)){ordersJan++}
if((fullDate[1]==2)&&(fullDate[2]==year)){ordersFeb++}
if((fullDate[1]==3)&&(fullDate[2]==year)){ordersMar++}
if((fullDate[1]==4)&&(fullDate[2]==year)){ordersApl++}
if((fullDate[1]==5)&&(fullDate[2]==year)){ordersMay++}
if((fullDate[1]==6)&&(fullDate[2]==year)){ordersJun++}
if((fullDate[1]==7)&&(fullDate[2]==year)){ordersJul++}
if((fullDate[1]==8)&&(fullDate[2]==year)){ordersAug++}
if((fullDate[1]==9)&&(fullDate[2]==year)){ordersSep++;}
if((fullDate[1]==10)&&(fullDate[2]==year)){ordersOct++;}
if((fullDate[1]==11)&&(fullDate[2]==year)){ordersNov++;}
if((fullDate[1]==12)&&(fullDate[2]==year)){ordersDec++}
// monthwise earing calculate
if((fullDate[1]==1)&&(fullDate[2]==year)&&(orderData[i].OrderStatus=="complete")){totalEarnJan=totalEarnJan+orderData[i].AmountReceived;}
if((fullDate[1]==2)&&(fullDate[2]==year)&&(orderData[i].OrderStatus=="complete")){totalEarnFeb=totalEarnFeb+orderData[i].AmountReceived;}
if((fullDate[1]==3)&&(fullDate[2]==year)&&(orderData[i].OrderStatus=="complete")){totalEarnMar=totalEarnMar+orderData[i].AmountReceived;}
if((fullDate[1]==4)&&(fullDate[2]==year)&&(orderData[i].OrderStatus=="complete")){totalEarnApl=totalEarnApl+orderData[i].AmountReceived;}
if((fullDate[1]==5)&&(fullDate[2]==year)&&(orderData[i].OrderStatus=="complete")){totalEarnMay=totalEarnMay+orderData[i].AmountReceived;}
if((fullDate[1]==6)&&(fullDate[2]==year)&&(orderData[i].OrderStatus=="complete")){totalEarnJun=totalEarnJun+orderData[i].AmountReceived;}
if((fullDate[1]==7)&&(fullDate[2]==year)&&(orderData[i].OrderStatus=="complete")){totalEarnJul=totalEarnJul+orderData[i].AmountReceived;}
if((fullDate[1]==8)&&(fullDate[2]==year)&&(orderData[i].OrderStatus=="complete")){totalEarnAug=totalEarnAug+orderData[i].AmountReceived;}
if((fullDate[1]==9)&&(fullDate[2]==year)&&(orderData[i].OrderStatus=="complete")){totalEarnSep=totalEarnSep+orderData[i].AmountReceived;}
if((fullDate[1]==10)&&(fullDate[2]==year)&&(orderData[i].OrderStatus=="complete")){totalEarnOct=totalEarnOct+orderData[i].AmountReceived;}
if((fullDate[1]==11)&&(fullDate[2]==year)&&(orderData[i].OrderStatus=="complete")){totalEarnNov=totalEarnNov+orderData[i].AmountReceived;}
if((fullDate[1]==12)&&(fullDate[2]==year)&&(orderData[i].OrderStatus=="complete")){totalEarnDec=totalEarnDec+orderData[i].AmountReceived;}
}


let AllOrderMonthWise=[]
AllOrderMonthWise.push(ordersJan)
   AllOrderMonthWise.push(ordersFeb)
   AllOrderMonthWise.push(ordersMar)
   AllOrderMonthWise.push(ordersApl)
   AllOrderMonthWise.push(ordersMay)
   AllOrderMonthWise.push(ordersJun)
   AllOrderMonthWise.push(ordersJul)
   AllOrderMonthWise.push(ordersAug)
   AllOrderMonthWise.push(ordersSep)
   AllOrderMonthWise.push(ordersOct)
   AllOrderMonthWise.push(ordersNov)
   AllOrderMonthWise.push(ordersDec)
   let AllMonthWiseCollection=[];
AllMonthWiseCollection.push(totalEarnJan)
AllMonthWiseCollection.push(totalEarnFeb)
AllMonthWiseCollection.push(totalEarnMar)
AllMonthWiseCollection.push(totalEarnApl)
AllMonthWiseCollection.push(totalEarnMay)
AllMonthWiseCollection.push(totalEarnJun)
AllMonthWiseCollection.push(totalEarnJul)
AllMonthWiseCollection.push(totalEarnAug)
AllMonthWiseCollection.push(totalEarnSep)
AllMonthWiseCollection.push(totalEarnOct)
AllMonthWiseCollection.push(totalEarnNov)
AllMonthWiseCollection.push(totalEarnDec)
// monthwise collection found
let AllMonthWiseCollectionLen=totalEarnJan+totalEarnFeb+totalEarnMar+totalEarnApl+totalEarnMay+totalEarnJun+totalEarnJul+totalEarnAug+totalEarnSep+totalEarnOct+totalEarnNov+totalEarnDec;
// monthwise records found
   let AllOrderMonthWiseLen=ordersJan+ordersFeb+ordersMar+ordersApl+ordersMay+ordersJun+ordersJul+ordersAug+ordersSep+ordersOct+ordersNov+ordersDec;

// total earning calcualte

// ! 3. Number OF Clients Register In Canteen
// const cData=await ClientData.find();
// for(let i=0;i<cData.length;i++){
// let arrayOfDate=cData[i].createdAt.split('-')
// console.log(arrayOfDate)
// }

return res.status(200).json({AllVisitorMonthWise,AllBrowser,AllOrderMonthWise,AllOrderMonthWiseLen,AllVisitorMonthWiseLen,AllBrowserLen,AllMonthWiseCollectionLen,AllMonthWiseCollection})
  
  } catch (error) {
    console.log(error)
      res.status(501).json({ message: error });
    }
   }
}
