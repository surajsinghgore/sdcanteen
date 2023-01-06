import DbConnection from "./Middleware/DbConnection";
import OrderOnOffStatus from "./Schema/OrderOnOff";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";


export default async function OrderOnOffStatusSend(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
      let verify=await VerifyAdmin(req, res);

 if(verify==undefined){

    return res.status(401).json({ message: "Please login with admin credentails" });
    }

let bol=req.body.Status
let status=bol.toString(bol);
if((status=="true") || (status=="false")){
 const datas=new OrderOnOffStatus({
 Status:status
 });


 datas.save();

return res.status(201).send({message:"Successfully Updated"});
}
else{
return res.status(400).send({message:"Status is Empty"});
}
     
    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
