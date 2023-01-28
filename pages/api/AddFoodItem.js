import DbConnection from "./Middleware/DbConnection";
import FoodItemSchema from "./Schema/FoodItemSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import nextConnect from "next-connect";
const handler = nextConnect();
import crypto from 'crypto'
import multer from "multer";
import { S3Client,PutObjectCommand } from "@aws-sdk/client-s3";
let buketName=process.env.NEXT_PUBLIC_BUCKETNAME;
let secretID=process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
let secretKey=process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;


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
   let ImageGetFromClient=req.file.buffer;
let randomImageNameGen=crypto.randomBytes(16).toString('hex')+req.file.originalname;
let imageDbUrl=`https://sdcanteenspace.nyc3.cdn.digitaloceanspaces.com/FoodItemImages/${randomImageNameGen}`;
const params = {
  Bucket: buketName, 
  Key: `FoodItemImages/${randomImageNameGen}`, 
  Body:ImageGetFromClient,
  ACL: "public-read"
};
    let verify = await VerifyAdmin(req, res);
     if (verify == undefined) {
    
      res.status(401).json({ message: "Please login with admin credentails" });
    }

    let array = [];
    let FoodName = req.body.FoodName;
    let Qty = req.body.Qty;
    let Category = req.body.Category;
    let Active = req.body.Active;
    let Description = req.body.Description;
    let normalPrice;
    let smallPrice;
    let mediumPrice;
    let largePrice;

    if (req.body.largePriceName) {
      largePrice = parseInt(req.body.largePriceName);
      array.push({ sizeName: "largeSize", Price: largePrice });
    }
    if (req.body.normalPriceName) {
      normalPrice = parseInt(req.body.normalPriceName);
      array.push({ sizeName: "normalSize", Price: normalPrice });
    }
    if (req.body.mediumPriceName) {
      mediumPrice = parseInt(req.body.mediumPriceName);
      array.push({ sizeName: "mediumSize", Price: mediumPrice });
    }
    if (req.body.smallPriceName) {
      smallPrice = parseInt(req.body.smallPriceName);
      array.push({ sizeName: "smallSize", Price: smallPrice });
    }
    if (FoodName==undefined) {
      return res.status(400).json({ message: "Please Enter Food Name" });
    } else if (Description==undefined) {
      return res.status(400).json({ message: "Please Enter Description Of Item" });
    } else if (Category==undefined) {
     return  res.status(400).json({ message: "Please Enter category Of Item" });
    } else if (Active==undefined) {
      return res.status(400).json({ message: "Please select Active status Of Item" });
    }

    // records not dublicate
    let ress = await FoodItemSchema.find({ FoodName: FoodName });
    if (ress.length != 0) {
    
      return res
        .status(400)
        .json({ message: "Item with this Name Already Exits" });
    }

    let Items = new FoodItemSchema({
      FoodName,
      Qty,
      Category,
      Image:imageDbUrl,
      Active,
      Description,
      ItemCost: array,
    });


    let ressGets = await Items.save();
    if (ressGets) {
    await s3.send(new PutObjectCommand(params));
      res.status(201).json({ message:"successfully upload" });
    } else {
     
      return res
        .status(400)
        .json({ message: "Please login with admin credentails" });
    }
  } catch (e) {
    console.log("error",e);
    res.status(501).json({ message: "Internal Server Error" });
  }
});


export default handler;
