import router from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { useEffect } from "react";

export default function VerifyAdminLogin() {
useEffect(()=>{
const getData=async()=>{
const res = await fetch(`${HOST}/api/VerifyAdminLogin`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      }
    });
    let data=await res.json();
if(res.status==403){
toast.error('Please Login With Admin Credentials', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
function RedirectFunction(){
  router.push('/admin/Login')
}
setTimeout(RedirectFunction,1500);
}
}

getData();


})



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
