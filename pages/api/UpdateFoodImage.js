import DbConnection from '../Middleware/DbConnection';
import FoodItemSchema from '../Schema/FoodItemSchema';
import nextConnect from 'next-connect'
import Path from 'path'
var fs = require('fs');

const handler = nextConnect();

import multer from 'multer';


export const config={
api:{
bodyParser:false
},
}




const storage=multer.diskStorage({
destination:"./public/FoodItemImages/",
filename:function(req,file,cb){
cb(null,new Date().toISOString().replace(/:/g, '-') +'-'+file.originalname);
}
})

const fileFilter=(req,file,cb)=>{
if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'||file.mimetype==='image/jpg')
{cb(null,true);
}
else{
cb(new Error("Only JPG , PNG , JPEG Images are Allowed To Upload"));
}
}

const uploard=multer({storage:storage,
limits:{
fileSize:1024*1024*5
},
fileFilter:fileFilter
});


handler.use(uploard.single('Image'));
handler.post(async(req,res)=>{
try{
DbConnection();
  let _id = req.body._id;
const oldImage=req.body.oldImage;
const Image=req.file.filename;

if(!_id){
res.status(400).json({message:"Please Provide Id"});
}
if(!oldImage){
res.status(400).json({message:"Please Provide Old Image"});
}
if(!Image){
res.status(400).json({message:"Please Enter Item Image"});
}
var filePath =`./public/FoodItemImages/${oldImage}`; 


 let ress=await FoodItemSchema.findByIdAndUpdate(_id,{Image:Image});
if(ress){
 await fs.unlinkSync(filePath)
res.status(201).json({ress,status:"201"})
}
}

catch(e){
console.log(e)
res.status(501).json({message:"Internal Server Error",status:"201"})

}




})




export default handler