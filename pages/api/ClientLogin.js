const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const { body, validationResult } = require('express-validator');
import ClientData from "./Schema/ClientData";
import nextConnect from "next-connect";
const handler = nextConnect();

handler.post(
  body('Password',"password cannot be empty").exists(), async(req, res) => {

  if (req.method !== "POST") {
    return res.status(400).json({ message: "Only POST requests allowed" });
  }
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}



const{Email,Mobile,Password}=req.body;

if((!Email)&&(!Mobile)){
  return  res.status(400).json({message:"Please Enter Email Or Mobile To Login"})

}

try {
if(!Mobile){
  // find user with email
  const userDetails=await ClientData.findOne({Email});
  if(!userDetails){
  return  res.status(400).json({message:"User not found with this Email Address"})
  }

  // compare password with bcryptjs
const compPassword=await bcrypt.compare(Password,userDetails.Password);
if(!compPassword){
  return res.status(400).json({message:"Password is incorrect"})
}

// sending user id if correct details
const data={
  user:{
    id: userDetails.id
  }
}
const clinetToken = jwt.sign(data, JWT_SECRET,{
expiresIn: '24h'
});

if(res){
  return  res.status(201).json({message:"success",clinetToken,id:userDetails.id})

}


}

// login with mobile number
else{
  // find user with mobile
  if(Mobile.length<=10){
   return res.status(400).json({message:"mobile number must contain atleast 10 digits"})
  }
  const userDetails=await ClientData.findOne({Mobile});
   if(!userDetails){
  return  res.status(400).json({message:"User not found with this Mobile Number"})
  }

  // compare password with bcryptjs
const compPassword=await bcrypt.compare(Password,userDetails.Password);
if(!compPassword){
  return res.status(400).json({message:"Password is incorrect"})
}

// sending user id if correct details
const data={
  user:{
    id: userDetails.id
  }
}
const clinetToken = jwt.sign(data, JWT_SECRET,{
expiresIn: '24h'
});
if(res){
  return  res.status(201).json({message:"success",clinetToken,id:userDetails.id})
}



}



} catch (error) {
  res.status(501).json({message:"internal server error"})
  console.log(error)
}
})


export default handler;
