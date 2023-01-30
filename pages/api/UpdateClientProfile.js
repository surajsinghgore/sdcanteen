import DbConnection from "./Middleware/DbConnection";
import nextConnect from "next-connect";
import ClientData from "./Schema/ClientData";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
const handler = nextConnect();
import multer from "multer";
import { S3Client,PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
let buketName=process.env.NEXT_PUBLIC_BUCKETNAME;
let secretID=process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
let secretKey=process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
import crypto from 'crypto'


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

handler.post(async (req, res) => {
  try {
    DbConnection();

    let verify=await VerifyClientUser(req, res);
     if(verify==undefined){
    return res.status(401).json({ message: "Please login with client account" });
    }
    let id=verify.id;
let find=await ClientData.findById(id);
if(find==null||find==undefined){
       return res.status(400).json({message:"User Not Exits with this Id"})
       }
    const oldImage = find.Profile;



    if (oldImage==undefined) {
      res.status(400).json({ message: "Please Provide Old Image" });
    }
    

let randomImageNameGen=crypto.randomBytes(16).toString('hex')+req.file.originalname;
let imageDbUrl=`ClientImages/${randomImageNameGen}`;
       let ImageGetFromClient=req.file.buffer;
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

    const DelParams = {
  Bucket: buketName, 
  Key: oldImage, 
};
await s3.send(new DeleteObjectCommand(DelParams));
await s3.send(new PutObjectCommand(params));

 await ClientData.findByIdAndUpdate(id, { Profile: imageDbUrl });
return res.status(201).json({ message:"successfully upload profile"});
    
   
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error" });
  }
});

export default handler;
