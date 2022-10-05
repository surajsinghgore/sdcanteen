import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import DbConnection from "./Middleware/DbConnection";
import ClientDatas from "./Schema/ClientData";
import OrderSchemaDataBase from "./Schema/OrderSchema";

export default async function ShowOrdersRealtime(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
let data=await OrderSchemaDataBase.find().select('-createdAt -updatedAt -UserId -TokenNumber');

 res.status(201).json({status:"201",data:data})
    }
    catch(e){
    console.log(e)
    res.status(501).json({status:"501",message:e})
    }
}
}