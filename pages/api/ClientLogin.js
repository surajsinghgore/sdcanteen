const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const { body, validationResult } = require('express-validator');
import ClientDatas from "./Schema/ClientData";
import nextConnect from "next-connect";
const handler = nextConnect();
var cookie = require('cookie');
handler.post(
  body('Password',"password cannot be empty").exists(), async(req, res) => {
// if not post request
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Only POST requests allowed" });
  }
  // error message
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
try {
const{Email,Mobile,Password}=req.body;
if((!Email)&&(!Mobile)){
  return  res.status(400).json({message:"Please Enter Email Or Mobile To Login"})
}

if(!Mobile){
  // find user with email
  const userDetails=await ClientDatas.findOne({Email});
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
// jwt token generate
const clinetToken = jwt.sign(data, JWT_SECRET,{
expiresIn: '24h'
});
res.setHeader('Set-Cookie',[ cookie.serialize('clinetToken', clinetToken, {
      httpOnly: true,
        path: '/',
    expires:new Date(Date.now()+ 86400000),
    // secure:true
    }),
     cookie.serialize(
            'clinetId', userDetails.id,
             {
                 httpOnly: true,
    expires:new Date(Date.now()+ 86400000),
                path: '/',
    // secure:true

            }
        )
    
    ]);
if(res){
  return  res.status(201).json({message:"success"})

}


}

//! login with mobile number
else{


  // find user with mobile
  if(Mobile.length==10){
   return res.status(400).json({message:"mobile number must contain atleast 10 digits"})
  }


  const userDetails=await ClientDatas.findOne({Mobile});
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
res.setHeader('Set-Cookie',[ cookie.serialize('clinetToken', clinetToken, {
      httpOnly: true,
        path: '/',
    expires:new Date(Date.now()+ 86400000),
    // secure:true,

    }),
     cookie.serialize(
            'clinetId', userDetails.id,
             {
                 httpOnly: true,
    expires:new Date(Date.now()+ 86400000),
                path: '/'
    // secure:true,
            }
        )
    
    ]);



if(res){
  return  res.status(201).json({message:"success"})
}



}



} catch (error) {
  res.status(501).json({message:"internal server error"})
  console.log(error)
}
})


export default handler;
