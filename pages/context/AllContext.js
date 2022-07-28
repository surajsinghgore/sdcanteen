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
return (<AllContext.Provider value={{
// useState
filterAllFoodCategoriesData,
deletes,setDeletes,


// functiond
updateFoodCategories
}}>{children}</AllContext.Provider>)
}


export {Provider,AllContext}