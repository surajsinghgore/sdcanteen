import DbConnection from "./Middleware/DbConnection";
import JuiceItemSchema from "./Schema/JuiceItemSchema";
import JuiceCategorySchema from "./Schema/JuicesCategorySchema";


export default async function ShowJuiceCategoryClient(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      let array=[]
      let categorydata = await JuiceCategorySchema.find().select("-createdAt -updatedAt");
       for(let j=0;j<categorydata.length;j++){
       let Resdata = await JuiceItemSchema.find({Active:"ON",Category:categorydata[j].JuiceCategoryName})
       let totalElements= Resdata.length;
       let ss=[categorydata[j],totalElements];
       array.push(ss)
          }
    
       
      res.status(201).json({ data:array, status: "201" });
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
