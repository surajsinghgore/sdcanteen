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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState ,useEffect} from 'react';

export default function AddFoodItem() {

  const [progress, setProgress] = useState(0);
  const [data, setData] = useState([]);
  // form ates
const [FoodName,setFoodName]=useState('');                  
const [Price,setPrice]=useState('');                  
const [Qtys,setQtys]=useState('');                  
const [Category,setCategory]=useState('');                  
const [Images,setImages]=useState('');                  
const [imgs,setImgs]=useState(demo);                  
const [showImage,setShowImage]=useState(true);


// images handle
const handleChange=async(e)=>{
  if(e.target.files[0]){
var file = e.target.files[0];
  let url=await URL.createObjectURL(file);
  setImgs(url);
  setImages(url)
    setShowImage(false);
  }
  else{
    setShowImage(true);
  }

}


const AddFoodItem=async(e)=>{
e.preventDefault();


if(!FoodName){
toast.warn('Please Enter Food Name', {
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
if(!Price){
toast.warn('Please Enter Food Price', {
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
if(!Images){
toast.warn('Please Uploard Food Image', {
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
const res=await fetch('http://localhost:3000/api/AddFoodItem',{
    method: "POST",
    headers:{
        "Content-type": "application/json",
        
    },
    body: JSON.stringify({
        FoodName:FoodName,Price:Price,Qty:Qtys,Category:Category,Image:Images
    })
});
let data=await res.json();
// sesver error
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
// dublicate error message
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


toast.success(`${FoodName} is Successfully Added`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

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
<input type="text" name="foodName" value={FoodName} onChange={(e)=>setFoodName(e.target.value)}/>
</li>
<li>
<p>Enter Food Price <span>*</span></p>
<input type="number" name="foodPrice" value={Price} onChange={(e)=>setPrice(e.target.value)}/>
</li>

<li>
<p>Enter Food Qty</p>
<input type="text" name="foodQty" value={Qtys} onChange={(e)=>setQtys(e.target.value)}/>
</li>

<li>
<p>Enter Food Category</p>
<select name="foodcategory" value={Category} onChange={(e)=>setCategory(e.target.value)}>
<option value="no">Select Category</option>
{data.map((item,index)=>{
return(
<option value={item.FoodCategoryName} key={index}>{item.FoodCategoryName}</option>
)
})}

</select>
</li>
<li>
<p>Uploard Food Photo <span>*</span></p>
<input type="file" name="photo"  id="photoFood"  onChange={handleChange}/>

</li>
<li>
<p>Photo Realtime Preview</p>
<div className={StyleFood.preview_photo}  >
{(showImage)? <h1>please uploard Image</h1>:<Image src={imgs} alt='' id='output' width={600} height={600} />}

</div>
</li>
<button onClick={AddFoodItem}> ADD FOOD</button>

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
