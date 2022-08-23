import DbConnection from "./Middleware/DbConnection";
import ClientRegistrationTemporary from "./Schema/ClientRegistrationTemp";
import ClientData from "./Schema/ClientData";
import multer from 'multer'
import nextConnect from "next-connect";
const handler = nextConnect();

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
handler.post(async(req, res) => {
  try {
    DbConnection();
      let _id = req.body._id;
    const Profile = req.file.filename;
    if (!_id) {
      res.status(400).json({ message: "Please Provide Id" });
    }
    if (!Profile) {
      res.status(400).json({ message: "Please Upload Profile Photo" });
    } 

const ress=await ClientData.findByIdAndUpdate(_id, { Profile: Profile }).select('-Password');
    if(ress){


return res.status(201).json({data:ress,message:"Verification Otp is Send To Email",status:"201"})
    
    }
   
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal Server Error", status: "501" });
  }
});









export default handler;
