import DbConnection from "./Middleware/DbConnection";
import JuiceItemSchema from "./Schema/JuiceItemSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
export default async function UpdateJuiceItem(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
    let verify=await VerifyAdmin(req, res);
 if(verify==undefined){
    return res.status(401).json({ message: "Please login with admin credentails" });
    }
let nss=false,nsc=false,sss=false,ssc=false,lss=false,lsc=false,mss=false,msc=false;
      let _id = req.body._id;
      let JuiceName = req.body.JuiceName;
      let Qty = req.body.Qty;
    let Description = req.body.Description;
      let Category = req.body.Category;
      let Active = req.body.Active;
    let ItemCost = req.body.ItemCost;
    let size=ItemCost.length;
        if (!_id) {
        return res.status(204).json({ message: "Please Provide Id" });
      } else if (!JuiceName) {
        return res.status(204).json({ message: "Please Enter Juice Name" });
      }
      
else if (!Description) {
        return res.status(204).json({ message: "Please Enter Description Of Item" });
      }
      else if (!Category) {
        return res.status(204).json({ message: "Please Enter Category Of Item" });
      }
if(size>=4){
        return res.status(400).json({ message: "Item Price Size must be not more than 4 " });
}
if(size<0){
      return res.status(400).json({ message: "Item Price Size must goes below 1" });
}

// compare data ItemCost From Client
for(let i=0;i<ItemCost.length;i++){
if(ItemCost[i].mediumsize!=undefined){
msc=true;
}

if(ItemCost[i].smallsize!=undefined){
ssc=true;
}
if(ItemCost[i].largesize!=undefined){
lsc=true;
}
if(ItemCost[i].normalsize!=undefined){
nsc=true;
}
}

let resCheck=await JuiceItemSchema.findById({_id:_id});

if(JuiceName!=resCheck.JuiceName){
let resDouble=await JuiceItemSchema.find({JuiceName:JuiceName});
if(resDouble.length!=0){
      return  res.status(409).json({ message: "Item Already Exits with this Item Name" });
 }
}

if(resCheck.length==0){
      return  res.status(404).json({ message: "Invalid Id Provided" });
}
else{
// compare data ItemCost From server
for(let i=0;i<resCheck.ItemCost.length;i++){
if(resCheck.ItemCost[i].sizeName=="mediumsize"){
mss=true;
}

if(resCheck.ItemCost[i].sizeName=="smallsize"){
sss=true;
}
if(resCheck.ItemCost[i].sizeName=="largesize"){
lss=true;
}
if(resCheck.ItemCost[i].sizeName=="normalsize"){
nss=true;
}
}
}



      let ress = await JuiceItemSchema.findByIdAndUpdate(_id, {
        JuiceName: JuiceName,
        Qty, 
        Active,
          Description,
        Category: Category,
      });

for(let i=0;i<ItemCost.length;i++){
if(ItemCost[i].mediumsize){
  if(msc==true && mss==false){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
await JuiceItemSchema.updateOne(
  { _id: _id},
  { $push: { "ItemCost": {"sizeName":"mediumsize","Price":ItemCost[i].mediumsize} }}
);
}

if((sss==true) && (ssc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"smallsize"}}})
}
if((lss==true )&& (lsc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"largesize"}}})
}
if((mss==true )&& (msc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"mediumsize"}}})
}
if((nss==true )&& (nsc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
     await JuiceItemSchema.updateOne({"ItemCost.sizeName":"mediumsize"},{$set:{"ItemCost.$.Price":parseInt(ItemCost[i].mediumsize)}})
}

if(ItemCost[i].smallsize){
   if(ssc==true && sss==false){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
await JuiceItemSchema.updateOne(
  { _id: _id},
  { $push: { "ItemCost": {"sizeName":"smallsize","Price":ItemCost[i].smallsize} }}
);
}

if((sss==true) && (ssc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"smallsize"}}})
}
if((lss==true )&& (lsc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"largesize"}}})
}
if((mss==true )&& (msc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"mediumsize"}}})
}
if((nss==true )&& (nsc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
 await JuiceItemSchema.updateOne({"ItemCost.sizeName":"smallsize"},{$set:{"ItemCost.$.Price":parseInt(ItemCost[i].smallsize)}})
}
if(ItemCost[i].largesize){
  if(lsc==true && lss==false){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
await JuiceItemSchema.updateOne(
  { _id: _id},
  { $push: { "ItemCost": {"sizeName":"largesize","Price":ItemCost[i].largesize} }}
);
}
if((sss==true) && (ssc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"smallsize"}}})
}
if((lss==true )&& (lsc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"largesize"}}})
}
if((mss==true )&& (msc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"mediumsize"}}})
}
if((nss==true )&& (nsc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
 await JuiceItemSchema.updateOne({"ItemCost.sizeName":"largesize"},{$set:{"ItemCost.$.Price":parseInt(ItemCost[i].largesize)}})

}

if(ItemCost[i].normalsize){
  if(nsc==true && nss==false){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"mediumsize"}}})
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"largesize"}}})
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"smallsize"}}})
let ss=await JuiceItemSchema.updateOne(
  { _id: _id},
  { $push: { "ItemCost": {"sizeName":"normalsize","Price":ItemCost[i].normalsize} }}
);
}
if((sss==true) && (ssc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"smallsize"}}})
}
if((lss==true )&& (lsc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"largesize"}}})
}
if((mss==true )&& (msc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"mediumsize"}}})
}
if((nss==true )&& (nsc==false)){
 await JuiceItemSchema.updateOne({$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
  await JuiceItemSchema.updateOne({"ItemCost.sizeName":"normalsize"},{$set:{"ItemCost.$.Price":parseInt(ItemCost[i].normalsize)}})
}



}
      if (ress) {
      return  res.status(201).json({ ress, status: "201" });
      }
     }catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
