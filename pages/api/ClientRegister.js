import DbConnection from "./Middleware/DbConnection";
import ClientRegistrationTemporary from "./Schema/ClientRegistrationTemp";
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
import ClientData from "./Schema/ClientData";
const otpGenerator = require('otp-generator')
import nextConnect from "next-connect";
const handler = nextConnect();
var cookie = require('cookie');

 const nodemailer = require("nodemailer");
 let transporter = nodemailer.createTransport({
   service:"gmail",
   auth:{
   user:process.env.NODEMAILER_GMAIL_ID,
   pass:process.env.NODEMAILER_GMAIL_PASS
   }
  });





handler.post(
 body('FullName',"FullName must contain atleast 3 characters").isLength({ min: 3 }),
body('Email',"Email id is not valid").isEmail(),
body('Mobile',"Mobile must contain atleast 10 number").isLength({ min: 10 }),
body('Password',"Password must be contain atleast 5 character").isLength({ min: 5 })
    , async(req, res) => {
  try {
    DbConnection();
    let optGenerateNumber=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});
let numberGenerate=parseInt(optGenerateNumber);
let count=0;
let sum=0;
while (numberGenerate) {
    sum += numberGenerate % 10;
    ++count;
    numberGenerate = Math.floor(numberGenerate / 10);
}

if(count!==6){
return res.status(400).json({message:"Sorry Something went wrong,Please Register Again",otpError:"true"})
}


 
    let FullName = req.body.FullName;
    let Age = req.body.Age;
    let Email = req.body.Email;
    let Mobile = req.body.Mobile;
    let Gender = req.body.Gender;
    let FullAddress = req.body.FullAddress;
    let Password = req.body.Password;
const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() ,status:"400"});
    }
    if (!Age) {
      res.status(401).json({ message: "Please Enter Age" });
    }
     else if (!Gender) {
      res.status(401).json({ message: "Please Enter Gender" });
    }
     else if (!FullAddress) {
      res.status(401).json({ message: "Please Enter FullAddress" });
    }

 //    checking weather email is already exists or not
const checkEmail=await ClientRegistrationTemporary.findOne({Email: Email}).select('-Password -Otp -Verify -createdAt -updatedAt');
if(checkEmail){
if(checkEmail.Otp==null){
 const ress=await ClientRegistrationTemporary.findByIdAndUpdate(checkEmail._id, { Otp: optGenerateNumber });
    const mailoption={
from:process.env.NODEMAILER_GMAIL_ID,
to:ress.Email,
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
 <div style="text-align:center"><h4>Hii , ${ress.FullName}</h4></div>
 <div style="color:rgb(104, 104, 104);text-align:center;font-size:4vw">
Welcome to SD CANTEEN!
 </div>
<div style="text-align:center;margin-top:3%;margin-bottom:2%">Your 6 Digit Otp is : </div>
<div style="border:2px dotted rgb(255, 98, 0);padding:1% 3% 1% 3%;font-size:6vw;text-align:center;color:red;margin-top:10%;margin-bottom:10%">${ress.Otp}</div>
<div style="font-size:3vw;color:#4f4f4f;margin-top:4%"><b>Note:</b> The OTP will expire in 10 minutes and can only be used once.</div>
<div style="font-size:3vw;text-align:center;color:#383838;margin-top:5%">Thank You,</div>
<div style="font-size:evw;text-align:center;color: rgb(255, 98, 0);">Team SD CANTEEN</div>
<div style="font-size:2vw;text-align:center;color:#4f4f4f;margin-top:6%;margin-bottom:6%">If you did not make this request, you can safely ignore this message.</div> 
 <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
`}

transporter.sendMail(mailoption,function(error,info){
if(error){
return res.status(401).json({message:error,status:"401"});
}
return res.status(201).json({data:ress,message:"successfully otp send to email Id",status:"201"}) 
})
async function OtpExpired(){
await ClientRegistrationTemporary.findByIdAndUpdate(checkEmail._id, { Otp: null });
}
setTimeout(OtpExpired, 600000);
}
else if(checkEmail.Verify==false){
res.status(201).json({data:checkEmail,message:"successfully otp send to email Id",status:"201"})
}
}

else{
const checkEmail1=await ClientData.findOne({Email: Email}).select('-Password');
const checkMobile1=await ClientData.findOne({Mobile: Mobile}).select('-Password');
if(checkEmail1){
    return res.status(401).json({message:"This Email Id Is Already Exits",status:"401"})
}
if(checkMobile1){
    return res.status(401).json({message:"This Mobile Number Is Already Exits",status:"401"})

}
const salt=await bcrypt.genSaltSync(10);
const securePassword=await bcrypt.hash(Password,salt);
    let Items = new ClientRegistrationTemporary({
      FullName,
      Age,
      Email,
      Mobile,
      Gender,
      FullAddress,
      Password:securePassword,
      Otp:optGenerateNumber,
      Verify:false
    });



    let ress = await Items.save();
let ressData=await ClientRegistrationTemporary.findById(ress._id).select('-Password -Otp -Verify -createdAt -updatedAt');

    if(ress){
    let sendEmail=ress.Email;
    let sendFullName=ress.FullName;
    let sendOtp=ress.Otp;
    const mailoption={
from:process.env.NODEMAILER_GMAIL_ID,
to:sendEmail,
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
 <div style="text-align:center"><h4>Hii , ${sendFullName}</h4></div>
 <div style="color:rgb(104, 104, 104);text-align:center;font-size:4vw">
Welcome to SD CANTEEN!
 </div>
<div style="text-align:center;margin-top:3%;margin-bottom:2%">Your 6 Digit Otp is : </div>
<div style="border:2px dotted rgb(255, 98, 0);padding:1% 3% 1% 3%;font-size:6vw;text-align:center;color:red;margin-top:10%;margin-bottom:10%">${sendOtp}</div>
<div style="font-size:3vw;color:#4f4f4f;margin-top:4%"><b>Note:</b> The OTP will expire in 10 minutes and can only be used once.</div>
<div style="font-size:3vw;text-align:center;color:#383838;margin-top:5%">Thank You,</div>
<div style="font-size:evw;text-align:center;color: rgb(255, 98, 0);">Team SD CANTEEN</div>
<div style="font-size:2vw;text-align:center;color:#4f4f4f;margin-top:6%;margin-bottom:6%">If you did not make this request, you can safely ignore this message.</div> 
 <div style="color:blue;background-color:rgb(255, 98, 0);padding:1% 0% 1% 3%;color:white;font-size:4vw">SD CANTEEN</div>
`}

transporter.sendMail(mailoption,function(error,info){
if(error){
return res.status(401).json({message:error,status:"401"});
}
})
async function OtpExpired(){
   await ClientRegistrationTemporary.findByIdAndDelete(ress._id)
await ClientRegistrationTemporary.findByIdAndUpdate(ress._id, { Otp: null });
}
setTimeout(OtpExpired, 600000);
  return res.status(201).json({data:ressData,message:"successfully otp send to email Id",status:"201"}) 
    }
}
   
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", status: "501" });
  }
});








export default handler;
