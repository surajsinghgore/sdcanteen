import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import DbConnection from "./Middleware/DbConnection";
import ClientDatas from "./Schema/ClientData";
import OrderSchemaDataBase from "./Schema/OrderSchema";
var randtoken = require('rand-token');



export default async function AddCoffeeCategory(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      await VerifyClientUser(req, res);
      const _id=req.body._id;
      const UserId=req.body._id;
if(!_id){
 res.status(401).json({status:"401",message:"Please Provide Valid User Id"})  
}
   const findClientData=await ClientDatas.findById({_id}).select('-Password -createdAt -updatedAt -Age -Gender -Profile');
      if(!findClientData){
    res.status(404).json({status:"404",message:"Record Not Find with this User Id"})
      }

let data=await OrderSchemaDataBase.findOne({UserId:UserId}).select('-Email -Mobile -TokenNumber -AmountReceived -FullAddress -UserId -createdAt -updatedAt');
 res.status(201).json({status:"201",data:data})
    }
    catch(e){
    console.log(e)
    res.status(501).json({status:"501",message:e})
    }
}
}