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
setImgs(`/ClientImages/${data.data.Profile}`)
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

// search bar logic
useEffect(()=>{
const getDatas=async()=>{
 const coffeeItem = await fetch(`${HOST}/api/ShowCoffeeItemClient`)
  const drinkItem = await fetch(`${HOST}/api/ShowDrinkItemClient`)
  const foodItem = await fetch(`${HOST}/api/ShowFoodItemClient`)
  const juiceItem = await fetch(`${HOST}/api/ShowJuiceItemClient`)
  const coffeeData = await coffeeItem.json()
  const drinkData = await drinkItem.json()
  const foodData = await foodItem.json()
  const juiceData = await juiceItem.json()
let coffeeNames=[];
let drinkNames=[];
let foodNameNames=[];
let juiceNames=[];
if(coffeeData.data){
 coffeeNames=coffeeData.data.map((item)=>{
return item.CoffeeName
})
}
if(drinkData.data){
 drinkNames=drinkData.data.map((item)=>{
return item.DrinkName
})
}
if(foodData.data){
 foodNameNames=foodData.data.map((item)=>{
return item.FoodName
})
}
if(juiceData.data){
 juiceNames=juiceData.data.map((item)=>{
return item.JuiceName
})
}
  let arr1=coffeeNames;
  let arr2=arr1.concat(drinkNames)
 let arr3=arr2.concat(foodNameNames)
  let arr4=arr3.concat(juiceNames)
setSerachData(arr4.filter((item)=>{
return item.toUpperCase().includes(search.toUpperCase())
}))
  
  }
getDatas();
},[search])


// search bar
const SetSearchValue=(e)=>{
setSearch(e.target.value);
let search=document.getElementById('search');
let suggestion=document.getElementById('suggestion');
suggestion.style.display="block"
if(search.value==''){
suggestion.style.display="none"
}
}


// logout

const LogoutClient=()=>{


const getData=async()=>{
const res = await fetch(`${HOST}/api/LogoutClient`, {
      method: "Get",
      headers: {
        "Content-type": "application/json",
      }
    });

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
const firedClick=()=>{
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
    return(<Link href={`/${item}`} key={index}><a><li onClick={firedClick}><BiSearchAlt2 className="fixed"/>{item}</li></a></Link>)
    })}</> : <><h1 id="searchHeading">No Item Match</h1></>}
    </div>
    </div>
    <div className="links">
    <li> <i><MdFoodBank/></i> <span className='heading'>Order Now </span></li>
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
    <li>About US</li>
    <li>Gallery</li>
    </div>
        <div className="page">
    <h1>Menu</h1>
    <li><Link href="/FoodItem">Food Menu</Link></li>
    <li><Link href="/DrinkItem">Drink Menu</Link></li>
    <li><Link href="/CoffeeItem">Coffee Menu</Link></li>
    <li><Link href="/JuiceItem">Juice Menu</Link></li>
    </div>
    <div className="page">
    <li style={{marginTop:"8%"}}>SD Special</li>
    <li> <Link href="/FoodItem"> Instant Food </Link></li>
    </div>
        <div className="page">
    <h1>Extra Pages</h1>
    <li><Link href="/admin/Login">Admin Login</Link></li>
    <li><Link href="/">Help Center</Link></li>
    </div>
    </div>

{(userLogin)?<div className="clinetOption" id="clientOption">
<div>
<Link href={"/OrderComplete"}><a>
<i><MdToday /></i>
<h1>Today's Order</h1>
</a></Link>
</div>
<div>
<i><BiPaste /></i>
<h1>Past Order</h1>
</div>
<div>
<i><BiUserCircle /></i>
<h1>Account Info</h1>
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