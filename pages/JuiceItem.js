import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Style from '../styles/FoodItem.module.css'
import Styles from "../styles/admin.module.css";
import banner from '../public/banner2.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropright } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { useEffect ,useState} from "react";
import {  useCart } from "react-use-cart";
import Banner from "../Components/Banner";


export default function JuiceItem({ResCategory,JuiceDatas}) {
  const {
    items,
    removeItem,
    addItem ,
  } = useCart();
const [coffeeCategory,setJuiceCategory]=useState([]);
const [juiceItem,setJuiceItem]=useState([]);
const [juiceItem1,setJuiceItem1]=useState([]);
const [search,setSearch]=useState('');


const searchHandle=(e)=>{
setSearch(e.target.value);
let filter=JuiceDatas.filter((item)=>{
return item.JuiceName.toLowerCase().includes(search.toLowerCase())})
setJuiceItem(filter)
let ss=document.getElementById('search1');
if(ss.value==""){
setJuiceItem(JuiceDatas)
}
}

useEffect(()=>{
items.map((itemm)=>{
if(itemm.JuiceName){
 let filter1=JuiceDatas.filter((item)=>{
return item._id.toLowerCase().includes(itemm.id.toLowerCase())})
filter1[0]['addToCart']=true;
}
})

},[items])



useEffect(()=>{
if(ResCategory){
setJuiceCategory(ResCategory);
}
if(JuiceDatas){
setJuiceItem(JuiceDatas)
setJuiceItem1(JuiceDatas)
}
},[])

const filterWithCategory1=()=>{
setJuiceItem(JuiceDatas)
}
const filterWithCategory=(items)=>{
let filter=JuiceDatas.filter((item)=>{
return item.Category.toLowerCase().includes(items.JuiceCategoryName.toLowerCase())})
setJuiceItem(filter)
}

const addToCartItem=(itemss)=>{
let id=itemss._id;
let price=itemss.Price;
let JuiceName=itemss.JuiceName;
let Qty=itemss.Qty;
let Image=itemss.Image;
let Category=itemss.Category;
let QtyBook=1;
let totalAmount=itemss.Price;
addItem({id,price,JuiceName,Qty,Image,Category,QtyBook,totalAmount})

 toast.success(`${JuiceName} successfully added to cart`, {
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
const filteredData = JuiceDatas.filter((item) => item._id == id);
filteredData[0]['addToCart']=false;
removeItem(id)
 toast.error(`${item.JuiceName} successfully removed from cart`, {
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
     <HeadTag title="Juice Item" />
   <Header />

<Banner BannerImage={banner} Height={500} Width={1350} 
CurrentPageUrl="/JuiceItem" CurrentPage="Juice Item" SubPage="Item" H1Style={{paddingRight:"20%"}} PStyle={{paddingRight:"16%"}}/>
   </div>
   <div className={Style.main_food}>

   {/* left */}
   <div className={Style.left}>
   <h2>Categories</h2>
   <hr />
   <div className={Style.menu}>
     <li><span className={Style.heading} onClick={filterWithCategory1}><IoMdArrowDropright /> All</span>
     <span className={Style.length}>({juiceItem1.length})</span></li>
   {coffeeCategory.length==0? "" : <>
   {coffeeCategory.map((item,index)=>{
  let a=juiceItem1.filter((items)=>{
     return items.Category.includes(item.JuiceCategoryName);
     })
   
   return (
     <li key={index}><span className={Style.heading} onClick={()=>filterWithCategory(item)}><IoMdArrowDropright /> {item.JuiceCategoryName}</span>
     <span className={Style.length}>({a.length})</span></li>
   )
   })}
   </>}
   </div>
   </div>



   <div className={Style.right}>
   <div className={Style.top}>
   
   <h4>Showing all {juiceItem.length? <>{juiceItem.length} </>:"0"} results</h4>
  

   <div className={Style.search}>
   <input type="search" name="search" id="search1" placeholder="Search Item ..." value={search} onChange={searchHandle}/>
  <div className={Style.btn}>
  <FaSearch />
  </div>
   </div>
   </div>


   <div className={Style.cards}>



   {juiceItem.length==0? <><h1 className={Style.match}>No Item Found</h1></>: <>
   {juiceItem.map((item)=>{
   return (
      <div className={Style.card} key={item._id} loading="lazy">
   <div className={Style.Img} >
   <Image src={`/juiceItemImages/${item.Image}`} alt={item.Image} width={385} height={300} loading="lazy" />
   </div>
   <div className={Style.deatils}>
   <h1>{item.JuiceName}</h1>
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
let ress = await fetch(`${HOST}/api/ShowJuiceCategory`);
      let data = await ress.json();
      let ResCategory =await data.data;

let ressJuice = await fetch(`${HOST}/api/ShowJuiceItem`);
  let JuiceData = await ressJuice.json();
  let JuiceDatas = await JuiceData.data;


  return { props: { ResCategory,JuiceDatas } }
}
