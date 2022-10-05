import DbConnection from "./Middleware/DbConnection";
import OrderOnOffStatus from "./Schema/orderOnOff";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";


export default async function UpdateOnOffStatusSend(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
         await VerifyAdmin(req, res); 
 let _id=req.body.id;
let bol=req.body.Status;
let status=bol.toString(bol);
    if (!_id) {  res.status(400).json({ message: "Please Provide Id" }); }
    
let ress = await OrderOnOffStatus.findByIdAndUpdate(_id, {
        Status: status
      });
      if (ress) {
        res.status(201).json({ ress, status: "201" });
      }
     
    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
