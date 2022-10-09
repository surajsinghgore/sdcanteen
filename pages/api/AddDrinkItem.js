import DbConnection from "./Middleware/DbConnection";
import DrinkItemSchema from "./Schema/DrinkItemSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import nextConnect from "next-connect";
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
let verify=await VerifyAdmin(req, res);
    const Image = req.file.filename;
    let DrinkName = req.body.DrinkName;
    let Price = req.body.Price;
    let Qty = req.body.Qty;
    let Category = req.body.Category;
      let Description = req.body.Description;
   var filePath = `./public/DrinkItemImages/${Image}`;

 if(verify==undefined){
     await fs.unlinkSync(filePath);
     res.status(401).json({ message: "Please login with admin credentails" });
    }


    if (!Image) {
      res.status(400).json({ message: "Please Enter Item Image" });
    } else if (!DrinkName) {
      res.status(400).json({ message: "Please Enter Drink Name" });
    } else if (!Price) {
      res.status(400).json({ message: "Please Enter Price Of Item" });
    }
     else if (!Description) {
      res.status(400).json({ message: "Please Enter Description Of Item" });
    }

    let Items = new DrinkItemSchema({
      DrinkName,
      Price,
      Qty,
      Category,
      Image,
      Description,
    });
    let ress = await Items.save();
    if (ress) {
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

handler.use(uploard.single("Image"));

export default handler;
