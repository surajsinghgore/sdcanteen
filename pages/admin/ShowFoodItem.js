import React from 'react'
import Styles from "../../styles/admin.module.css";
import ShowStyles from "../../styles/ShowFoodItem.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import Head from "next/head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from '../Components/PathNavigate';
import AdminRightInnerHeader from '../Components/AdminRightInnerHeader';



import Image from 'next/image';
import LoadingBar from "react-top-loading-bar";
import 'react-toastify/dist/ReactToastify.css';
import { useState ,useEffect} from 'react';
export default function AddFoodItem({datas}) {

  const [progress, setProgress] = useState(0);
const [foodNameSearch,setFoodNameSearch]=useState('')
const [categorySearch,setCategorySearch]=useState('')
  const [data, setData] = useState([]);

const [fetchData,setFetchData]=useState(datas);
const [demmyData,setDummyData]=useState(datas);


// filter using food name
const filterFoodName=async(e)=>{
setFoodNameSearch(e.target.value)
let newData=await demmyData.filter((item)=>{
return item.FoodName.toLowerCase().includes(foodNameSearch.toLowerCase())
})
setFetchData(newData)
 let foodNameSearchs=document.getElementById('foodNameSearchs');
 if(foodNameSearchs.value==''){
setFetchData(demmyData)
 }
}

// filter using category
const filterCategory=async(e)=>{
setCategorySearch(e.target.value)
let value=e.target.value;
let newData=await demmyData.filter((item)=>{
return item.Category==value})
setFetchData(newData)


if(e.target.value==''){
setFetchData(demmyData)
}


}

 useEffect(() => {

 async function dataFetch() {
      let ress = await fetch("http://localhost:3000/api/ShowFoodCategory");
      let datas = await ress.json();
      await setData(datas.data);
      setProgress(100);
    }
 dataFetch();

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
      <AdminRightInnerHeader title="Food Item Page"/>
      <PathNavigate mainSection="Admin" mainSectionURL="/admin" subsection="" subsectionURL="" innerSubjection="SHOW FOOD" innerSubjectionURL="/admin/ShowFoodItem" />
      

      {/* form add food */}

<div className={ShowStyles.display_List}>
<div className={ShowStyles.top}>
<div className={ShowStyles.deatils}>
<h1>All Food Items</h1>
<p>Details of all Food</p>
</div>
<div className={ShowStyles.search}>
<input type="search" name="name" placeholder='Search By Food Name...' value={foodNameSearch} onChange={filterFoodName} id="foodNameSearchs"/>
<select name="category" value={categorySearch} onChange={filterCategory} id="dropDown">
<option value="">Search By Category ..</option>
{data.map((item,index)=>{
return(
<option value={item.FoodCategoryName} key={index}>{item.FoodCategoryName}</option>
)
})}
</select>
</div>
</div>

<div className={ShowStyles.card_container}>
<div className={ShowStyles.cards}>
<li className={ShowStyles.Image_Section}>Item Photo</li>
<li className={ShowStyles.Item_Name}>Food Name</li>
<li className={ShowStyles.Item_Price}>Price</li>
<li className={ShowStyles.Item_Qty}>Qty</li>
<li className={ShowStyles.Item_Category}>Category</li>
</div>


{fetchData.slice(0,15).map((item,index)=>{
return(
<div className={ShowStyles.card} key={index}>
<li className={ShowStyles.Image_Section}><Image src={`/../public/FoodItemImages/${item.Image}`} alt={item.Image} height="550" width="800" loading="lazy"/></li>
<li className={ShowStyles.Item_Name}><p>{item.FoodName}</p></li>
<li className={ShowStyles.Item_Price}><p>{item.Price}</p></li>
<li className={ShowStyles.Item_Qty}><p>{item.Qty}</p></li>
<li className={ShowStyles.Item_Category}><p>{item.Category}</p></li>
</div>
)
})}

</div>

</div>


      </div>

    </div>
  )
}


export async function getServerSideProps(context) {
 let ress=await fetch("http://localhost:3000/api/ShowFoodItem");
      let data = await ress.json();
      let datas = await data.data;


  return {
    props: {datas},
  }
}