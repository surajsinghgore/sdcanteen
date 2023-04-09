import DbConnection from "./Middleware/DbConnection";
import JuiceItemSchema from "./Schema/JuiceItemSchema";

export default async function ShowJuiceClient(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      if(req.query.count!=undefined){
       let count=(req.query.count)||10;
      let dataFetch = await JuiceItemSchema.find({Active:"ON"}).select('-createdAt -updatedAt');
let len=dataFetch.length;
      let data=await dataFetch.slice(0,parseInt(count));
      res.status(201).json({ data, status: "201" ,allLen:len});
      
      }
     if(req.query.itemName!=undefined){
      let itemName=req.query.itemName;
      let count=parseInt(req.query.counts)||2;
      let Resdata = await JuiceItemSchema.find({Active:"ON",Category:itemName}).select("-Active -createdAt -updatedAt")
let len=Resdata.length;
      let data=await Resdata.slice(0,parseInt(count));
      res.status(201).json({ data, status: "201" ,allLen:len});
     }
     
    } catch (error) {
    console.log(error)
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
