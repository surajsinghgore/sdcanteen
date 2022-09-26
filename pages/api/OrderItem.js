import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import DbConnection from "./Middleware/DbConnection";
import ClientDatas from "./Schema/ClientData";
import OrderSchemaDataBase from "./Schema/OrderSchema";
var randtoken = require('rand-token');



export default async function AddCoffeeCategory(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
      await VerifyClientUser(req, res);
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
 res.status(201).json({status:"201",message:"Success",tokenUser:ress.TokenUser})
    }
    catch(e){
    console.log(e)
    res.status(501).json({status:"501",message:e})
    }
}
}
