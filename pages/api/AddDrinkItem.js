import DbConnection from "./Middleware/DbConnection";
import DrinkItemSchema from "./Schema/DrinkItemSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import nextConnect from "next-connect";
const handler = nextConnect();
import crypto from "crypto";
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

handler.use(upload.single("Image"));
handler.post(async (req, res) => {
  let fileName = `./public/${req.file.filename}`;
  try {
    DbConnection();
    let randomImageNameGen =
      crypto.randomBytes(16).toString("hex") + req.file.filename;

    let verify = await VerifyAdmin(req, res);
    if (verify == undefined) {
      fs.unlink(fileName, (err) => {
        console.log(err);
      });

      res.status(401).json({ message: "Please login with admin credentails" });
    }

    let array = [];
    let DrinkName = req.body.DrinkName;
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
    if (DrinkName == undefined) {
      fs.unlink(fileName, (err) => {
        console.log(err);
      });
      return res.status(400).json({ message: "Please Enter Juice Name" });
    } else if (Description == undefined) {
      fs.unlink(fileName, (err) => {
        console.log(err);
      });
      return res
        .status(400)
        .json({ message: "Please Enter Description Of Item" });
    } else if (Category == undefined) {
      fs.unlink(fileName, (err) => {
        console.log(err);
      });
      return res.status(400).json({ message: "Please Enter category Of Item" });
    } else if (Active == undefined) {
      fs.unlink(fileName, (err) => {
        console.log(err);
      });
      return res
        .status(400)
        .json({ message: "Please select Active status Of Item" });
    }

    // records not dublicate
    let ress = await DrinkItemSchema.find({ DrinkName: DrinkName });
    if (ress.length != 0) {
      fs.unlink(fileName, (err) => {
        console.log(err);
      });
      return res
        .status(400)
        .json({ message: "Item with this Name Already Exits" });
    }
    const ressGetCloud = await cloudinary.uploader.upload(fileName, {
      public_id: randomImageNameGen,
    });
    let imageDbUrl = ressGetCloud.url;
    let Items = new DrinkItemSchema({
      DrinkName,
      Qty,
      ImageName:randomImageNameGen,
      Category,
      Image: imageDbUrl,
      Active,
      Description,
      ItemCost: array,
    });

    let ressGets = await Items.save();
    fs.unlink(fileName, (err) => {
      console.log(err);
    });
    if (ressGets) {
      res.status(201).json({ message: "successfully upload" });
    } else {
      return res
        .status(400)
        .json({ message: "Please login with admin credentails" });
    }
  } catch (e) {
    fs.unlink(fileName, (err) => {
      console.log(err);
    });
    console.log("error", e);
    res.status(501).json({ message: "Internal Server Error" });
  }
});

export default handler;
