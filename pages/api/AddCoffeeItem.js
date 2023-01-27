import DbConnection from "./Middleware/DbConnection";
import CoffeeItemSchema from "./Schema/CoffeeItemSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import nextConnect from "next-connect";
var fs = require("fs");
  // const handler = nextConnect();
var aws = require('aws-sdk');
  const multer = require('multer');
  const multerS3 = require('multer-s3');
  import formidable from "formidable-serverless";
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
  // spcaces
let bucketName= process.env.NEXT_PUBLIC_BUCKETNAME;
let endpoint= process.env.NEXT_PUBLIC_ENDPOINT;
const spacesEndPoint=aws.Endpoint(endpoint);
const s3Client = new S3Client({
    endpoint: "https://sdcanteenspace.nyc3.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    region: "us-east-1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID, // Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY // Secret access key defined through an environment variable.
    }
});


export const config = {
  api: {
    bodyParser: false,
  },
};




export default async function handler(req,res){

const form=formidable();
form.parse(req,async (err,fields,files)=>{

if(!files.Image){
return ;
}
try{

const params = {
  Bucket: "sdcanteenspace", // The path to the directory you want to upload the object to, starting with your Space name.
  Key: files.Image.name, // Object key, referenced whenever you want to access this file later.
  Body: "Hello, World!", // The object's contents. This variable is an object, not a string.
  ACL: "public", // Defines ACL permissions, such as private or public.
  Metadata: { // Defines metadata tags.
    "x-amz-meta-my-key": "your-value"
  }
};

 const data = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully uploaded object: " +
        params.Bucket +
        "/" +
        params.Key
    );
    conole.log(data)
    return data;
}
catch(e){
console.log("error",e)
}
})
return res.status(201).json({success:"true"})
}




