import DbConnection from "./Middleware/DbConnection";
import TopSearchSchema from './Schema/NumberOfSearch'
export default async function NumberOfSearch(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
      let ItemName=req.body.ItemName;
       if (ItemName==undefined) {
        res
          .status(400)
          .json("name to get");
      }
      let dataFind=await TopSearchSchema.findOne({ItemName:ItemName})
//! new item in database
      if(dataFind==null){
         const data = new TopSearchSchema({
        ItemName: ItemName
      });
      await data.save();
      return res.status(201).send('success');
      }
      // Already Exits
      else{
      let NumberOfSearch=await dataFind.NumberOfSearch;
      NumberOfSearch++;
        await TopSearchSchema.findByIdAndUpdate({_id:dataFind._id}, {
         NumberOfSearch: NumberOfSearch
        });
     
      return res.status(201).send('success');
      }
}
 catch (error) {
    console.log(error)
      res.status(501).json({ message: error, status: "501" });
    }
  }
  }

