import DbConnection from "./Middleware/DbConnection";
import ItemRatings from "./Schema/ItemsAnaylsis";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";

export default async function RatingItems(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
 let res1=await VerifyClientUser(req, res);
   if(res1==undefined){
    return res.status(401).json({ message: "Please login with Client credentails" });
    }


      let id=req.cookies.clinetId;
      if(!id){
      res.status(401).json({ message: "please Provide Id To Find Record Of User" });
      }
    



    
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
