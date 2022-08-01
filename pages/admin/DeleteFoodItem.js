import React from 'react'
import Styles from "../../styles/admin.module.css";
import ShowStyles from "../../styles/ShowFoodItem.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import Head from "next/head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from '../Components/PathNavigate';
import AdminRightInnerHeader from '../Components/AdminRightInnerHeader';
import { AiFillDelete } from 'react-icons/ai';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { useState ,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let HOST=process.env.NEXT_PUBLIC_API_URL;
export default function DeleteFoodItem({datas}) {

const[useEffectCall,setUseEffectCall]=useState(false);
const [foodNameSearch,setFoodNameSearch]=useState('')
const [categorySearch,setCategorySearch]=useState('')
  const [data, setData] = useState([]);

const [fetchData,setFetchData]=useState([]);
const [demmyData,setDummyData]=useState([]);


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





// deleting item
  const DeleteFoodItems=async(item)=>{
  if(!item._id){
  toast.warn('Please Provide Correct Id Of Item', {
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
    if(!item.Image){
  toast.warn('Please Provide Correct Image Of Item', {
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
 let res=await fetch(`${HOST}/api/DeleteFoodItem`,{
  method: "DELETE",
    headers:{
        "Content-type": "application/json",
        
    },
    body: JSON.stringify({
        _id:item._id,imagePath:item.Image
    })
 })


let data=await res.json();
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

if(data.status=='400'){
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
if(data.status=='201'){

toast.success(`Food Item Successfully Deleted`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
setUseEffectCall(!useEffectCall);
  }
  }
  


   useEffect(() => {
console.log('ff')
 async function dataFetch() {
      let ress = await fetch(`${HOST}/api/ShowFoodCategory`);
      let datas = await ress.json();
      await setData(datas.data);
    }
 dataFetch();


 async function dataCategoryFetch() {
      let ress = await fetch(`${HOST}/api/ShowFoodItem`);
      let datas = await ress.json();
      await setFetchData(datas.data)
   await setDummyData(datas.data)

    }
 dataCategoryFetch();

  },[useEffectCall]);
  return (
  <div className={Styles.admin}>
   
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>SD CANTEEN | DELETE FOOD ITEM</title>
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
      <AdminRightInnerHeader title="Delete Food Item Page"/>
      <PathNavigate mainSection="Admin" mainSectionURL="/admin" subsection="" subsectionURL="" innerSubjection="DELETE FOOD ITEM" innerSubjectionURL="/admin/DeleteFoodItem" />
      

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
<li className={ShowStyles.Item_Category}>Category</li>
<li className={ShowStyles.Item_Qty}>Action</li>
</div>


{fetchData.slice(0,15).map((item,index)=>{
return(
<div className={ShowStyles.card} key={index}>
<li className={ShowStyles.Image_Section}><Image src={`/../public/FoodItemImages/${item.Image}`} alt={item.Image} height="550" width="800" loading="lazy"/></li>
<li className={ShowStyles.Item_Name}><p>{item.FoodName}</p></li>
<li className={ShowStyles.Item_Price}><p>{item.Price}</p></li>
<li className={ShowStyles.Item_Category}><p>{item.Category}</p></li>
<li className={ShowStyles.Item_Qty}><p style={{color:'red',cursor:"pointer",fontSize:"24px"}} title="Click To Delete"><AiFillDelete onClick={()=>DeleteFoodItems(item)}/></p></li>
</div>
)
})}

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


export async function getServerSideProps(context) {
 let ress=await fetch(`${HOST}/api/ShowFoodItem`);
      let data = await ress.json();
      let datas = await data.data;


  return {
    props: {datas},
  }
}