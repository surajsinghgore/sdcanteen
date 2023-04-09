import DbConnection from "./Middleware/DbConnection";
import OrderSchemaDataBase from "./Schema/OrderSchema";

export default async function FilterOrderInRealTimePanelCategory(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();

let CategoryPrimary=req.query.CategoryPrimary;
if(!CategoryPrimary||CategoryPrimary=='null'||CategoryPrimary==undefined||CategoryPrimary==""){
return res.status(404).json({message:"please provide food category"});
}
let currentDate=new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth()+1;
let year = currentDate.getFullYear();
const OrderDate=`${day}.${month}.${year}`;
 
 let Alldata=await OrderSchemaDataBase.aggregate([
  {
    $match: {
     "OrderDate":OrderDate, "ItemsOrder.CategoryPrimary": CategoryPrimary
    }
  },
  {
    "$project": {
      FullName: 1,
      UserId: 1,Email:1,Mobile:1,FullAddress:1,PickUpTime:1,PickUpTime1:1,PickUpTime2:1,OrderTime:1,OrderDate:1,PaymentMethod:1,TotalAmount:1,OrderStatus:1,AmountReceived:1,TokenNumber:1,TokenUser:1,
      ItemsOrder: {
        $filter: {
          input: "$ItemsOrder",
          as: "reply",
          cond: {
            $in: [
              "$$reply.CategoryPrimary",
              [
                CategoryPrimary
              ]
            ]
          }
        }
      }
    }
  }
])
return res.status(201).json({data:Alldata})
    }
    catch(e){
    console.log(e)
    res.status(501).json({status:"501",message:e})
    }
}
}