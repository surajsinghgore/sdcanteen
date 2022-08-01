import React ,{useContext}from 'react'
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import Head from "next/head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from '../Components/PathNavigate';
import AdminRightInnerHeader from '../Components/AdminRightInnerHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let HOST=process.env.NEXT_PUBLIC_API_URL;
import { useState } from 'react';
import router from 'next/router'
import {AllContext} from '../context/AllContext';
import Link from "next/link";
import Image from 'next/image';
export default function UpdateFoodImage() {
const {filterFoodItemsData}=useContext(AllContext);     
const [imgs,setImgs]=useState(`/../public/FoodItemImages/${filterFoodItemsData[0].Image}`);                  
const [files,setFiles]=useState('');

// images handle
const handleChange=async(e)=>{
  if(e.target.files[0]){
var file = e.target.files[0];
setFiles(file)
  let url=await URL.createObjectURL(file);
  setImgs(url);

  }
}

const updateImage=async(e)=>{
e.preventDefault();

const dataImage=new FormData();
dataImage.append('_id',filterFoodItemsData[0]._id)
dataImage.append('oldImage',filterFoodItemsData[0].Image);
dataImage.append('Image',files);


if(!files){
toast.warn('Please Uploard New Photo To Change', {
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
   let response=await fetch(`${HOST}/api/UpdateFoodImage`,{
           method: 'POST',    
    body: dataImage
  })

if(response.status===500){
toast.error('Only JPG , PNG , JPEG Images are Allowed To Upload', {
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
 let datas=await response.json(); 
if(datas.status=='501'){
toast.error(`${datas.message}`, {
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
if(datas.status=='400'){
toast.warn(`${datas.message}`, {
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

if(datas.status=='201'){
toast.success(`${filterFoodItemsData[0].FoodName} Image Successfully Updated`, {
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
  router.push('/admin/UpdateFoodItem')
}
}
}

  return (
  <div className={Styles.admin}>
   
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>SD CANTEEN | UPDATE FOOD IMAGE</title>
        <meta name="description" content="sd canteen website" />
        <meta name="author" content="suraj singh" />
        <meta
          keyword=""
          content="sd canteen, sd college,admin login,admin dash board"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* left panel bar */}
     <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
      <AdminRightInnerHeader title="Update Food Item Image"/>
      <PathNavigate mainSection="Admin" mainSectionURL="/admin" subsection="" subsectionURL="" innerSubjection="UPDATE FOOD IMAGE" innerSubjectionURL="/admin/UpdateFoodImage" />
      

      {/* form add food */}

<div className={StyleFood.Form}>
<div className={StyleFood.heading}>
<h1>Enter New Food Image For Website</h1>
</div>
<div className={StyleFood.form_element}>
<div className="imageChange" style={{textAlign:'center',color:'blue'}}>
<h3><Link href='/admin/UpdateItemForm'>Click Here To Change Food General Details</Link></h3>
</div>
<li>
<p>Uploard Food Photo <span>*</span></p>
<input type="file" name="photo"  id="photoFood"  onChange={handleChange}/>

</li>
<li>
<p>Photo Realtime Preview</p>
<div className={StyleFood.preview_photo}  >
<Image src={imgs} alt='' id='output' width={600} height={600} />
</div>
</li>
<button onClick={updateImage} > UPDATE IMAGE</button>

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

