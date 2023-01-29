import DbConnection from "./Middleware/DbConnection";
import JuiceItemSchema from "./Schema/JuiceItemSchema";
import nextConnect from "next-connect";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";

import { S3Client,PutObjectCommand , DeleteObjectCommand } from "@aws-sdk/client-s3";
let buketName=process.env.NEXT_PUBLIC_BUCKETNAME;
let secretID=process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
let secretKey=process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
import crypto from 'crypto'


const handler = nextConnect();

import multer from "multer";


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

handler.use(upload.single("Image"));
handler.post(async (req, res) => {
  try {
    DbConnection();
    
let verify=await VerifyAdmin(req, res);
 if(verify==undefined){

    return res.status(401).json({ message: "Please login with admin credentails" });
    }

    let _id = req.body._id;

    
    if (_id==undefined) {
      res.status(400).json({ message: "Please Provide Id" });
    }

       let find=await JuiceItemSchema.findById(_id);
     
    const oldImage = find.Image;
    if (oldImage==undefined||oldImage==null) {
    return  res.status(400).json({ message: "Please Provide Old Image" });
    }
  

let randomImageNameGen=crypto.randomBytes(16).toString('hex')+req.file.originalname;
let imageDbUrl=`JuiceItemImages/${randomImageNameGen}`;
       let ImageGetFromClient=req.file.buffer;


  
             const params = {
  Bucket: buketName, 
 Key: `JuiceItemImages/${randomImageNameGen}`, 
  Body:ImageGetFromClient,
  ACL: "public-read"
};
const DelParams = {
  Bucket: buketName, 
  Key: oldImage, 
};
await s3.send(new PutObjectCommand(params));
await s3.send(new DeleteObjectCommand(DelParams));
await JuiceItemSchema.findByIdAndUpdate(_id, { Image: imageDbUrl });

              return res.status(201).json({ message:'Juice Item Successfully Update' });

     
   
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error" });
  }
});

export default handler;
