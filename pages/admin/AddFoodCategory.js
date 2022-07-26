import React, { useState } from 'react'
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import Head from "next/head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from '../Components/PathNavigate';
import AdminRightInnerHeader from '../Components/AdminRightInnerHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 
function AddFoodCategories() {
const [FoodCategoryName,setFoodCategoryName]=useState('');
const addCategory=async(e)=>{
// if food field is empty
if(!FoodCategoryName){
toast.warn('Please Enter Food Category Name In The Field', {
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

const res=await fetch('http://localhost:3000/api/AddFoodCategory',{
    method: "POST",
    headers:{
        "Content-type": "application/json",
        
    },
    body: JSON.stringify({
        FoodCategoryName
    })
});
let data=await res.json();

// server error
// dublicate error message
if(data.status=='501'){
toast.error(`${data.message}`, {
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
// empty or not check
if(data.status=='402'){
toast.warn(`${data.message}`, {
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
// dublicate error message
if(data.status=='400'){
toast.warn(`${FoodCategoryName} Is Already Exists In Food Category`, {
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


toast.success(`${FoodCategoryName} Food Category Successfully Added`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
setFoodCategoryName('');
}
  return (
    <div className={Styles.admin}>
     <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>SD CANTEEN | ADD FOOD CATEGORIES</title>
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
      <PathNavigate mainSection="Admin" mainSectionURL="/admin" subsection="" subsectionURL="" innerSubjection="ADD FOOD CATEGORIES" innerSubjectionURL="/admin/AddFoodCategories" />
      

      {/* form add food */}

<div className={StyleFood.Form}>
<div className={StyleFood.heading}>
<h1>Enter New Categories List For  Food Website</h1>
</div>
<div className={StyleFood.form_element}>
<li style={{width:"90%"}}>
<p>Enter Food Category Name <span>*</span></p>
<input type="text" name="foodName" style={{width:"95%"}} onChange={(e)=>setFoodCategoryName(e.target.value)} value={FoodCategoryName}/>
</li>




<button style={{marginTop:"4%",marginLeft:"6%"}} onClick={addCategory}> ADD CATEGORY</button>

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

export default AddFoodCategories