import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Image from 'next/image'
import Link from 'next/link'
import LoginImage from '../public/login.webp'
import Styles from "../styles/admin.module.css";
import ClientStyle from "../styles/ClinetLogin.module.css";
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import router from 'next/router'
import HidePagesAfterLogin from "./HidePagesAfterLogin";


export default function ClientLogin() {
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const Login=async(e)=>{
e.preventDefault();
if(email===""){
toast.warn("Please Fill Email/Mobile Field", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}
if(password===""){
toast.warn("Please Enter Password", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}

let Mobile=parseInt(email);
if(!Mobile){
// login using email
const res=await fetch(`${HOST}/api/ClientLogin`,{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        
    },
    body: JSON.stringify({
        Email:email,Password:password
    })
});
let data=await res.json();
if(res.status==501){
toast.warn(`${data.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}
if(res.status==400){
toast.warn(`${data.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}

if(res.status==201){
toast.success("Successfully Login", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

 setTimeout(Redirect, 1200);
    function Redirect() {
      router.push("/");
    }
  }

}
else{
// login with Mobile Number
const res=await fetch(`${HOST}/api/ClientLogin`,{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        
    },
    body: JSON.stringify({
        Mobile,Password:password
    })
});
let data=await res.json();
if(res.status==501){
toast.warn(`${data.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}
if(res.status==400){
toast.warn(`${data.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}

if(res.status===201){
toast.success("Successfully Login", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});


    function Redirect() {
      router.push("/");
    }
 setTimeout(Redirect, 1200);
  }



}
}
  return (
    <div>
    <HidePagesAfterLogin />
    <div className={Styles.admin}>
      <HeadTag title="Client Login" />
   <Header />

<div className={ClientStyle.clientLogin}>
<div className={ClientStyle.form}>
<h3>SD CANTEEN</h3>
<li>
<h6>Enter Email/Mobile To Login</h6>
<input type="text" name="" placeholder="Email / Mobile" value={email} onChange={(e)=>setEmail(e.target.value)}  autoComplete="new-password"  />
<MdOutlineAlternateEmail className={ClientStyle.icon} />
</li>
<li>
<h6>Enter Password To Login</h6>
<input type="password" name="" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}  autoComplete="new-password"  />
<RiLockPasswordLine className={ClientStyle.icon} />
</li>
<button onClick={Login}>Login</button>
<div className={ClientStyle.path}>
<h4><Link href="/Signup">Register New User?</Link></h4>
<h4><Link href="/admin">Admin Login </Link></h4>
</div>
</div>

<div className={ClientStyle.image}>
<Image src={LoginImage} alt="login image" height={320} width={300} className={ClientStyle.img}/>
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
    </div>
  )
}
