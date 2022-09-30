import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import DbConnection from "./Middleware/DbConnection";
import ClientDatas from "./Schema/ClientData";
import OrderSchemaDataBase from "./Schema/OrderSchema";
var randtoken = require('rand-token');

// email Send Initilaized
 const nodemailer = require("nodemailer");
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
 if(res1!=undefined){
       const _id=req.body._id;
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
if(hours>=12){
OrderTimes=currentDate.getHours()+"-"+(currentDate.getMinutes()+1)+" PM";
}
else{
OrderTimes=currentDate.getHours()+"-"+(currentDate.getMinutes()+1)+" AM";
}
      
const Email=findClientData.Email;
      const Mobile=findClientData.Mobile;
      const FullAddress=findClientData.FullAddress;
      const FullName=findClientData.FullName;
      const PickUpTime=req.body.PickUpTime;
      const PaymentMethod=req.body.PaymentMethod;
      const UserId=req.body._id;
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
      array.push({ItemName,Qty,Amount,Category,ProductOriginalAmount})  
}
 const sendItem=new OrderSchemaDataBase({UserId,
      Email,Mobile,FullAddress,FullName,PickUpTime,PaymentMethod,OrderTime,OrderDate,TotalAmount,TokenNumber,TokenUser,
      ItemsOrder:array
      })
      let ress=await sendItem.save();

      // let data=[];

// for(let i=0;i<ress.ItemsOrder.length;i++){

// console.log(ress.ItemsOrder[i].ItemName,  ress.ItemsOrder[i].ProductOriginalAmount,
//  ress.ItemsOrder[i].Qty ,  ress.ItemsOrder[i].Amount, ress.ItemsOrder[i].Category)
// }
// send Mail
//  const mailoption={
// from:process.env.NODEMAILER_GMAIL_ID,
// to:ress.Email,
// subject:"Order Confirmed !",
//  html:`

//  <div class='scoreboard'>
 
//  </div>
//  <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
//  <div style="text-align:center">
//   <img src="cid:img" style="width:150px;margin-top:2%"/>
//  </div>
//  <div style="padding-left:3%"><h3>Hey , ${ress.FullName}</h3></div>
//   <div style="padding-left:3%"><h4>✔️, Your Order is Confirmed!</h4></div>
//     <div style="padding-left:2%"><h4>Thanks for order, Your has been received and is now being processed . Your order details are show below for your references:</h4></div>
// <div style="text-align:center">
// <table style="border: 1px solid #333;">
// <tr>
// <thead>
// <th style="width:20%">Food Name</th>
// <th style="width:20%">Price</th>
// <th style="width:20%">Qty</th>
// <th style="width:20%">Total</th>
// <th style="width:20%">Category</th>
// </thead>
// </tr>
// <tr>
// <td style="text-align:center">${ress.ItemsOrder[0].ItemName}</td>
// <td style="text-align:center">${ress.ItemsOrder[0].ProductOriginalAmount}</td>
// <td style="text-align:center">${ress.ItemsOrder[0].Qty}</td>
// <td style="text-align:center">${ress.ItemsOrder[0].Amount}</td>
// <td style="text-align:center">${ress.ItemsOrder[0].Category}</td>
// </tr>
// </table>
// </div> 
// <div style="text-align:center;margin-top:3%;margin-bottom:2%"><h4>Total Payable Amount: <span style="color:red">${ress.TotalAmount}</span></h4></div>
// <div style="text-align:center;margin-top:3%;margin-bottom:2%"><h3>Your 6 Digit Token is : </h3></div>
// <div style="border:2px dotted rgb(255, 98, 0);padding:1% 3% 1% 3%;font-size:6vw;text-align:center;color:red;margin-top:10%;margin-bottom:10%">${ress.TokenUser}</div>
// <div style="font-size:3vw;text-align:center;color:#383838;margin-top:5%">Thank You,</div>
// <div style="font-size:evw;text-align:center;color: rgb(255, 98, 0);">Team SD CANTEEN</div>
//  <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
// `}


//  transporter.sendMail(mailoption,function(error,info){
// if(error){
// console.log(error)
// return res.status(401).json({message:error,status:"401"});
// }
// })

 return res.status(201).json({status:"201",message:"Success",tokenUser:ress.TokenUser})
 }
  
    }
    catch(e){
    console.log(e)
    res.status(501).json({status:"501",message:e})
    }
}
}
