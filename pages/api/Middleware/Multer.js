import mongoose from "mongoose";
import multer from "multer";
import multer3 from "multer-s3";
import aws from 'aws-sdk'
let bucketName=process.env.NEXT_PUBLIC_BUCKETNAME;
let endpoint=process.env.NEXT_PUBLIC_ENDPOINT;
const spacesEndPoint=aws.Endpoint(endpoint);
const s3=new aws.S3({
endpoint:spacesEndPoint,
accessKeyId:proccess.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
secretAccessKey:proccess.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
})

const uploard=multer({
storage:multer3({
s3,
bucket:NEXT_PUBLIC_BUCKETNAME,
acl:'public-read',
metadata:(req,res,cb)=>{
fieldname:file.fieldname
}}
),
key:(req,file,cb)=>{
console.log(file)
cb(null,file.originalname)
}

}).single('Image')


// const DbConnection = async (req, res) => {
//   try {
//     await mongoose.connect(connectionUrl);
//   } catch (error) {
//     console.log(error);
//   }
// };

export default uploard;
