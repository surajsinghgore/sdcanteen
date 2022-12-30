import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import Style1 from "../styles/OrderDetails.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyClientMiddleware from "./VerifyClientMiddleware";
import { useState } from "react";
import {useRouter}from 'next/router'
import Image from 'next/image';
import failed from '../public/paymentFailed.gif';
import pending from '../public/pending.gif';
import { useEffect } from "react";
export default function OrderFailed() {
const [token,setToken]=useState('');
const [pen,setPen]=useState(false);
const [temp,setTemp]=useState(false);
const [rej,setRej]=useState(false);
const router=useRouter();

 useEffect(() => {
 const reject=()=>{
       if(router.query.id){
setToken(router.query.id)
setPen(false);
setRej(true)
setTemp(false)
}  
 }
setInterval(reject,600)

   },[]);


 useEffect(() => {
 const pending=()=>{
      if(router.query.pending){
setToken(router.query.pending)
setTemp(false)
setRej(false)
setPen(true);
}    
 }
setInterval(pending,600)


 },[]);
 useEffect(() => {
 const temp=()=>{
      if(router.query.temp){
setToken(router.query.temp)
setTemp(true)
setRej(false)
setPen(false);
}    
 }
setInterval(temp,600)

 },[]);

 useEffect(() => {
        history.pushState(null, '', router.asPath);
        window.addEventListener('popstate', function (event) {
            history.pushState(null, '', router.asPath);
        });
    }, []);
  return (
    <>
    <VerifyClientMiddleware />
      <div className={Styles.admin}>
        <HeadTag title="Failed In Payment" />
        <Header />
      </div>
    
    <div className={Style1.order}>
    {(pen==true)?  <div className={Style1.failed}>
<h2>Sorry Payment Pending</h2>
<div className={Style1.Div1} >
<Image src={pending} alt="payment pending" width={300} height={240}/>
</div>
{/* <h3>Bank Transaction Id : <span>{token}</span></h3> */}
<h3>Bank Transaction Id : <span>{token}</span></h3>
<h4>Payment Status: <span>Pending</span></h4>
    </div>: ""}


    {(rej==true)? <div className={Style1.failed}>
<h2>Sorry Payment Failed</h2>
<div className={Style1.Div1} >
<Image src={failed} alt="payment reject" width={390} height={240}/>
</div>
{/* <h3>Bank Transaction Id : <span>{token}</span></h3> */}
<h3>Bank Transaction Id : <span>{token}</span></h3>
<h4>Payment Status: <span>Failed</span></h4>
    </div>: ""}
    {(temp==true)? <div className={Style1.temp}>
<h2 >Sorry Something Went Wrong </h2>
    </div>: ""}
   

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
    </>
  );
}
