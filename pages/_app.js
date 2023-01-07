import React,{useEffect, useState} from 'react'
import '../styles/globals.css'
import {Provider} from '../context/AllContext';
import LoadingBar from "react-top-loading-bar";
import { useRouter } from 'next/router';
import { CartProvider } from "react-use-cart"; 
let HOST = process.env.NEXT_PUBLIC_API_URL;
import Link from 'next/link';
import  cooking from '../public/cooking.gif';
import Image from 'next/image'
function MyApp({ Component, pageProps }) {
const router=useRouter();
 const [progress, setProgress] = useState(0);
 const [orderView,setOrderView]=useState(false);
 const [checkCooking,setCheckCooking]=useState(false);
const hide=()=>{
setOrderView(false)
}
const checks=async()=>{
 if(localStorage.getItem('login')!=undefined){
let ress = await fetch(`${HOST}/api/CookingEnableDisable`);
              let datas=await ress.json();
              if(ress.status==201){
    
              if(datas.len==0){
              setCheckCooking(false)
              setOrderView(false)
              }
              else{
              setCheckCooking(true)
              setOrderView(true)
              }
              }
           
}
}
useEffect(()=>{
checks();
},[])

useEffect(()=>{
if(sessionStorage.getItem("counter")==undefined){

let browser;
if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
    {
        browser='Opera';
    }
    else if(navigator.userAgent.indexOf("Edg") != -1 )
    {
        browser='Edge';
    }
    else if(navigator.userAgent.indexOf("Chrome") != -1 )
    {
        browser='Chrome';
    }
    else if(navigator.userAgent.indexOf("Safari") != -1)
    {
        browser='Safari';
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
    {
         browser='Firefox';
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) 
    {
      browser='IE'; 
    }  
    else 
    {
       browser='other Browser';
    }

const counter=async()=>{
let res=await fetch(`${HOST}/api/WebsiteCounter`,{
method:"POST",
headers:{"Content-type":"application/json"},
body: JSON.stringify({Browser:browser})
})
if(res.status==201){
sessionStorage.setItem("counter",true);
}
}
counter();
}



},[])

useEffect(()=>{
router.events.on('routeChangeStart',()=>{
setProgress(10)
setProgress(20)
setProgress(30);
setProgress(40);
checks()
if(checkCooking){
setOrderView(false)
}
})
router.events.on('routeChangeComplete',()=>{

setProgress(50)
setProgress(60)
setProgress(70)
setProgress(80)
setProgress(90)
setProgress(100)

if(checkCooking){
setOrderView(true)
}

})
 // eslint-disable-next-line react-hooks/exhaustive-deps
},[])


  return(
  <>
 <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  
 
 {(orderView)?
   <div className='cookingMain' id="cooking">
  <div className='cookingsection'>
   <Link href="/OrderComplete"><a><h6>Order Cooking</h6></a></Link>
    <button title='Hide' onClick={()=>hide()}>x</button>
     <Link href="/OrderComplete"><a> <div className="cookImage">
    <Image src={cooking} layout="responsive" alt="cooking image" />
    </div></a></Link>
        </div>
    </div>
    
    :""}



<Provider>
<CartProvider>
<Component {...pageProps} />
</CartProvider>
</Provider>
  </>)
}

export default MyApp
