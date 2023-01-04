import DbConnection from "./Middleware/DbConnection";
import nextConnect from "next-connect";
import ClientData from "./Schema/ClientData";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
var fs = require("fs");
const handler = nextConnect();

import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: "./public/ClientImages/",
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

 handler.use(uploard.single("Profile"));

handler.post(async (req, res) => {
  try {
    DbConnection();

    let verify=await VerifyClientUser(req, res);
    let id=verify.id;
let find=await ClientData.findById(id);
    const Image = req.file.filename;
    const oldImage = find.Profile;
   var filePath = `./public/ClientImages/${Image}`;
 if(verify==undefined){
 await fs.unlinkSync(filePath);
    return res.status(401).json({ message: "Please login with client account" });
    }

    if (!oldImage) {
      res.status(400).json({ message: "Please Provide Old Image" });
    }
    if (!Image) {
      res.status(400).json({ message: "Please Enter Item Image" });
    }
    var filePaths = `./public/ClientImages/${oldImage}`;

    let ress = await ClientData.findByIdAndUpdate(id, { Profile: Image });
    if (ress) {
      await fs.unlinkSync(filePaths);
      res.status(201).json({ ress, status: "201" });
    }
     else{
     await fs.unlinkSync(filePath);
    return res.status(401).json({ message: "Please login with client credentails" });
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", status: "201" });
  }
});

export default handler;
