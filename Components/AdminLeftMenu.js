import React,{useEffect} from 'react'
import AdminLeftPenelComponents from './AdminLeftPenelComponents';
import Styles from "../styles/admin.module.css";
import logo from "../public/logo.png";
import Image from "next/image";
import DataList from '../Data/DataList'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from 'next/router'
let HOST=process.env.NEXT_PUBLIC_API_URL;
export default function AdminLeftMenu() {
const VerifyAdminLogin=async()=>{
const res=await fetch(`${HOST}/api/VerifyAdminLogin`,{
    method: "GET",
    headers:{
        "Content-type": "application/json",
         "admintoken":localStorage.getItem('admintoken')
        
    }
});
let data=await res.json();


if(data.status=='403'){
toast.error('Please Login With Admin Credentials', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
setTimeout(RedirectFunction,1000);
function RedirectFunction(){
  router.push('/admin/Login')
}
return 0;
}

}
useEffect(()=>{
VerifyAdminLogin()
 // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  return (
    <div className={Styles.leftPanel}>
      <div className={Styles.logo_img}>
        <Image src={logo} width="250" height="100" alt="logo " />
      </div>
      <div className={Styles.menu_Links}>
{DataList.map((item)=><AdminLeftPenelComponents item={item} key={item.id} />)}
        </div>
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
    </div>
  )
}





