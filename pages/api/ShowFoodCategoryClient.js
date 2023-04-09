import DbConnection from "./Middleware/DbConnection";
import FoodCategory from "./Schema/FoodCategorySchema";
import FoodItemSchema from "./Schema/FoodItemSchema";

export default async function ShowFoodCategoryClient(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      let array=[]
      let categorydata = await FoodCategory.find().select("-createdAt -updatedAt");
       for(let j=0;j<categorydata.length;j++){
       let Resdata = await FoodItemSchema.find({Active:"ON",Category:categorydata[j].FoodCategoryName})
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
