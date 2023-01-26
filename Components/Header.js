import sdLogo from '../public/logo.png';
import Image from 'next/image'
let HOST = process.env.NEXT_PUBLIC_API_URL;
import Link from 'next/link'
import React,{ useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdFoodBank } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BiPaste } from 'react-icons/bi';
import { BiUserCircle } from 'react-icons/bi';
import { BiLogIn } from 'react-icons/bi';
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';
import { MdToday } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useState } from 'react';
import {  useCart } from "react-use-cart";
import router from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import boyProfile from '/public/men.png'
import girlProfile from '/public/girl.png'
import { AllContext } from "../context/AllContext";
import { useContext } from "react";

export default function Header() {

  const { setUserData } = useContext(AllContext);
const [search,setSearch]=useState('');
const [searchData,setSerachData]=useState([]);
const [imgs,setImgs]=useState(boyProfile);
const [fullName,setFullName]=useState("");
const [userLogin,setUserLogin]=useState(false);
const {
    totalUniqueItems
  } = useCart();
  const [cartSize,setCartSize]=useState('');



  // user details fetch
useEffect(()=>{
setUserLogin(false)
if(localStorage.getItem('login')!=undefined){
const getData=async()=>{
const res = await fetch(`${HOST}/api/ShowClientDetails`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      }
    });

let data=await res.json();
if(data!=undefined){

if(res.status==404){
const redirects=()=>{
toast.error('Record Not Found', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
router.push("/ClientLogin");
return ;
}
setTimeout(redirects,2000);

}
if(res.status==501){
toast.error('Internal Server Error.Please try Again', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;


}
setUserData(data)
if(data.data!==undefined){
setUserLogin(true);
  if(data.data.Gender=='male'){
  setImgs(boyProfile)
  }
  if(data.data.Gender=='female'){
  setImgs(girlProfile)
  }
if(data.data.Profile==""){
router.push('/ClientProfileUpload')
}
if(data.data.Profile!==""){
setImgs(`../public/ClientImages/${data.data.Profile}`)
}

if(data.data.FullName){
let str=data.data.FullName;
let resName = str.substring(0, 5);
setFullName(resName)
}
}
}
}
getData();
}

},[])


// internet connection status check
useEffect(()=>{
let connectionStatus=window.navigator.onLine;
if(connectionStatus==false){
  toast.error('Internet Connection Lost,You Are Offline...', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
}
},[])

// unique element in cart fetch
  useEffect(()=>{
  setCartSize(totalUniqueItems)
  },[totalUniqueItems])

// user drop down
useEffect(()=>{
let states=false;
let states1=false;
let page=document.getElementById('pages');
let heading=document.getElementById('heading');
let user=document.getElementById('user');
let clientOption=document.getElementById('clientOption');

heading.addEventListener('mouseenter',()=>{
page.style.display="flex";

})

if(user){
user.addEventListener('mouseenter',()=>{
clientOption.style.display="block";
})
clientOption.addEventListener('mouseenter',()=>{
clientOption.style.display="block";
states1=true;
})

clientOption.addEventListener('mouseleave',()=>{
clientOption.style.display="none";
states1=false;
})


user.addEventListener('mouseleave',()=>{
setTimeout(disable,300);

function disable(){
if(states1==false){
clientOption.style.display="none";
}
}
})
}

page.addEventListener('mouseenter',()=>{
page.style.display="flex";
states=true;
})

page.addEventListener('mouseleave',()=>{
page.style.display="none";
states=false;
})

heading.addEventListener('mouseleave',()=>{
setTimeout(disable,300);
function disable(){
if(states==false){
page.style.display="none";
}
}
})

})



// search bar
const SetSearchValue=(e)=>{
setSearch(e.target.value);
let search=document.getElementById('search');
let suggestion=document.getElementById('suggestion');
suggestion.style.display="block"
if(search.value==''){
suggestion.style.display="none";
return ;
}

const getDatas=async()=>{
 const res = await fetch(`${HOST}/api/MainSearch?search=${e.target.value}`)
 const data=await res.json()
let allData=[];

if(data.coffeeData.length!=0){
await data.coffeeData.map((item)=>{
return allData.push(item.CoffeeName);
})

}
if(data.foodData.length!=0){
await data.foodData.map((item)=>{
return allData.push(item.FoodName);
})

}
if(data.drinkData.length!=0){
await data.drinkData.map((item)=>{
return allData.push(item.DrinkName);
})

}

if(data.juiceData.length!=0){
await data.juiceData.map((item)=>{
return allData.push(item.JuiceName);
})

}
setSerachData(allData)

  }
getDatas();
}


// logout

const LogoutClient=()=>{


const getData=async()=>{
const res = await fetch(`${HOST}/api/LogoutClient`);

await res.json();
if(res.status==201){

toast.success('User Logout Successfully', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
setUserLogin(false);
localStorage.removeItem('login')
    localStorage.removeItem("itemOrder");
const redirect=()=>{
router.push("/ClientLogin");
}
setTimeout(redirect,2000);
}

}
getData();

  
}


// on click on search suggesttion
const firedClick=async(item)=>{
// number of hits
let ItemName=item;
if(!ItemName){
return;
}
 await fetch(`${HOST}/api/NumberOfSearch`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ItemName: ItemName,
      }),
    });
setSearch("");
let suggestion=document.getElementById('suggestion');
suggestion.style.display="none"
}
  return (
    <header>
    <div className="logo" id="Header">
    <Link href={"/"}><a><Image src={sdLogo} alt="sd logo " height="60px" width="180px"/></a></Link> </div>

        <div className="search">
        <i> <AiOutlineSearch/></i>
    <input type="search" name="search" id="search" value={search} onChange={SetSearchValue}placeholder='Search Items...'/>
    <div className="suggestion" id="suggestion">
    {(searchData.length!=0)?<>{searchData.slice(0,4).map((item,index)=>{
    return(<Link href={`/${item}`} key={index}><a><li onClick={()=>firedClick(item)}><BiSearchAlt2 className="fixed"/>{item}</li></a></Link>)
    })}</> : <><h1 id="searchHeading">No Item Match</h1></>}
    </div>
    </div>
    <div className="links">
    <li> <i><MdFoodBank/></i> <span className='heading'><Link href="/OrderNow">Order Now</Link> </span></li>
      <li id="heading"> <i><IoMdArrowDropdown /></i> <span className='heading' >Pages</span></li>
   {(userLogin)?  <li id="user"><i><IoMdArrowDropdown /></i><div style={{marginTop:"10%"}}><Image src={imgs} alt="profile" height={40} width="40" style={{borderRadius:"60px",marginLeft:"4%"}}/><span id='heading1' style={{textAlign:"center"}}>Hii , {fullName}</span></div></li> : 
   
      <li id="login"> <i style={{marginTop:"2%",marginLeft:"18%",fontSize:"28px"}}><BiLogIn/></i><Link href="/ClientLogin"><span id='heading2'>Login</span></Link></li> }
     <li  className='cart'> <Link href="/Cart"><a>
    <div id="count">{cartSize}</div>
    <span><AiOutlineShoppingCart/></span></a></Link></li>
    </div>
{/* pages */}
    <div className="pages" id="pages" >
    <div className="page">
    <h1>Pages</h1>
    <li><Link href="/">Home</Link></li>
    <li><Link href="/Contact">Contact</Link> </li>
    <li><Link href="/AboutUs">About US</Link></li>
    <li><Link href="/Gallery">Gallery</Link></li>
    </div>
        <div className="page">
    <h1>Menu</h1>
    <li><Link href="/FoodItem">Food Menu</Link></li>
    <li><Link href="/DrinkItem">Drink Menu</Link></li>
    <li><Link href="/CoffeeItem">Coffee Menu</Link></li>
    <li><Link href="/JuiceItem">Juice Menu</Link></li>
    </div>
    <div className="page">
    <li style={{marginTop:"8%"}}><Link href="/Items/sd special">SD Special</Link></li>
    <li> <Link href="/FoodItem"> Instant Food </Link></li>
    </div>
        <div className="page">
    <h1>Extra Pages</h1>
    <li><Link href="/admin/Login">Admin Login</Link></li>
    <li><Link href="/HelpAndSupport">Help Center</Link></li>
    </div>
    </div>

{(userLogin)?<div className="clinetOption" id="clientOption">
<div>
<Link href={"/OrderComplete"}><a>
<i><MdToday /></i>
<h1>Today	&#39;s Order</h1>
</a></Link>
</div>

<div>
<Link href={"/ClientManage"}><a><i><BiUserCircle /></i>
<h1>Manage Info</h1></a></Link>
</div>

<div>
<Link href={"/PastOrder"}><a>
<i><BiPaste /></i>
<h1>Past Order</h1></a></Link>
</div>
<div onClick={LogoutClient}>
<i><MdLogout /></i>
<h1>Logout</h1>
</div>
</div>  :""}

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
    </header>
  )
}









export async function getServerSideProps() {

 

  // Pass data to the page via props
  return { props: {coffeeItem, coffeeData,drinkData, foodData,juiceData} }
}