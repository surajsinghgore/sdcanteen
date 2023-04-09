import DbConnection from "./Middleware/DbConnection";
import ItemRatings from "./Schema/ItemRating";

export default async function SortRatingInLatest(req, res) {
    try {
      DbConnection();
        let productId = req.query.productId;
      if (productId == "") {
        return res.status(498).json({ message: "Please Provide Product Id" });
      }

  let datas = await ItemRatings.aggregate([
  {$match:
    {'ProductId': productId } },
  { $unwind: "$ItemsReviwers" },
    { $sort: { "ItemsReviwers.CYear": -1 ,"ItemsReviwers.CMonth": -1,"ItemsReviwers.CDate": -1,"ItemsReviwers.CHours": -1,"ItemsReviwers.CMins": -1} },
    { $group: { _id: "$_id", ItemsReviwers: { $push: "$ItemsReviwers" } } }
])
      // ! new enter
      return res.status(201).json({data:datas})
   
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  
}
