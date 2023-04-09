import DbConnection from "./Middleware/DbConnection";
import CoffeeCategorySchema from "./Schema/CoffeeCategorySchema";
import CoffeeItemSchema from "./Schema/CoffeeItemSchema";

export default async function ShowCoffeeCategoryClient(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();
      let array=[]
      let categorydata = await CoffeeCategorySchema.find().select("-createdAt -updatedAt");
       for(let j=0;j<categorydata.length;j++){
       let Resdata = await CoffeeItemSchema.find({Active:"ON",Category:categorydata[j].CoffeeCategoryName})
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
