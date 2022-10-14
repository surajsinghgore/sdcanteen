import DbConnection from "./Middleware/DbConnection";
import JuiceItemSchema from "./Schema/JuiceItemSchema";
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
  destination: "./public/JuiceItemImages/",
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
    let JuiceName = req.body.JuiceName;
    let Qty = req.body.Qty;
    let Category = req.body.Category;
    let Active = req.body.Active;
    let Description = req.body.Description;
    var filePath = `./public/JuiceItemImages/${Image}`;
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

    if (verify == undefined) {
      await fs.unlinkSync(filePath);
      res.status(401).json({ message: "Please login with admin credentails" });
    }
    if (!Image) {
      res.status(204).json({ message: "Please Enter Item Image" });
    } else if (!JuiceName) {
      res.status(204).json({ message: "Please Enter Juice Name" });
    } else if (!Description) {
      res.status(204).json({ message: "Please Enter Description Of Item" });
    } else if (!Category) {
      res.status(204).json({ message: "Please Enter category Of Item" });
    } else if (!Active) {
      res.status(204).json({ message: "Please select Active status Of Item" });
    }

    // records not dublicate
    let ress = await JuiceItemSchema.find({ JuiceName: JuiceName });
    if (ress.length != 0) {
      await fs.unlinkSync(filePath);
      return res
        .status(409)
        .json({ message: "Item with this Name Already Exits" });
    }

    let Items = new JuiceItemSchema({
      JuiceName,
      Qty,
      Category,
      Image,
      Active,
      Description,
      ItemCost: array,
    });
    let ressGets = await Items.save();
    if (ressGets) {
     return res.status(201).json({ ress, status: "201" });
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
