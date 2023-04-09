import DbConnection from "./Middleware/DbConnection";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import OrderSchemaDataBase from "./Schema/OrderSchema";


export default async function CodEnableCheck(req, res) {
  try {
    DbConnection();
    let res1 = await VerifyClientUser(req, res);
    if (res1 == undefined) {
      return res
        .status(401)
        .json({ message: "Please login with Client credentails" });
    }
    let id = res1.id;
    if (!id) {
      return res
        .status(401)
        .json({ message: "please Provide Id To Find Record Of User" });
    }
   
   let checkData=await OrderSchemaDataBase.find({UserId:id,OrderStatus:"reject"})
if(checkData.length!=0){
return res.status(400).send('disable');
}
return res.status(200).send('right');
  } catch (error) {
  console.log(error)
    res.status(501).json({ message: error, status: "501" });
  }
}
