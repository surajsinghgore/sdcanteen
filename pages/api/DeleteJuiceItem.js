import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import DbConnection from "./Middleware/DbConnection";
import JuiceItemSchema from "./Schema/JuiceItemSchema";
import ItemRatings from './Schema/ItemRating'
import TopSearchSchema from './Schema/NumberOfSearch'
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
let buketName=process.env.NEXT_PUBLIC_BUCKETNAME;
let secretID=process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
let secretKey=process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

const s3=new S3Client({
endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
 forcePathStyle: false, 
    region: process.env.NEXT_PUBLIC_S3_REGION,
credentials:{
accessKeyId:secretID,
secretAccessKey:secretKey
},
})
export default async function DeleteJuiceItem(req, res) {
  if (req.method == "DELETE") {
    try {
      DbConnection();
let verify=await VerifyAdmin(req, res);
 if(verify==undefined){

    return res.status(401).json({ message: "Please login with admin credentails" });
    }
      let _id = req.body._id;
    
      // not get id
      if (!_id) {
        return res
          .status(400)
          .json({ message: "Please Provide Id", status: "400" });
      }
     

      // match weather same Food name is not entered
      let match = await JuiceItemSchema.findById(_id);

      if (match) {
      let ImageToDelete=match.Image;
      const DelParams = {
  Bucket: buketName, 
  Key: ImageToDelete, 
};
await s3.send(new DeleteObjectCommand(DelParams));
        await JuiceItemSchema.findByIdAndDelete(_id);
                 await ItemRatings.findOneAndDelete({ProductId:_id})
await TopSearchSchema.findOneAndDelete({ItemName:match.JuiceName})
  
      return  res
          .status(201)
          .json({ message: "successfully Deleted", status: "201" });
      } else {
        res.status(400).json({
          message: "Sorry This Id Is Not Match In Database",
          status: "400",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
