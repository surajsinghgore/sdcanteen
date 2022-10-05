import React,{useState,useEffect} from 'react'
import Styles from "../styles/admin.module.css";
import Link from "next/link";
import router from 'next/router'
let HOST = process.env.NEXT_PUBLIC_API_URL;

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminLeftPenelComponents({item}) {
const [show,setShow]=useState(false);
const [open,setOpen]=useState(false);
 useEffect(()=>{
if(open){
setShow(true);
 if(item.title=='Logout'){
const getData=async()=>{
const res = await fetch(`${HOST}/api/LogoutAdmin`, {
      method: "Get",
      headers: {
        "Content-type": "application/json",
      }
    });

await res.json();
if(res.status==201){

toast.success('Admin Logout Successfully', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
localStorage.removeItem("orderStatus");
const redirect=()=>{
router.push("/");
}
setTimeout(redirect,100);
}

}
getData();










}
}
else{
setShow(false);
}
 // eslint-disable-next-line react-hooks/exhaustive-deps
 
},[open])
  return (
        <li key={item.id} onClick={()=>setOpen(!open)} id="clicked">  
          <div className={(show)?Styles.styles1:Styles.styles}>
            <div className={Styles.icon}>
            {item.icon}
            </div>

            <span className={Styles.title}>{item.title}</span>

             {(item.open) ? <div className={Styles.arrows}>
          
          {(open)?<div className={Styles.top}> {item.close}</div> :<div className={Styles.top}> {item.open}</div>}         
            </div>:''}
          </div>
 {(show)?
         <ul id="shows">
        {item.subMenu? item.subMenu.map((items,indexs)=>{
         return <li key={indexs}><Link href={items.path}>{items.title}</Link></li>
         }):''}
      
         </ul>:''}
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
        </li>
  )
}


export default AdminLeftPenelComponents;