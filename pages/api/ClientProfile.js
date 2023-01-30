import DbConnection from "./Middleware/DbConnection";
import ClientData from "./Schema/ClientData";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import crypto from 'crypto'
import multer from "multer";
import { S3Client,PutObjectCommand } from "@aws-sdk/client-s3";
let buketName=process.env.NEXT_PUBLIC_BUCKETNAME;
let secretID=process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
let secretKey=process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

import nextConnect from "next-connect";
const handler = nextConnect();


export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.memoryStorage()
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG , PNG , JPEG Images are Allowed To Upload"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const s3=new S3Client({
endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
 forcePathStyle: false, 
    region: process.env.NEXT_PUBLIC_S3_REGION,
credentials:{
accessKeyId:secretID,
secretAccessKey:secretKey
},
})

 handler.use(upload.single("Profile"));


handler.post(async(req, res) => {
  try {
    DbConnection();
     await VerifyClientUser(req, res); 
      let _id = req.cookies.clinetId;
    if (!_id) {
      res.status(401).json({ message: "Please Login with Valid Credentails" });
    }
   let ImageGetFromClient=req.file.buffer;
let randomImageNameGen=crypto.randomBytes(16).toString('hex')+req.file.originalname;
let imageDbUrl=`ClientImages/${randomImageNameGen}`;
    let fileType=req.file.mimetype;
const params = {
  Bucket: buketName, 
  Key: `ClientImages/${randomImageNameGen}`, 
  Body:ImageGetFromClient,
  ACL: "public-read",
   ContentType: fileType,
     ContentEncoding: 'base64',
            ContentDisposition: 'inline',
};



const ress=await ClientData.findByIdAndUpdate(_id, { Profile: imageDbUrl }).select('-Password');
    if(ress){
  await s3.send(new PutObjectCommand(params));
return res.status(201).json({data:ress})
    
    }
   
  } catch (e) {
    res.status(501).json({ message: "Internal Server Error", status: "501" });
  }
});









export default handler;
