import React, { createContext, useState } from 'react'
let HOST=process.env.NEXT_PUBLIC_API_URL;
const AllContext=createContext();


const Provider=({children})=>{

// useState
const [refresh,setRefresh]=useState(false);
const [filterAllFoodCategoriesData,setFilterAllFoodCategoriesData]=useState([]);
const [filterFoodItemsData,setFilterFoodItemsData]=useState([]);
const [filterCoffeeItemsData,setFilterCoffeeItemsData]=useState([]);
const [filterDrinkItemsData,setFilterDrinkItemsData]=useState([]);
const [filterJuiceItemsData,setFilterJuiceItemsData]=useState([]);
const [statesForRealtime,setStateForRealtime]=useState(true);
const [deletes,setDeletes]=useState(false);
const [userData,setUserData]=useState([]);
const [barData,setBarData]=useState([]);

const updateFoodCategories=async(id)=>{
let ress=await fetch(`${HOST}/api/ShowFoodCategory`);
let datas=await ress.json();
let d=datas.data;
let dd=d.filter((item)=>{

return item._id==id})
await setFilterAllFoodCategoriesData(dd)

}

const updateCoffeeCategories=async(id)=>{

let ress=await fetch(`${HOST}/api/ShowCoffeeCategory`);
let datas=await ress.json();
let d=datas.data;
let dd=d.filter((item)=>{

return item._id==id})
await setFilterAllFoodCategoriesData(dd)

}

const updateDrinkCategories=async(id)=>{

let ress=await fetch(`${HOST}/api/ShowDrinkCategory`);
let datas=await ress.json();
let d=datas.data;
let dd=d.filter((item)=>{

return item._id==id})
await setFilterAllFoodCategoriesData(dd)

}

const updateJuiceCategories=async(id)=>{
let ress=await fetch(`${HOST}/api/ShowJuiceCategory`);
let datas=await ress.json();
let d=datas.data;
let dd=d.filter((item)=>{
return item._id==id})
await setFilterAllFoodCategoriesData(dd)
}

const updateFoodItem=async(id)=>{
let ress=await fetch(`${HOST}/api/ShowFoodItemById?id=${id}`);
let datas=await ress.json();
if(ress.status==201){
let nor=null;
let mm=null;
let lar=null;
let small=null;
datas.data.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){
nor=item.Price
}
if(item.sizeName=="mediumsize"){
mm=item.Price
}
if(item.sizeName=="largesize"){
lar=item.Price
}
if(item.sizeName=="halfsize"){
small=item.Price
}
})

 setFilterFoodItemsData({datas:datas.data,normal:nor,medium:mm,large:lar,small:small})
}

}


const updateCoffeeItem=async(id)=>{
 let ress=await fetch(`${HOST}/api/ShowCoffeeItemById?id=${id}`);
let datas=await ress.json();
if(ress.status==201){
let nor=null;
let mm=null;
let lar=null;
let small=null;
datas.data.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){
nor=item.Price
}
if(item.sizeName=="mediumsize"){
mm=item.Price
}
if(item.sizeName=="largesize"){
lar=item.Price
}
if(item.sizeName=="smallsize"){
small=item.Price
}
})

 setFilterCoffeeItemsData({datas:datas.data,normal:nor,medium:mm,large:lar,small:small})
}

}

const updateDrinkItem=async(id)=>{
 let ress=await fetch(`${HOST}/api/ShowDrinkItemById?id=${id}`);
let datas=await ress.json();
if(ress.status==201){
let nor=null;
let mm=null;
let lar=null;
let small=null;
datas.data.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){
nor=item.Price
}
if(item.sizeName=="mediumsize"){
mm=item.Price
}
if(item.sizeName=="largesize"){
lar=item.Price
}
if(item.sizeName=="smallsize"){
small=item.Price
}
})

 setFilterDrinkItemsData({datas:datas.data,normal:nor,medium:mm,large:lar,small:small})
}
}



const updateJuiceItem=async(id)=>{
 let ress=await fetch(`${HOST}/api/ShowJuiceItemById?id=${id}`);
let datas=await ress.json();
if(ress.status==201){
let nor=null;
let mm=null;
let lar=null;
let small=null;
datas.data.ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){
nor=item.Price
}
if(item.sizeName=="mediumsize"){
mm=item.Price
}
if(item.sizeName=="largesize"){
lar=item.Price
}
if(item.sizeName=="smallsize"){
small=item.Price
}
})

 setFilterJuiceItemsData({datas:datas.data,normal:nor,medium:mm,large:lar,small:small})
}
 
}



return (<AllContext.Provider value={{
// useState
filterAllFoodCategoriesData,
deletes,setDeletes,setStateForRealtime,
filterFoodItemsData,
filterCoffeeItemsData,
statesForRealtime,userData,
filterDrinkItemsData,
filterJuiceItemsData,
updateFoodCategories,
updateCoffeeCategories,
updateDrinkCategories,
updateJuiceCategories,
updateFoodItem,setUserData,
updateCoffeeItem,
updateDrinkItem,
updateJuiceItem,refresh,setRefresh,barData,setBarData
}}>{children}</AllContext.Provider>)
}


export {Provider,AllContext}