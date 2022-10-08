import DbConnection from "./Middleware/DbConnection";
import OrderSchemaDataBase from "./Schema/OrderSchema";

export default async function ShowOrdersRealtime(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();

let currentDate=new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth()+1;
let year = currentDate.getFullYear();
const OrderDate=`${day}.${month}.${year}`;



let Alldata=await OrderSchemaDataBase.find().sort({PickUpTime1:1}).select('-createdAt -updatedAt -UserId -TokenNumber');

let data=await Alldata.filter((item)=>{
return item.OrderDate.includes(OrderDate)
})

 res.status(201).json({status:"201",data:data})
    }
    catch(e){
    console.log(e)
    res.status(501).json({status:"501",message:e})
    }
}
}