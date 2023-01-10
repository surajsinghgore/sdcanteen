import React, { useEffect,useState } from "react";
import Styles from "../../styles/admin.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import VerifyAdminLogin from './VerifyAdminLogin';
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import StyleFood from "../../styles/AddFood.module.css";
import anaylsis from "../../styles/Anaylsis.module.css";
import MonthWiseLineChart from "../../Charts/MonthWiseLineChart";
import PieChartBrowser from "../../Charts/PieChartBrowser";
import MonthWiseBar from "../../Charts/MonthWiseBar";
import TopItems from "../../Charts/TopItems";

let HOST = process.env.NEXT_PUBLIC_API_URL;

let date=new Date()
const Admin = () => {
const [year,setYear]=useState(date.getFullYear())
const [allYears,setAllYears]=useState([])
const [allVisitorMonthWise,setAllVisitorMonthWise]=useState([])
const [allVisitorMonthWiseLen,setAllVisitorMonthWiseLen]=useState('0')
const [broswerData,setBrowserData]=useState([])
const [broswerDataLen,setBrowserDataLen]=useState('0')
const [allOrderMonthWise,setAllOrderMonthWise]=useState([])
const [allOrderMonthWiseLen,setAllOrderMonthWiseLen]=useState('0')
const [allMonthWiseCollection,setAllMonthWiseCollection]=useState([])
const [allMonthWiseCollectionLen,setAllMonthWiseCollectionLen]=useState('0')
const [allClientsData,setAllClientsData]=useState([])
const [allClientsDataLen,setAllClientsDataLen]=useState('0')
const [drink,setDrink]=useState([])
const [food,setFood]=useState([])
const [coffee,setCoffee]=useState([])
const [juice,setJuice]=useState([])
// fetching unique years for select box to filter details
useEffect(()=>{
const getAllYears=async()=>{
const res=await fetch(`${HOST}/api/GetUniqueYears`);
const data=await res.json()
if(res.status==200){
setAllYears(data.year)
}
}

getAllYears()
},[])

useEffect(()=>{
const getAllYears=async()=>{
const res=await fetch(`${HOST}/api/HomeAdminAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({Year:year})
});
const data=await res.json()
console.log(data)
if(res.status==200){
// all monthwise data gets
if(data.AllVisitorMonthWise){
setAllVisitorMonthWise(data.AllVisitorMonthWise)
setAllVisitorMonthWiseLen(data.AllVisitorMonthWiseLen)
}
// browser details
if(data.AllBrowser){
setBrowserData(data.AllBrowser)
setBrowserDataLen(data.AllBrowserLen)
}
// monthwise orders
if(data.AllOrderMonthWise){
setAllOrderMonthWise(data.AllOrderMonthWise)
setAllOrderMonthWiseLen(data.AllOrderMonthWiseLen)
}
// monthwise collection
if(data.AllMonthWiseCollection){
setAllMonthWiseCollection(data.AllMonthWiseCollection)
setAllMonthWiseCollectionLen(data.AllMonthWiseCollectionLen)

}
if(data.AllClientData){
setAllClientsData(data.AllClientData)
setAllClientsDataLen(data.AllClientDataLen)
}
if(data.TopFoodItems){
setFood(data.TopFoodItems)
}
if(data.TopCoffeeItems){
setCoffee(data.TopCoffeeItems)
}
if(data.TopJuiceItems){
setJuice(data.TopJuiceItems)
}
if(data.TopDrinkItems){
setDrink(data.TopDrinkItems)
}
}
}

getAllYears()
},[])


const changeDataAnaylsis=async(e)=>{
setYear(e.target.value)

const res=await fetch(`${HOST}/api/HomeAdminAnaylsis`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({Year:e.target.value})
});
const data=await res.json()
console.log(data)
if(res.status==200){
// all monthwise data gets
if(data.AllVisitorMonthWise){
setAllVisitorMonthWise(data.AllVisitorMonthWise)
setAllVisitorMonthWiseLen(data.AllVisitorMonthWiseLen)
}
// browser details
if(data.AllBrowser){
setBrowserData(data.AllBrowser)
setBrowserDataLen(data.AllBrowserLen)
}
// monthwise orders
if(data.AllOrderMonthWise){
setAllOrderMonthWise(data.AllOrderMonthWise)
setAllOrderMonthWiseLen(data.AllOrderMonthWiseLen)
}
// monthwise collection
if(data.AllMonthWiseCollection){
setAllMonthWiseCollection(data.AllMonthWiseCollection)
setAllMonthWiseCollectionLen(data.AllMonthWiseCollectionLen)

}
if(data.AllClientData){
setAllClientsData(data.AllClientData)
setAllClientsDataLen(data.AllClientDataLen)
}
if(data.TopFoodItems){
setFood(data.TopFoodItems)
}
if(data.TopCoffeeItems){
setCoffee(data.TopCoffeeItems)
}
if(data.TopJuiceItems){
setJuice(data.TopJuiceItems)
}
if(data.TopDrinkItems){
setDrink(data.TopDrinkItems)
}}
}

  return (
    <div className={Styles.admin}>
      <HeadTag title="Admin" />
<VerifyAdminLogin />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}

      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Admin Dashboard" />
     <div className={anaylsis.allAnaylsis}>
     {/* filter year */}
<div className={anaylsis.filter}>
<select name="year" value={year} onChange={changeDataAnaylsis}>
{(allYears.length!=0)?<>
{(allYears.map((item,index)=>{
return <option value={item} key={index}>{item}</option>
}))}
</>
:""}
</select>
</div>
     
{/* chartjs */}
{/* 1 . Mothwise website visites */}
     <div className={anaylsis.charjs}>
     <h4>Monthwise Website Visits <span>Total: {allVisitorMonthWiseLen}</span></h4>
     <div className={anaylsis.chart}>
    <MonthWiseLineChart montwisedata={allVisitorMonthWise} years={year} labels={`Visits In ${year}`}/>
     </div>
     </div>
{/* browser used */}
    <div className={anaylsis.charjs}>
     <h4>Browser Used To Access Sd Website In {year} <span>Total: {broswerDataLen}</span></h4>
     <div className={anaylsis.chartPie}>
    <PieChartBrowser browserData={broswerData} years={year}/>
     </div>
     </div>

{/* total order */}
         <div className={anaylsis.charjs}>
     <h4>Total Orders Placed In {year}  <span>Total : {allOrderMonthWiseLen}</span></h4>
     <div className={anaylsis.chart}>
    <MonthWiseBar browserData={allOrderMonthWise} labels={`Order Placed In Year ${year}`} />
     </div>
     </div>

{/* area chart */}
      <div className={anaylsis.charjs}>
     <h4>Total Earning In {year}  <span>Total ₹: {allMonthWiseCollectionLen}</span></h4>
     <div className={anaylsis.chart}>
    <MonthWiseBar browserData={allMonthWiseCollection} labels={`Earning In Year ${year}`} />
     </div>
     </div>


{/* all Clients data */}
<div className={anaylsis.charjs}>
     <h4>Monthwise New Clients Register <span>Total: {allClientsDataLen}</span></h4>
     <div className={anaylsis.chart}>
    <MonthWiseLineChart montwisedata={allClientsData} years={year} labels={`New User's In ${year}`}/>
     </div>
     </div>

{/* food */}
  <div className={anaylsis.charjs}>
     <h4>Top 10 Most Ordered Food In {year} <span>Total: 10</span></h4>
     <div className={anaylsis.chartPie}>
    <TopItems allData={food} tag={`Food Item In ${year}`}/>
     </div>
     </div>

{/* coffe */}
 <div className={anaylsis.charjs}>
     <h4>Top 10 Most Ordered Coffee In {year} <span>Total: 10</span></h4>
     <div className={anaylsis.chartPie}>
    <TopItems allData={coffee} tag={`Coffee Item In ${year}`}/>
     </div>
     </div>

{/* juice */}
 <div className={anaylsis.charjs}>
     <h4>Top 10 Most Ordered Juice In {year} <span>Total: 10</span></h4>
     <div className={anaylsis.chartPie}>
    <TopItems allData={juice} tag={`Juice Item In ${year}`}/>
     </div>
     </div>
{/* drink */}
 <div className={anaylsis.charjs}>
     <h4>Top 10 Most Ordered Drink In {year} <span>Total: 10</span></h4>
     <div className={anaylsis.chartPie}>
    <TopItems allData={drink} tag={`Drink Item In ${year}`}/>
     </div>
     </div>

     </div>

        </div>
    </div>
  );
};

export default Admin;
