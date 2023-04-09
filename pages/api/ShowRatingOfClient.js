import DbConnection from "./Middleware/DbConnection";
import ItemRatings from "./Schema/ItemRating";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";

export default async function ShowRatingOfClient(req, res) {
    try {
      DbConnection();
      let res1=await VerifyClientUser(req, res);
  if(res1==undefined){
    return res.status(401).json({ message: "Please login with Client credentails" });
    }
    let id=res1.id;
        let productId = req.query.productId;
      if (productId == "") {
        return res.status(498).json({ message: "Please Provide Product Id" });
      }

let data=await ItemRatings.find(
  {
    "ProductId":productId,"ItemsReviwers.userId": id,
  },
  {
    ProductId: 1,
    Rating: 1,NumberOfReviews:1,
    ItemsReviwers: {
      $elemMatch: {
        userId: id,
      },
    },
  }
);


      // ! new enter
           return res.status(201).json({data:data})
      
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  
}
