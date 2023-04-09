import DbConnection from "./Middleware/DbConnection";
import FoodItemSchema from "./Schema/FoodItemSchema";
import VerifyAdmin from "./Middleware/MiddlewareAdminVerify";
import TopSearchSchema from './Schema/NumberOfSearch'







export default async function UpdateFoodItem(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
      let verify = await VerifyAdmin(req, res);
      if (verify == undefined) {
        return res
          .status(401)
          .json({ message: "Please login with admin credentails" });
      }
      let id=req.body._id;
      if(id==undefined){
      return res.status(400).json({message:"please Provide Id Of Item"})
      }

      let FoodName=req.body.FoodName;
      let qty=req.body.Qty;
      let category=req.body.Category;
      let Active=req.body.Active;
let mediumsize=req.body.mediumsize;
let largesize=req.body.largesize;
let halfsize=req.body.halfsize;
let Description=req.body.Description;
let normalsize=req.body.normalsize;



// find records and check new name not dublicated
let findData=await FoodItemSchema.findById(id);


// seacrh Data in
let searhData=await TopSearchSchema.findOne({ItemName:findData.FoodName})




if(FoodName!=findData.FoodName){
let resDouble=await FoodItemSchema.find({FoodName:FoodName});
if(resDouble.length!=0){
      return  res.status(400).json({ message: "Item Already Exits with this Item Name" });
 }
}


// change new name searchData
if(searhData!=null){
if(searhData.ItemName!=FoodName){
await TopSearchSchema.findOneAndUpdate({_id:searhData._id},{$set:{"ItemName":FoodName}})
}
}




await FoodItemSchema.findOneAndUpdate({_id:id},{$set:{"FoodName":FoodName,"Qty":qty,"Category":category,"Active":Active,"Description":Description}})

if((normalsize!='')){
// already exists update price
let ms=false;
let ss=false;
let ls=false;

findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){
const fired=async()=>{
await FoodItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":normalsize}})
return res.status(201).json({message:"successfully updated"})
}
fired();
}
if(item.sizeName=="halfsize"){ss=true}
if(item.sizeName=="mediumsize"){ms=true}
if(item.sizeName=="largesize"){ls=true}
})
if(ms){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"mediumsize"}}})
}
if(ss){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"halfsize"}}})

}
if(ls){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"largesize"}}})
}
let ns=false;
let newData=await FoodItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){
ns=true;
}
})
if(ns==false){

await FoodItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"normalsize","Price":normalsize} }})
}
return res.status(201).json({message:"successfully updated"})
}

if((mediumsize!='')&&(halfsize!='')&&(largesize!='')){
let nss=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="mediumsize"){
const fired=async()=>{
await FoodItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":mediumsize}})
}
fired();
}
if(item.sizeName=="halfsize"){
const fired=async()=>{
await FoodItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":halfsize}})
}
fired();
}
if(item.sizeName=="largesize"){
const fired=async()=>{
await FoodItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":largesize}})
}
fired();
}

})
if(nss){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
// new entry

let ms=false;
let ls=false
let ss=false
let newData=await FoodItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="mediumsize"){
ms=true;
}
if(item.sizeName=="largesize"){
ls=true;
}
if(item.sizeName=="halfsize"){
ss=true;
}
})
if(ms==false){
await FoodItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"mediumsize","Price":mediumsize} }})
}
if(ls==false){
await FoodItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"largesize","Price":largesize} }})
}

if(ss==false){
await FoodItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"halfsize","Price":halfsize} }})
}


return res.status(201).json({message:"successfully updated"})

}

if((mediumsize!='')&&(halfsize!='')){
let nss=false;
let ls=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="largesize"){ls=true}
if(item.sizeName=="mediumsize"){
const fired=async()=>{
await FoodItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":mediumsize}})
}
fired();
}
if(item.sizeName=="halfsize"){
const fired=async()=>{
await FoodItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":halfsize}})
}
fired();
}

})
if(nss){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
if(ls){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"largesize"}}})
}
// new entry
let ms=false;
let ss=false
let newData=await FoodItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="mediumsize"){
ms=true;
}
if(item.sizeName=="halfsize"){
ss=true;
}
})
if(ms==false){
await FoodItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"mediumsize","Price":mediumsize} }})
}
if(ss==false){
await FoodItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"halfsize","Price":halfsize} }})
}


return res.status(201).json({message:"successfully updated"})

}

if((mediumsize!='')&&(largesize!='')){
let nss=false;
let hs=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="halfsize"){hs=true}
if(item.sizeName=="mediumsize"){
const fired=async()=>{
await FoodItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":mediumsize}})
}
fired();
}

if(item.sizeName=="largesize"){
const fired=async()=>{
await FoodItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":largesize}})
}
fired();
}
})
if(nss){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
if(hs){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"halfsize"}}})
}
// new entry
let ms=false;
let ls=false
let newData=await FoodItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="mediumsize"){
ms=true;
}
if(item.sizeName=="largesize"){
ls=true;
}
})
if(ms==false){
await FoodItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"mediumsize","Price":mediumsize} }})
}
if(ls==false){
await FoodItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"largesize","Price":largesize} }})
}


return res.status(201).json({message:"successfully updated"})

}

if((halfsize!='')&&(largesize!='')){
let nss=false;
let ms=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="normalsize"){ms=true}
if(item.sizeName=="halfsize"){
const fired=async()=>{
await FoodItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":halfsize}})
}
fired();
}
if(item.sizeName=="largesize"){
const fired=async()=>{
await FoodItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":largesize}})
}
fired();
}

})
if(nss){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
if(ms){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"mediumsize"}}})
}
// new entry

let ls=false
let ss=false
let newData=await FoodItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="largesize"){
ls=true;
}
if(item.sizeName=="halfsize"){
ss=true;
}
})

if(ls==false){
await FoodItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"largesize","Price":largesize} }})
}

if(ss==false){
await FoodItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"halfsize","Price":halfsize} }})
}


return res.status(201).json({message:"successfully updated"})

}

if((mediumsize!='')){
let nss=false;let ss=false;let ls=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="halfsize"){ss=true}
if(item.sizeName=="largesize"){ls=true}
if(item.sizeName=="mediumsize"){
const fired=async()=>{
await FoodItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":mediumsize}})
}
fired();
}

})
if(nss){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
if(ss){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"halfsize"}}})
}
if(ls){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"largesize"}}})
}
// new entry

let ms=false;
let newData=await FoodItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="mediumsize"){
ms=true;
}
})
if(ms==false){
await FoodItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"mediumsize","Price":mediumsize} }})
}

return res.status(201).json({message:"successfully updated"})

}

if((halfsize!='')){
let nss=false;
let ms=false;
let ls=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="mediumsize"){ms=true}
if(item.sizeName=="largesize"){ls=true}
if(item.sizeName=="halfsize"){
const fired=async()=>{
await FoodItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":halfsize}})
}
fired();
}

})
if(nss){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
if(ms){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"mediumsize"}}})
}
if(ls){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"largesize"}}})
}
// new entry
let ss=false
let newData=await FoodItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="halfsize"){
ss=true;
}
})
if(ss==false){
await FoodItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"halfsize","Price":halfsize} }})
}
return res.status(201).json({message:"successfully updated"})

}

if((largesize!='')){
let nss=false;
let ss=false;
let ms=false;
// update exiting login
findData.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){nss=true}
if(item.sizeName=="mediumsize"){ms=true}
if(item.sizeName=="halfsize"){ss=true}
if(item.sizeName=="largesize"){
const fired=async()=>{
await FoodItemSchema.findOneAndUpdate({ItemCost: {$elemMatch: {_id: item._id}}}, {$set:{"ItemCost.$.Price":largesize}})
}
fired();
}
})
if(nss){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"normalsize"}}})
}
if(ms){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"mediumsize"}}})
}
if(ss){
 await FoodItemSchema.updateOne({_id:id},{$pull:{"ItemCost" : {"sizeName":"halfsize"}}})
}
// new entry


let ls=false
let newData=await FoodItemSchema.findById(id);
newData.ItemCost.map((item)=>{
if(item.sizeName=="largesize"){
ls=true;
}

})

if(ls==false){
await FoodItemSchema.updateOne( { _id: id},{ $push: { "ItemCost": {"sizeName":"largesize","Price":largesize} }})
}
return res.status(201).json({message:"successfully updated"})

}

    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
