import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Style from '../styles/FoodItem.module.css'
import Styles from "../styles/admin.module.css";
import banner from '../public/banner4.jpg';
import Image from 'next/image';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropright } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { useEffect ,useState} from "react";
import {  useCart } from "react-use-cart";
import Banner from "../Components/Banner";
import router from 'next/router'
import DrinkCard from "../Components/DrinkCard";


export default function CoffeeItem({ResCategory,DrinkDatas}) {
  const {
    items,
  } = useCart();
const [drinkCategory,setDrinkCategory]=useState([]);
const [drinkItem,setDrinkItem]=useState([]);
const [drinkItem1,setDrinkItem1]=useState([]);
const [search,setSearch]=useState('');



const searchHandle=(e)=>{
setSearch(e.target.value);
let filter=DrinkDatas.filter((item)=>{
return item.DrinkName.toLowerCase().includes(search.toLowerCase())})
setDrinkItem(filter)
let ss=document.getElementById('search1');
if(ss.value==""){
setDrinkItem(DrinkDatas)
}
}

useEffect(()=>{


items.map((itemm)=>{
if(itemm.DrinkName){
 let filter1=DrinkDatas.filter((item)=>{
return item._id.toLowerCase().includes(itemm.id.toLowerCase())})
filter1[0]['addToCart']=true;
}
})


},[items])



useEffect(()=>{
if(ResCategory){
setDrinkCategory(ResCategory);
}
if(DrinkDatas){
setDrinkItem(DrinkDatas)
setDrinkItem1(DrinkDatas)
}
},[])

const filterWithCategory1=()=>{
setDrinkItem(DrinkDatas)
}
const filterWithCategory=(items)=>{
let filter=DrinkDatas.filter((item)=>{
return item.Category.toLowerCase().includes(items.DrinkCategoryName.toLowerCase())})
setDrinkItem(filter)
}


  return (
    <>
      <div className={Styles.admin}>
     <HeadTag title="Drink Item" />
   <Header />


<Banner BannerImage={banner} Height={500} Width={1350} 
CurrentPageUrl="/DrinkItem" CurrentPage="Drink Item" SubPage="Item" H1Style={{paddingRight:"20%"}} PStyle={{paddingRight:"16%"}}/>
   </div>
   <div className={Style.main_food}>

   {/* left */}
   <div className={Style.left}>
   <h2>Categories</h2>
   <hr />
   <div className={Style.menu}>
     <li><span className={Style.heading} onClick={filterWithCategory1}><IoMdArrowDropright /> All</span>
     <span className={Style.length}>({drinkItem1.length})</span></li>
   {drinkCategory.length==0? "" : <>
   {drinkCategory.map((item,index)=>{
  let a=drinkItem1.filter((items)=>{
     return items.Category.includes(item.DrinkCategoryName);
     })
   
   return (
     <li key={index}><span className={Style.heading} onClick={()=>filterWithCategory(item)}><IoMdArrowDropright /> {item.DrinkCategoryName}</span>
     <span className={Style.length}>({a.length})</span></li>
   )
   })}
   </>}
   </div>
   </div>



   <div className={Style.right}>
   <div className={Style.top}>
   
   <h4>Showing all {drinkItem.length? <>{drinkItem.length} </>:"0"} results</h4>
  

   <div className={Style.search}>
   <input type="search" name="search" id="search1" placeholder="Search Item ..." value={search} onChange={searchHandle}/>
  <div className={Style.btn}>
  <FaSearch />
  </div>
   </div>
   </div>


   <div className={Style.cards}>



   {drinkItem.length==0? <><h1 className={Style.match}>No Item Found</h1></>: <>
   {drinkItem.map((item)=>{
   return (
<DrinkCard item={item} key={item._id}/>
   )
   })}
   </>}

   </div>
   </div>
   </div>
   <Footer />

    </>
  )
}


export async function getServerSideProps() {
let HOST = process.env.NEXT_PUBLIC_API_URL;
let ress = await fetch(`${HOST}/api/ShowDrinkCategory`);
      let data = await ress.json();
      let ResCategory =await data.data;

let ressDrink = await fetch(`${HOST}/api/ShowDrinkItemClient`);
  let DrinkData = await ressDrink.json();
  let DrinkDatas = await DrinkData.data;


  return { props: { ResCategory,DrinkDatas } }
}