import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import CartStyle from "../styles/Cart.module.css";
import Styles from "../styles/admin.module.css";
import Style1 from "../styles/OrderDetails.module.css";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from 'next/router'
import VerifyClientMiddleware from "./VerifyClientMiddleware";
import Timing from '../Data/Timing';
import { useState } from "react";
import { useEffect } from "react";


export default function OrderDetails() {
const [time,setTime]=useState([]);
const [defaultTime,setDefaultTime]=useState();
let t=new Date();
useEffect(()=>{
var Hours = t.getHours();
let m=t.getMinutes();
           
let h=parseFloat(Hours);

const fetchTimeData=async()=>{
m=t.getMinutes();
Hours=t.getHours();
if(m>=55){
Hours=Hours+1;
m=0;
}
 if (m < 10){
  m = "0" + m  
 }
    m=m+10;
let ti=parseFloat(`${h}.${m}`);
let l=parseFloat(localStorage.getItem('OrderFoodTime')).toFixed(2);

let f=parseFloat(l);
setDefaultTime(f);
let d=await Timing.filter((time)=>{
return time.time>=ti;
})
setTime(d);

 
}
// sunday off
if(t.getDay()!=7){
// from 7 am to 6 pm allowed
if((h>=7)&&(h<=17)){
fetchTimeData();
setTimeout(fetchTimeData,10000)
}

else{
if(localStorage.getItem('OrderFoodTime')){
localStorage.removeItem('OrderFoodTime');
}
}
}

},[t.getMinutes()])


 const style2 = {
        marginBottom:"5%",clear:"both"
    }

const getTime=()=>{
let value=document.querySelector("input[type='radio'][name=time]:checked").value;
localStorage.setItem("OrderFoodTime",value);
}
  return (
    <>
    <VerifyClientMiddleware />
      <div className={Styles.admin}>
        <HeadTag title="Order Timing" />
        <Header />
      </div>
      {/* cart */}
      <div className={CartStyle.cart}>
        <h1> Order Details </h1>
        <div className={CartStyle.progress}>
          <hr />

          <div className={CartStyle.number}>
            <div className={CartStyle.num1}>
              <div className={CartStyle.circle}>
                1
              </div>
              <div className={CartStyle.discription}>
                <p> SHOPPING CART </p>
              </div>
            </div>
          </div>

          <div className={CartStyle.number}>
            <div className={CartStyle.num1}>
              <div className={`${CartStyle.circle} ${CartStyle.circle1}`}>2 </div>
              <div className={CartStyle.discription}>
                <p> ORDER DETAILS </p>
              </div>
            </div>
          </div>

          <div className={CartStyle.number}>
            <div className={CartStyle.num1}>
              <div className={CartStyle.circle}>3 </div>
              <div className={CartStyle.discription}>
                <p> PAYMENT METHOD </p>
              </div>
            </div>
          </div>
        </div>





{/* cart List */}
<div className={CartStyle.cartItem}>
<div className={CartStyle.cartTable}>
{(time.length!=0)?<div><h4 style={{textAlign:"center",fontSize:"20px",color:"red"}}>Please Book Food 10 Minutes before Pickup</h4>
<h3 style={{paddingLeft:"4%",fontSize:"25px"}}>Select Pickup Time</h3></div>

:""}

<div className={Style1.TimeBox}>

{time.map((time) =>( 

 <div className={Style1.box} key={time.time}>
<div className={Style1.btn} >
{(defaultTime==time.time)?
<input type="radio" name="time" id={time.time}
 value={time.time} defaultChecked/>
 :
 <input type="radio" name="time" id={time.time} 
value={time.time} />
 }

 

</div>

<div className={Style1.time}><h4><label htmlFor={time.time}>

 : {(time.time1!=undefined)?time.time1.toFixed(2):time.time.toFixed(2)}
 {(time.time>=12)?' PM':' AM'}
 </label></h4></div>
</div>
      ))}

</div>

<div style={style2}>
{(time.length==0)?
<div className={Style1.message}>Order is Not allowed to Placed after <span>5.51 PM</span> from <span>Monday</span> To <span>Saturday</span> and also Closed On <span>Holidays</span></div>
:""}</div>
{(time.length!=0)?
<h4 style={{textAlign:"center",fontSize:"28px",color:"red"}}>Note-: Order Can't Cancelled Once Placed.</h4>
:""}
</div>
<div className={CartStyle.bottom} >
<Link href="/Cart"><button className={CartStyle.more}>Cart Page</button></Link>
<div className={CartStyle.subtotal} >
{(time.length!=0)?
<Link href="/PaymentMethod"><button style={{marginTop:"5%",marginRight:"-4%"}} onClick={getTime}>Continue Order</button></Link>
:<button style={{marginTop:"5%",marginRight:"-4%",cursor:"not-allowed"}} onClick={getTime} disabled>Continue Order</button>
}
</div>
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
    </>
  );
}