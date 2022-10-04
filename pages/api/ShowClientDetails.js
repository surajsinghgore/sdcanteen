import DbConnection from "./Middleware/DbConnection";
import ClientData from "./Schema/ClientData";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";

export default async function ShowClientDeatils(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
 await VerifyClientUser(req, res);
      let id=req.cookies.clinetId;
      if(!id){
      res.status(401).json({ message: "please Provide Id To Find Record Of User" });
      }
      let data = await ClientData.findById(id).select('-Password -createdAt -updatedAt');
      if(!data){
      res.status(404).json({message:"Wrong user Id",wrongUser:"true"})
      }
      res.status(201).json({ data, status: "201" });
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
