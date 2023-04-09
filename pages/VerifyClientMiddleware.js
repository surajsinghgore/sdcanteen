import router from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { useEffect } from "react";

export default function VerifyClientMiddleware() {
useEffect(()=>{
const getData=async()=>{
const res = await fetch(`${HOST}/api/ShowClientDetails`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      }
    });
let data=await res.json();
if(data.data==undefined){
toast.error('Please Login To Access This Page', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
setTimeout(RedirectFunction,1500);
return ;
function RedirectFunction(){
  router.push('/ClientLogin')

}
}
}
getData();

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
