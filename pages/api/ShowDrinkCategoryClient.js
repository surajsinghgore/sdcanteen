import DbConnection from "./Middleware/DbConnection";
import DrinkCategorySchema from "./Schema/DrinksCategorySchema";
import DrinkItemSchema from "./Schema/DrinkItemSchema";

export default async function ShowDrinkCategoryClient(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      let array=[]
      let categorydata = await DrinkCategorySchema.find().select("-createdAt -updatedAt");
       for(let j=0;j<categorydata.length;j++){
       let Resdata = await DrinkItemSchema.find({Active:"ON",Category:categorydata[j].DrinkCategoryName})
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
