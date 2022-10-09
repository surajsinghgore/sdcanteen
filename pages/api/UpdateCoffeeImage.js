import DbConnection from "./Middleware/DbConnection";
import CoffeeItemSchema from "./Schema/CoffeeItemSchema";
import nextConnect from "next-connect";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
var fs = require("fs");
const handler = nextConnect();

import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: "./public/CoffeeItemImages/",
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
    const Image = req.file.filename;
    const oldImage = req.body.oldImage;
   var filePath = `./public/FoodItemImages/${Image}`;

let verify=await VerifyAdmin(req, res);
 if(verify==undefined){
 await fs.unlinkSync(filePath);
    return res.status(401).json({ message: "Please login with admin credentails" });
    }
    let _id = req.body._id;

    if (!_id) {
      res.status(400).json({ message: "Please Provide Id" });
    }
    if (!oldImage) {
      res.status(400).json({ message: "Please Provide Old Image" });
    }
    if (!Image) {
      res.status(400).json({ message: "Please Enter Item Image" });
    }
    var filePath = `./public/CoffeeItemImages/${oldImage}`;

    let ress = await CoffeeItemSchema.findByIdAndUpdate(_id, { Image: Image });
    if (ress) {
      await fs.unlinkSync(filePath);
      res.status(201).json({ ress, status: "201" });
    }
     else{
     await fs.unlinkSync(filePath);
    return res.status(401).json({ message: "Please login with admin credentails" });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", status: "201" });
  }
});

export default handler;
