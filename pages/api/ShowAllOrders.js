import DbConnection from "./Middleware/DbConnection";
import OrderSchemaDataBase from "./Schema/OrderSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";

export default async function ShowAllOrders(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();

let check=await VerifyAdmin(req,res);

if(check==undefined){
return res.status(401).json({json:"User Not Login with admin credentails"})
}

let tag=req.query.tag;
let searchs=req.query.search;
let search=searchs.toLowerCase();
if(tag==undefined||tag==null||tag==""){
return res.status(404).json({json:"Please Provide tag"})
}

if(tag=='all'){
let data=await OrderSchemaDataBase.find();
 return res.status(201).json({data:data})
}
if(search==""){
return ;

}
// nested check
if(tag=='CategoryPrimary'){
 let Alldata=await OrderSchemaDataBase.aggregate([
  {
    $match: {
     "ItemsOrder.CategoryPrimary":  search
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
              search
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
if(tag=='ItemName'){
let Alldata=await OrderSchemaDataBase.aggregate([
  {
    $match: {
     "ItemsOrder.ItemName":  search
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
              "$$reply.ItemName",
              [
                search
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


if(tag=='TokenUser'){
let data=await OrderSchemaDataBase.find({'TokenUser':{$regex : search}})
return res.status(201).json({data:data})
}

if(tag=='FullName'){
let data=await OrderSchemaDataBase.find({'FullName':{$regex : search}})
return res.status(201).json({data:data})
}

if(tag=='Email'){
let data=await OrderSchemaDataBase.find({'Email':{$regex : search}})
return res.status(201).json({data:data})
}
if(tag=='Mobile'){
let searchss=parseInt(search)
let data=await OrderSchemaDataBase.find({'Mobile': searchss})
return res.status(201).json({data:data})
}
if(tag=='OrderDate'){let data=await OrderSchemaDataBase.find({'OrderDate':{$regex : search}})
return res.status(201).json({data:data})
}
if(tag=='PickUpTime'){let data=await OrderSchemaDataBase.find({'PickUpTime':{$regex : search}})
return res.status(201).json({data:data})
}

if(tag=='PaymentMethod'){let data=await OrderSchemaDataBase.find({'PaymentMethod':{$regex : search}})
return res.status(201).json({data:data})
}
if(tag=='OrderStatus'){let data=await OrderSchemaDataBase.find({'OrderStatus':{$regex : search}})
return res.status(201).json({data:data})
}

if(tag=='TotalAmount'){
let searchss=Number(search)
let data=await OrderSchemaDataBase.find({'TotalAmount':searchss})
return res.status(201).json({data:data})
}

    }
    catch(e){
    console.log(e)
    res.status(501).json({status:"501",message:e})
    }
}
}