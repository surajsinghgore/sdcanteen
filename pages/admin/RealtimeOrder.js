import React, { useState } from "react";
import Styles from "../../styles/admin.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import VerifyAdminLogin from './VerifyAdminLogin';
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import StyleFood from "../../styles/AddFood.module.css";
import StyleRealtime from "../../styles/RealtimeOrder.module.css";

import { useEffect } from "react";
import ShowHideInRealtime from "../../Components/ShowHideInRealtime";
let HOST = process.env.NEXT_PUBLIC_API_URL;


export default function RealtimeOrder() {

const [datas,setData]=useState([]);
const [totalOrder,setTotalOrder]=useState(0);
const [completeOrder,setCompleteOrder]=useState(0);
const [pendingOrder,setPendingOrder]=useState(0);
const [rejectOrder,setRejectOrder]=useState(0);
const [notPickOrder,setNotPickOrder]=useState(0);
// fetch realtime data
useEffect(()=>{
const fetchData=async()=>{
let ress = await fetch(`${HOST}/api/ShowOrdersRealtime`);
      let datass = await ress.json();
      // filter records accoding to time
     
      if(datass.data!=undefined){
setTotalOrder(datass.data.length)

// OrderStatus
// order complete
const completes=await datass.data.filter((item)=>{
return item.OrderStatus.toLowerCase()=="complete";
})
setCompleteOrder(completes.length)
// pending order
const pending=await datass.data.filter((item)=>{
return item.OrderStatus.toLowerCase()=="pending";
})
setPendingOrder(pending.length)
// reject order
const reject=await datass.data.filter((item)=>{
return item.OrderStatus.toLowerCase()=="reject";
})
setRejectOrder(reject.length)
// order not pickup

let currentDate=new Date();
let OrderTimes;
let hours=currentDate.getHours();
let m=parseInt(currentDate.getMinutes());
if(m<=9){
m = '0'+m;
}
if(hours>=12){
OrderTimes=currentDate.getHours()+1+"-"+m+" PM";
}
else{
OrderTimes=currentDate.getHours()+1+"-"+m+" AM";
}
const orderNotPick=await datass.data.filter((item)=>{
if(item.OrderStatus.toLowerCase()=="pending"){
return parseFloat(item.PickUpTime).toFixed(2)<=parseFloat(OrderTimes).toFixed(2);
}
})
setNotPickOrder(orderNotPick.length)
      await setData(datass.data);
      }
}

fetchData();
},[])




  return (
      <div className={Styles.admin}>
      <HeadTag title="Realtime Order" />
<VerifyAdminLogin />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}

      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Realtime Order Panel" />
     
<div className={StyleRealtime.orders}>
<h1>Filter Records</h1>

{/*! search bar section */}
<div className={StyleRealtime.searchBar}>
<input type="search" name="" id="" placeholder="Search Token Id ..." />
<input type="search" name="" id="" placeholder="Search Customer Name..."/>
<select>
<option value="" defaultChecked>Search Time Slot...</option>
<option value="8.00-Am">8.00 Am</option>
<option value="9.00-AM">9.00 Am</option>
<option value="10.00-Am">10.00 Am</option>
<option value="11.00-Am">11.00 Am</option>
<option value="12.00-Pm">12.00 Pm</option>
<option value="1.00-Pm">1.00 Pm</option>
<option value="2.00-Pm">2.00 Pm</option>
<option value="3.00-Pm">3.00 Pm</option>
<option value="4.00-Pm">4.00 Pm</option>
<option value="5.00-Pm">5.00 Pm</option>
<option value="6.00-Pm">6.00 Pm</option>
</select>
<select>
<option value="" defaultChecked>Select Category..</option>
<option value="foodcategory">Food Category</option>
<option value="coffeecategory">Coffee Category</option>
<option value="drinkcategory">Drink Category</option>
<option value="juicecategory">Juice Category</option>
</select>
</div>

{/* analysis section */}
<div className={StyleRealtime.analysis}>
<div className={StyleRealtime.div1}>Total Orders : {totalOrder}</div>
<div className={StyleRealtime.div2}>Complete Orders: {completeOrder}</div>
<div className={StyleRealtime.div3}>Pending Orders: {pendingOrder}</div>
<div className={StyleRealtime.div4}>Reject Orders : {rejectOrder}</div>
<div className={StyleRealtime.div5}>Not Picked Orders : {notPickOrder}</div>
</div>

<div className={StyleRealtime.tables_section}>

{/* .pen .con .rej */}


{(datas!=0)?<div>
{datas.map((item)=>{
return (
<div key={item._id}>
<div className={StyleRealtime.tableheading}>
<div className={StyleRealtime.div1}>Token Id</div>
<div className={StyleRealtime.div2}>Customer Name</div>
<div className={StyleRealtime.div3}>PickUp Time</div>
<div className={StyleRealtime.div4}>Total Amount</div>
<div className={StyleRealtime.div5}>Payment Mode</div>
<div className={StyleRealtime.div6}>Email</div>
<div className={StyleRealtime.div7}>Mobile</div>
</div>
<div className={StyleRealtime.contain} >
<div className={StyleRealtime.tableheaddata}>
<div className={StyleRealtime.div1}>{item.TokenUser}</div>
<div className={StyleRealtime.div2}>{item.FullName}</div>
<div className={StyleRealtime.div3}>{item.PickUpTime}</div>
<div className={StyleRealtime.div4}>{item.TotalAmount}</div>
<div className={StyleRealtime.div5}>{item.PaymentMethod}</div>
<div className={StyleRealtime.div6}>{item.Email}</div>
<div className={StyleRealtime.div7}>{item.Mobile}</div>
</div>
{/* sub data */}
{/* heading */}
 <div className={StyleRealtime.tableheadingsub}>
<div className={StyleRealtime.div1}>Item Name</div>
<div className={StyleRealtime.div2}>Product Price</div>
<div className={StyleRealtime.div3}>Qty</div>
<div className={StyleRealtime.div4}>Category</div>
<div className={StyleRealtime.div5}>Total Amount</div>
<div className={StyleRealtime.div6}>Amount Received</div>
<div className={StyleRealtime.div7}>Order Status</div>
<div className={StyleRealtime.div8}>Action</div>
</div>
<ShowHideInRealtime item={item.ItemsOrder}/>
</div>
</div>
)
})}

</div>: <h1>No Item Found</h1>}

</div>
        </div>
    </div>
     </div>
  )
}




