import router from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { useEffect } from "react";

export default function VerifyClientMiddleware() {
useEffect(()=>{
let id=localStorage.getItem('clientId');
const getData=async()=>{
if(localStorage.getItem('clientToken')){
const res = await fetch(`${HOST}/api/ShowClientDetails`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "clienttoken":`${localStorage.getItem('clientToken')}`
      },
      body: JSON.stringify({
       id:id
      }),
    });
let data=await res.json();
if(res.status==501){
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
function RedirectFunction(){
  router.push('/ClientLogin');
}
}

if((data.data==undefined)||(data.data.length==0)){
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
function RedirectFunction(){
  router.push('/ClientLogin');
}
return 0;
}
}
else{
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
function RedirectFunction(){
  router.push('/ClientLogin')
}
}
}
getData();

},[1])



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
