import DbConnection from "./Middleware/DbConnection";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import CommentReports from './Schema/ReportComments'
import ClientData from "./Schema/ClientData";
import ItemRatings from './Schema/ItemRating'

 const nodemailer = require("nodemailer");
 let transporter = nodemailer.createTransport({
   service:"gmail",
   auth:{
   user:process.env.NODEMAILER_GMAIL_ID,
   pass:process.env.NODEMAILER_GMAIL_PASS
   }
  });


export default async function ManageComments(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
 let res1=await VerifyAdmin(req, res);
   if(res1==undefined){
    return res.status(401).json({ message: "Please login with Admin credentails" });
    }

  let CommentReportId=req.body.id;  
  let status=req.body.status;
 let NewMessage="This Message is not visible because of toxic texts";
if(!CommentReportId){
return res.status(400).json({message:"Please Provide ID"})
}
if(!status){
return res.status(400).json({message:"Please Provide Status"})
}



let findComment=await CommentReports.findById(CommentReportId);
// toxic comment
if(findComment==null){
return res.status(400).json({message:"Sorry This comment already Proccessed"})
}



if(status=="yes"){
let clientDataFind=await ClientData.findById(findComment.MessageSenderId);
   const mailoption={
from:process.env.NODEMAILER_GMAIL_ID,
to:clientDataFind.Email,
subject:"Inappropriate Comment Found on SD CANTEEN posted by You",
 html:`
 <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
 <div style="text-align:center"><h4>Hii , ${clientDataFind.FullName}</h4></div>

<div style="text-align:center;margin-top:3%;margin-bottom:2%">Inappropriate Comment Found </div>

<div style="font-size:3.5vw;color:#4f4f4f;margin-top:4%">Your Comment : <b>${findComment.Message}</b> contain inappropriate tex</div>

<div style="text-align:center;margin-top:3%;margin-bottom:2%">You Can Change this comment with proper text in item review section</div>
<div style="text-align:center;margin-top:3%;margin-bottom:2%">Please use sd canteen website with proper rules and regulations</div>
<div style="text-align:center;margin-top:3%;margin-bottom:2%">Don't use toxic languages in comment sections of items</div>
<div style="font-size:3vw;text-align:center;color:#383838;margin-top:5%">Thank You,</div>
<div style="font-size:evw;text-align:center;color: rgb(255, 98, 0);">Team SD CANTEEN</div>
<div style="font-size:2vw;text-align:center;color:#4f4f4f;margin-top:6%;margin-bottom:6%">Please follow proper guidelines issued by sd canteen</div> 
 <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
`}
transporter.sendMail(mailoption,function(error,info){
if(error){
return res.status(401).json({message:error,status:"401"});
}
})


  await ItemRatings.updateMany(
        { "ItemsReviwers._id": findComment.CommentReportId, "ItemsReviwers.userId": findComment.MessageSenderId },
        {
          $set: {
            "ItemsReviwers.$.Message": NewMessage,
          },
        }
      );
      await CommentReports.findByIdAndDelete(findComment._id)
      return res.status(200).json({message:"successfully this comment taken down"})
}
// not toxic comments

else{
  await CommentReports.findByIdAndDelete(findComment._id)
     return res.status(200).json({message:"successfully manage this comment"})
}



    } catch (error) {
    console.log(error)
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
