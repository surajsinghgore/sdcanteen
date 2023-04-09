import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import OrderSchemaDataBase from "./Schema/OrderSchema";
import DbConnection from "./Middleware/DbConnection";
import PaymentSchemaDataBase from "./Schema/PaymentSchema";
// payemnt data base conatin failed pending and initaited records
export default async function SearchPayment(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
  let verify=await VerifyAdmin(req, res);
     if(verify==undefined){
    return res.status(401).json({ message: "Please login with admin credentails" });
    }
//  search by Tranasaction token
let AllData=[];
 if(req.body.Txn){
let data1=await PaymentSchemaDataBase.find({'PaymentInfo.BANKTXNID':{$regex : req.body.Txn},PaymentInfo: { $ne: "" }}).select("-UserId -FullAddress -PickUpTime -PickUpTime1 -PickUpTime2 -PaymentMethod -PaymentOrderStatus -AmountReceived -OrderId -ItemsOrder -createdAt -updatedAt -PaymentInfo.CHECKSUMHASH -PaymentInfo.MID -PaymentInfo.RESPCODE -PaymentInfo.TXNID -PaymentInfo.ORDERID")

let data2=await OrderSchemaDataBase.find({'PaymentInfo.BANKTXNID':{$regex : req.body.Txn}, PaymentInfo: { $ne: "" }}).select("-UserId -FullAddress -PickUpTime -PickUpTime1 -PickUpTime2 -PaymentMethod -PaymentOrderStatus -AmountReceived -OrderId -ItemsOrder -createdAt -updatedAt -PaymentInfo.CHECKSUMHASH -PaymentInfo.RESPMSG -PaymentInfo.MID -PaymentInfo.RESPCODE -PaymentInfo.TXNID -PaymentInfo.ORDERID")
if(data1.length!=0){
for(let i=0;i<data1.length;i++){
if(data1[i].PaymentInfo!=""){
AllData.push(data1[i])
}
}
}
if(data2.length!=0){
for(let i=0;i<data2.length;i++){
if(data2[i].PaymentInfo!=""){
AllData.push(data2[i])
}
}
}
return res.status(200).json({data:AllData})
 }


 if(req.body.cName){
let data1=await PaymentSchemaDataBase.find({'FullName':{$regex : req.body.cName}}).select("-UserId -FullAddress -PickUpTime -PickUpTime1 -PickUpTime2 -PaymentMethod -PaymentOrderStatus -AmountReceived -OrderId -ItemsOrder -createdAt -updatedAt -PaymentInfo.CHECKSUMHASH -PaymentInfo.MID -PaymentInfo.RESPCODE -PaymentInfo.TXNID -PaymentInfo.ORDERID")

let data2=await OrderSchemaDataBase.find({'FullName':{$regex : req.body.cName}}).select("-UserId -FullAddress -PickUpTime -PickUpTime1 -PickUpTime2 -PaymentMethod -PaymentOrderStatus -AmountReceived -OrderId -ItemsOrder -createdAt -updatedAt -PaymentInfo.CHECKSUMHASH -PaymentInfo.MID -PaymentInfo.RESPMSG -PaymentInfo.RESPCODE -PaymentInfo.TXNID -PaymentInfo.ORDERID")
if(data1.length!=0){
for(let i=0;i<data1.length;i++){
if(data1[i].PaymentInfo!=""){
AllData.push(data1[i])
}
}
}
if(data2.length!=0){
for(let i=0;i<data2.length;i++){
if(data2[i].PaymentInfo!=""){
AllData.push(data2[i])
}
}
}
return res.status(200).json({data:AllData})
 }


 if(req.body.oid){
let data1=await PaymentSchemaDataBase.find({'TokenUser':{$regex : req.body.oid},PaymentInfo: { $ne: "" }}).select("-UserId -FullAddress -PickUpTime -PickUpTime1 -PickUpTime2 -PaymentMethod -PaymentOrderStatus -AmountReceived -OrderId -ItemsOrder -createdAt -updatedAt -PaymentInfo.CHECKSUMHASH -PaymentInfo.MID -PaymentInfo.RESPCODE -PaymentInfo.TXNID -PaymentInfo.ORDERID")

let data2=await OrderSchemaDataBase.find({'TokenUser':{$regex : req.body.oid}}).select("-UserId -FullAddress -PickUpTime -PickUpTime1 -PickUpTime2 -PaymentMethod -PaymentOrderStatus -AmountReceived -OrderId -ItemsOrder -createdAt -updatedAt -PaymentInfo.CHECKSUMHASH -PaymentInfo.MID -PaymentInfo.RESPMSG -PaymentInfo.RESPCODE -PaymentInfo.TXNID -PaymentInfo.ORDERID")
if(data1.length!=0){
for(let i=0;i<data1.length;i++){
if(data1[i].PaymentInfo!=""){
AllData.push(data1[i])
}
}
}
if(data2.length!=0){
for(let i=0;i<data2.length;i++){
if(data2[i].PaymentInfo!=""){
AllData.push(data2[i])
}
}
}
return res.status(200).json({data:AllData})
 }


  if(req.body.amount){
let data1=await PaymentSchemaDataBase.find({'PaymentInfo.TXNAMOUNT':{$regex : req.body.amount},PaymentInfo: { $ne: "" }}).select("-UserId -FullAddress -PickUpTime -PickUpTime1 -PickUpTime2 -PaymentMethod -PaymentOrderStatus -AmountReceived -OrderId -ItemsOrder -createdAt -updatedAt -PaymentInfo.CHECKSUMHASH -PaymentInfo.MID -PaymentInfo.RESPCODE -PaymentInfo.TXNID -PaymentInfo.ORDERID")

let data2=await OrderSchemaDataBase.find({'PaymentInfo.TXNAMOUNT':{$regex : req.body.amount}}).select("-UserId -FullAddress -PickUpTime -PickUpTime1 -PickUpTime2 -PaymentMethod -PaymentOrderStatus -AmountReceived -OrderId -ItemsOrder -createdAt -updatedAt -PaymentInfo.CHECKSUMHASH -PaymentInfo.MID -PaymentInfo.RESPCODE -PaymentInfo.RESPMSG -PaymentInfo.TXNID -PaymentInfo.ORDERID")
if(data1.length!=0){
for(let i=0;i<data1.length;i++){
if(data1[i].PaymentInfo!=""){
AllData.push(data1[i])
}
}
}
if(data2.length!=0){
for(let i=0;i<data2.length;i++){
if(data2[i].PaymentInfo!=""){
AllData.push(data2[i])
}
}
}
return res.status(200).json({data:AllData})
 }

    }
    catch(e){
    console.log(e)
    res.status(501).json({status:"501",message:e})
    }
}
}
