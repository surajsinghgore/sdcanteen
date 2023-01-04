import DbConnection from "./Middleware/DbConnection";
const { body, validationResult } = require('express-validator');
import nextConnect from "next-connect";
import ClientData from "./Schema/ClientData";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
const handler = nextConnect();

handler.post(
 body('FullName',"FullName must contain atleast 3 characters").isLength({ min: 3 }),
body('Email',"Email id is not valid").isEmail()
    , async(req, res) => {
  try {
    DbConnection();
     let res1=await VerifyClientUser(req, res);
  if(res1==undefined){
    return res.status(401).json({ message: "Please login with Client credentails" });
    }
    let clientId=res1.id;
    let FullName = req.body.FullName;
    let Age = req.body.Age;
    let Email = req.body.Email;
    let Mobile = req.body.Mobile;
    let Gender = req.body.Gender;
    let FullAddress = req.body.FullAddress;
   
const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() ,status:"400"});
    }
    if (!Age) {
      res.status(400).json({ message: "Please Enter Age" });
    }
     else if (!Gender) {
    return  res.status(400).json({ message: "Please Enter Gender" });
    }
     else if (!FullAddress) {
      return res.status(400).json({ message: "Please Enter FullAddress" });
    }


let ns=Mobile.toString();
if(ns.length!=10){
 return res.status(400).json({ message: "Mobile Number Must be of 10 Digit Only" });
}


let find=await ClientData.findById(clientId)
let oldEmail=find.Email;
let oldMobile=find.Mobile;
if(Email!=oldEmail){
let resDouble=await ClientData.find({Email:Email});
if(resDouble.length!=0){
      return  res.status(400).json({ message: "This Email Id is already Exists" });
 }
}
if(Mobile!=oldMobile){
let resDouble=await ClientData.find({Mobile:Mobile});
if(resDouble.length!=0){
      return  res.status(400).json({ message: "This Mobile Number is already Exists" });
 }

}
await ClientData.findOneAndUpdate({_id:clientId},{$set:{"FullName":FullName,"Age":Age,"Mobile":Mobile,"Email":Email,"Gender":Gender,"FullAddress":FullAddress}})

     return res.status(201).json({message:"successfully updated"})

  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", status: "501" });
  }
});








export default handler;
