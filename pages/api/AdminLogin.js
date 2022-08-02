const jwt = require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET_KEY;


export default async function AdminLogin(req,res) {
 if (req.method !== 'POST') {
return res.status(405).send({ message: 'Only POST requests allowed' });
  }

let OriginalSecretAdminLoginId=process.env.OriginalSecretAdminLoginId;
let OriginalPasswordAdminLogin=process.env.OriginalPasswordAdminLogin;
try{
const {secret,password}=req.body;

if(OriginalSecretAdminLoginId!==secret){
return res.status(401).json({status:"401",message:"Incorrect secret ID"});
}
if(OriginalPasswordAdminLogin!==password){
return res.status(401).json({status:"401",message:"Incorrect Password"});
}

if((OriginalSecretAdminLoginId==secret)&&(OriginalPasswordAdminLogin==password)){


let data={
secret:secret

}
const token = jwt.sign(data, JWT_SECRET,{ expiresIn: '1h' });
return res.status(201).json({status:"201",message:"successfully login",token:token})
}
}
catch(e){
console.log(e)
return res.status(501).json({status:"501",message:"Internal Server Error"})
}
  
}
