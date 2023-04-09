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
import MultiBarChart1 from "../../Charts/MultiBarChart1";
import Top10Items from "../../Charts/Top10Items";

const AnaylsisOrder = () => {
const [progress, setProgress] = useState(0);
let date=new Date()
const [year,setYear]=useState(date.getFullYear())
const [year2,setYear2]=useState('no')
const [year3,setYear3]=useState('no')
const [allYears,setAllYears]=useState([])
const [allData,setAllData]=useState([])


const [allOrder,setAllOrder]=useState([])
const [comOrder,setComOrder]=useState([])
const [penOrder,setPenOrder]=useState([])
const [rejOrder,setRejOrder]=useState([])
const [itemRate,setItemRate]=useState([])
const [topFoodMon,setTopFoodMon]=useState([])


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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
// console.log(allData)
if(allData.totalOrder!=undefined){
let datasSet=[]
for(let i=0;i<allData.totalOrder.length;i++){
let s=allData.totalOrder[i].slice(-1)[0];
let newData=allData.totalOrder[i].slice(0,12)
if(i==0){ datasSet.push({label:s,data:newData,backgroundColor: "#1ba5e0"}) }
if(i==1){datasSet.push({label:s,data:newData,backgroundColor: "#eb0958"})}
if(i==2){datasSet.push({label:s,data:newData,backgroundColor: "#8d09eb"})}
}
setAllOrder(datasSet)
}
// complete
if(allData.totalOrderComplete!=undefined){
let datasSet=[]
for(let i=0;i<allData.totalOrderComplete.length;i++){
let s=allData.totalOrderComplete[i].slice(-1)[0];
let newData=allData.totalOrderComplete[i].slice(0,12)
if(i==0){ datasSet.push({label:s,data:newData,backgroundColor: "#1ba5e0"}) }
if(i==1){datasSet.push({label:s,data:newData,backgroundColor: "#eb0958"})}
if(i==2){datasSet.push({label:s,data:newData,backgroundColor: "#8d09eb"})}
}
setComOrder(datasSet)
}


// pending
if(allData.totalOrderPending!=undefined){
let datasSet=[]
for(let i=0;i<allData.totalOrderPending.length;i++){
let s=allData.totalOrderPending[i].slice(-1)[0];
let newData=allData.totalOrderPending[i].slice(0,12)
if(i==0){ datasSet.push({label:s,data:newData,backgroundColor: "#1ba5e0"}) }
if(i==1){datasSet.push({label:s,data:newData,backgroundColor: "#eb0958"})}
if(i==2){datasSet.push({label:s,data:newData,backgroundColor: "#8d09eb"})}
}
setPenOrder(datasSet)
}



// reject
if(allData.totalOrderReject!=undefined){
let datasSet=[]
for(let i=0;i<allData.totalOrderReject.length;i++){
let s=allData.totalOrderReject[i].slice(-1)[0];
let newData=allData.totalOrderReject[i].slice(0,12)
if(i==0){ datasSet.push({label:s,data:newData,backgroundColor: "#1ba5e0"}) }
if(i==1){datasSet.push({label:s,data:newData,backgroundColor: "#eb0958"})}
if(i==2){datasSet.push({label:s,data:newData,backgroundColor: "#8d09eb"})}
}
setRejOrder(datasSet)
}
// item rate overall
if(allData.allItemsTop!=undefined){


let datasSet=[]
for(let i=0;i<allData.allItemsTop.length;i++){
let Name=allData.allItemsTop[i].Name;
 datasSet.push({label:Name,data:allData.allItemsTop[i].Rate,backgroundColor: "#1ba5e0"}) 

}
setItemRate(datasSet)
}



// top food monthwise
if(allData.topFoodItemMontWise!=undefined){
let datasSet=[]
// [0] first year
for(let i=0;i<allData.topFoodItemMontWise[0].length;i++){
if(allData.topFoodItemMontWise[0][i][0]){

datasSet.push({label:`${allData.topFoodItemMontWise[0][i][0].Name[0]}`,data:allData.topFoodItemMontWise[0][i][0].count})
}
else{
datasSet.push({label:`No`,data:allData.topFoodItemMontWise[0][i].count})

}
console.log(datasSet)

// [1] second year


// [2] third year



}
setTopFoodMon(datasSet)





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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
const res=await fetch(`${HOST}/api/OrderAnaylsis`,{
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
        <AdminRightInnerHeader title="Anaylsis Orders" />
     
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
{/* total orders */}
<div className={anaylsis.chartSigle}>
<h5>Total Orders</h5>
<div className={anaylsis.chartARea}>
{(allOrder.length!=0) ? <MultiBarChart datas={allOrder}/>:""}
</div>
<div className={anaylsis.allDatas}>
{(allData.length!=0)? <>
{(allData.totalOrderSum!=undefined)?
<>
{(allData.totalOrderSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <>  {item.total}</>:(item.total1)? <>  {item.total1}</>:(item.total2)? <>  {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""}



</div>
</div>


{/* complete orders */}

<div className={anaylsis.chartSigle}>
<h5>Total Complete Orders</h5>
<div className={anaylsis.chartARea}>
{(allOrder.length!=0) ? <MultiBarChart datas={comOrder}/>:""}
</div>
<div className={anaylsis.allDatas}>
{(allData.length!=0)? <>
{(allData.totalOrderCompleteSum!=undefined)?
<>
{(allData.totalOrderCompleteSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <>  {item.total}</>:(item.total1)? <>  {item.total1}</>:(item.total2)? <>  {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""}



</div>
</div>


{/* reject orders */}
<div className={anaylsis.chartSigle}>
<h5>Total Reject Orders</h5>
<div className={anaylsis.chartARea}>
{(allOrder.length!=0) ? <MultiBarChart datas={rejOrder}/>:""}
</div>
<div className={anaylsis.allDatas}>
{(allData.length!=0)? <>
{(allData.totalOrderRejectSum!=undefined)?
<>
{(allData.totalOrderRejectSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <>  {item.total}</>:(item.total1)? <>  {item.total1}</>:(item.total2)? <>  {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""}



</div>
</div>



{/* pending orders */}
<div className={anaylsis.chartSigle}>
<h5>Total Pending Orders</h5>
<div className={anaylsis.chartARea}>
{(allOrder.length!=0) ? <MultiBarChart datas={penOrder}/>:""}
</div>
<div className={anaylsis.allDatas}>
{(allData.length!=0)? <>
{(allData.totalOrderPendingSum!=undefined)?
<>
{(allData.totalOrderPendingSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <>  {item.total}</>:(item.total1)? <>  {item.total1}</>:(item.total2)? <>  {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""}



</div>
</div>


{/* top 10 foodd items */}
<div className={anaylsis.chartSigle}>
<h5>Top 10 Most Ordered Food Items</h5>
<div className={anaylsis.chartARea}>
<Top10Items datas={topFoodMon}/>
{/* {(TopEar.length!=0) ? <MultiBarChart datas={TopEar}/>:""} */}
</div>
<div className={anaylsis.allDatas}>
{/* {(allData.length!=0)? <>
{(allData.TotalEarningSum!=undefined)?
<>
{(allData.TotalEarningSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <> ₹ {item.total}</>:(item.total1)? <> ₹ {item.total1}</>:(item.total2)? <> ₹ {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""} */}



</div>
</div>



{/* top 10 coffee items */}
<div className={anaylsis.chartSigle}>
<h5>Top 10 Most Ordered coffee Items</h5>
<div className={anaylsis.chartARea}>

{/* {(TopEar.length!=0) ? <MultiBarChart datas={TopEar}/>:""} */}
</div>
<div className={anaylsis.allDatas}>
{/* {(allData.length!=0)? <>
{(allData.TotalEarningSum!=undefined)?
<>
{(allData.TotalEarningSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <> ₹ {item.total}</>:(item.total1)? <> ₹ {item.total1}</>:(item.total2)? <> ₹ {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""} */}



</div>
</div>


{/* top 10 drink items */}
<div className={anaylsis.chartSigle}>
<h5>Top 10 Most Ordered drink Items</h5>
<div className={anaylsis.chartARea}>

{/* {(TopEar.length!=0) ? <MultiBarChart datas={TopEar}/>:""} */}
</div>
<div className={anaylsis.allDatas}>
{/* {(allData.length!=0)? <>
{(allData.TotalEarningSum!=undefined)?
<>
{(allData.TotalEarningSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <> ₹ {item.total}</>:(item.total1)? <> ₹ {item.total1}</>:(item.total2)? <> ₹ {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""} */}



</div>
</div>

{/* top 10 juice items */}
<div className={anaylsis.chartSigle}>
<h5>Top 10 Most Ordered juice Items</h5>
<div className={anaylsis.chartARea}>

{/* {(TopEar.length!=0) ? <MultiBarChart datas={TopEar}/>:""} */}
</div>
<div className={anaylsis.allDatas}>
{/* {(allData.length!=0)? <>
{(allData.TotalEarningSum!=undefined)?
<>
{(allData.TotalEarningSum.map((item,index)=>{
return <li key={index}><div className={anaylsis.title}>Total In {item.year} - </div><div className={anaylsis.datas}>{(item.total)? <> ₹ {item.total}</>:(item.total1)? <> ₹ {item.total1}</>:(item.total2)? <> ₹ {item.total2}</>:""}</div></li>
}))}
</>
:""}
</>:""} */}



</div>
</div>




{/* top 10 all items */}
<div className={anaylsis.chartSigle}>
<h5>Top 10 Most Rated Items All Times</h5>
<div className={anaylsis.chartARea1}>
{(itemRate.length!=0) ? <MultiBarChart1 datas={itemRate}/>:""}

</div>
<div className={anaylsis.allDatas}>
</div>
</div>



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

export default AnaylsisOrder;
