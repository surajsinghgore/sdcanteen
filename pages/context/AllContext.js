import React, { createContext, useState } from 'react'
let HOST=process.env.NEXT_PUBLIC_API_URL;
const AllContext=createContext();



const Provider=({children})=>{

// useState

const [filterAllFoodCategoriesData,setFilterAllFoodCategoriesData]=useState([]);
const [filterFoodItemsData,setFilterFoodItemsData]=useState([]);

const [deletes,setDeletes]=useState(false);





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
let ress=await fetch(`${HOST}/api/ShowFoodItem`);
let datas=await ress.json();
let d=datas.data;
let dd=await d.filter((item)=>{
return item._id==id})
 setFilterFoodItemsData(dd)
}
return (<AllContext.Provider value={{
// useState
filterAllFoodCategoriesData,
deletes,setDeletes,
filterFoodItemsData,

// functiond
updateFoodCategories,
updateCoffeeCategories,
updateDrinkCategories,
updateJuiceCategories,
updateFoodItem
}}>{children}</AllContext.Provider>)
}


export {Provider,AllContext}