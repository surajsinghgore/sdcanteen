import DbConnection from "./Middleware/DbConnection";
import OrderSchemaDataBase from "./Schema/OrderSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
export default async function UpdateorderItems(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
      await VerifyAdmin(req, res);
    let id=req.body.id;
    let price=req.body.price;
    let status=req.body.status;
    if(id==undefined||price==undefined||status==undefined){
      res.status(400).json({ message: "Please fill All the filed Id,Price,Status" });
}
 
let data=await OrderSchemaDataBase.find({ItemsOrder: {$elemMatch: {_id: id}}})



if(data.length==0){
    return  res.status(404).json({ message: "Record Not Found" });
}

await OrderSchemaDataBase.findOneAndUpdate({ItemsOrder: {$elemMatch: {_id: id}}}, {$set:{"ItemsOrder.$.AmountReceived":price,"ItemsOrder.$.OrderStatus":status}})


let datas=await OrderSchemaDataBase.find({ItemsOrder: {$elemMatch: {_id: id}}})


let dataUpdate=await OrderSchemaDataBase.find({ItemsOrder: {$elemMatch: {_id: id}}})
let s=0;
for(let i=0;i<dataUpdate.length;i++){
 dataUpdate[i].ItemsOrder.map((item)=>{
 if(item.OrderStatus=="complete"){
s=s+1;
 }
 })
 if(dataUpdate[i].ItemsOrder.length==s){
  let ids=dataUpdate[i]._id;
 let resss=await OrderSchemaDataBase.findByIdAndUpdate(ids, {
          OrderStatus: "complete"
        });
        console.log(resss)
 }
}





res.status(201).json({message:datas})

    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error});
    }
  }
}
