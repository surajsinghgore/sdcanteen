import React from 'react'
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import Head from "next/head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from '../Components/PathNavigate';
import AdminRightInnerHeader from '../Components/AdminRightInnerHeader';
import demo from '../../public/demo.jpeg';
import Image from 'next/image';
import { useState } from 'react';
export default function AddFood() {

const [showImage,setShowImage]=useState(true);

  var loadFile = function(e) {
  if(e.target.files[0]){
  let file=e.target.files[0];
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(file);
    output.onload = function() {
    setShowImage(false);
    document.getElementById('output').style.display="block";

      URL.revokeObjectURL(output.src) // free memory
    }
      }
      else{
    setShowImage(true);
    document.getElementById('output').style.display="none";
      }
  };
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
     <AdminLeftMenu state='food'/>

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
      <AdminRightInnerHeader />
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
<input type="file" name="photo" accept="image/*" id="photoFood" onChange={loadFile}/>

</li>
<li>
<p>Photo Realtime Preview</p>
<div className={StyleFood.preview_photo} id="preview">
{(showImage)? <h1>please uploard Image</h1>:''}

<img src="" alt="" id="output"/>
</div>
</li>
<button> ADD FOOD</button>

</div>
</div>
      </div>
    </div>
  )
}
