import DbConnection from "./Middleware/DbConnection";
import ItemRatings from "./Schema/ItemRating";

export default async function ShowRatingOfItems(req, res) {
    try {
      DbConnection();
        let productId = req.query.productId;
      if (productId == "") {
        return res.status(498).json({ message: "Please Provide Product Id" });
      }
      //find wheather product already added or not [fresh food review]
      let data = await ItemRatings.find({ ProductId: productId });
      // ! new enter
     
      return res.status(201).json({data:data})
      
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  
}
