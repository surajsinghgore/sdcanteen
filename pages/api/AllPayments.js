import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import OrderSchemaDataBase from "./Schema/OrderSchema";
import DbConnection from "./Middleware/DbConnection";
import PaymentSchemaDataBase from "./Schema/PaymentSchema";
// payemnt data base conatin failed pending and initaited records
export default async function AllPayments(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
  let verify=await VerifyAdmin(req, res);
     if(verify==undefined){
    return res.status(401).json({ message: "Please login with admin credentails" });
    }
  
  let dif=req.body.diff;
// get only unique years for select form
  if(dif!=undefined){
      let AllData = await OrderSchemaDataBase.find()
let allYears=[]
for(let i=0;i<AllData.length;i++){
    let allDated=AllData[i].OrderDate.split(".");
    allYears.push(allDated[2])
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
var unique = allYears.filter(onlyUnique);
return res.status(200).json({year:unique})
  }
else{
let month=req.body.month;
let year=req.body.year;
let status=req.body.status;
if(!month){
return res.status(400).json({message:"Please Provide Month"})
}
if(!year){
return res.status(400).json({message:"Please Provide Year"})
}
if(!status){
return res.status(400).json({message:"Please Provide Status"})
}
if(status=="TXN_SUCCESS"){
    let AllData = await OrderSchemaDataBase.find().select("-UserId -FullAddress -PickUpTime -PickUpTime1 -PickUpTime2 -PaymentMethod -PaymentOrderStatus -AmountReceived -OrderId -ItemsOrder -createdAt -updatedAt -PaymentInfo.CHECKSUMHASH -PaymentInfo.MID -PaymentInfo.RESPCODE -PaymentInfo.RESPMSG -PaymentInfo.TXNID -PaymentInfo.ORDERID")
let newData=[];
for(let i=0;i<AllData.length;i++){
    let allDated=AllData[i].OrderDate.split(".");
          //[ 0 Date| 1 Month | 2 Year ] split function
if((allDated[1]==month)&&(allDated[2]==year)&&(AllData[i].PaymentInfo.STATUS==status)){
newData.push(AllData[i])
}
}
  return res.status(200).json({data:newData})
}

else{
  let AllData = await PaymentSchemaDataBase.find().select("-UserId -FullAddress -PickUpTime -PickUpTime1 -PickUpTime2 -PaymentMethod -PaymentOrderStatus -AmountReceived -OrderId -ItemsOrder -createdAt -updatedAt -PaymentInfo.CHECKSUMHASH -PaymentInfo.MID -PaymentInfo.RESPCODE -PaymentInfo.TXNID -PaymentInfo.ORDERID")
let newData=[];
for(let i=0;i<AllData.length;i++){
    let allDated=AllData[i].OrderDate.split(".");
          //[ 0 Date| 1 Month | 2 Year ] split function
if((allDated[1]==month)&&(allDated[2]==year)&&(AllData[i].PaymentInfo.STATUS==status)){
newData.push(AllData[i])
}
}
  return res.status(200).json({data:newData})


}



}
    }
    catch(e){
    console.log(e)
    res.status(501).json({status:"501",message:e})
    }
}
}
