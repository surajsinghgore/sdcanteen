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
import {AllContext} from '../context/AllContext';
let HOST=process.env.NEXT_PUBLIC_API_URL;
 
function UpdateCoffeeCategory() {
const {filterAllFoodCategoriesData}=useContext(AllContext);


 const [CoffeeCategoryName, setCoffeeCategoryName] = useState('');





const updateFoodCategory=async()=>{
if(!CoffeeCategoryName){
toast.warn('Please Enter Somethig In Coffee Category Name Field', {
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
let res=await fetch(`${HOST}/api/UpdateCoffeeCategory`,{
    method: "POST",
    headers:{
        "Content-type": "application/json",
             "admintoken":localStorage.getItem('admintoken')
    },
    body: JSON.stringify({
        _id:filterAllFoodCategoriesData,CoffeeCategoryName
    })
})

let dataRes=await res.json();

if(dataRes.status=='403'){
toast.error('Please Login With Admin Credentials', {
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
  router.push('/admin/AllCoffeeCategory')
}
}

useEffect(()=>{
 if(filterAllFoodCategoriesData){
setCoffeeCategoryName(filterAllFoodCategoriesData[0].CoffeeCategoryName)
 }
},[filterAllFoodCategoriesData])

  return (
    <div className={Styles.admin}>

     <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>SD CANTEEN | UPDATE COFFEE CATEGORIES</title>
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
      <PathNavigate mainSection="Admin" mainSectionURL="/admin" subsection="" subsectionURL="" innerSubjection="UPDATE COFFEE CATEGORIES" innerSubjectionURL="/admin/UpdateCoffeeCategory" />
      

      {/* form add food */}

<div className={StyleFood.Form}>
<div className={StyleFood.heading}>
<h1>Update Previous Categories Name For  Food Website</h1>
</div>
<div className={StyleFood.form_element}>
<li style={{width:"90%"}}>
<p>Enter Coffee Category Name <span>*</span></p>
<input type="text" name="foodName" style={{width:"95%"}} onChange={(e)=>setCoffeeCategoryName(e.target.value)} value={CoffeeCategoryName}/>
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

export default UpdateCoffeeCategory