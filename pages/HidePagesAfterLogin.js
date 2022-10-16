import router from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { useEffect } from "react";

export default function HidePagesAfterLogin() {
useEffect(()=>{
if(localStorage.getItem("login")!=undefined){
const getData=async()=>{
const res = await fetch(`${HOST}/api/ShowClientDetails`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      }
    });
let data=await res.json();
if(data.data!=undefined){
router.push("/");
}

}
getData();
}
},[])



  return (
    <>
  
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
