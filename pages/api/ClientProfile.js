import DbConnection from "./Middleware/DbConnection";
import ClientData from "./Schema/ClientData";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
import crypto from "crypto";
import multer from "multer";
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
let CLOUDNAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
let CLOUDAPIKEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
let CLOUDAPISECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

import nextConnect from "next-connect";
const handler = nextConnect();


export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: "./public",
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
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

// cloudnairy Configuration
cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: CLOUDAPIKEY,
  api_secret: CLOUDAPISECRET,
});

 handler.use(upload.single("Profile"));


handler.post(async(req, res) => {
    let fileName = `./public/${req.file.filename}`;

  try {

    DbConnection();
     await VerifyClientUser(req, res); 
      let _id = req.cookies.clinetId;
    if (!_id) {
    fs.unlink(fileName,(err=>{console.log(err)}))
      return res.status(401).json({ message: "Please Login with Valid Credentails" });
    }
   let randomImageNameGen =
      crypto.randomBytes(16).toString("hex") + req.file.filename;
      const ressGetCloud = await cloudinary.uploader.upload(fileName, {
      public_id: randomImageNameGen,
    });
    let imageDbUrl = ressGetCloud.url;




const ress=await ClientData.findByIdAndUpdate(_id, { Profile: imageDbUrl,ProfileName:randomImageNameGen }).select('-Password');
    if(ress){

    fs.unlink(fileName,(err=>{console.log(err)}))
    
return res.status(201).json({data:ress})
    
    }
   
  } catch (e) {
   fs.unlink(fileName,(err=>{console.log(err)}))

    console.log(e)
    res.status(501).json({ message: "Internal Server Error", status: "501" });
  }
});









export default handler;
