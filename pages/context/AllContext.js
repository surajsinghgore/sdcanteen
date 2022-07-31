import React, { createContext, useState } from 'react'

const AllContext=createContext();



const Provider=({children})=>{

// useState

const [filterAllFoodCategoriesData,setFilterAllFoodCategoriesData]=useState(['']);
const [filterFoodItemsData,setFilterFoodItemsData]=useState([]);

const [deletes,setDeletes]=useState(false);
let datass=[];

// Functions





const updateFoodCategories=async(id)=>{

let ress=await fetch('http://localhost:3000/api/ShowFoodCategory');
let datas=await ress.json();
let d=datas.data;
let dd=d.filter((item)=>{

return item._id==id})
await setFilterAllFoodCategoriesData(dd)

}

const updateCoffeeCategories=async(id)=>{

let ress=await fetch('http://localhost:3000/api/ShowCoffeeCategory');
let datas=await ress.json();
let d=datas.data;
let dd=d.filter((item)=>{

return item._id==id})
await setFilterAllFoodCategoriesData(dd)

}

const updateDrinkCategories=async(id)=>{

let ress=await fetch('http://localhost:3000/api/ShowDrinkCategory');
let datas=await ress.json();
let d=datas.data;
let dd=d.filter((item)=>{

return item._id==id})
await setFilterAllFoodCategoriesData(dd)

}

const updateJuiceCategories=async(id)=>{
let ress=await fetch('http://localhost:3000/api/ShowJuiceCategory');
let datas=await ress.json();
let d=datas.data;
let dd=d.filter((item)=>{
return item._id==id})
await setFilterFoodItemsData(dd)

}

const updateFoodItem=async(id)=>{
let ress=await fetch('http://localhost:3000/api/ShowFoodItem');
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