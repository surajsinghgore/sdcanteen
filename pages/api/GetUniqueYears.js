import OrderSchemaDataBase from "./Schema/OrderSchema";
import DbConnection from "./Middleware/DbConnection";
// payemnt data base conatin failed pending and initaited records
export default async function GetUniqueYears(req, res) {
  if (req.method == "GET") {
    try {
      DbConnection();

// get only unique years for select form
 let AllData = await OrderSchemaDataBase.find()
let allYears=[]
for(let i=0;i<AllData.length;i++){
    let allDated=AllData[i].OrderDate.split(".");
    allYears.push(allDated[2])
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
var unique = allYears.filter(onlyUnique);

return res.status(200).json({year:unique})
  }
      catch(e){
    console.log(e)
    res.status(501).json({status:"501",message:e})
    }
}
}
