import React,{useState,useEffect} from 'react'
import { BiMenu } from 'react-icons/bi';
import { BiLoader } from 'react-icons/bi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { CgPlayListRemove } from 'react-icons/cg';
import "react-toastify/dist/ReactToastify.css";
import StyleRealtime from "../styles/RealtimeOrder.module.css";

function SingleItemRealtime({item}) {
const [datas,setDatas]=useState([]);
const [low,setLow]=useState();
const [show,setShow]=useState(false);

useEffect(()=>{
if(item){
setDatas(item);
let lowercase=item.OrderStatus.toLowerCase();
setLow(lowercase)
}
},[])

const process=(id)=>{
console.log(id)
}

const reject=(id)=>{
console.log(id)
}
  return (
     <>
    {(datas.length!=0)?<div>
<div className={StyleRealtime.tableheaddatasub} key={item._id}>
<div className={StyleRealtime.div1}>{item.ItemName}</div>
<div className={StyleRealtime.div2}>{item.ProductOriginalAmount}</div>
<div className={StyleRealtime.div3}>{item.Qty}</div>
<div className={StyleRealtime.div4}>{item.Category}</div>
<div className={StyleRealtime.div5}>{item.Amount}</div>
<div className={StyleRealtime.div6}>{item.AmountReceived}</div>
<div className={StyleRealtime.div7}>
{(low=="pending")? <div className={StyleRealtime.pen}>{item.OrderStatus}</div>: (low=="complete")? <div className={StyleRealtime.con}>{item.OrderStatus}</div>:<div className={StyleRealtime.rej}>{item.OrderStatus}</div>} 
</div>
<div className={StyleRealtime.div8} onClick={()=>setShow(!show)}>
{/* open close icon */}
{(show)?<CgPlayListRemove />:<BiMenu />}
</div>
{/* option after click */}


{(show)?
<div className={StyleRealtime.options}>
<div onClick={()=>process(item._id)}><span className={StyleRealtime.icon1} >
<BiLoader /></span> <span className={StyleRealtime.icon_1}>Process</span> 
</div>

<div onClick={()=>reject(item._id)}><span className={StyleRealtime.icon2}  ><RiDeleteBin7Line /></span> <span className={StyleRealtime.icon_2} >Reject</span> </div>
</div> :" "}

</div>
    </div> : ""} 

</>
  )
}


export default SingleItemRealtime;