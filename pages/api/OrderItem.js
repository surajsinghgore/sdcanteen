import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import DbConnection from "./Middleware/DbConnection";
import ClientDatas from "./Schema/ClientData";
import OrderSchemaDataBase from "./Schema/OrderSchema";




var randtoken = require('rand-token');
// email Send Initilaized
 const nodemailer = require("nodemailer");
 const ejs = require("ejs");
 let transporter = nodemailer.createTransport({
   service:"gmail",
   auth:{
   user:process.env.NODEMAILER_GMAIL_ID,
   pass:process.env.NODEMAILER_GMAIL_PASS
   }
  });


export default async function AddCoffeeCategory(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
     let res1=await VerifyClientUser(req, res);
  if(res1==undefined){
    return res.status(401).json({ message: "Please login with Client credentails" });
    }


    
      const _id=req.cookies.clinetId;
      const findClientData=await ClientDatas.findById({_id}).select('-Password -createdAt -updatedAt -Age -Gender -Profile');
      if(!findClientData){
    res.status(404).json({status:"404",message:"Record Not Find with this User Id"})
      }
let currentDate=new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth()+1;
let year = currentDate.getFullYear();
let hours=currentDate.getHours();
let OrderTimes;
let m=parseInt(currentDate.getMinutes());
if(m<=9){
m = '0'+m;
}
if(hours>=12){
OrderTimes=currentDate.getHours()+"-"+m+" PM";
}
else{
OrderTimes=currentDate.getHours()+"-"+m+" AM";
}
      
const Email=findClientData.Email;
      const Mobile=findClientData.Mobile;
      const FullAddress=findClientData.FullAddress;
      const FullName=findClientData.FullName;
      const PickUpTime=req.body.PickUpTime;
      const PickUpTime1=parseFloat(req.body.PickUpTime1).toFixed(2);
      const PickUpTime2=parseFloat(req.body.PickUpTime1).toFixed(2);
      const PaymentMethod=req.body.PaymentMethod;
      const UserId=req.cookies.clinetId;
      const TotalAmount=req.body.TotalAmount;
      const OrderTime=OrderTimes;
    
      const OrderDate=`${day}.${month}.${year}`;

let array=[];
// geneate unqiue token 
    var token = randtoken.generate(16);
    var token1 = randtoken.generate(6);
    const TokenNumber=token;
    const TokenUser=token1;

for(let i=0;i<req.body.ItemsOrder.length;i++){
    const ItemName=req.body.ItemsOrder[i].ItemName;
      const Qty=req.body.ItemsOrder[i].Qty;
      const Amount=req.body.ItemsOrder[i].Amount;
      const ProductOriginalAmount=req.body.ItemsOrder[i].ProductOriginalAmount;
      const Category=req.body.ItemsOrder[i].Category;
      const Size=req.body.ItemsOrder[i].Size;
      const CategoryPrimary=req.body.ItemsOrder[i].CategoryPrimary;
      array.push({ItemName,Qty,Amount,Category,Size,CategoryPrimary,ProductOriginalAmount})  
}
 const sendItem=new OrderSchemaDataBase({UserId,
      Email,Mobile,FullAddress,FullName,PickUpTime,PickUpTime1,PaymentMethod,OrderTime,OrderDate,TotalAmount,TokenNumber,TokenUser,PickUpTime2,
      ItemsOrder:array
      })
      let ress=await sendItem.save();

      let data=[];
if(ress.ItemsOrder){
data=ress.ItemsOrder
}
let dataFile="./pages/api/EmailOrder.ejs";
let datas=await ejs.renderFile(dataFile,{data:data,userName:FullName,TotalAmount:TotalAmount,TokenUser:TokenUser,PickUpTime:PickUpTime,OrderTime:OrderTime,OrderDate:OrderDate,totalItem:req.body.ItemsOrder.length})
// send Mail
 const mailoption={
from:process.env.NODEMAILER_GMAIL_ID,
to:ress.Email,
subject:"Order Confirmed !",
 html:datas
 }
 transporter.sendMail(mailoption,function(error,info){
if(error){
console.log('error',error)
return res.status(401).json({message:error,status:"401"});
}
})

 return res.status(201).json({status:"201",message:"Success",tokenUser:ress.TokenUser})

    }
    catch(e){
    console.log(e)
    res.status(501).json({status:"501",message:e})
    }
}
}
