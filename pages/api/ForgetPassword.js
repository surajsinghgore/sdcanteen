import DbConnection from "./Middleware/DbConnection";
const bcrypt = require('bcryptjs');
import ClientData from "./Schema/ClientData";
import ForgetPasswordSchema from "./Schema/ForgetPassword";
import nextConnect from "next-connect";
const handler = nextConnect();


 const nodemailer = require("nodemailer");
 let transporter = nodemailer.createTransport({
   service:"gmail",
   auth:{
   user:process.env.NODEMAILER_GMAIL_ID,
   pass:process.env.NODEMAILER_GMAIL_PASS
   }
  });





handler.post(
async(req, res) => {
  try {
    DbConnection();
  
    
    let newPassword = req.body.newPassword;
    let Email = req.body.Email;
    let Otp = req.body.Otp;
    if (!newPassword) {
      res.status(400).json({ message: "Please Enter New Password" });
    }
    if (!Email) {
      res.status(400).json({ message: "Please Try Again by refreshing the web page" });
    }
    if (!Otp) {
      res.status(400).json({ message: "Please Enter Otp" });
    }
let d=Otp.toString();
if(d.length!=6){
return res.status(400).json({message:"Please Provide 6 Digit Otp"})
}
// data fetch
let findClientData=await ClientData.findOne({Email:Email});
let findForgetPass=await ForgetPasswordSchema.findOne({EmailId:Email});


if(findForgetPass.Otp==null){
return res.status(403).json({message:"Otp Exired, Please Try Again with new Otp"})
}
if(findForgetPass.Otp!=Otp){
return res.status(400).json({message:"Otp Is wrong, please give correct Otp"})
}

const compnewPassword=await bcrypt.compare(newPassword,findClientData.Password);
if(compnewPassword){
   return res.status(400).json({message:"Reset Password is same as current password"})
}


const salt=await bcrypt.genSaltSync(10);
const securePassword=await bcrypt.hash(newPassword,salt);
 await ClientData.findByIdAndUpdate(findClientData._id,{"Password":securePassword})
    const mailoption={
from:process.env.NODEMAILER_GMAIL_ID,
to:findClientData.Email,
subject:"Password Changed for Your SD CANTEEN Account",
attachments: [{
        filename: 'logo.png',
        path: './public/logo.png',
        cid: 'img' 
    }],

 html:`
 <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
 <div style="text-align:center">
  <img src="cid:img" style="width:150px;margin-top:2%"/>
 </div>
 <div style="text-align:center"><h4>Hii , ${findClientData.FullName}</h4></div>
 <div style="color:rgb(104, 104, 104);text-align:center;font-size:4vw">
Welcome to SD CANTEEN!
 </div>
<div style="text-align:center;margin-top:3%;margin-bottom:2%">Your Sd Canteen Account Password Recovered Successfully  </div>

<div style="font-size:3vw;color:#4f4f4f;margin-top:4%"><b>Note:</b> Please Contact Help Center if you not make this request</div>
<div style="font-size:3vw;text-align:center;color:#383838;margin-top:5%">Thank You,</div>
<div style="font-size:evw;text-align:center;color: rgb(255, 98, 0);">Team SD CANTEEN</div>
<div style="font-size:2vw;text-align:center;color:#4f4f4f;margin-top:6%;margin-bottom:6%">If you did not make this request, you can safely ignore this message.</div> 
 <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
`}

transporter.sendMail(mailoption,function(error,info){
if(error){
console.log(Error)
return res.status(401).json({message:error,status:400});
}

})



   return res.status(201).json({message:"Password Reset Successfully"})


  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", status: "501" });
  }
});








export default handler;
