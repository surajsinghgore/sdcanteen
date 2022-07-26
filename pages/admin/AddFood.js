import React from 'react'
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import Head from "next/head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from '../Components/PathNavigate';
import AdminRightInnerHeader from '../Components/AdminRightInnerHeader';
import demo from '../../public/demo.jpg';
import Image from 'next/image';

import { useState } from 'react';

export default function AddFood() {


const [imgs,setImgs]=useState(demo);                  
const [showImage,setShowImage]=useState(true);
const handleChange=async(e)=>{
  if(e.target.files[0]){
var file = e.target.files[0];
  let url=await URL.createObjectURL(file);
  setImgs(url);
    setShowImage(false);
  }
  else{
    setShowImage(true);
  }

}

  
  return (
  <div className={Styles.admin}>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>SD CANTEEN | ADD FOOD</title>
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
      <AdminRightInnerHeader title="Add Food Page"/>
      <PathNavigate mainSection="Admin" mainSectionURL="/admin" subsection="" subsectionURL="" innerSubjection="ADD FOOD" innerSubjectionURL="/admin/AddFood" />
      

      {/* form add food */}

<div className={StyleFood.Form}>
<div className={StyleFood.heading}>
<h1>Enter New Food Item For Website</h1>
</div>
<div className={StyleFood.form_element}>
<li>
<p>Enter Food Name <span>*</span></p>
<input type="text" name="foodName" />
</li>
<li>
<p>Enter Food Price <span>*</span></p>
<input type="number" name="foodPrice" />
</li>

<li>
<p>Enter Food Qty</p>
<input type="number" name="foodQty" />
</li>

<li>
<p>Enter Food Category</p>
<select name="foodcategory">
<option value="dosha">dosha</option>
<option value="pasta">pasta</option>
</select>
</li>
<li>
<p>Uploard Food Photo <span>*</span></p>
{/* <input type="file" name="photo" accept="image/*" id="photoFood" onChange={loadFile}/> */}
<input type="file" name="photo"  id="photoFood" onChange={handleChange}/>

</li>
<li>
<p>Photo Realtime Preview</p>
<div className={StyleFood.preview_photo}  >
{(showImage)? <h1>please uploard Image</h1>:<Image src={imgs} alt='' id='output' width={600} height={600} />}

</div>
</li>
<button> ADD FOOD</button>

</div>
</div>
      </div>
    </div>
  )
}
