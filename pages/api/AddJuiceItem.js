import DbConnection from "./Middleware/DbConnection";
import JuiceItemSchema from "./Schema/JuiceItemSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import nextConnect from "next-connect";

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
    await VerifyAdmin(req, res);
    const Image = req.file.filename;
    let JuiceName = req.body.JuiceName;
    let Price = req.body.Price;
    let Qty = req.body.Qty;
    let Category = req.body.Category;

    if (!Image) {
      res.status(400).json({ message: "Please Enter Item Image" });
    } else if (!JuiceName) {
      res.status(400).json({ message: "Please Enter Juice Name" });
    } else if (!Price) {
      res.status(400).json({ message: "Please Enter Price Of Item" });
    }

    let Items = new JuiceItemSchema({
      JuiceName,
      Price,
      Qty,
      Category,
      Image,
    });
    let ress = await Items.save();
    if (ress) {
      res.status(201).json({ ress, status: "201" });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", status: "201" });
  }
});

handler.use(uploard.single("Image"));

export default handler;
