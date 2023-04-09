import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import HeadTag from "../../Components/Head";
import Header from "../../Components/Header";
import Loader from '../../Components/Loader'
import Footer from "../../Components/Footer";
import Styles from "../../styles/admin.module.css";
import style from "../../styles/FilterWithCategory.module.css";
import Link from 'next/link'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;

let Banner = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014250/bannerInside_scybz9.png`

import Image from 'next/image'
export default function Category() {
let router=useRouter()
const [loader,setLoader]=useState(false);
 const query = router.query.Category;
const [data,setData]=useState([])
   
const goToSearch=(item)=>{
router.push(`/${item}`)
}


const fetchData=async()=>{
setLoader(true)
      const res = await fetch(`${HOST}/api/FilterUsingCategory?value=${query}`);
        const dataRes = await res.json();
        setLoader(false)
        if(dataRes.foodRes.length!=0){setData(dataRes.foodRes)}
        if(dataRes.coffeeRes.length!=0){setData(dataRes.coffeeRes)}
        if(dataRes.drinkRes.length!=0){setData(dataRes.drinkRes)}
        if(dataRes.juiceRes.length!=0){setData(dataRes.juiceRes)}
        
}
useEffect(()=>{
if(query!=undefined){
fetchData();
}
},[query])

  return (
    <>
  <Loader loader={loader}/>
      <div className={Styles.admin}>
        <HeadTag title="Items With Category" />
        <Header />
      </div>
      <div className={style.category}>
      <div className={style.banner}>
      <Image src={Banner} width="1400" height="450" alt="banner inside"/>
      <h1>{query}</h1>
      <div className={style.divs}>
     <Link href="/" >Home </Link>- Items - {query}
      </div>
</div>





<div className={style.Its}>
<div className={style.Items} >


{(data!=undefined)?<>
{(data.length!=0)?
<>
{data.map((item)=>{
return <div key={item._id}>

{(item.FoodName)? <div className={style.item} onClick={()=>goToSearch(item.FoodName)}>
<div className={style.card}>
<div className={style.imags}>
<Image src={item.Image} alt={item.ImageName} height="200" width="320" />
</div>
<div className={style.data}>
<h1>{item.FoodName}</h1>
<h6>QTY: {item.Qty}</h6>
<h4>Category : {item.Category}</h4>
<button>Click To Order</button>
</div>
</div>
</div>:""}

{(item.CoffeeName)? <div className={style.item} onClick={()=>goToSearch(item.CoffeeName)}>
<div className={style.card}>
<div className={style.imags}>
<Image src={item.Image} alt={item.ImageName}  height="200" width="320" />
</div>
<div className={style.data}>
<h1>{item.CoffeeName}</h1>
<h6>QTY: {item.Qty}</h6>
<h4>Category : {item.Category}</h4>
<button>Click To Order</button>
</div>
</div>
</div>:""}


{(item.DrinkName)? <div className={style.item} onClick={()=>goToSearch(item.DrinkName)}>
<div className={style.card}>
<div className={style.imags}>
<Image src={item.Image} alt={item.ImageName}  height="250" width="320" />
</div>
<div className={style.data}>
<h1>{item.DrinkName}</h1>
<h6>QTY: {item.Qty}</h6>
<h4>Category : {item.Category}</h4>
<button>Click To Order</button>
</div>
</div>
</div>:""}



{(item.JuiceName)? <div className={style.item} onClick={()=>goToSearch(item.JuiceName)}>
<div className={style.card}>
<div className={style.imags} style={{marginLeft:"15%"}}>
<Image src={item.Image} alt={item.ImageName}  height="240" width="250" />
</div>
<div className={style.data}>
<h1>{item.JuiceName}</h1>
<h6>QTY: {item.Qty}</h6>
<h4>Category : {item.Category}</h4>
<button>Click To Order</button>
</div>
</div>
</div>:""}
</div>
})}

</> :<h3>No Items Find</h3>}
</> 
: ""}










</div>

</div>





</div>
     
   
       <Footer />
          <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
