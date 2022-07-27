import React, { createContext, useState } from 'react'

const AllContext=createContext();



const Provider=({children})=>{

// useState
const [allFoodCategoriesData,setAllFoodCategoriesData]=useState([]);
const [filterAllFoodCategoriesData,setFilterAllFoodCategoriesData]=useState([]);
const [updateFoodCategoryID,setUpdateFoodCategoryID]=useState('');


// Functions

// ! fetch all food data
const FetchAllFoodCategories=async()=>{
let ress=await fetch('http://localhost:3000/api/ShowFoodCategory');
let datas=await ress.json();
await setAllFoodCategoriesData(datas.data)
}




const updateFoodCategories=async(id)=>{
setUpdateFoodCategoryID(id);
let ress=await fetch('http://localhost:3000/api/ShowFoodCategory');
let datas=await ress.json();
await setAllFoodCategoriesData(datas.data);
let newData=[];
newData=allFoodCategoriesData.filter((item)=>{
return item._id.includes(id)
})
setFilterAllFoodCategoriesData(newData);
}
return (<AllContext.Provider value={{
// useState
allFoodCategoriesData,
updateFoodCategoryID,
setUpdateFoodCategoryID,
filterAllFoodCategoriesData,



// functiond
FetchAllFoodCategories,
updateFoodCategories
}}>{children}</AllContext.Provider>)
}


export {Provider,AllContext}