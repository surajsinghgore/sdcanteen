import DbConnection from "./Middleware/DbConnection";
import DrinkItemSchema from "./Schema/DrinkItemSchema";
import nextConnect from "next-connect";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";

import Path from "path";
var fs = require("fs");

const handler = nextConnect();

import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: "./public/DrinkItemImages/",
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

const uploard = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

handler.use(uploard.single("Image"));
handler.post(async (req, res) => {
  try {
    DbConnection();

    let _id = req.body._id;
    const oldImage = req.body.oldImage;
    const Image = req.file.filename;
        var filePath = `./public/DrinkItemImages/${oldImage}`;
let verify=await VerifyAdmin(req, res);
 if(verify==undefined){
 await fs.unlinkSync(filePath);
    return res.status(401).json({ message: "Please login with admin credentails" });
    }
    if (!_id) {
      res.status(400).json({ message: "Please Provide Id" });
    }
    if (!oldImage) {
      res.status(400).json({ message: "Please Provide Old Image" });
    }
    if (!Image) {
      res.status(400).json({ message: "Please Enter Item Image" });
    }


    let ress = await DrinkItemSchema.findByIdAndUpdate(_id, { Image: Image });
    if (ress) {
      await fs.unlinkSync(filePath);
      res.status(201).json({ ress, status: "201" });
    } else{
     await fs.unlinkSync(filePath);
     return res.status(401).json({ message: "Please login with admin credentails" });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", status: "201" });
  }
});

export default handler;
