import Styles from "../../styles/admin.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import VerifyAdminLogin from './VerifyAdminLogin';
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import StyleFood from "../../styles/AddFood.module.css";
import anaylsis from "../../styles/Anaylsis.module.css";
import React, { useEffect,useState } from "react";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import MultiBarChart from "../../Charts/MultiBarChart";
import YearWiseBarChart from "../../Charts/YearWiseBarChart";

const AnaylsisPayments = () => {
const [progress, setProgress] = useState(0);
let date=new Date()
const [year,setYear]=useState(date.getFullYear())
const [year2,setYear2]=useState('no')
const [year3,setYear3]=useState('no')
const [allYears,setAllYears]=useState([])
const [allData,setAllData]=useState([])
const [TopEar,setTopEarn]=useState([])
const [pay,setPay]=useState([])
const [orev,setORev]=useState([])
const [succ,setSucc]=useState([])
const [fai,setFai]=useState([])
const [pen,setPen]=useState([])
const [cod,setCod]=useState([])
const [codN,setCodN]=useState([])
const [codO,setCodO]=useState([])
const [codOY,setCodOY]=useState([])
// years fetch for select 
useEffect(()=>{
const getAllYears=async()=>{
setProgress(50)
const res=await fetch(`${HOST}/api/GetUniqueYears`);
const data=await res.json()
setProgress(100)
if(res.status==200){
setAllYears(data.year)
}
}

getAllYears()
},[])


useEffect(()=>{
const getData=async()=>{
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:date.getFullYear()})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}

}

getData()
},[])


useEffect(()=>{
let codOnline=[]
let codOnlineNumber=[]
if(allData.TotalEarning!=undefined){
let datasSet=[]
for(let i=0;i<allData.TotalEarning.length;i++){
let s=allData.TotalEarning[i].slice(-1)[0];
let newData=allData.TotalEarning[i].slice(0,12)
if(i==0){ datasSet.push({label:s,data:newData,backgroundColor: "#fc037f"}) }
if(i==1){datasSet.push({label:s,data:newData,backgroundColor: "#03b6fc"})}
if(i==2){datasSet.push({label:s,data:newData,backgroundColor: "#03fc56"})}
}
setTopEarn(datasSet)
}

if(allData.TotalPayments!=undefined){
let datasSet=[]
for(let i=0;i<allData.TotalPayments.length;i++){
let s=allData.TotalPayments[i].slice(-1)[0];
let newData=allData.TotalPayments[i].slice(0,12)
if(i==0){ datasSet.push({label:s,data:newData,backgroundColor: "#a1fc03"}) }
if(i==1){datasSet.push({label:s,data:newData,backgroundColor: "#2803fc"})}
if(i==2){datasSet.push({label:s,data:newData,backgroundColor: "#03fceb"})}
}
setPay(datasSet)
}
if(allData.RevenueOnline!=undefined){
let datasSet=[]
for(let i=0;i<allData.RevenueOnline.length;i++){
let s=allData.RevenueOnline[i].slice(-1)[0];
let newData=allData.RevenueOnline[i].slice(0,12)
if(i==0){ datasSet.push({label:s,data:newData,backgroundColor: "#f403fc"}) }
if(i==1){datasSet.push({label:s,data:newData,backgroundColor: "#6e04ba"})}
if(i==2){datasSet.push({label:s,data:newData,backgroundColor: "#07aeeb"})}
}
setORev(datasSet)
}

if(allData.successOrder!=undefined){
let datasSet=[]
for(let i=0;i<allData.successOrder.length;i++){
let s=allData.successOrder[i].slice(-1)[0];
let newData=allData.successOrder[i].slice(0,12)
if(i==0){ datasSet.push({label:s,data:newData,backgroundColor: "#0acef5"}) }
if(i==1){datasSet.push({label:s,data:newData,backgroundColor: "#38eb10"})}
if(i==2){datasSet.push({label:s,data:newData,backgroundColor: "#05fab5"})}
}
setSucc(datasSet)
}


if(allData.failedOrder!=undefined){
let datasSet=[]
for(let i=0;i<allData.failedOrder.length;i++){
let s=allData.failedOrder[i].slice(-1)[0];
let newData=allData.failedOrder[i].slice(0,12)
if(i==0){ datasSet.push({label:s,data:newData,backgroundColor: "#fa021b"}) }
if(i==1){datasSet.push({label:s,data:newData,backgroundColor: "#fa028b"})}
if(i==2){datasSet.push({label:s,data:newData,backgroundColor: "#8f02fa"})}
}
setFai(datasSet)
}

if(allData.pendingOrder!=undefined){
let datasSet=[]
for(let i=0;i<allData.pendingOrder.length;i++){
let s=allData.pendingOrder[i].slice(-1)[0];
let newData=allData.pendingOrder[i].slice(0,12)
if(i==0){ datasSet.push({label:s,data:newData,backgroundColor: "#a5e309"}) }
if(i==1){datasSet.push({label:s,data:newData,backgroundColor: "#09e39a"})}
if(i==2){datasSet.push({label:s,data:newData,backgroundColor: "#eba94d"})}
}
setPen(datasSet)
}


if(allData.codOrder!=undefined){
let datasSet=[]
for(let i=0;i<allData.codOrder.length;i++){
let s=allData.codOrder[i].slice(-1)[0];
let newData=allData.codOrder[i].slice(0,12)
if(i==0){ datasSet.push({label:s,data:newData,backgroundColor: "#40abed"}) }
if(i==1){datasSet.push({label:s,data:newData,backgroundColor: "#6307f7"})}
if(i==2){datasSet.push({label:s,data:newData,backgroundColor: "#07f7bb"})}
}
setCod(datasSet)
}


if(allData.codOrderTotal!=undefined){
let datasSet=[]
for(let i=0;i<allData.codOrderTotal.length;i++){
let s=allData.codOrderTotal[i].slice(-1)[0];
let newData=allData.codOrderTotal[i].slice(0,12)
if(i==0){ datasSet.push({label:s,data:newData,backgroundColor: "#059e78"}) }
if(i==1){datasSet.push({label:s,data:newData,backgroundColor: "#e02909"})}
if(i==2){datasSet.push({label:s,data:newData,backgroundColor: "#e009c0"})}
}
setCodN(datasSet)
}



},[allData])


const year1Change=async(e)=>{
if(e.target.value==year2){
if(year2!='no'){
 toast.warn("This Year Is Already Selected,Please Select Different Year", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
}
}
if(e.target.value==year3){
if(year3!='no'){

  toast.warn("This Year Is Already Selected,Please Select Different Year", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
}
}
setYear(e.target.value)

if((year2=='no')&&(year3=='no')){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:e.target.value})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}

}


if((year2=='no')&&(year3!='no')){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:e.target.value,year2:year3})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((year2!='no')&&(year3=='no')){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:e.target.value,year2:year2})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}

if((e.target.value!="no")&&(year2!='no')&&(year3!='no')){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:e.target.value,year2:year2,year3:year3})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((e.target.value=="no")&&(year2!="no")&&(year3!="no")){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:year2,year2:year3})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((e.target.value=="no")&&(year2=="no")&&(year3!="no")){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:year3})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((e.target.value=="no")&&(year2!="no")&&(year3=="no")){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:year2})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((e.target.value=="no")&&(year2=="no")&&(year3=="no")){
allData=[]
}


}


const year2Change=async(e)=>{
if(e.target.value==year){
if(year!='no'){
 toast.warn("This Year Is Already Selected,Please Select Different Year", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
}
}
if(e.target.value==year3){
if(year3!='no'){
  toast.warn("This Year Is Already Selected,Please Select Different Year", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
}
}
setYear2(e.target.value)


if((year=='no')&&(year3=='no')){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:e.target.value})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}

}


if((year=='no')&&(year3!='no')){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:e.target.value,year2:year3})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((year!='no')&&(year3=='no')){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:e.target.value,year2:year})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}

if((e.target.value!="no")&&(year!='no')&&(year3!='no')){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:e.target.value,year2:year,year3:year3})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((e.target.value=="no")&&(year!="no")&&(year3!="no")){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:year2,year:year3})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((e.target.value=="no")&&(year=="no")&&(year3!="no")){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:year3})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((e.target.value=="no")&&(year!="no")&&(year3=="no")){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:year})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((e.target.value=="no")&&(year=="no")&&(year3=="no")){
allData=[]
}

}

const year3Change=async(e)=>{
if(e.target.value==year2){
if(year2!='no'){
 toast.warn("This Year Is Already Selected,Please Select Different Year", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
}
}
if(e.target.value==year){
if(year!='no'){

  toast.warn("This Year Is Already Selected,Please Select Different Year", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
}
}
setYear3(e.target.value)

if((year2=='no')&&(year=='no')){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:e.target.value})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}

}


if((year2=='no')&&(year!='no')){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:e.target.value,year2:year})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((year2!='no')&&(year=='no')){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:e.target.value,year2:year2})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}

if((e.target.value!="no")&&(year2!='no')&&(year!='no')){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:e.target.value,year2:year2,year3:year})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((e.target.value=="no")&&(year2!="no")&&(year!="no")){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:year2,year2:year})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((e.target.value=="no")&&(year2=="no")&&(year!="no")){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:year})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((e.target.value=="no")&&(year2!="no")&&(year=="no")){
const res=await fetch(`${HOST}/api/PaymentAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({year1:year2})
});
const data=await res.json();
if(res.status==200){
setAllData(data)
}
}
if((e.target.value=="no")&&(year2=="no")&&(year=="no")){
allData=[]
}

}

  return (
    <div className={Styles.admin}> <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  
      <HeadTag title="Anaylsis Payments" />
<VerifyAdminLogin />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}

      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Anaylsis Payments" />
     
<div className={anaylsis.payment}>
<h4>Select Years to Compare records</h4>
<div className={anaylsis.filters}>


{/* main search */}
<li><select value={year}  onChange={(e)=>year1Change(e)}>
<option value={"no"}>
compare with 1 year
</option>
{(allYears.length!=0)?<>
{(allYears.map((item,index)=>{
return <option value={item} key={index}>{item}</option>
}))}
</>
:""}</select></li>

{/* second filter */}
<li><select value={year2} onChange={(e)=>year2Change(e)}>

<option value={"no"}>
compare with 2 year
</option>
{(allYears.length!=0)?<>
{(allYears.map((item,index)=>{
return <option value={item} key={index}>{item}</option>
}))}
</>
:""}
</select></li>
{/* third filter*/}
<li><select value={year3} onChange={(e)=>year3Change(e)}>
<option value={"no"}>
compare with 3 year
</option>
{(allYears.length!=0)?<>
{(allYears.map((item,index)=>{
return <option value={item} key={index}>{item}</option>
}))}
</>
:""}
</select></li>

</div>


{/* all charts */}
<div className={anaylsis.chartSection}>
{/* total earnings */}
<div className={anaylsis.chartSigle}>
<h5>Total Earnings</h5>
<div className={anaylsis.chartARea}>

{(TopEar.length!=0) ? <MultiBarChart datas={TopEar}/>:""}
</div>
<div className={anaylsis.allDatas}>
{(allData.length!=0)? <>
{(allData.TotalEarningSum!=undefined)?
<>
{(allData.TotalEarningSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <> ₹ {item.total}</>:(item.total1)? <> ₹ {item.total1}</>:(item.total2)? <> ₹ {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""}



</div>
</div>


{/* total Number of Online Payments */}
<div className={anaylsis.chartSigle}>
<h5>Total Number of Payments Initiated Online</h5>
<div className={anaylsis.chartARea}>
{/* */}
{(pay.length!=0)?<MultiBarChart datas={pay}/>  :" "}
</div>
<div className={anaylsis.allDatas}>
{(allData.length!=0)? <>
{(allData.TotalPaymentsSum!=undefined)?
<>
{(allData.TotalPaymentsSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <> {item.total}</>:(item.total1)? <> {item.total1}</>:(item.total2)? <> {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""}



</div>
</div>

{/* Number Of Online Payments */}
<div className={anaylsis.chartSigle}>
<h5>Revenue Generated Using Only Online Payments</h5>
<div className={anaylsis.chartARea}>
{/* */}
{(orev.length!=0)?<MultiBarChart datas={orev}/>  :" "}
</div>
<div className={anaylsis.allDatas}>
{(allData.length!=0)? <>
{(allData.RevenueOnlineSum!=undefined)?
<>
{(allData.RevenueOnlineSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <> ₹ {item.total}</>:(item.total1)? <> ₹ {item.total1}</>:(item.total2)? <> ₹ {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""}



</div>
</div>



{/* total success payments */}
<div className={anaylsis.chartSigle}>
<h5>Total Success Payments</h5>
<div className={anaylsis.chartARea}>
{/* */}
{(succ.length!=0)?<MultiBarChart datas={succ}/>  :" "}
</div>
<div className={anaylsis.allDatas}>
{(allData.length!=0)? <>
{(allData.successOrderSum!=undefined)?
<>
{(allData.successOrderSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <> {item.total}</>:(item.total1)? <> {item.total1}</>:(item.total2)? <> {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""}



</div>
</div>


{/* total failed payments */}
<div className={anaylsis.chartSigle}>
<h5>Total Failed Payments</h5>
<div className={anaylsis.chartARea}>
{/* */}
{(fai.length!=0)?<MultiBarChart datas={fai}/>  :" "}
</div>
<div className={anaylsis.allDatas}>
{(allData.length!=0)? <>
{(allData.failedOrderSum!=undefined)?
<>
{(allData.failedOrderSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <> {item.total}</>:(item.total1)? <> {item.total1}</>:(item.total2)? <> {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""}



</div>
</div>

{/* order Pending Payments */}
<div className={anaylsis.chartSigle}>
<h5>Total Pending Payments</h5>
<div className={anaylsis.chartARea}>
{/* */}
{(pen.length!=0)?<MultiBarChart datas={pen}/>  :" "}
</div>
<div className={anaylsis.allDatas}>
{(allData.length!=0)? <>
{(allData.pendingOrderSum!=undefined)?
<>
{(allData.pendingOrderSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <> {item.total}</>:(item.total1)? <> {item.total1}</>:(item.total2)? <> {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""}



</div>
</div>


{/* total cod payments */}

<div className={anaylsis.chartSigle}>
<h5>Total Revenue Using COD Payments</h5>
<div className={anaylsis.chartARea}>
{/* */}
{(cod.length!=0)?<MultiBarChart datas={cod}/>  :" "}
</div>
<div className={anaylsis.allDatas}>
{(allData.length!=0)? <>
{(allData.codOrderSum!=undefined)?
<>
{(allData.codOrderSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <> ₹ {item.total}</>:(item.total1)? <> ₹ {item.total1}</>:(item.total2)? <> ₹ {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""}



</div>
</div>



{/* Number of cod payments */}

<div className={anaylsis.chartSigle}>
<h5>Total Number Of COD Payments</h5>
<div className={anaylsis.chartARea}>
{/* */}
{(codN.length!=0)?<MultiBarChart datas={codN}/>  :" "}
</div>
<div className={anaylsis.allDatas}>
{(allData.length!=0)? <>
{(allData.codOrderTotalSum!=undefined)?
<>
{(allData.codOrderTotalSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <> {item.total}</>:(item.total1)? <> {item.total1}</>:(item.total2)? <> {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""}



</div>
</div>



{/*number cod vs online */}
{/* 
 <div className={anaylsis.chartSigle}>
<h5>Number Of Revenue Generated using COD Vs ONLINE Payments</h5>
<div className={anaylsis.chartARea} style={{width:"100%",marginLeft:"0%"}}>

{(codO.length!=0)?<YearWiseBarChart datas={codO} years={codOY}/>  :" "}
</div>
 <div className={anaylsis.allDatas}>
{(allData.length!=0)? <>
{(allData.codOrderTotalSum!=undefined)?
<>
{(allData.codOrderTotalSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <> {item.total}</>:(item.total1)? <> {item.total1}</>:(item.total2)? <> {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""}
</div>
</div> */}




{/* revenue */}
{/* <div className={anaylsis.chartSigle}>
<h5>Number Of Revenue COD Vs ONLINE Payments</h5>
<div className={anaylsis.chartARea}>


</div>
<div className={anaylsis.allDatas}>
<li><div className={anaylsis.title}>Total In 2022 - </div><div className={anaylsis.datas}>  100000</div></li>
<li><div className={anaylsis.title}>Total In 2022 - </div><div className={anaylsis.datas}>  100000</div></li>
<li><div className={anaylsis.title}>Total In 2022 - </div><div className={anaylsis.datas}>  100000</div></li>

</div>
</div>  */}






</div>



</div>
        </div>   <ToastContainer
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

export default AnaylsisPayments;
