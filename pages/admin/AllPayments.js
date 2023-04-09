import React from "react";
import Styles from "../../styles/admin.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import VerifyAdminLogin from './VerifyAdminLogin';
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import StyleFood from "../../styles/AddFood.module.css";
import payment from "../../styles/Payments.module.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import Loader from "../../Components/Loader";
const AllPayments = () => {
const [month,setMonth]=useState('no')
const [year,setYear]=useState('no')
 const [loader,setLoader]=useState(false);
const [status,setSṭatus]=useState('no')
const [unYear,setUnYear]=useState([]);
const [paymentData,setPaymentData]=useState([])
// get unique years for select box from server
useEffect(()=>{

const getAllUniqueYearsFromServer=async()=>{
setLoader(true)
const res=await fetch(`${HOST}/api/AllPayments`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({diff:"true"})
})
const data=await res.json();setLoader(false)

if(res.status==200){
setUnYear(data.year)
}
}
getAllUniqueYearsFromServer();
},[])


const searchData=async()=>{

if(month=="no"){
  toast.warn("Please Select Month", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
}
if(year=="no"){
 toast.warn("Please Select Year", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
}
if(status=="no"){
 toast.warn("Please Select Status", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
}
setLoader(true)

const res=await fetch(`${HOST}/api/AllPayments`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({month,year,status})
})
const data=await res.json();setLoader(false)

console.log(data.data)
if(res.status==200){
setPaymentData(data.data)
}
}
  return (
    <div className={Styles.admin}> <Loader loader={loader}/>
      <HeadTag title="All Payments" />
<VerifyAdminLogin />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}

      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="All Payments" />
     
<div className={payment.AllPayments}>
{/* filter */}
<div className={payment.filterBox}>
<li>
<select placeholder="Select Month" value={month} onChange={(e)=>setMonth(e.target.value)}>
<option value="no">Select Month</option>
<option>1</option>
<option>2</option>
<option>3</option>
<option>4</option>
<option>5</option>
<option>6</option>
<option>7</option>
<option>8</option>
<option>9</option>
<option>10</option>
<option>11</option>
<option>12</option>
</select>
</li>

<li>
<select placeholder="Select Year" value={year} onChange={(e)=>setYear(e.target.value)}>
<option value="no">Select Year</option>
{(unYear.length!=0)? <>
{(unYear.map((item,ind)=>{
return <option value={item} key={ind}>{item}</option>
}))}
</>: ""}

</select>
</li>

<li>
<select placeholder="Select Payment Status" value={status} onChange={(e)=>setSṭatus(e.target.value)}>
<option value="no">Select Status</option>
<option value="TXN_SUCCESS">Complete</option>
<option value="TXN_FAILURE">Failed</option>
<option value="PENDING">Pending</option>
<option value="initiated">Initiated</option>
</select>
</li>

<li><button onClick={searchData}>Search</button></li>

</div>

{/* datas */}
<div className={payment.datasPayment}>
<h2>Total Records:<span> {paymentData.length}</span></h2>

<div className={payment.cards}>

{(paymentData.length!=0)? <>
{(paymentData.map((items)=>{
return <div className={payment.card} key={items._id}>
<div className={payment.topSection}>
<div className={payment.left}>
<h6>Payment Details</h6>
<p>{items.FullName}</p>
</div>

{(items.PaymentInfo.STATUS=="TXN_SUCCESS")?<div className={payment.right}><li className={payment.button}><div className={payment.complete}>Complete</div></li> </div>:""}
{(items.PaymentInfo.STATUS=="TXN_FAILURE")? <div className={payment.right}><li className={payment.button}><div className={payment.reject}>Failed</div></li></div>:""}
{(items.PaymentInfo.STATUS=="initiated")?<div className={payment.right}> <li className={payment.button}><div className={payment.initiate}>Initiated</div></li></div>:""}
{(items.PaymentInfo.STATUS=="PENDING")?<div className={payment.right}> <li className={payment.button}><div className={payment.pending}>Pending</div></li></div>:""}
</div>

<div className={payment.mainData}>
<h5>Payment Info</h5>
<div className={payment.all}>
<li>
<div className={payment.heading}>EMail ID</div>
<div className={payment.desc}>{items.Email}</div>
</li>

<li>
<div className={payment.heading}>Mobile</div>
<div className={payment.desc}>{items.Mobile}</div>
</li>
<li>
<div className={payment.heading}>Order Token </div>
<div className={payment.desc1}>{items.TokenUser}</div>
</li>
</div>
<div className={payment.all}>
<li>
<div className={payment.heading}>Payment Date </div>
<div className={payment.desc}>{items.OrderDate}</div>
</li>

<li>
<div className={payment.heading}>Payment Time </div>
<div className={payment.desc}>{items.OrderTime}</div>
</li>
<li>
<div className={payment.heading}>Order Status </div>
<div className={payment.desc}>{items.OrderStatus}</div>
</li>
</div>
<div className={payment.all}>
<li>
<div className={payment.heading}>Order Amount </div>
<div className={payment.desc}>{items.TotalAmount}</div>
</li>
<li>
<div className={payment.heading}>Transcation Amount </div>
<div className={payment.desc}>{items.PaymentInfo.TXNAMOUNT}</div>
</li>

<li>
<div className={payment.heading}>transaction Currency </div>
<div className={payment.desc}>{items.PaymentInfo.CURRENCY}</div>
</li></div>
<h4>Bank Info</h4>
<div className={payment.all}>
<li>
<div className={payment.heading}>Bank Name</div>
<div className={payment.desc}>{items.PaymentInfo.BANKNAME}</div>
</li>

<li>
<div className={payment.heading}>Bank Transaction ID</div>
<div className={payment.desc}>{(items.PaymentInfo.BANKTXNID)?<>{items.PaymentInfo.BANKTXNID}</> : "no"}</div>
</li>
<li>
<div className={payment.heading}>Gateway Name</div>
<div className={payment.desc}>{(items.PaymentInfo.GATEWAYNAME)?<>{items.PaymentInfo.GATEWAYNAME}</> : "no"}</div>
</li>
</div>
<div className={payment.all}>
<li>
<div className={payment.heading}>Payment Mode</div>
<div className={payment.desc}>{items.PaymentInfo.PAYMENTMODE}</div>
</li>
<li>
<div className={payment.heading}>Transaction Full Date</div>
<div className={payment.desc}>{items.PaymentInfo.TXNDATE}</div>
</li>
<li>
<div className={payment.heading}>Payment Status</div>
<div className={payment.desc}>{items.PaymentInfo.STATUS}</div>
</li>
</div>
<div className={payment.all}>
{(items.PaymentInfo.RESPMSG)? <li style={{width:"96%"}}>
<div className={payment.heading}>Failure Message</div>
<div className={payment.desc}>{items.PaymentInfo.RESPMSG}</div>
</li>:""}

</div>
</div>
</div>
}))}
</>

:<h1>No Data Found</h1>}

</div>


</div>



</div>
        </div>




<ToastContainer
        position="bottom-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </div>
  );
};

export default AllPayments;
