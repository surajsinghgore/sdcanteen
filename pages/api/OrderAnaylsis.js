import websiteCounter from "./Schema/WebsiteCounterSchema";
import ItemRatings from './Schema/ItemRating'
import OrderSchemaDataBase from './Schema/OrderSchema'
import CoffeeItemSchema from './Schema/CoffeeItemSchema'
import DrinkItemSchema from './Schema/DrinkItemSchema'
import FoodItemSchema from './Schema/FoodItemSchema'
import JuiceItemSchema from './Schema/JuiceItemSchema'
import TopSearchSchema from './Schema/NumberOfSearch'
import ClientData from "./Schema/ClientData";


export default async function OrderAnaylsis(req,res) {
   if (req.method == "POST") {
      try{


let year1=req.body.year1;
let year2=req.body.year2;
let year3=req.body.year3;


let jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;
let total=0,total1=0,total2=0;
let totalOrder=[]
let totalOrderSum=[]
let totalOrderComplete=[]
let totalOrderCompleteSum=[]
let totalOrderPending=[];
let totalOrderPendingSum=[];
let totalOrderReject=[];
let totalOrderRejectSum=[];
let topFoodItem=[];
let topFoodItemMontWise=[];
let topCoffeeItem=[];
let topJuiceItem=[];
let topDrinkItem=[];
let topCoffeeItemMontWise=[];
let topJuiceItemMontWise=[];
let topDrinkItemMontWise=[];
let allItemsTop=[];

let AllOrderData=await OrderSchemaDataBase.find();
let allFoodData=await FoodItemSchema.find()
let allJuiceData=await JuiceItemSchema.find()
let allDrinkData=await DrinkItemSchema.find()
let allCoffeeData=await CoffeeItemSchema.find()
const data=await ItemRatings.find().sort({"Rating":-1})

// !All Three
if((req.body.year1)&&(req.body.year2)&&(req.body.year3)){



}
  


  // ! All Two
if((req.body.year1)&&(req.body.year2)){


}


  // !Only single
if((req.body.year1)){

// !1.1 total orders
async function SingleTotalOrder(){
jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;total=0;
for(let i=0;i<AllOrderData.length;i++){
let dateStr=AllOrderData[i].OrderDate.split(".");
if((dateStr[2]==year1)&&(dateStr[1]==1)){
jan++;
}

if((dateStr[2]==year1)&&(dateStr[1]==2)){
feb++;
}
if((dateStr[2]==year1)&&(dateStr[1]==3)){
mar++;
}
if((dateStr[2]==year1)&&(dateStr[1]==4)){
apr++;
}
if((dateStr[2]==year1)&&(dateStr[1]==5)){
may++;
}
if((dateStr[2]==year1)&&(dateStr[1]==6)){
jun++;
}
if((dateStr[2]==year1)&&(dateStr[1]==7)){
jul++;
}
if((dateStr[2]==year1)&&(dateStr[1]==8)){
aug++;
}
if((dateStr[2]==year1)&&(dateStr[1]==9)){
sep++;
}
if((dateStr[2]==year1)&&(dateStr[1]==10)){
oct++;
}
if((dateStr[2]==year1)&&(dateStr[1]==11)){
nov++;
}
if((dateStr[2]==year1)&&(dateStr[1]==12)){
dec++;
}
}
total=jan+feb+mar+apr+may+jun+jul+aug+sep+oct+nov+dec;
totalOrder.push([jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,year1])
totalOrderSum.push({year:year1,total})
}
// !1.2 total complete orders
async function SingleTotalCompleteOrder(){
jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;total=0;
for(let i=0;i<AllOrderData.length;i++){
let dateStr=AllOrderData[i].OrderDate.split(".");
if((dateStr[2]==year1)&&(dateStr[1]==1)&&(AllOrderData[i].OrderStatus=="complete")){
jan++;
}

if((dateStr[2]==year1)&&(dateStr[1]==2)&&(AllOrderData[i].OrderStatus=="complete")){
feb++;
}
if((dateStr[2]==year1)&&(dateStr[1]==3)&&(AllOrderData[i].OrderStatus=="complete")){
mar++;
}
if((dateStr[2]==year1)&&(dateStr[1]==4)&&(AllOrderData[i].OrderStatus=="complete")){
apr++;
}
if((dateStr[2]==year1)&&(dateStr[1]==5)&&(AllOrderData[i].OrderStatus=="complete")){
may++;
}
if((dateStr[2]==year1)&&(dateStr[1]==6)&&(AllOrderData[i].OrderStatus=="complete")){
jun++;
}
if((dateStr[2]==year1)&&(dateStr[1]==7)&&(AllOrderData[i].OrderStatus=="complete")){
jul++;
}
if((dateStr[2]==year1)&&(dateStr[1]==8)&&(AllOrderData[i].OrderStatus=="complete")){
aug++;
}
if((dateStr[2]==year1)&&(dateStr[1]==9)&&(AllOrderData[i].OrderStatus=="complete")){
sep++;
}
if((dateStr[2]==year1)&&(dateStr[1]==10)&&(AllOrderData[i].OrderStatus=="complete")){
oct++;
}
if((dateStr[2]==year1)&&(dateStr[1]==11)&&(AllOrderData[i].OrderStatus=="complete")){
nov++;
}
if((dateStr[2]==year1)&&(dateStr[1]==12)&&(AllOrderData[i].OrderStatus=="complete")){
dec++;
}
}
total=jan+feb+mar+apr+may+jun+jul+aug+sep+oct+nov+dec;
totalOrderComplete.push([jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,year1])
totalOrderCompleteSum.push({year:year1,total})
}
// !1.3 total pending orders
async function SingleTotalPendingOrder(){
jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;total=0;
for(let i=0;i<AllOrderData.length;i++){
let dateStr=AllOrderData[i].OrderDate.split(".");
if((dateStr[2]==year1)&&(dateStr[1]==1)&&(AllOrderData[i].OrderStatus=="Pending")){
jan++;
}

if((dateStr[2]==year1)&&(dateStr[1]==2)&&(AllOrderData[i].OrderStatus=="Pending")){
feb++;
}
if((dateStr[2]==year1)&&(dateStr[1]==3)&&(AllOrderData[i].OrderStatus=="Pending")){
mar++;
}
if((dateStr[2]==year1)&&(dateStr[1]==4)&&(AllOrderData[i].OrderStatus=="Pending")){
apr++;
}
if((dateStr[2]==year1)&&(dateStr[1]==5)&&(AllOrderData[i].OrderStatus=="Pending")){
may++;
}
if((dateStr[2]==year1)&&(dateStr[1]==6)&&(AllOrderData[i].OrderStatus=="Pending")){
jun++;
}
if((dateStr[2]==year1)&&(dateStr[1]==7)&&(AllOrderData[i].OrderStatus=="Pending")){
jul++;
}
if((dateStr[2]==year1)&&(dateStr[1]==8)&&(AllOrderData[i].OrderStatus=="Pending")){
aug++;
}
if((dateStr[2]==year1)&&(dateStr[1]==9)&&(AllOrderData[i].OrderStatus=="Pending")){
sep++;
}
if((dateStr[2]==year1)&&(dateStr[1]==10)&&(AllOrderData[i].OrderStatus=="Pending")){
oct++;
}
if((dateStr[2]==year1)&&(dateStr[1]==11)&&(AllOrderData[i].OrderStatus=="Pending")){
nov++;
}
if((dateStr[2]==year1)&&(dateStr[1]==12)&&(AllOrderData[i].OrderStatus=="Pending")){
dec++;
}
}
total=jan+feb+mar+apr+may+jun+jul+aug+sep+oct+nov+dec;
totalOrderPending.push([jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,year1])
totalOrderPendingSum.push({year:year1,total})
}
// !1.4 total reject  order
async function SingleTotalRejectOrder(){
jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;total=0;
for(let i=0;i<AllOrderData.length;i++){
let dateStr=AllOrderData[i].OrderDate.split(".");
if((dateStr[2]==year1)&&(dateStr[1]==1)&&(AllOrderData[i].OrderStatus=="reject")){
jan++;
}

if((dateStr[2]==year1)&&(dateStr[1]==2)&&(AllOrderData[i].OrderStatus=="reject")){
feb++;
}
if((dateStr[2]==year1)&&(dateStr[1]==3)&&(AllOrderData[i].OrderStatus=="reject")){
mar++;
}
if((dateStr[2]==year1)&&(dateStr[1]==4)&&(AllOrderData[i].OrderStatus=="reject")){
apr++;
}
if((dateStr[2]==year1)&&(dateStr[1]==5)&&(AllOrderData[i].OrderStatus=="reject")){
may++;
}
if((dateStr[2]==year1)&&(dateStr[1]==6)&&(AllOrderData[i].OrderStatus=="reject")){
jun++;
}
if((dateStr[2]==year1)&&(dateStr[1]==7)&&(AllOrderData[i].OrderStatus=="reject")){
jul++;
}
if((dateStr[2]==year1)&&(dateStr[1]==8)&&(AllOrderData[i].OrderStatus=="reject")){
aug++;
}
if((dateStr[2]==year1)&&(dateStr[1]==9)&&(AllOrderData[i].OrderStatus=="reject")){
sep++;
}
if((dateStr[2]==year1)&&(dateStr[1]==10)&&(AllOrderData[i].OrderStatus=="reject")){
oct++;
}
if((dateStr[2]==year1)&&(dateStr[1]==11)&&(AllOrderData[i].OrderStatus=="reject")){
nov++;
}
if((dateStr[2]==year1)&&(dateStr[1]==12)&&(AllOrderData[i].OrderStatus=="reject")){
dec++;
}
}
total=jan+feb+mar+apr+may+jun+jul+aug+sep+oct+nov+dec;
totalOrderReject.push([jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,year1])
totalOrderRejectSum.push({year:year1,total})
}
// !1.5 top  food item of the month
async function mostOrderedFood(){
let food=[];
let ja=[],fe=[],ma=[],ap=[],my=[],ju=[],jl=[],au=[],se=[],oc=[],no=[],de=[];
// divide orders monthwise
for(let j=0;j<AllOrderData.length;j++){
let date=AllOrderData[j].OrderDate.split('.');
if((date[2]==year1)&&(date[1]==1)&&(AllOrderData[j].OrderStatus=="complete")){ja.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==2)&&(AllOrderData[j].OrderStatus=="complete")){fe.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==3)&&(AllOrderData[j].OrderStatus=="complete")){ma.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==4)&&(AllOrderData[j].OrderStatus=="complete")){ap.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==5)&&(AllOrderData[j].OrderStatus=="complete")){my.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==6)&&(AllOrderData[j].OrderStatus=="complete")){ju.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==7)&&(AllOrderData[j].OrderStatus=="complete")){jl.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==8)&&(AllOrderData[j].OrderStatus=="complete")){au.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==9)&&(AllOrderData[j].OrderStatus=="complete")){se.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==10)&&(AllOrderData[j].OrderStatus=="complete")){oc.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==11)&&(AllOrderData[j].OrderStatus=="complete")){no.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==12)&&(AllOrderData[j].OrderStatus=="complete")){de.push(AllOrderData[j])}
}

if(ja.length!=0){
let temp=[]
for(let i=0;i<allFoodData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allFoodData[i].FoodName){
count++;
}
}
}
temp.push({count:count,Name:[allFoodData[i].FoodName],year:year1,month:1})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)


}else{food.push({count:0,Name:[no],year:year1,month:1})}


if(fe.length!=0){
let temp=[]
for(let i=0;i<allFoodData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allFoodData[i].FoodName){
count++;
}
}
}
temp.push({count:count,Name:[allFoodData[i].FoodName],year:year1,month:2})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)


}else{food.push({count:0,Name:[no],year:year1,month:2})}


if(ma.length!=0){
let temp=[]
for(let i=0;i<allFoodData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allFoodData[i].FoodName){
count++;
}
}
}
temp.push({count:count,Name:[allFoodData[i].FoodName],year:year1,month:3})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)


}else{food.push({count:0,Name:[no],year:year1,month:3})}


if(ap.length!=0){
let temp=[]
for(let i=0;i<allFoodData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allFoodData[i].FoodName){
count++;
}
}
}
temp.push({count:count,Name:[allFoodData[i].FoodName],year:year1,month:4})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)
}else{food.push({count:0,Name:[no],year:year1,month:4})}


if(my.length!=0){
let temp=[]
for(let i=0;i<allFoodData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allFoodData[i].FoodName){
count++;
}
}
}
temp.push({count:count,Name:[allFoodData[i].FoodName],year:year1,month:5})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)
}else{food.push({count:0,Name:[no],year:year1,month:5})}



if(ju.length!=0){
let temp=[]
for(let i=0;i<allFoodData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allFoodData[i].FoodName){
count++;
}
}
}
temp.push({count:count,Name:[allFoodData[i].FoodName],year:year1,month:6})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)
}else{food.push({count:0,Name:[no],year:year1,month:6})}


if(jl.length!=0){
let temp=[]
for(let i=0;i<allFoodData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allFoodData[i].FoodName){
count++;
}
}
}
temp.push({count:count,Name:[allFoodData[i].FoodName],year:year1,month:7})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)

}else{food.push({count:0,Name:[no],year:year1,month:7})}


if(au.length!=0){let temp=[]
for(let i=0;i<allFoodData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allFoodData[i].FoodName){
count++;
}
}
}
temp.push({count:count,Name:[allFoodData[i].FoodName],year:year1,month:8})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:8})}



if(se.length!=0){let temp=[]
for(let i=0;i<allFoodData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allFoodData[i].FoodName){
count++;
}
}
}
temp.push({count:count,Name:[allFoodData[i].FoodName],year:year1,month:9})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:9})}


if(oc.length!=0){let temp=[]
for(let i=0;i<allFoodData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allFoodData[i].FoodName){
count++;
}
}
}
temp.push({count:count,Name:[allFoodData[i].FoodName],year:year1,month:10})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:10})}


if(no.length!=0){let temp=[]
for(let i=0;i<allFoodData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allFoodData[i].FoodName){
count++;
}
}
}
temp.push({count:count,Name:[allFoodData[i].FoodName],year:year1,month:11})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:11})}


if(de.length!=0){let temp=[]
for(let i=0;i<allFoodData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allFoodData[i].FoodName){
count++;
}
}
}
temp.push({count:count,Name:[allFoodData[i].FoodName],year:year1,month:12})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:12})}

topFoodItemMontWise.push(food)


}
// !1.6 top coffee item of the month
async function mostOrderedCoffee(){
let food=[];
let ja=[],fe=[],ma=[],ap=[],my=[],ju=[],jl=[],au=[],se=[],oc=[],no=[],de=[];
// divide orders monthwise
for(let j=0;j<AllOrderData.length;j++){
let date=AllOrderData[j].OrderDate.split('.');
if((date[2]==year1)&&(date[1]==1)&&(AllOrderData[j].OrderStatus=="complete")){ja.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==2)&&(AllOrderData[j].OrderStatus=="complete")){fe.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==3)&&(AllOrderData[j].OrderStatus=="complete")){ma.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==4)&&(AllOrderData[j].OrderStatus=="complete")){ap.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==5)&&(AllOrderData[j].OrderStatus=="complete")){my.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==6)&&(AllOrderData[j].OrderStatus=="complete")){ju.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==7)&&(AllOrderData[j].OrderStatus=="complete")){jl.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==8)&&(AllOrderData[j].OrderStatus=="complete")){au.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==9)&&(AllOrderData[j].OrderStatus=="complete")){se.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==10)&&(AllOrderData[j].OrderStatus=="complete")){oc.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==11)&&(AllOrderData[j].OrderStatus=="complete")){no.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==12)&&(AllOrderData[j].OrderStatus=="complete")){de.push(AllOrderData[j])}
}

if(ja.length!=0){
let temp=[]
for(let i=0;i<allCoffeeData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allCoffeeData[i].CoffeeName){
count++;
}
}
}
temp.push({count:count,Name:[allCoffeeData[i].CoffeeName],year:year1,month:1})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)


}else{food.push({count:0,Name:[no],year:year1,month:1})}


if(fe.length!=0){
let temp=[]
for(let i=0;i<allCoffeeData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allCoffeeData[i].CoffeeName){
count++;
}
}
}
temp.push({count:count,Name:[allCoffeeData[i].CoffeeName],year:year1,month:2})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)


}else{food.push({count:0,Name:[no],year:year1,month:2})}


if(ma.length!=0){
let temp=[]
for(let i=0;i<allCoffeeData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allCoffeeData[i].CoffeeName){
count++;
}
}
}
temp.push({count:count,Name:[allCoffeeData[i].CoffeeName],year:year1,month:3})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)


}else{food.push({count:0,Name:[no],year:year1,month:3})}


if(ap.length!=0){
let temp=[]
for(let i=0;i<allCoffeeData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allCoffeeData[i].CoffeeName){
count++;
}
}
}
temp.push({count:count,Name:[allCoffeeData[i].CoffeeName],year:year1,month:4})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)
}else{food.push({count:0,Name:[no],year:year1,month:4})}


if(my.length!=0){
let temp=[]
for(let i=0;i<allCoffeeData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allCoffeeData[i].CoffeeName){
count++;
}
}
}
temp.push({count:count,Name:[allCoffeeData[i].CoffeeName],year:year1,month:5})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)
}else{food.push({count:0,Name:[no],year:year1,month:5})}



if(ju.length!=0){
let temp=[]
for(let i=0;i<allCoffeeData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allCoffeeData[i].CoffeeName){
count++;
}
}
}
temp.push({count:count,Name:[allCoffeeData[i].CoffeeName],year:year1,month:6})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)
}else{food.push({count:0,Name:[no],year:year1,month:6})}


if(jl.length!=0){
let temp=[]
for(let i=0;i<allCoffeeData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allCoffeeData[i].CoffeeName){
count++;
}
}
}
temp.push({count:count,Name:[allCoffeeData[i].CoffeeName],year:year1,month:7})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)

}else{food.push({count:0,Name:[no],year:year1,month:7})}


if(au.length!=0){let temp=[]
for(let i=0;i<allCoffeeData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allCoffeeData[i].CoffeeName){
count++;
}
}
}
temp.push({count:count,Name:[allCoffeeData[i].CoffeeName],year:year1,month:8})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:8})}



if(se.length!=0){let temp=[]
for(let i=0;i<allCoffeeData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allCoffeeData[i].CoffeeName){
count++;
}
}
}
temp.push({count:count,Name:[allCoffeeData[i].CoffeeName],year:year1,month:9})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:9})}


if(oc.length!=0){let temp=[]
for(let i=0;i<allCoffeeData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allCoffeeData[i].CoffeeName){
count++;
}
}
}
temp.push({count:count,Name:[allCoffeeData[i].CoffeeName],year:year1,month:10})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:10})}


if(no.length!=0){let temp=[]
for(let i=0;i<allCoffeeData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allCoffeeData[i].CoffeeName){
count++;
}
}
}
temp.push({count:count,Name:[allCoffeeData[i].CoffeeName],year:year1,month:11})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:11})}


if(de.length!=0){let temp=[]
for(let i=0;i<allCoffeeData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allCoffeeData[i].CoffeeName){
count++;
}
}
}
temp.push({count:count,Name:[allCoffeeData[i].CoffeeName],year:year1,month:12})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:12})}

topCoffeeItemMontWise.push(food)


}
// ! 1.7 top juice item monthwise
async function mostOrderedJuice(){
let food=[];
let ja=[],fe=[],ma=[],ap=[],my=[],ju=[],jl=[],au=[],se=[],oc=[],no=[],de=[];
// divide orders monthwise
for(let j=0;j<AllOrderData.length;j++){
let date=AllOrderData[j].OrderDate.split('.');
if((date[2]==year1)&&(date[1]==1)&&(AllOrderData[j].OrderStatus=="complete")){ja.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==2)&&(AllOrderData[j].OrderStatus=="complete")){fe.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==3)&&(AllOrderData[j].OrderStatus=="complete")){ma.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==4)&&(AllOrderData[j].OrderStatus=="complete")){ap.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==5)&&(AllOrderData[j].OrderStatus=="complete")){my.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==6)&&(AllOrderData[j].OrderStatus=="complete")){ju.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==7)&&(AllOrderData[j].OrderStatus=="complete")){jl.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==8)&&(AllOrderData[j].OrderStatus=="complete")){au.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==9)&&(AllOrderData[j].OrderStatus=="complete")){se.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==10)&&(AllOrderData[j].OrderStatus=="complete")){oc.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==11)&&(AllOrderData[j].OrderStatus=="complete")){no.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==12)&&(AllOrderData[j].OrderStatus=="complete")){de.push(AllOrderData[j])}
}

if(ja.length!=0){
let temp=[]
for(let i=0;i<allJuiceData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allJuiceData[i].JuiceName){
count++;
}
}
}
temp.push({count:count,Name:[allJuiceData[i].JuiceName],year:year1,month:1})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)


}else{food.push({count:0,Name:[no],year:year1,month:1})}


if(fe.length!=0){
let temp=[]
for(let i=0;i<allJuiceData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allJuiceData[i].JuiceName){
count++;
}
}
}
temp.push({count:count,Name:[allJuiceData[i].JuiceName],year:year1,month:2})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)


}else{food.push({count:0,Name:[no],year:year1,month:2})}


if(ma.length!=0){
let temp=[]
for(let i=0;i<allJuiceData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allJuiceData[i].JuiceName){
count++;
}
}
}
temp.push({count:count,Name:[allJuiceData[i].JuiceName],year:year1,month:3})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)


}else{food.push({count:0,Name:[no],year:year1,month:3})}


if(ap.length!=0){
let temp=[]
for(let i=0;i<allJuiceData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allJuiceData[i].JuiceName){
count++;
}
}
}
temp.push({count:count,Name:[allJuiceData[i].JuiceName],year:year1,month:4})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)
}else{food.push({count:0,Name:[no],year:year1,month:4})}


if(my.length!=0){
let temp=[]
for(let i=0;i<allJuiceData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allJuiceData[i].JuiceName){
count++;
}
}
}
temp.push({count:count,Name:[allJuiceData[i].JuiceName],year:year1,month:5})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)
}else{food.push({count:0,Name:[no],year:year1,month:5})}



if(ju.length!=0){
let temp=[]
for(let i=0;i<allJuiceData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allJuiceData[i].JuiceName){
count++;
}
}
}
temp.push({count:count,Name:[allJuiceData[i].JuiceName],year:year1,month:6})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)
}else{food.push({count:0,Name:[no],year:year1,month:6})}


if(jl.length!=0){
let temp=[]
for(let i=0;i<allJuiceData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allJuiceData[i].JuiceName){
count++;
}
}
}
temp.push({count:count,Name:[allJuiceData[i].JuiceName],year:year1,month:7})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)

}else{food.push({count:0,Name:[no],year:year1,month:7})}


if(au.length!=0){let temp=[]
for(let i=0;i<allJuiceData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allJuiceData[i].JuiceName){
count++;
}
}
}
temp.push({count:count,Name:[allJuiceData[i].JuiceName],year:year1,month:8})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:8})}



if(se.length!=0){let temp=[]
for(let i=0;i<allJuiceData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allJuiceData[i].JuiceName){
count++;
}
}
}
temp.push({count:count,Name:[allJuiceData[i].JuiceName],year:year1,month:9})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:9})}


if(oc.length!=0){let temp=[]
for(let i=0;i<allJuiceData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allJuiceData[i].JuiceName){
count++;
}
}
}
temp.push({count:count,Name:[allJuiceData[i].JuiceName],year:year1,month:10})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:10})}


if(no.length!=0){let temp=[]
for(let i=0;i<allJuiceData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allJuiceData[i].JuiceName){
count++;
}
}
}
temp.push({count:count,Name:[allJuiceData[i].JuiceName],year:year1,month:11})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:11})}


if(de.length!=0){let temp=[]
for(let i=0;i<allJuiceData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allJuiceData[i].JuiceName){
count++;
}
}
}
temp.push({count:count,Name:[allJuiceData[i].JuiceName],year:year1,month:12})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:12})}

topJuiceItemMontWise.push(food)


}

// ! 1.8 top drink monthwise
async function mostOrderedDrink(){
let food=[];
let ja=[],fe=[],ma=[],ap=[],my=[],ju=[],jl=[],au=[],se=[],oc=[],no=[],de=[];
// divide orders monthwise
for(let j=0;j<AllOrderData.length;j++){
let date=AllOrderData[j].OrderDate.split('.');
if((date[2]==year1)&&(date[1]==1)&&(AllOrderData[j].OrderStatus=="complete")){ja.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==2)&&(AllOrderData[j].OrderStatus=="complete")){fe.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==3)&&(AllOrderData[j].OrderStatus=="complete")){ma.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==4)&&(AllOrderData[j].OrderStatus=="complete")){ap.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==5)&&(AllOrderData[j].OrderStatus=="complete")){my.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==6)&&(AllOrderData[j].OrderStatus=="complete")){ju.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==7)&&(AllOrderData[j].OrderStatus=="complete")){jl.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==8)&&(AllOrderData[j].OrderStatus=="complete")){au.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==9)&&(AllOrderData[j].OrderStatus=="complete")){se.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==10)&&(AllOrderData[j].OrderStatus=="complete")){oc.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==11)&&(AllOrderData[j].OrderStatus=="complete")){no.push(AllOrderData[j])}
if((date[2]==year1)&&(date[1]==12)&&(AllOrderData[j].OrderStatus=="complete")){de.push(AllOrderData[j])}
}

if(ja.length!=0){
let temp=[]
for(let i=0;i<allDrinkData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allDrinkData[i].DrinkName){
count++;
}
}
}
temp.push({count:count,Name:[allDrinkData[i].DrinkName],year:year1,month:1})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)


}else{food.push({count:0,Name:[no],year:year1,month:1})}


if(fe.length!=0){
let temp=[]
for(let i=0;i<allDrinkData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allDrinkData[i].DrinkName){
count++;
}
}
}
temp.push({count:count,Name:[allDrinkData[i].DrinkName],year:year1,month:2})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)


}else{food.push({count:0,Name:[no],year:year1,month:2})}


if(ma.length!=0){
let temp=[]
for(let i=0;i<allDrinkData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allDrinkData[i].DrinkName){
count++;
}
}
}
temp.push({count:count,Name:[allDrinkData[i].DrinkName],year:year1,month:3})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)


}else{food.push({count:0,Name:[no],year:year1,month:3})}


if(ap.length!=0){
let temp=[]
for(let i=0;i<allDrinkData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allDrinkData[i].DrinkName){
count++;
}
}
}
temp.push({count:count,Name:[allDrinkData[i].DrinkName],year:year1,month:4})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)
}else{food.push({count:0,Name:[no],year:year1,month:4})}


if(my.length!=0){
let temp=[]
for(let i=0;i<allDrinkData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allDrinkData[i].DrinkName){
count++;
}
}
}
temp.push({count:count,Name:[allDrinkData[i].DrinkName],year:year1,month:5})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)
}else{food.push({count:0,Name:[no],year:year1,month:5})}



if(ju.length!=0){
let temp=[]
for(let i=0;i<allDrinkData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allDrinkData[i].DrinkName){
count++;
}
}
}
temp.push({count:count,Name:[allDrinkData[i].DrinkName],year:year1,month:6})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)
}else{food.push({count:0,Name:[no],year:year1,month:6})}


if(jl.length!=0){
let temp=[]
for(let i=0;i<allDrinkData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allDrinkData[i].DrinkName){
count++;
}
}
}
temp.push({count:count,Name:[allDrinkData[i].DrinkName],year:year1,month:7})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)

}else{food.push({count:0,Name:[no],year:year1,month:7})}


if(au.length!=0){let temp=[]
for(let i=0;i<allDrinkData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allDrinkData[i].DrinkName){
count++;
}
}
}
temp.push({count:count,Name:[allDrinkData[i].DrinkName],year:year1,month:8})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:8})}



if(se.length!=0){let temp=[]
for(let i=0;i<allDrinkData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allDrinkData[i].DrinkName){
count++;
}
}
}
temp.push({count:count,Name:[allDrinkData[i].DrinkName],year:year1,month:9})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:9})}


if(oc.length!=0){let temp=[]
for(let i=0;i<allDrinkData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allDrinkData[i].DrinkName){
count++;
}
}
}
temp.push({count:count,Name:[allDrinkData[i].DrinkName],year:year1,month:10})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:10})}


if(no.length!=0){let temp=[]
for(let i=0;i<allDrinkData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allDrinkData[i].DrinkName){
count++;
}
}
}
temp.push({count:count,Name:[allDrinkData[i].DrinkName],year:year1,month:11})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:11})}


if(de.length!=0){let temp=[]
for(let i=0;i<allDrinkData.length;i++){
let count=0;
for(let j=0;j<ja.length;j++){
for(let k=0;k<ja[j].ItemsOrder.length;k++){
if(ja[j].ItemsOrder[k].ItemName==allDrinkData[i].DrinkName){
count++;
}
}
}
temp.push({count:count,Name:[allDrinkData[i].DrinkName],year:year1,month:12})
}
let list = temp.sort(function(a, b) {
    return b.count - a.count;
});
let firstOnline=list.splice(0,1)
food.push(firstOnline)}else{food.push({count:0,Name:[no],year:year1,month:12})}

topDrinkItemMontWise.push(food)


}
// ! 1.9  over all top 10
async function ratedItemss(){
let newData=data.slice(0,10);
for(let i=0;i<newData.length;i++){
for(let j=0;j<allFoodData.length;j++){
if(allFoodData[j]._id==newData[i].ProductId){
allItemsTop.push({Name:allFoodData[j].FoodName,Rate:newData[i].Rating})
}
}
for(let j=0;j<allJuiceData.length;j++){
if(allJuiceData[j]._id==newData[i].ProductId){
allItemsTop.push({Name:allJuiceData[j].JuiceName,Rate:newData[i].Rating})
}
}
for(let j=0;j<allDrinkData.length;j++){
if(allDrinkData[j]._id==newData[i].ProductId){
allItemsTop.push({Name:allDrinkData[j].DrinkName,Rate:newData[i].Rating})
}
}
for(let j=0;j<allCoffeeData.length;j++){
if(allCoffeeData[j]._id==newData[i].ProductId){
allItemsTop.push({Name:allCoffeeData[j].CoffeeName,Rate:newData[i].Rating})
}
}


}


}


// ! function calls
SingleTotalOrder()
SingleTotalCompleteOrder()
ratedItemss()
SingleTotalPendingOrder()
SingleTotalRejectOrder()
mostOrderedFood()
mostOrderedCoffee()
mostOrderedJuice()
mostOrderedDrink()

// !return values
return res.status(200).json({
totalOrder,
totalOrderSum,
totalOrderComplete,
totalOrderCompleteSum,
totalOrderPending,
totalOrderPendingSum,
totalOrderReject,
totalOrderRejectSum,topFoodItem,topFoodItemMontWise,topCoffeeItemMontWise,topDrinkItemMontWise,topJuiceItemMontWise,allItemsTop})
}



  } catch (error) {
    console.log(error)
      res.status(501).json({ message: error });
    }
   }
}
