import DbConnection from "./Middleware/DbConnection";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";

export default async function VerifyAdminLogin(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      let verify=await VerifyAdmin(req, res);
      if(verify==undefined){
 return res.status(403).send({ message: "not login", status: "403" });
      
      }
      else{
      
 return res.status(201).send({ message: "successfully", status: "201" });
      
      }
    } catch (error) {
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
