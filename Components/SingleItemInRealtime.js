import React,{useState,useEffect,useContext} from 'react'
import { BiMenu } from 'react-icons/bi';
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { BiLoader } from 'react-icons/bi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { CgPlayListRemove } from 'react-icons/cg';
import { TiTickOutline } from 'react-icons/ti';
import { MdOutlineClose } from 'react-icons/md';
import { IoMdDoneAll } from 'react-icons/io';
import { GrFormClose } from 'react-icons/gr';
import VerifyAdminLogin from '../pages/admin/VerifyAdminLogin';

import "react-toastify/dist/ReactToastify.css";
import StyleRealtime from "../styles/RealtimeOrder.module.css";
import { ToastContainer, toast } from "react-toastify";
import router from 'next/router'
import { AllContext } from "../context/AllContext";
function SingleItemRealtime({item}) {
 const { statesForRealtime,setStateForRealtime } = useContext(AllContext);

const [updateStates,setUpdateStates]=useState(false);
const [datas,setDatas]=useState([]);
const [low,setLow]=useState();
const [show,setShow]=useState(false);
const [price,setPrice]=useState(0)
const [OrderStatus,setOrderStatus]=useState('');
const [status,setStatus]=useState('pending')
useEffect(()=>{
if(item){
setDatas(item);
setOrderStatus(item.OrderStatus);
let lowercase=item.OrderStatus.toLowerCase();
setLow(lowercase)
}
},[])





// process order
const process=()=>{
setShow(false);
setUpdateStates(true)
}
// reject Order
const reject=(id)=>{
let status="reject";
const sendData=async()=>{
const res = await fetch(`${HOST}/api/UpdateOrderItems`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "id": id,"status":status
      }),
    });
  await res.json();
if(res.status==403){
toast.error('Please Login With Admin Credentails', {
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
if(res.status==400){
toast.warn('Please fill All the filed Id,Price,Status', {
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
toast.warn('Record Not Found', {
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
if(res.status==501){
toast.warn('Internal Server Error', {
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

toast.success('Successfully Updated', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
router.push('/admin/RealtimeOrder')
setStateForRealtime(!statesForRealtime);
setLow(status)
setOrderStatus(status)
setShow(false)
}
sendData();
}


const UpdateOrder=(id,Amount)=>{
let priceInt=parseInt(price);
if(priceInt<0){
toast.warn('Price Below Zero Not Allowed', {
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
else if(priceInt==0){
toast.warn('Zero Price Amount Not Allowed', {
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
else if(status=="pending"){
toast.warn('Please Change Order Status', {
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
if(priceInt<parseInt(Amount)){
toast.warn('Amount Is Less Than Total Amount', {
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
if(priceInt>parseInt(Amount)){
toast.warn('Amount Is More Than Total Amount', {
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
const sendData=async()=>{
const res = await fetch(`${HOST}/api/UpdateOrderItems`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "id": id,"price":price,"status":status
      }),
    });
    let data = await res.json();
if(res.status==403){
toast.error('Please Login With Admin Credentails', {
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
if(res.status==400){
toast.warn('Please fill All the filed Id,Price,Status', {
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
toast.warn('Record Not Found', {
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
if(res.status==501){
toast.warn('Internal Server Error', {
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

toast.success('Successfully Updated', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
router.push('/admin/RealtimeOrder')
setStateForRealtime(!statesForRealtime);
setUpdateStates(false)
setLow(status)
setOrderStatus(status)
}
sendData();
}

  return (
     <>
     <VerifyAdminLogin />
    {(datas.length!=0)?<div>
<div className={StyleRealtime.tableheaddatasub} key={item._id}>
<div className={StyleRealtime.div1}>{item.ItemName}</div>
<div className={StyleRealtime.div2}>{item.ProductOriginalAmount}</div>
<div className={StyleRealtime.div3}>{item.Qty}</div>
<div className={StyleRealtime.div4}>{item.Category}</div>
<div className={StyleRealtime.div5}>{item.Amount}</div>
<div className={StyleRealtime.div6}>{item.AmountReceived} </div>
<div className={StyleRealtime.div7}>
{(low=="pending")? <div className={StyleRealtime.pen}>{OrderStatus}</div>: (low=="complete")? <div className={StyleRealtime.com}>{OrderStatus}</div>:<div className={StyleRealtime.rej}>{OrderStatus}</div>} 
</div>

{(item.OrderStatus.toLowerCase()=="complete")?
// complete  
<div className={StyleRealtime.div8}>
 <IoMdDoneAll className={StyleRealtime.com} title="Order Complete"/>
</div>
:
// reject
((item.OrderStatus.toLowerCase()=="reject")? 
<div className={StyleRealtime.div8}>
 <GrFormClose className={StyleRealtime.rej} title="Order Reject"/>
</div>
:
// pending
 <div className={StyleRealtime.div8} onClick={()=>setShow(!show)}>
{(show)?<CgPlayListRemove className={StyleRealtime.close}/>:<BiMenu className={StyleRealtime.menu}/>}
</div>) 
 }

{/* option after click */}


{(show)?
<div className={StyleRealtime.options}>
<div onClick={()=>process(item._id)}><span className={StyleRealtime.icon1} >
<BiLoader /></span> <span className={StyleRealtime.icon_1}>Process</span> 
</div>

<div onClick={()=>reject(item._id)}><span className={StyleRealtime.icon2}  ><RiDeleteBin7Line /></span> <span className={StyleRealtime.icon_2} >Reject</span> </div>
</div> :
""}



{/* update form */}
{(updateStates) ?
<div className={StyleRealtime.update}>
<div className={StyleRealtime.div1}>{item.ItemName}</div>
<div className={StyleRealtime.div2}>{item.ProductOriginalAmount}</div>
<div className={StyleRealtime.div3}>{item.Qty}</div>
<div className={StyleRealtime.div4}>{item.Category}</div>
<div className={StyleRealtime.div5}>{item.Amount}</div>
<div className={StyleRealtime.div6}>
<input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
</div>
<div className={StyleRealtime.div7}>
<select value={status} onChange={(e)=>setStatus(e.target.value)}>
<option value="pending">Pending</option>
<option value="complete">Complete</option>
</select>
</div>
<div className={StyleRealtime.div8}>
{/* open close icon */}
<TiTickOutline className={StyleRealtime.tick} title="Upate" onClick={()=>UpdateOrder(item._id,item.Amount)} />
<MdOutlineClose className={StyleRealtime.back} title="Back" onClick={()=>setUpdateStates(false)} />
</div>
</div>
  : ""}


</div>
    </div> : ""} 
    
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


export default SingleItemRealtime;