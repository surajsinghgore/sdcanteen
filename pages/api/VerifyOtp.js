import DbConnection from "./Middleware/DbConnection";
import ClientRegistrationTemporary from "./Schema/ClientRegistrationTemp";
import ClientData from "./Schema/ClientData";
export default async function VerifyOtp(req, res) {
  if (req.method == "POST") {
    try {
  DbConnection();
let Email = req.body.Email;
let Otp = req.body.Otp;
if((!Email)&&(!Mobile)){
return res.status(401).json({message:"Please Enter Mobile Or Email Id",status:"401"})
}
if(!Otp){
return res.status(401).json({message:"Please Provide Otp",status:"401"})
}
const checkEmail=await ClientRegistrationTemporary.findOne({Email: Email});
if(checkEmail){
if(checkEmail.Otp==null){
    return res.status(400).json({message:"Otp Expired",status:"400"})
}
else if(checkEmail.Otp==Otp){
const checkEmail1=await ClientData.findOne({Email: checkEmail.Email});
const checkMobile1=await ClientData.findOne({Mobile: checkEmail.Mobile});
if(checkEmail1){
    return res.status(401).json({message:"This Email Id Is Already Exits",status:"401"})
}
if(checkMobile1){
    return res.status(401).json({message:"This Mobile Number Is Already Exits",status:"401"})
}
    let Items = new ClientData({
      FullName:checkEmail.FullName,
      Age:checkEmail.Age,
      Email:checkEmail.Email,
      Mobile:checkEmail.Mobile,
      Gender:checkEmail.Gender,
      Profile:"",
      FullAddress:checkEmail.FullAddress,
      Password:checkEmail.Password,
    });
    let ress = await Items.save();
    if(ress){
    await ClientRegistrationTemporary.findByIdAndDelete(checkEmail._id)
    return res.status(201).json({message:"Successfully Verified",status:"201"})
    }
}
else{
    return res.status(401).json({message:"Otp Is Wrong",status:"401"})

}
}
else{
    return res.status(403).json({message:"Not Valid Account",status:"403"})

}
  }
  catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", status: "501" });
  }
}

}

