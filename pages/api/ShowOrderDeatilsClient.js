import DbConnection from "./Middleware/DbConnection";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import OrderSchemaDataBase from "./Schema/OrderSchema";

export default async function ShowOrderDeatilsClient
(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
 let res1=await VerifyClientUser(req, res);
   if(res1==undefined){
    return res.status(401).json({ message: "Please login with Client credentails" });
    }

      let UserId=res1.id;
let currentDate=new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth()+1;
let year = currentDate.getFullYear();
const OrderDate=`${day}.${month}.${year}`;
let data=await OrderSchemaDataBase.find({UserId,OrderDate:OrderDate,OrderStatus:"Pending"}).sort({PickUpTime1:1}).select("-createdAt -updatedAt -PaymentInfo -OrderId -PickUpTime1 -UserId")



      res.status(201).json({ data, status: "201" });
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
