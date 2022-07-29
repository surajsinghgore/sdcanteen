import React from 'react'
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import Head from "next/head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from '../Components/PathNavigate';
import AdminRightInnerHeader from '../Components/AdminRightInnerHeader';
import demo from '../../public/demo.jpg';
import Image from 'next/image';
import LoadingBar from "react-top-loading-bar";
import 'react-toastify/dist/ReactToastify.css';
import { useState ,useEffect} from 'react';

export default function AddFoodItem({datas}) {

  const [progress, setProgress] = useState(0);
  const [data, setData] = useState([]);
  // form datas
const [FoodName,setFoodName]=useState('');                  
const [Price,setPrice]=useState('');                  
const [Qtys,setQtys]=useState('');                  
const [Category,setCategory]=useState('');                                  
const [imgs,setImgs]=useState(demo);                  

 useEffect(() => {
  dataFetch();
    async function dataFetch() {

       await setData(datas);
      console.log(data)
    await setFoodName(data[1].FoodName)
    await setPrice(data[0].Price)
    await setQtys(data[0].Qty)
await setImgs(data[0].Image);
await setCategory(data[0].Category);
      setProgress(100);
    }

  },[]);
  
  return (
  <div className={Styles.admin}>
    <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        progress={progress}
        transitionTime={100}
      />
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
<input type="text" name="foodName" value={FoodName} />
</li>
<li>
<p>Enter Food Price <span>*</span></p>
<input type="number" name="foodPrice" value={Price} />
</li>

<li>
<p>Enter Food Qty</p>
<input type="text" name="foodQty" value={Qtys} />
</li>

<li>
<p>Enter Food Category</p>
<select name="foodcategory" >
<option value={Category}>{Category}</option>

</select>
</li>
<li>
<p>Photo Realtime Preview</p>
<div className={StyleFood.preview_photo}  >
<Image src={imgs} alt='' id='output' width={600} height={600} />
</div>
</li>
</div>
</div>
      </div>

    </div>
  )
}


export async function getServerSideProps(context) {
 let ress = await fetch("http://localhost:3000/api/ShowFoodItem");
      let data = await ress.json();
      let datas = await data.data;


  return {
    props: {datas},
  }
}