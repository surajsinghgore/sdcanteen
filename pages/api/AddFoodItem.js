import DbConnection from "./Middleware/DbConnection";
import FoodItemSchema from "./Schema/FoodItemSchema";
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
  destination: "./public/FoodItemImages/",
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
    let verify = await VerifyAdmin(req, res);
    const Image = req.file.filename;
    let array = [];
    let FoodName = req.body.FoodName;
    let Qty = req.body.Qty;
    let Category = req.body.Category;
    let Active = req.body.Active;
    let Description = req.body.Description;
    var filePath = `./public/FoodItemImages/${Image}`;
    let normalPrice;
    let smallPrice;
    let mediumPrice;
    let largePrice;

    if (req.body.largePrice) {
      largePrice = parseInt(req.body.largePrice);
      array.push({ sizeName: "largeSize", Price: largePrice });
    }
    if (req.body.normalPriceName) {
      normalPrice = parseInt(req.body.normalPriceName);
      array.push({ sizeName: "normalSize", Price: normalPrice });
    }
    if (req.body.mediumPrice) {
      mediumPrice = parseInt(req.body.mediumPrice);
      array.push({ sizeName: "mediumSize", Price: mediumPrice });
    }
    if (req.body.halfPrice) {
      smallPrice = parseInt(req.body.halfPrice);
      array.push({ sizeName: "halfSize", Price: smallPrice });
    }

    if (verify == undefined) {
      await fs.unlinkSync(filePath);
      res.status(401).json({ message: "Please login with admin credentails" });
    }
    if (!Image) {
      res.status(204).json({ message: "Please Enter Item Image" });
    } else if (!FoodName) {
      res.status(204).json({ message: "Please Enter Food Name" });
    } else if (!Description) {
      res.status(204).json({ message: "Please Enter Description Of Item" });
    } else if (!Category) {
      res.status(204).json({ message: "Please Enter category Of Item" });
    } else if (!Active) {
      res.status(204).json({ message: "Please select Active status Of Item" });
    }

    // records not dublicate
    let ress = await FoodItemSchema.find({ FoodName: FoodName });
    if (ress.length != 0) {
      await fs.unlinkSync(filePath);
      return res
        .status(409)
        .json({ message: "Item with this Name Already Exits" });
    }

    let Items = new FoodItemSchema({
      FoodName,
      Qty,
      Category,
      Image,
      Active,
      Description,
      ItemCost: array,
    });
    let ressGets = await Items.save();
    if (ressGets) {
      res.status(201).json({ ress, status: "201" });
    } else {
      await fs.unlinkSync(filePath);
      return res
        .status(401)
        .json({ message: "Please login with admin credentails" });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", status: "201" });
  }
});

handler.use(uploard.single("Image"));

export default handler;
