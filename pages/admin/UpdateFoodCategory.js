import React, { useEffect, useState,useContext } from 'react'
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import Head from "next/head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from '../Components/PathNavigate';
import AdminRightInnerHeader from '../Components/AdminRightInnerHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from 'next/router'
import LoadingBar from 'react-top-loading-bar';
import {AllContext} from '../context/AllContext';

 
function UpdateFoodCategory() {
const {filterAllFoodCategoriesData}=useContext(AllContext);


 const [progress, setProgress] = useState(0);
 const [FoodCategoryName, setFoodCategoryName] = useState('');





const updateFoodCategory=async()=>{

let res=await fetch('http://localhost:3000/api/UpdateFoodCategory',{
    method: "POST",
    headers:{
        "Content-type": "application/json",
        
    },
    body: JSON.stringify({
        _id:filterAllFoodCategoriesData,FoodCategoryName
    })
})

let dataRes=await res.json();
if(!FoodCategoryName){
toast.warn('Please Enter Somethig In Food Category Name Field', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}
if(dataRes.status=='400'){
toast.warn(`${dataRes.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}

if(dataRes.status=='501'){
toast.error(`${dataRes.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}


toast.success(`${dataRes.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

setTimeout(RedirectFunction,1000);
function RedirectFunction(){
  router.push('/admin/AllFoodCategories')
}
}

useEffect(()=>{
 if(filterAllFoodCategoriesData){
setFoodCategoryName(filterAllFoodCategoriesData[0].FoodCategoryName)
 }
setProgress(100);
},[filterAllFoodCategoriesData])

  return (
    <div className={Styles.admin}>
    <LoadingBar
        color='rgb(255 82 0)'
        height={3.5}
        progress={progress}
          transitionTime={100}
      />
     <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>SD CANTEEN | UPDATE FOOD CATEGORIES</title>
        <meta name="description" content="sd canteen website" />
        <meta name="author" content="suraj singh" />
        <meta
          keyword=""
          content="sd canteen, sd college,admin login,admin dash board"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
     <AdminLeftMenu />
     {/* right bar */}
      <div className={StyleFood.rightSideBar}>
      <AdminRightInnerHeader title="Add Food Categories" />
      <PathNavigate mainSection="Admin" mainSectionURL="/admin" subsection="" subsectionURL="" innerSubjection="UPDATE FOOD CATEGORIES" innerSubjectionURL="/admin/UpdateFoodCategory" />
      

      {/* form add food */}

<div className={StyleFood.Form}>
<div className={StyleFood.heading}>
<h1>Update Previous Categories Name For  Food Website</h1>
</div>
<div className={StyleFood.form_element}>
<li style={{width:"90%"}}>
<p>Enter Food Category Name <span>*</span></p>
<input type="text" name="foodName" style={{width:"95%"}} onChange={(e)=>setFoodCategoryName(e.target.value)} value={FoodCategoryName}/>
</li>




<button style={{marginTop:"4%",marginLeft:"6%"}} onClick={updateFoodCategory}> UPDATE CATEGORY</button>

</div>
</div>
      </div>
          <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </div>
    
  )
}

export default UpdateFoodCategory