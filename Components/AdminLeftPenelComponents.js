import React,{useState,useEffect} from 'react'
import Styles from "../styles/admin.module.css";
import Link from "next/link";
import router from 'next/router'

function AdminLeftPenelComponents({item}) {
const [show,setShow]=useState(false);
const [open,setOpen]=useState(false);
 useEffect(()=>{
if(open){
setShow(true);
 if(item.title=='Logout'){
localStorage.removeItem('admintoken')
setTimeout(RedirectFunction,10);
function RedirectFunction(){
  router.push('/admin/Login')
}
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
        </li>
  )
}


export default AdminLeftPenelComponents;