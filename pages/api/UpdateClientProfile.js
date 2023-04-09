import DbConnection from "./Middleware/DbConnection";
import nextConnect from "next-connect";
import ClientData from "./Schema/ClientData";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
const handler = nextConnect();
import multer from "multer";
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
let CLOUDNAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
let CLOUDAPIKEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
let CLOUDAPISECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;


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

handler.post(async (req, res) => {
    let fileName = `./public/${req.file.filename}`;

  try {
    DbConnection();

    let verify=await VerifyClientUser(req, res);
     if(verify==undefined){
     fs.unlink(fileName,(err=>{console.log(err)}))
    return res.status(401).json({ message: "Please login with client account" });
    }
    let id=verify.id;
let find=await ClientData.findById(id);
if(find==null||find==undefined){
       return res.status(400).json({message:"User Not Exits with this Id"})
       }
    const oldImage = find.ProfileName;



    if (oldImage==undefined) {
    fs.unlink(fileName,(err=>{console.log(err)}))
      res.status(400).json({ message: "Please Provide Old Image" });
    }
       

   
const ressGetCloud = await cloudinary.uploader.upload(fileName, {
      public_id: oldImage,
    });
    let imageDbUrl = ressGetCloud.url;
fs.unlink(fileName,(err=>{console.log(err)}))
 await ClientData.findByIdAndUpdate(id, { Profile: imageDbUrl });
return res.status(201).json({ message:"successfully upload profile"});
    
   
  } catch (e) {
  fs.unlink(fileName,(err=>{console.log(err)}))
    console.log(e);
    res.status(501).json({ message: "Internal Server Error" });
  }
});

export default handler;
