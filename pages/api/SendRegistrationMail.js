import ClientRegistrationTemporary from "./Schema/ClientRegistrationTemp";
 const nodemailer = require("nodemailer");

 let transporter = nodemailer.createTransport({
   service:"gmail",
   auth:{
   user:process.env.NODEMAILER_GMAIL_ID,
   pass:process.env.NODEMAILER_GMAIL_PASS
   }
  });

const SendRegistrationMail = async (req,res) => {
  try {
  if(!user){
  return res.status(401).json({message:"Please Provide User For Email Send",status:"401"});
  }
const checkEmail=await ClientRegistrationTemporary.findOne({Email: user.Email});
if(checkEmail){
if(checkEmail.Verify==false){
const mailoption={
from:process.env.NODEMAILER_GMAIL_ID,
to:user.Email,
subject:"Finish creating your account on SD CANTEEN",
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
 <div style="text-align:center"><h4>Hii , ${checkEmail.FullName}</h4></div>
 <div style="color:rgb(104, 104, 104);text-align:center;font-size:4vw">
Welcome to SD CANTEEN!
 </div>
<div style="text-align:center;margin-top:3%;margin-bottom:2%">Your 6 Digit Otp is : </div>
<div style="border:2px dotted rgb(255, 98, 0);padding:1% 3% 1% 3%;font-size:6vw;text-align:center;color:red;margin-top:10%;margin-bottom:10%">${user.Otp}</div>
<div style="font-size:3vw;color:#4f4f4f;margin-top:4%"><b>Note:</b> The OTP will expire in 10 minutes and can only be used once.</div>
<div style="font-size:3vw;text-align:center;color:#383838;margin-top:5%">Thank You,</div>
<div style="font-size:evw;text-align:center;color: rgb(255, 98, 0);">Team SD CANTEEN</div>
<div style="font-size:2vw;text-align:center;color:#4f4f4f;margin-top:6%;margin-bottom:6%">If you did not make this request, you can safely ignore this message.</div> 
 <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
`}

transporter.sendMail(mailoption,function(error,info){
if(error){

console.log(error)
return res.status(401).json({message:error,status:"401"});
}
else{
console.log("sucessfully send")
}
})
} 
  } 
  }
  catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", status: "501" });
  }
};


export default SendRegistrationMail;
