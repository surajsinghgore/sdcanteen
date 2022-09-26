import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import Style1 from "../styles/OrderDetails.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from 'next/router'
import VerifyClientMiddleware from "./VerifyClientMiddleware";
import { useState } from "react";
import Image from 'next/image';
import { useEffect } from "react";
import done from '../public/done.gif';
export default function OrderComplete() {
const [token,setToken]=useState('');


useEffect(()=>{
if(!localStorage.getItem('orderToken')){
router.push('/OrderDetails');
}
if(localStorage.getItem('orderToken')){
setToken(localStorage.getItem('orderToken'))
}
},[])
  return (
    <>
    <VerifyClientMiddleware />
      <div className={Styles.admin}>
        <HeadTag title="Order Placed" />
        <Header />
      </div>
    
    <div className={Style1.order}>
<h1>THANK YOU</h1>
<div className={Style1.Div1}>
<Image src={done} alt="Done Image" width={150} height={130}/>
</div>
<h2 >Congratulations.</h2>
<h3>Your order was Placed Successfully.</h3>
<h5>Please take SCREENSHOT of this code</h5>
<h6>Show below code If Required :</h6>
<h4>Your ORDER CODE:<span className={Style1.Token}>{token}</span></h4>


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
