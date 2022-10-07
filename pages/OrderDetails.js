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
let HOST = process.env.NEXT_PUBLIC_API_URL;


export default function OrderDetails() {
const [time,setTime]=useState([]);
const [realTime,setRealTime]=useState(true);
const [defaultTime,setDefaultTime]=useState();
let date=new Date();

// if cart is empty then off Timing Page
useEffect(()=>{
let carts=JSON.parse(localStorage.getItem('react-use-cart'))
if(carts.items.length==0){
toast.warn("Please Add something In Cart", {
               position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
                const pushToCompleteOrder=()=>{
        router.push('/');
        }
          setTimeout(pushToCompleteOrder,1500);
return 0;
}
},[])
// enable time is not sunday and also not off from admin
useEffect(()=>{
let m=parseInt(date.getMinutes());
let h=parseInt(date.getHours());
m=m+10;
if(m<=9){
m = '0'+m;
}
if(m>59){
m = 0;h=h+1;
m=m+10;
}
let times=`${h}.${m}`;
const fetchData=async()=>{

const res = await fetch(`${HOST}/api/ShowOrderOnOffStatus`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      }
    });
    let data=await res.json();
  if(res.status==501){
toast.error('Internal Server Error', {
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
 if(res.status==404){
toast.warn('No Record Found', {
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
let status;
if(data.data){
status=data.data[0].Status;
}
if(status=="true"){}else{
let d=await Timing.filter((time)=>{
return time.time>=times;
})
setTime(d);
}
}
if(date.getDay()!=7){
// from 7 am to 6 pm allowed
if((h>=7)&&(h<=17)){
fetchData();
}
}

},[realTime])

// refresh automatically after some times
useEffect(()=>{
let seconds=60-date.getSeconds();
const changes=()=>{
setRealTime(!realTime);
}
setInterval(changes,1000*seconds);
})

 const style2 = {
        marginBottom:"5%",clear:"both"
    }

const getTime=(item)=>{


if(document.querySelector("input[type='radio'][name=time]:checked")){
let value=document.querySelector("input[type='radio'][name=time]:checked").value;
localStorage.setItem("OrderFoodTime",value);

let dd=Timing.filter((itm)=>{
return (parseFloat(itm.time1).toFixed(2))==(parseFloat(localStorage.getItem('OrderFoodTime')).toFixed(2))
})
let pickUpTime1=dd[0].time;
localStorage.setItem("PickUpTime1",pickUpTime1);
setDefaultTime(value)
router.push('/PaymentMethod')
}
else{
toast.warn('Please Select Time Slot', {
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
}


useEffect(()=>{
if(localStorage.getItem("OrderFoodTime")){
setDefaultTime(localStorage.getItem("OrderFoodTime"))
}
},[])
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
{(defaultTime==time.time1)?
<input type="radio" name="time" id={time.time}
 value={time.time1.toFixed(2)} defaultChecked/>
 :
 <input type="radio" name="time" id={time.time} 
value={`${time.time1.toFixed(2)}-${(time.time>=12)?'PM':'AM'}`} />
 }
</div>

<div className={Style1.time}><h4><label htmlFor={time.time}>

 : {time.time1.toFixed(2)}
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
<button style={{marginTop:"5%",marginRight:"-4%"}} onClick={()=>getTime(time)}>Continue Order</button>
:<button style={{marginTop:"5%",marginRight:"-4%",cursor:"not-allowed"}} onClick={()=>getTime()} disabled>Continue Order</button>
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
