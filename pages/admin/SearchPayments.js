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
const SearchPayments = () => {
const [txn,setTxn]=useState('')
const [amount,setAmount]=useState('')
const [oid,setOid]=useState('')
const [cName,setCNames]=useState('')
 const [loader,setLoader]=useState(false);
const [paymentData,setPaymentData]=useState([])

const changeTxn=async(e)=>{
setTxn(e.target.value)
const res=await fetch(`${HOST}/api/SearchPayment`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({Txn:e.target.value})
})
const data=await res.json();
if(res.status==200){
setPaymentData(data.data)
}
if(e.target.value==""){
setPaymentData([])
}
}
const changeCname=async(e)=>{
setCNames(e.target.value)
const res=await fetch(`${HOST}/api/SearchPayment`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({cName:e.target.value})
})
const data=await res.json();
if(res.status==200){
setPaymentData(data.data)
}
if(e.target.value==""){
setPaymentData([])
}
}
const changeOid=async(e)=>{
setOid(e.target.value)
const res=await fetch(`${HOST}/api/SearchPayment`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({oid:e.target.value})
})
const data=await res.json();
if(res.status==200){
setPaymentData(data.data)
}
if(e.target.value==""){
setPaymentData([])
}
}
const changeAmount=async(e)=>{
setAmount(e.target.value)

const res=await fetch(`${HOST}/api/SearchPayment`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({amount:e.target.value})
})
const data=await res.json();
if(res.status==200){
setPaymentData(data.data)
}
if(e.target.value==""){
setPaymentData([])
}
}

  return (
    <div className={Styles.admin}> <Loader loader={loader}/>
      <HeadTag title="Search Payments" />
<VerifyAdminLogin />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}

      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Search Payments" />
     
<div className={payment.AllPayments}>
{/* filter */}
<div className={payment.filterBox}>
<li>
<input type="text" placeholder="Search By TXNID" value={txn} onChange={changeTxn}/>
</li>

<li>
<input type="text" placeholder="Search By TXN AMOUNT" value={amount} onChange={changeAmount}/>
</li>

<li>
<input type="text" placeholder="Search By Customer Name" value={cName} onChange={changeCname}/>
</li>
<li>
<input type="text" placeholder="Search By Order Token" value={oid} onChange={changeOid}/>
</li>


</div>

{/* datas */}
<div className={payment.datasPayment}>
<h2>Total Records Found :<span> {paymentData.length}</span></h2>

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

export default SearchPayments;
