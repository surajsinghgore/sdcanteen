import DbConnection from "./Middleware/DbConnection";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import CommentReports from './Schema/ReportComments'


export default async function ShowToxicComments(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
 let res1=await VerifyAdmin(req, res);
   if(res1==undefined){
    return res.status(401).json({ message: "Please login with Admin credentails" });
    }
let allComments=await CommentReports.find();
return res.status(200).json({data:allComments})

    } catch (error) {
    console.log(error)
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
