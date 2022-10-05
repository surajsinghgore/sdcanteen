import DbConnection from "./Middleware/DbConnection";
import OrderOnOffStatus from "./Schema/orderOnOff";

export default async function ShowOnOffStatus(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
const data=await OrderOnOffStatus.find().select('-createdAt -updatedAt ')
if(data.length!=0){
return res.status(201).json({message:"Successfully Updated",data:data});
}
return res.status(404).send({message:"Not Found"});
    } catch (error) {
    console.log(error)
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
