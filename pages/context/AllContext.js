import React, { createContext, useState } from 'react'

const AllContext=createContext();



const Provider=({children})=>{

// useState

const [filterAllFoodCategoriesData,setFilterAllFoodCategoriesData]=useState(['']);
const [deletes,setDeletes]=useState(false);


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
await setFilterAllFoodCategoriesData(dd)

}
return (<AllContext.Provider value={{
// useState
filterAllFoodCategoriesData,
deletes,setDeletes,


// functiond
updateFoodCategories,
updateCoffeeCategories,
updateDrinkCategories,
updateJuiceCategories
}}>{children}</AllContext.Provider>)
}


export {Provider,AllContext}