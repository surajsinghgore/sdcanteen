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
let ImagePath=process.env.NEXT_PUBLIC_IMAGESPACEPATH;
let failed = `${ImagePath}/ExtraImages/paymentFailed.gif`;
let pending = `${ImagePath}/ExtraImages/pending.gif`;
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
reject()

   });


 useEffect(() => {
 const pending=()=>{
      if(router.query.pending){
setToken(router.query.pending)
setTemp(false)
setRej(false)
setPen(true);
}    
 }
pending();


 });
 useEffect(() => {
 const temp=()=>{
      if(router.query.temp){
setToken(router.query.temp)
setTemp(true)
setRej(false)
setPen(false);
}    
 }
temp();

 });

 useEffect(() => {
        history.pushState(null, '', router.asPath);
        window.addEventListener('popstate', function (event) {
            history.pushState(null, '', router.asPath);
        });
    });


    useEffect(()=>{
    console.log(router.query.pending)
    console.log(router.query.id)
    console.log(router.query.temp)
    })
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
<button onClick={()=>router.push("/")}>Go Back</button>
    </div>: ""}


    {(rej==true)?
     <div className={Style1.failed}>
<h2>Sorry Payment Failed</h2>
<div className={Style1.Div1} >
<Image src={failed} alt="payment reject" width={390} height={240}/>
</div>
{/* <h3>Bank Transaction Id : <span>{token}</span></h3> */}
<h3>Bank Transaction Id : <span>{token}</span></h3>
<h4>Payment Status: <span>Failed</span></h4>
<button onClick={()=>router.push("/")}>Go Back</button>
    </div>: ""}


    {(temp==true)? <div className={Style1.failed}>
<h2 >Sorry Something Went Wrong </h2>
<button onClick={()=>router.push("/")}>Go Back</button>
    </div>
    : ""}
   

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
