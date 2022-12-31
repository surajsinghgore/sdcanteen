import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import Style1 from "../styles/OrderDetails.module.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import router from 'next/router'
import Loader from "../Components/Loader";
import Link from 'next/link'
import VerifyClientMiddleware from "./VerifyClientMiddleware";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillCreditCard } from 'react-icons/ai';
import { BsCashStack } from 'react-icons/bs';
import CountDownTimer from "../Components/CountDownTimer";
let date=new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let fullDate=day+"/"+month+"/"+year;
export default function OrderComplete() {
const [data,setData]=useState([]);
const [loader,setLoader]=useState(true);
 const [totalOrderLen, setTotalOrderLen] = useState(0);
const [timefull,setTimeFull]=useState('');
function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let am_pm = " AM";
 
    if (hour > 12) {
        hour -= 12;
        am_pm = " PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = " AM";
    }
 
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
 
    let currentTime = hour + ":"
            + min + ":" + sec + am_pm;

 setTimeFull(currentTime)
 
}
useEffect(()=>{

setInterval(showTime, 1000);

},[])




useEffect(()=>{
   setLoader(true);
const fetchOrder=async()=>{
let ress = await fetch(`${HOST}/api/ShowOrderDeatilsClient`);

              let datas=await ress.json();
        
              setData(datas.data)
                setTotalOrderLen(datas.data.length)
                setLoader(false);
}
fetchOrder();
},[])


  return (
    <>
<Loader loader={loader}/>
    <VerifyClientMiddleware />
      <div className={Styles.admin}>
        <HeadTag title="Order Placed" />
        <Header />
      </div>
    <div className={Style1.order}>
    <div className={Style1.titleSection}>
<h1>All Today's Pending Order </h1>
<h2>Total Order Placed : <span>{totalOrderLen}</span></h2>
    </div>
    <div className={Style1.orderToday}>
<h5>{fullDate}</h5>
<h6 id="clock">{timefull}</h6>
    </div>

{(data.length!=0)?
<>
{data.map((item)=>{
return (
<div className={Style1.orders} key={item._id}>
<div className={Style1.top}>
<div className={Style1.left}>
<h3>ORDER TOKEN :- <span>{item.TokenUser}</span></h3>
<p>Estimated Delivery time</p>
</div>
<CountDownTimer date={item.OrderDate} time={item.PickUpTime2}/>
</div>
<hr className={Style1.hr}/>
<h3>Order Details</h3>
<div className={Style1.detials}>
<div className={Style1.personal}>
<h3>Personal Details:</h3>
<div className={Style1.detialsInner}>
<div className={Style1.title}>User Name : </div>
<div className={Style1.data}>{item.FullName}</div>
</div>
<div className={Style1.detialsInner}>
<div className={Style1.title}>User Email : </div>
<div className={Style1.data}>{item.Email}</div>
</div>
<div className={Style1.detialsInner}>
<div className={Style1.title}>User Mobile:</div>
<div className={Style1.data}>+91-{item.Mobile}</div>
</div>

</div>
<div className={Style1.orderRealted}>
<h3>Order Details:</h3>
<div className={Style1.detialsInner}>
<div className={Style1.title}>Order Pickup Time: </div>
<div className={Style1.data}>{item.PickUpTime}</div>
</div>
<div className={Style1.detialsInner}>
<div className={Style1.title}>Order Date: </div>
<div className={Style1.data}>{item.OrderDate}</div>
</div>


<div className={Style1.detialsInner}>
<div className={Style1.title}>Order status: </div>
<div className={Style1.data}>{item.OrderStatus}</div>
</div>

</div>


</div>

<hr className={Style1.hr}/>

<div className={Style1.items}>
<h3>Items Order</h3>
<hr className={Style1.hr1}/>

<div className={Style1.ItemcardHeading}>

<li className={Style1.foodName}> Item Name</li>
<li className={Style1.size}>
Item Size
</li>
<li className={Style1.price}> Original Price</li>
<li className={Style1.qty}>Qty Book</li>
<li className={Style1.rupee}> Price</li>

</div>

{(item.ItemsOrder.length!=0)?
<>
{item.ItemsOrder.map((itx)=>{
return <div key={itx._id}>
<hr className={Style1.hr1}/>
<div className={Style1.Itemcard}>
<li className={Style1.foodName}> {itx.ItemName}</li>
<li className={Style1.size}> {itx.Size}</li>
<li className={Style1.price}> {itx.ProductOriginalAmount}</li>
<li className={Style1.qty}>{itx.Qty}</li>
<li className={Style1.rupee}> ₹ {(parseInt(itx.ProductOriginalAmount))*((parseInt(itx.Qty)))}</li>

</div>
</div>
})}


</>:""}


</div>

<hr className={Style1.hr}/>

<h3>Payment Details</h3>
<div className={Style1.detials}>
<div className={Style1.personal}>
<h3>Payment Method:</h3>
{(item.PaymentMethod=="online")? <div className={Style1.detialsInner}>
<AiFillCreditCard className={Style1.card}/>
<div className={Style1.title1}>{item.PaymentMethod}</div>
</div> : <div className={Style1.detialsInner}>
<BsCashStack className={Style1.card}/>
<div className={Style1.title1}>{item.PaymentMethod}</div>
</div>}


</div>
<div className={Style1.orderRealted} >
<div className={Style1.detialsInner}>
<div className={Style1.title}>Total Amount: </div>
<div className={Style1.data}>₹ {item.TotalAmount}</div>
</div>
<div className={Style1.detialsInner}>
<div className={Style1.title}>Total Item Order: </div>
<div className={Style1.data}>{item.ItemsOrder.length}</div>
</div>
<div className={Style1.detialsInner}>
<div className={Style1.title}>Amount Received: </div>
<div className={Style1.data}> ₹ {item.AmountReceived}</div>
</div>
<hr className={Style1.hr2}/>
<div className={Style1.detialsInner}>
<div className={Style1.title}>Total: </div>
<div className={Style1.data1}> ₹ {item.TotalAmount}</div>
</div>
</div>


</div>
</div>
)

})}
</>
:<div className={Style1.notFood}>
<h3>No Order Placed Today</h3>
<Link href="/FoodItem"><button>Buy Now Food</button></Link>
</div>}

    </div> 



      <Footer />
    </>
  );
}
