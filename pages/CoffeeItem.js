import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Style from '../styles/FoodItem.module.css'
import Styles from "../styles/admin.module.css";
import banner from '../public/banner3.jpg';
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropright } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { useEffect ,useState} from "react";
import {  useCart } from "react-use-cart";
import Banner from "../Components/Banner";
import CoffeeCard from "../Components/CoffeeCard";


export default function CoffeeItem({ResCategory,CoffeeDatas}) {
  const {
    items,
  } = useCart();
const [coffeeCategory,setCoffeeCategory]=useState([]);
const [coffeeItem,setCoffeeItem]=useState([]);
const [coffeeItem1,setCoffeeItem1]=useState([]);
const [search,setSearch]=useState('');


const searchHandle=(e)=>{
setSearch(e.target.value);
let filter=CoffeeDatas.filter((item)=>{
return item.CoffeeName.toLowerCase().includes(search.toLowerCase())})
setCoffeeItem(filter)
let ss=document.getElementById('search1');
if(ss.value==""){
setCoffeeItem(CoffeeDatas)
}
}

useEffect(()=>{

items.map((itemm)=>{
if(itemm.CoffeeName){
 let filter1=CoffeeDatas.filter((item)=>{
return item._id.toLowerCase().includes(itemm.id.toLowerCase())})
filter1[0]['addToCart']=true;
}
})

},[items])


useEffect(()=>{
if(ResCategory){
setCoffeeCategory(ResCategory);
}
if(CoffeeDatas){
setCoffeeItem(CoffeeDatas)
setCoffeeItem1(CoffeeDatas)
}
},[])

const filterWithCategory1=()=>{
setCoffeeItem(CoffeeDatas)
}
const filterWithCategory=(items)=>{
let filter=CoffeeDatas.filter((item)=>{
return item.Category.toLowerCase().includes(items.CoffeeCategoryName.toLowerCase())})
setCoffeeItem(filter)
}


  return (
    <>
      <div className={Styles.admin}>
     <HeadTag title="Coffee Item" />
   <Header />


<Banner BannerImage={banner} Height={500} Width={1350} 
CurrentPageUrl="/CoffeeItem" CurrentPage="Coffee Item" SubPage="Item" H1Style={{paddingRight:"20%"}} PStyle={{paddingRight:"16%"}}/>
   </div>
   <div className={Style.main_food}>

   {/* left */}
   <div className={Style.left}>
   <h2>Categories</h2>
   <hr />
   <div className={Style.menu}>
     <li><span className={Style.heading} onClick={filterWithCategory1}><IoMdArrowDropright /> All</span>
     <span className={Style.length}>({coffeeItem1.length})</span></li>
   {coffeeCategory.length==0? "" : <>
   {coffeeCategory.map((item,index)=>{
  let a=coffeeItem1.filter((items)=>{
     return items.Category.includes(item.CoffeeCategoryName);
     })
   
   return (
     <li key={index}><span className={Style.heading} onClick={()=>filterWithCategory(item)}><IoMdArrowDropright /> {item.CoffeeCategoryName}</span>
     <span className={Style.length}>({a.length})</span></li>
   )
   })}
   </>}
   </div>
   </div>


{/* right side card section */}
   <div className={Style.right}>
   <div className={Style.top}>
   
   <h4>Showing all {coffeeItem.length? <>{coffeeItem.length} </>:"0"} results</h4>
  

    <div className={Style.search}>
   <input type="search" name="search" id="search1" placeholder="Search Item ..." value={search} onChange={searchHandle}/>
  <div className={Style.btn}>
  <FaSearch />
  </div>
   </div>
   </div>


   <div className={Style.cards}>
 
   {coffeeItem.length==0? <><h1 className={Style.match}>No Item Found</h1></>: <>
  {coffeeItem.map((item)=>{
   return (
<CoffeeCard item={item} key={item._id}/>
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
let ress = await fetch(`${HOST}/api/ShowCoffeeCategory`);
      let data = await ress.json();
      let ResCategory =await data.data;

let ressCoffee = await fetch(`${HOST}/api/ShowCoffeeItemClient`);
  let CoffeeData = await ressCoffee.json();
  let CoffeeDatas = await CoffeeData.data;


  return { props: { ResCategory,CoffeeDatas } }
}
