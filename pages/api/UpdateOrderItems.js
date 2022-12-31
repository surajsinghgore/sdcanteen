import DbConnection from "./Middleware/DbConnection";
import OrderSchemaDataBase from "./Schema/OrderSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";


export default async function UpdateorderItems(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
  await VerifyAdmin(req, res);
    let id=req.body.id;
    let price=req.body.price;
    let status=req.body.status;

//!1.. reject order 
    if(price==undefined){
     if(id==undefined||status==undefined){
      res.status(400).json({ message: "Please fill All the filed Id,Status" });
}
  
let data=await OrderSchemaDataBase.find({ItemsOrder: {$elemMatch: {_id: id}}})
if(data.length==0){
    return  res.status(404).json({ message: "Record Not Found" });
}


// update status
await OrderSchemaDataBase.findOneAndUpdate({ItemsOrder: {$elemMatch: {_id: id}}}, {$set:{"ItemsOrder.$.OrderStatus":status,"ItemsOrder.$.paymentStatus":status}})


// find updated records tp manage overall update records status update
let datas=await OrderSchemaDataBase.find({ItemsOrder: {$elemMatch: {_id: id}}})
let dataUpdate=await OrderSchemaDataBase.find({ItemsOrder: {$elemMatch: {_id: id}}})
let s=0;
let com=0;
for(let i=0;i<dataUpdate.length;i++){
  let ids=dataUpdate[i]._id;
   await OrderSchemaDataBase.findByIdAndUpdate(ids, {
          OrderStatus: "reject",PaymentOrderStatus:"reject"
        });
        
 }

res.status(201).json({message:datas})


    }



//!2. complete order manage
else{
  
    if(id==undefined||price==undefined||status==undefined){
      res.status(400).json({ message: "Please fill All the filed Id,Price,Status" });
}
 
let data=await OrderSchemaDataBase.find({ItemsOrder: {$elemMatch: {_id: id}}})
if(data.length==0){
    return  res.status(404).json({ message: "Record Not Found" });
}
await OrderSchemaDataBase.findOneAndUpdate({ItemsOrder: {$elemMatch: {_id: id}}}, {$set:{"ItemsOrder.$.AmountReceived":price,"ItemsOrder.$.OrderStatus":status,"ItemsOrder.$.paymentStatus":"complete"}})

let datas=await OrderSchemaDataBase.find({ItemsOrder: {$elemMatch: {_id: id}}})
let dataUpdate=await OrderSchemaDataBase.find({ItemsOrder: {$elemMatch: {_id: id}}})
let s=0;
let rej=0;
for(let i=0;i<dataUpdate.length;i++){
 dataUpdate[i].ItemsOrder.map((item)=>{
 if(item.OrderStatus=="complete"){
s=s+1;
 }
  if(item.OrderStatus=="reject"){
rej=rej+1;
 }
 })
 let totalItemsSize=s+rej;

// complete order
 if(dataUpdate[i].ItemsOrder.length==s){
  let ids=dataUpdate[i]._id;
  let TotalAmount=dataUpdate[i].TotalAmount;
 await OrderSchemaDataBase.findByIdAndUpdate(ids, {
          OrderStatus: "complete",AmountReceived:TotalAmount,PaymentOrderStatus:"complete"
        });

 }
//  reject order
 else{
  if(dataUpdate[i].ItemsOrder.length==totalItemsSize){
   let ids=dataUpdate[i]._id;
  let TotalAmount=dataUpdate[i].TotalAmount;
 await OrderSchemaDataBase.findByIdAndUpdate(ids, {
          OrderStatus: "reject",AmountReceived:TotalAmount,PaymentOrderStatus:"reject"
        });
 
 }
 }


 let sum=0;
  let ids=dataUpdate[i]._id;
           dataUpdate[i].ItemsOrder.map((itm)=>{
         let pricess=parseInt(itm.AmountReceived)
          sum=sum+pricess;
          });
 
  let TotalAmount=sum;
 await OrderSchemaDataBase.findByIdAndUpdate(ids, {
       AmountReceived:TotalAmount
        });






}

res.status(201).json({message:datas})
  
    }



    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error});
    }
  }
}
