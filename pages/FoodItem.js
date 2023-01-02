import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Style from '../styles/FoodItem.module.css'
import Styles from "../styles/admin.module.css";
import banner from '../public/banner.jpg';
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropright } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { useEffect ,useState} from "react";
import Banner from "../Components/Banner";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import ItemCard from "../Components/ItemCard";
  import InfiniteScroll from 'react-infinite-scroll-component';
export default function FoodItem() {
const [foodCategory,setFoodCategory]=useState([]);
const [search,setSearch]=useState('');
const [count,setCount]=useState(10);
const [counts,setCounts]=useState(10);
const [length,setLen]=useState(10)
const [lengths,setLens]=useState(10)
const [FoodDatas,setFoodDatas]=useState([])
const [cate,setCate]=useState(false);
const [sear,setSear]=useState(false);

useEffect(()=>{
localStorage.removeItem("names")
const getCategory=async()=>{
let ress1 = await fetch(`${HOST}/api/ShowFoodCategoryClient`);
      let data = await ress1.json();
setFoodCategory(data.data)
 let ressFood = await fetch(`${HOST}/api/ShowFoodItemClient?count=${count}`);
setCount(count+10)
  let datas = await ressFood.json();
setLen(datas.allLen)
setFoodDatas(datas.data)
}
getCategory();
},[])

const searchHandle=(e)=>{
setSearch(e.target.value);
setSear(true)
const getCategory=async()=>{
let ress1 = await fetch(`${HOST}/api/SearchItemsClient?category=foodItems&search=${e.target.value}`);
      let datas = await ress1.json();
      if(ress1.status==201){
setFoodDatas(datas.data)
      
      }
}
getCategory();

let ss=document.getElementById('search1');
if(ss.value==""){
setSear(false)
AllDataFetch();
}
}


const filterWithCategory=async(items)=>{
setCate(true)
counts=10;
localStorage.setItem("names",items[0].FoodCategoryName)
let itemSend=items[0].FoodCategoryName;
let ressFood = await fetch(`${HOST}/api/ShowFoodItemClient?itemName=${itemSend}&counts=${counts}`);
setCounts(counts+10)
  let data = await ressFood.json();
setFoodDatas(data.data)
setLens(data.allLen)

}
const fetchCategory=async()=>{
setCate(true)
setCounts(counts+10)
let itemSend=localStorage.getItem("names");
let ressFood = await fetch(`${HOST}/api/ShowFoodItemClient?itemName=${itemSend}&counts=${counts}`);
  let data = await ressFood.json();
setFoodDatas(data.data)
setLens(data.allLen)
}

const fetchData = async() => {
let ressFood = await fetch(`${HOST}/api/ShowFoodItemClient?count=${count}`);
setCount(count+10)
  let data = await ressFood.json();
setLen(data.allLen)
setFoodDatas(data.data)
  };
const AllDataFetch=()=>{
setCate(false);
count=10;
localStorage.removeItem("names")
fetchData();
}


  return (
    <>
      <div className={Styles.admin}>
     <HeadTag title="Food Item" />
   <Header />


<Banner BannerImage={banner} Height={500} Width={1350}
CurrentPageUrl="/FoodItem" CurrentPage="Food Item" SubPage="Item" H1Style={{paddingRight:"20%"}} PStyle={{paddingRight:"16%"}}/>
   </div>
   <div className={Style.main_food}>

   {/* left */}
   <div className={Style.left}>
   <h2>Categories</h2>
   <hr />
   <div className={Style.menu}>
     <li><span className={Style.heading} onClick={AllDataFetch}><IoMdArrowDropright /> All</span>
     <span className={Style.length}>({length})</span></li>


     
   {foodCategory.length==0? "" : <>
   {foodCategory.map((item,index)=>{
  
   
   return (
     <li key={index}><span className={Style.heading} onClick={()=>filterWithCategory(item)}><IoMdArrowDropright /> {item[0].FoodCategoryName}</span>
     <span className={Style.length}>  {item[1]}  </span></li>
   )
   })}
   </>}
   </div>
   </div>


{/* right side card section */}
   <div className={Style.right}>
   <div className={Style.top}>
   
   <h4>Showing all {(length)? <>{length} </>:"0"} results</h4>
     <div className={Style.search}>
   <input type="search" name="search" id="search1" placeholder="Search Item ..." value={search} onChange={searchHandle}/>
  <div className={Style.btn}>
  <FaSearch />
  </div>
   </div>
   </div>

   
   {(sear==false)?<> 
{(cate)? <div className={Style.cards}>
<InfiniteScroll
  dataLength={FoodDatas.length} 
  next={fetchCategory}
  hasMore={lengths!==FoodDatas.length}
 >
{FoodDatas.map((items)=>{
   return (
<ItemCard item={items} key={items._id}/>
   )
   })}
</InfiniteScroll>
  
   </div>
   : 
   <div className={Style.cards}>
<InfiniteScroll
  dataLength={FoodDatas.length} //This is important field to render the next data
  next={fetchData}
  hasMore={length!==FoodDatas.length}
 >
 {(FoodDatas.length==0) ? <h1 className={Style.match}>No Item Found</h1>:""}

{FoodDatas.map((items)=>{
   return (
<ItemCard item={items} key={items._id}/>
   )
   })}
</InfiniteScroll>
   </div>}
</>:""}

{(sear)? <div className={Style.cards}>

{FoodDatas.map((items)=>{
   return (
<ItemCard item={items} key={items._id}/>
   )
   })}
  
   </div>:""}
   </div>
   </div>
   <Footer />

    </>
  )
}
