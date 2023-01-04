import DbConnection from "./Middleware/DbConnection";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import OrderSchemaDataBase from "./Schema/OrderSchema";

export default async function ShowAllOrderClient
(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
 let res1=await VerifyClientUser(req, res);
  if(res1==undefined){
    return res.status(401).json({ message: "Please login with Client credentails" });
    }

      let UserId=res1.id;  
let data=await OrderSchemaDataBase.find({UserId}).sort({"OrderDate":-1,"PickUpTime2":-1}).select("-createdAt -updatedAt -PaymentInfo -OrderId -PickUpTime1 -UserId")

console.log(data)

      res.status(201).json({ data, status: "201" });
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
