import DbConnection from "./Middleware/DbConnection";
import OrderSchemaDataBase from "./Schema/OrderSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
 const nodemailer = require("nodemailer");
 let transporter = nodemailer.createTransport({
   service:"gmail",
   auth:{
   user:process.env.NODEMAILER_GMAIL_ID,
   pass:process.env.NODEMAILER_GMAIL_PASS
   }
  });

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
for(let i=0;i<dataUpdate.length;i++){
  let ids=dataUpdate[i]._id;
  let ss=dataUpdate[i].PaymentOrderStatus;
if(ss=="complete"){
 await OrderSchemaDataBase.findByIdAndUpdate(ids, {
          OrderStatus: "reject",
        });

}
else{
 await OrderSchemaDataBase.findByIdAndUpdate(ids, {
          OrderStatus: "reject",PaymentOrderStatus:"reject"
        });
}  
          const mailoption={
from:process.env.NODEMAILER_GMAIL_ID,
to:dataUpdate[i].Email,
subject:"Order Rejected on SD CANTEEN",
 html:`
 <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
 <div style="text-align:center"><h4>Hii , ${dataUpdate[i].FullName}</h4></div>
 <div style="color:rgb(104, 104, 104);text-align:center;font-size:4vw">
Welcome to SD CANTEEN!
 </div>
<div style="text-align:center;margin-top:3%;margin-bottom:2%">Your Order Token Number :<b> ${dataUpdate[i].TokenUser}</b> is reject</div>
<div style="font-size:3vw;color:#4f4f4f;margin-top:4%">Please placed order responsibly </div>
<div style="font-size:3vw;color:#4f4f4f;margin-top:4%"><b>Note:</b>Cash On Delivery is Disabled from your account for lifetime</div>
<div style="font-size:3vw;text-align:center;color:#383838;margin-top:5%">Thank You,</div>
<div style="font-size:evw;text-align:center;color: rgb(255, 98, 0);">Team SD CANTEEN</div>
<div style="font-size:2vw;text-align:center;color:#4f4f4f;margin-top:6%;margin-bottom:6%">If you think this request made wrongly , you can contact customer support</div> 
 <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
`}

transporter.sendMail(mailoption,function(error,info){
if(error){
return res.status(400).json({message:error,status:"400"});
}
})   
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
  let ss=dataUpdate[i].PaymentOrderStatus;
    let TotalAmount=dataUpdate[i].TotalAmount;
  if(ss=="compelete"){
   await OrderSchemaDataBase.findByIdAndUpdate(ids, {
          OrderStatus: "complete",AmountReceived:TotalAmount
        });

  }

  else{
  await OrderSchemaDataBase.findByIdAndUpdate(ids, {
         OrderStatus: "complete",AmountReceived:TotalAmount,PaymentOrderStatus:"complete"
        });
  }


     const mailoption={
from:process.env.NODEMAILER_GMAIL_ID,
to:dataUpdate[i].Email,
subject:"Order Complete on SD CANTEEN",
 html:`
 <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
 <div style="text-align:center"><h4>Hii , ${dataUpdate[i].FullName}</h4></div>
 <div style="color:rgb(104, 104, 104);text-align:center;font-size:4vw">
Welcome to SD CANTEEN!
 </div>
<div style="text-align:center;margin-top:3%;margin-bottom:2%">Your Order Token Number :<b> ${dataUpdate[i].TokenUser}</b> is completed</div>
<div style="font-size:3vw;color:#4f4f4f;margin-top:4%">Thanks for placed order using sd canteen website </div>
<div style="font-size:3vw;color:#4f4f4f;margin-top:4%">Please Don't forget to give ratings about the items by opening the items in sd canteen website</div>
<div style="font-size:3vw;text-align:center;color:#383838;margin-top:5%">Thank You,</div>
<div style="font-size:evw;text-align:center;color: rgb(255, 98, 0);">Team SD CANTEEN</div>
<div style="font-size:2vw;text-align:center;color:#4f4f4f;margin-top:6%;margin-bottom:6%">If you think this request made wrongly , you can contact customer support</div> 
 <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
`}

transporter.sendMail(mailoption,function(error,info){
if(error){
return res.status(400).json({message:error,status:"400"});
}
})
 }
//  reject order
 else{
  if(dataUpdate[i].ItemsOrder.length==totalItemsSize){
   let ids=dataUpdate[i]._id;
   let ss=dataUpdate[i].PaymentOrderStatus;
  let TotalAmount=dataUpdate[i].TotalAmount
  if(ss=="complete"){
   await OrderSchemaDataBase.findByIdAndUpdate(ids, {
          OrderStatus: "reject",AmountReceived:TotalAmount
        });
  }
else{

  await OrderSchemaDataBase.findByIdAndUpdate(ids, {
          OrderStatus: "reject",AmountReceived:TotalAmount,PaymentOrderStatus:"reject"
        });

}
     const mailoption={
from:process.env.NODEMAILER_GMAIL_ID,
to:dataUpdate[i].Email,
subject:"Order Rejected on SD CANTEEN",
 html:`
 <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
 <div style="text-align:center"><h4>Hii , ${dataUpdate[i].FullName}</h4></div>
 <div style="color:rgb(104, 104, 104);text-align:center;font-size:4vw">
Welcome to SD CANTEEN!
 </div>
<div style="text-align:center;margin-top:3%;margin-bottom:2%">Your Order Token Number :<b> ${dataUpdate[i].TokenUser} </b>is reject</div>
<div style="font-size:3vw;color:#4f4f4f;margin-top:4%">Please placed order responsibly </div>
<div style="font-size:3vw;color:#4f4f4f;margin-top:4%"><b>Note:</b>Cash On Delivery is Disabled from your account for lifetime</div>
<div style="font-size:3vw;text-align:center;color:#383838;margin-top:5%">Thank You,</div>
<div style="font-size:evw;text-align:center;color: rgb(255, 98, 0);">Team SD CANTEEN</div>
<div style="font-size:2vw;text-align:center;color:#4f4f4f;margin-top:6%;margin-bottom:6%">If you think this request made wrongly , you can contact customer support</div> 
 <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
`}

transporter.sendMail(mailoption,function(error,info){
if(error){
return res.status(400).json({message:error,status:"400"});
}
})
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
