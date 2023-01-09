import DbConnection from "./Middleware/DbConnection";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import CommentReports from './Schema/ReportComments'


export default async function ReportComments(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
 let res1=await VerifyClientUser(req, res);
   if(res1==undefined){
    return res.status(401).json({ message: "Please login with Client credentails" });
    }
  let CommentReportId=req.body.CommentReportId;  
  let NumberOfReports;  
  let Message=req.body.Message;  
  let UserId=req.body.UserId;  
let ReportUserId=res1.id;

if(ReportUserId==UserId){
    return res.status(400).json({ message: "You Can't report Your Own Comment" });
}

let findWheatherNewOrNot=await CommentReports.find({CommentReportId:CommentReportId});


// new report
if(findWheatherNewOrNot.length==0){
NumberOfReports=1;
const data = new CommentReports({
       CommentReportId,
       NumberOfReports,
       MessageSenderId:UserId,
       Message,
      IdsOfUserReport:[{ReportUserId:ReportUserId}]
      });
let resData=await data.save();
      if(resData){
return res.status(201).json({message:"comment successfully reported"})
      }
}
// already report
else{


let AlreadyGiveOrNot=findWheatherNewOrNot[0].IdsOfUserReport.filter((item)=>{
return item.ReportUserId==ReportUserId;
})

if(AlreadyGiveOrNot.length!=0){
return res.status(400).json({message:"You Already Report this comment"});
}
NumberOfReports=(findWheatherNewOrNot[0].NumberOfReports)+1;
await CommentReports.updateOne({CommentReportId:CommentReportId}, 
{$push: {IdsOfUserReport: [{ReportUserId:ReportUserId}]},NumberOfReports:NumberOfReports});
return res.status(201).json({message:"comment successfully reported"});
}






    } catch (error) {
    console.log(error)
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
