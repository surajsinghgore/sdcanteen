import PaytmChecksum from 'paytmchecksum'
let mid=process.env.NEXT_PUBLIC_MID;
let mkey=process.env.NEXT_PUBLIC_MKEY;
import OrderSchemaDataBase from "./Schema/OrderSchema";
 const nodemailer = require("nodemailer");
 const ejs = require("ejs");
 let transporter = nodemailer.createTransport({
   service:"gmail",
   auth:{
   user:process.env.NODEMAILER_GMAIL_ID,
   pass:process.env.NODEMAILER_GMAIL_PASS
   }
  });
import PaymentSchemaDataBase from "./Schema/PaymentSchema";
export default async function PostTransaction(req,res) {

try{

var paytmChecksum = "";
var paytmParams = {};
const dataRecived=req.body;
for(var key in dataRecived){
if(key=="CHECKSUMHASH"){
paytmChecksum=dataRecived[key];
}
else{
paytmParams[key]=dataRecived[key];
}
}

var isVerifySignature = PaytmChecksum.verifySignature(paytmParams, mkey, paytmChecksum);
// success without any tempring
if (isVerifySignature) {
// success 
if(req.body.STATUS=="TXN_SUCCESS"){
let data=await PaymentSchemaDataBase.findOne({OrderId: req.body.ORDERID})
let TotalAmount=data.TotalAmount;
if(req.body.TXNAMOUNT==`${TotalAmount}`){
   return res.status(500).json({message:"Tempring is not allowed"})
}
await PaymentSchemaDataBase.findOneAndUpdate({OrderId: req.body.ORDERID},{PaymentOrderStatus:"complete",AmountReceived:TotalAmount,PaymentInfo:req.body})
for(let i=0;i<data.ItemsOrder.length;i++){
await PaymentSchemaDataBase.findOneAndUpdate({ItemsOrder: {$elemMatch: {_id:data.ItemsOrder[i]._id}}}, {$set:{"ItemsOrder.$.AmountReceived":data.ItemsOrder[i].Amount,"ItemsOrder.$.paymentStatus":"complete"}})
}
let findUser=await PaymentSchemaDataBase.findOne({OrderId: req.body.ORDERID})
      const UserId=findUser.UserId;
      const FullName=findUser.FullName;
    const Email=findUser.Email;
      const Mobile=findUser.Mobile;
      const FullAddress=findUser.FullAddress;
      const PickUpTime=findUser.PickUpTime;
      const PickUpTime1=parseFloat(findUser.PickUpTime1).toFixed(2);
      const PickUpTime2=parseFloat(findUser.PickUpTime1).toFixed(2);
      const OrderTime=findUser.OrderTime;
      const OrderDate=findUser.OrderDate;
      const PaymentMethod=findUser.PaymentMethod;
      const OrderStatus=findUser.OrderStatus;
      const PaymentOrderStatus=findUser.PaymentOrderStatus;
      const AmountReceived=findUser.AmountReceived;
      const OrderId=findUser.OrderId;
      const TokenUser=findUser.TokenUser;
      const PaymentInfo=findUser.PaymentInfo;
let array=[];
for(let i=0;i<findUser.ItemsOrder.length;i++){
    const ItemName=findUser.ItemsOrder[i].ItemName;
      const Qty=findUser.ItemsOrder[i].Qty;
      const Amount=findUser.ItemsOrder[i].Amount;
      const ProductOriginalAmount=findUser.ItemsOrder[i].ProductOriginalAmount;
      const Category=findUser.ItemsOrder[i].Category;
      const Size=findUser.ItemsOrder[i].Size;
      const CategoryPrimary=findUser.ItemsOrder[i].CategoryPrimary;
      const AmountReceived=findUser.ItemsOrder[i].AmountReceived;
      const paymentStatus=findUser.ItemsOrder[i].paymentStatus;
      array.push({ItemName,Qty,Amount,Category,Size,CategoryPrimary,ProductOriginalAmount,AmountReceived,paymentStatus})  
}
 const sendItem=new OrderSchemaDataBase({UserId,FullName,Email,Mobile,FullAddress,PickUpTime,PickUpTime1,PickUpTime2,OrderTime, OrderDate,PaymentMethod,TotalAmount,OrderStatus,PaymentOrderStatus,AmountReceived,OrderId,TokenUser,PaymentInfo,
      ItemsOrder:array
      })
      let ress=await sendItem.save();
      if(ress){
let datas=[];
if(ress.ItemsOrder){
datas=ress.ItemsOrder
}
let dataFile="./pages/api/EmailOrder.ejs";
let datass=await ejs.renderFile(dataFile,{data:datas,userName:FullName,TotalAmount:TotalAmount,TokenUser:TokenUser,PickUpTime:PickUpTime,OrderTime:OrderTime,OrderDate:OrderDate,totalItem:findUser.ItemsOrder.length,PaymentMethod:PaymentMethod,AmountReceived:AmountReceived})
// send Mail
 const mailoption={
from:process.env.NODEMAILER_GMAIL_ID,
to:ress.Email,
subject:"Order Confirmed !",
 html:datass
 }
 transporter.sendMail(mailoption,function(error,info){
if(error){
console.log('error',error)
return res.status(401).json({message:error,status:"401"});
}
})

await PaymentSchemaDataBase.findByIdAndDelete({_id:findUser._id})
res.redirect("/RedirectPageToOrderComplete?id="+ress._id,200)
 return res.status(201).json({status:"201"})
      }


}
// failure
 else if(req.body.STATUS=="TXN_FAILURE"){
 await PaymentSchemaDataBase.findOneAndUpdate({OrderId: req.body.ORDERID},{PaymentOrderStatus:"failed",PaymentInfo:req.body})
res.redirect("/OrderFailed?id="+req.body.BANKTXNID,400)
   res.status(400).json({status:"400"})

}
// pending
else{
await PaymentSchemaDataBase.findOneAndUpdate({OrderId: req.body.ORDERID},{PaymentOrderStatus:"pending",PaymentInfo:req.body})
res.redirect("/OrderFailed?pending="+req.body.BANKTXNID,400)
   res.status(201).json({status:"400"})
}


}
// tempring in payment with hash
 else {
	res.redirect("/OrderFailed?tempering="+req.body,400)
   res.status(201).json({status:"400"})
    res.status(201).json({body:req.body,message:"tempring"})
}



}

catch(error){

console.log(error);
   res.status(501).json({ message: error, status: "501" });
}
}
