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


// fetch realtime data
useEffect(()=>{
const fetchData=async()=>{
let ress = await fetch(`${HOST}/api/ShowOrdersRealtime`);
      let datass = await ress.json();
      if(datass){
      await setData(datass.data)
      }
}

fetchData();
console.log(datas)
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
<div className={StyleRealtime.tables_section}>

<div className={StyleRealtime.tableheading}>
<div className={StyleRealtime.div1}>Token Id</div>
<div className={StyleRealtime.div2}>Customer Name</div>
<div className={StyleRealtime.div3}>PickUp Time</div>
<div className={StyleRealtime.div4}>Total Amount</div>
<div className={StyleRealtime.div5}>Payment Mode</div>
<div className={StyleRealtime.div5}>Status</div>
</div>

{/* .pen .con .rej */}


{(datas.length!=0)?<div>
{datas.map((item)=>{
return (
<div className={StyleRealtime.contain} key={item._id}>
<div className={StyleRealtime.tableheaddata}>
<div className={StyleRealtime.div1}>{item.TokenUser}</div>
<div className={StyleRealtime.div2}>{item.FullName}</div>
<div className={StyleRealtime.div3}>{item.PickUpTime}</div>
<div className={StyleRealtime.div4}>{item.TotalAmount}</div>
<div className={StyleRealtime.div5}>{item.PaymentMethod}</div>
<div className={StyleRealtime.div5}>
{(item.OrderStatus=="Pending")? <div className={StyleRealtime.pen}>{item.OrderStatus}</div>: (item.OrderStatus=="Complete")? <div className={StyleRealtime.con}>{item.OrderStatus}</div>:<div className={StyleRealtime.rej}>{item.OrderStatus}</div>} 

</div>
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
<div className={StyleRealtime.div7}>Status</div>
<div className={StyleRealtime.div8}>Action</div>
</div>
<ShowHideInRealtime item={item.ItemsOrder}/>
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




