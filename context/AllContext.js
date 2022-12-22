import React, { createContext, useState } from 'react'
let HOST=process.env.NEXT_PUBLIC_API_URL;
const AllContext=createContext();



const Provider=({children})=>{

// useState

const [filterAllFoodCategoriesData,setFilterAllFoodCategoriesData]=useState([]);
const [filterFoodItemsData,setFilterFoodItemsData]=useState([]);
const [filterCoffeeItemsData,setFilterCoffeeItemsData]=useState([]);
const [filterDrinkItemsData,setFilterDrinkItemsData]=useState([]);
const [filterJuiceItemsData,setFilterJuiceItemsData]=useState([]);
const [statesForRealtime,setStateForRealtime]=useState(true);
const [deletes,setDeletes]=useState(false);
const [userData,setUserData]=useState([]);


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
let ress=await fetch(`${HOST}/api/ShowFoodItemClient`);
let datas=await ress.json();
let d=datas.data;
let dd=await d.filter((item)=>{
return item._id==id})
 setFilterFoodItemsData(dd)
}


const updateCoffeeItem=async(id)=>{
let ress=await fetch(`${HOST}/api/ShowCoffeeItemClient`);
let datas=await ress.json();
let d=datas.data;
let dd=await d.filter((item)=>{
return item._id==id})
 setFilterCoffeeItemsData(dd)
}

const updateDrinkItem=async(id)=>{
let ress=await fetch(`${HOST}/api/ShowDrinkItemClient`);
let datas=await ress.json();
let d=datas.data;
let dd=await d.filter((item)=>{
return item._id==id})
 setFilterDrinkItemsData(dd)
}
const updateJuiceItem=async(id)=>{
let ress=await fetch(`${HOST}/api/ShowJuiceItemClient`);
let datas=await ress.json();
let d=datas.data;
let dd=await d.filter((item)=>{
return item._id==id})
 setFilterJuiceItemsData(dd)
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
updateJuiceItem,
}}>{children}</AllContext.Provider>)
}


export {Provider,AllContext}