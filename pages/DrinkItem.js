import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Style from '../styles/FoodItem.module.css'
import Styles from "../styles/admin.module.css";
import banner from '../public/banner4.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropright } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { useEffect ,useState} from "react";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import {  useCart } from "react-use-cart";


export default function DrinkItem({ResCategory,DrinkDatas}) {
  const {
    items,
    removeItem,
    addItem ,
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
 let filter1=DrinkDatas.filter((item)=>{
return item.DrinkName.toLowerCase().includes(itemm.DrinkName.toLowerCase())})

filter1[0]['addToCart']=true;
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

const addToCartItem=(itemss)=>{
let id=itemss._id;
let price=itemss.Price;
let DrinkName=itemss.DrinkName;
let Qty=itemss.Qty;
let Image=itemss.Image;
let Category=itemss.Category;
addItem({id,price,DrinkName,Qty,Image,Category})

 toast.success(`${DrinkName} successfully added to cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}
const RemoveFromCartItem=(item)=>{
let id=item._id;

const filteredData = DrinkDatas.filter((item) => item._id == id);
filteredData[0]['addToCart']=false;
removeItem(id)
 toast.error(`${item.DrinkName} successfully removed from cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}


  return (
    <>
      <div className={Styles.admin}>
     <HeadTag title="Drink Item" />
   <Header />


   <div className={Style.Status}>
<div className={Style.banner}>
<Image src={banner} alt="banner" height={550} width={1350} />
</div>
<div className={Style.path}>
<h1 style={{paddingRight:"20%"}}>Menu</h1>
<p style={{paddingRight:"16%"}}><Link href="/">Home</Link> - <Link href="/DrinkItem">Drink Item </Link>- <span>Item</span></p>
</div>
</div>
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
      <div className={Style.card} key={item._id} loading="lazy">
   <div className={Style.Img} >
   <Image src={`/DrinkItemImages/${item.Image}`} alt={item.Image} width={385} height={300} loading="lazy" />
   </div>
   <div className={Style.deatils}>
   <h1>{item.DrinkName}</h1>
<h3>Qty: <span>{item.Qty}</span></h3>
{(item.Category)?<>
<h6>Category: <span>{item.Category}</span></h6>
</> : <>
<h6>Category: <span>No</span></h6>
</>}
   <h4>₹ {item.Price}</h4>
 {(item.addToCart)?<><button onClick={()=>RemoveFromCartItem(item)}>Remove From Cart</button></> : <><button onClick={()=>addToCartItem(item)}>Add To Cart</button></>}
   <button className={Style.buy}>Buy Now</button>
   </div>
   </div>
   )
   })}
   </>}

   </div>
   </div>
   </div>
   <Footer />
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
    </>
  )
}

export async function getServerSideProps() {
let HOST = process.env.NEXT_PUBLIC_API_URL;
let ress = await fetch(`${HOST}/api/ShowDrinkCategory`);
      let data = await ress.json();
      let ResCategory =await data.data;

let ressDrink = await fetch(`${HOST}/api/ShowDrinkItem`);
  let DrinkData = await ressDrink.json();
  let DrinkDatas = await DrinkData.data;


  return { props: { ResCategory,DrinkDatas } }
}
