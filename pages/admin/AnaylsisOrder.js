import React, { useState, useContext } from "react";
import Styles from "../../styles/admin.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import VerifyAdminLogin from "./VerifyAdminLogin";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import StyleFood from "../../styles/AddFood.module.css";
import StyleRealtime from "../../styles/RealtimeOrder.module.css";
import { useEffect } from "react";
import ShowHideInRealtime from "../../Components/ShowHideInRealtime";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { AllContext } from "../../context/AllContext";
import { MdRefresh } from 'react-icons/md';
import BarChart from "../../Components/BarChat";

export default function AnaylsisOrder() {


  const { statesForRealtime } = useContext(AllContext);
  const [datas, setData] = useState([]);
  const [token, setToken] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [completeOrder, setCompleteOrder] = useState(0);
  const [pendingOrder, setPendingOrder] = useState(0);
  const [rejectOrder, setRejectOrder] = useState(0);
  const [notPickOrder, setNotPickOrder] = useState(0);
  const [allData, setAllData] = useState([]);
  const [rejectData, setRejectData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [completeData, setCompleteData] = useState([]);
  const [pickUpNotData, setPickUpNotData] = useState([]);
  const [rt,setRt]=useState(true)







  // fetch realtime data
  const fetchData = async () => {
    let ress = await fetch(`${HOST}/api/ShowOrdersRealtime`);
    let datass = await ress.json();
    if (datass.data != undefined) {
      //! pending Data Fetch
      let pendingRes = datass.data.filter((item) => {
        return item.OrderStatus.toLowerCase() == "pending";
      });
      setPendingOrder(pendingRes.length);
      setPendingData(pendingRes);
      if (localStorage.getItem("active") == "pending") {
        setData(pendingRes);
      }
      //! complete Data Fetch
      let completeRes = datass.data.filter((item) => {
        return item.OrderStatus.toLowerCase() == "complete";
      });
let sum=0;
datass.data.map((item) => {
           item.ItemsOrder.map((itm)=>{
         let pricess=parseInt(itm.AmountReceived)
          sum=sum+pricess;
          });
      });
setTotalPrice(sum)
      setCompleteOrder(completeRes.length);
      setCompleteData(completeRes);
      if (localStorage.getItem("active") == "complete") {
        setData(completeRes);
      }
      //! reject Data
      let rejectRes = datass.data.filter((item) => {
        return item.OrderStatus.toLowerCase() == "reject";
      });
      setRejectOrder(rejectRes.length);
      setRejectData(rejectRes);
      if (localStorage.getItem("active") == "reject") {
        setData(rejectRes);
      }
      //! not pickedup order
      let currentDate = new Date();
      let m = parseInt(currentDate.getMinutes());
      if (parseInt(m) <= 9) {
        m = "0" + m;
      }
      let t = currentDate.getHours() + "." + m;
      let time = parseFloat(t).toFixed(2);
      let pickupNotRes = datass.data.filter((x) => {
        return (
          x.OrderStatus.toLowerCase() == "pending" &&
          parseFloat(time) >= parseFloat(x.PickUpTime2)
        );
      });
      setPickUpNotData(pickupNotRes);
      setNotPickOrder(pickupNotRes.length);
      setTotalOrder(datass.data.length);
      setAllData(datass.data);
      if (localStorage.getItem("active") == "notpick") {
        setData(pickupNotRes);
      }
      if (
        localStorage.getItem("active") == "all" ||
        localStorage.getItem("active") == undefined
      ) {
        setData(datass.data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [statesForRealtime]);

 let date=new Date();
 useEffect(() => {
 let seconds=60-date.getSeconds();
 const changes=()=>{
    fetchData();
    setRt(!rt);
}
if(localStorage.getItem('active')=="pending"){
setInterval(changes,1000*seconds);
}
  }, [rt]);

  
  // filter using token
  const changingToken = (e) => {
    setToken(e.target.value);
    let namesId = document.getElementById("token").value.length;
    let value = document.getElementById("token").value;
    if (namesId == 0) {
      if (localStorage.getItem("active") == "pending") {
        setData(pendingData);
      } else if (localStorage.getItem("active") == "complete") {
        setData(completeData);
      } else if (localStorage.getItem("active") == "reject") {
        setData(rejectData);
      } else if (localStorage.getItem("active") == "notpick") {
        pickUpNotData;
      } else {
        setData(allData);
      }
    } else {
      let arr = [];
      if (localStorage.getItem("active") == "pending") {
        arr = pendingData;
      } else if (localStorage.getItem("active") == "complete") {
        arr = completeData;
      } else if (localStorage.getItem("active") == "reject") {
        arr = rejectData;
      } else if (localStorage.getItem("active") == "notpick") {
        arr = pickUpNotData;
      } else {
        arr = allData;
      }
      let aa = arr.filter((item) => {
        return item.TokenUser.toLowerCase().includes(value.toLowerCase());
      });
      setData(aa);
    }
  };

  // filter using curstomer name
  const changingName = (e) => {
    setCustomerName(e.target.value);
    let namesId = document.getElementById("names").value.length;
    let value = document.getElementById("names").value;
    if (namesId == 0) {
      if (localStorage.getItem("active") == "pending") {
        setData(pendingData);
      } else if (localStorage.getItem("active") == "complete") {
        setData(completeData);
      } else if (localStorage.getItem("active") == "reject") {
        setData(rejectData);
      } else if (localStorage.getItem("active") == "notpick") {
        setData(pickUpNotData);
      } else {
        setData(allData);
      }
    } else {
      let arr = [];
      if (localStorage.getItem("active") == "pending") {
        arr = pendingData;
      } else if (localStorage.getItem("active") == "complete") {
        arr = completeData;
      } else if (localStorage.getItem("active") == "reject") {
        arr = rejectData;
      } else if (localStorage.getItem("active") == "notpick") {
        arr = pickUpNotData;
      } else {
        arr = allData;
      }
      let aa = arr.filter((item) => {
        return item.FullName.toLowerCase().includes(value.toLowerCase());
      });
      setData(aa);
    }
  };

  // filter using time
  const changingTime = (e) => {
    setTime(e.target.value);
    let value = document.getElementById("time").value;
    if (value == "null") {
      if (localStorage.getItem("active") == "pending") {
        setData(pendingData);
      } else if (localStorage.getItem("active") == "complete") {
        setData(completeData);
      } else if (localStorage.getItem("active") == "reject") {
        setData(rejectData);
      } else if (localStorage.getItem("active") == "notpick") {
        setData(pickUpNotData);
      } else {
        setData(allData);
      }
    } else {
      let arr = [];
      if (localStorage.getItem("active") == "pending") {
        arr = pendingData;
      } else if (localStorage.getItem("active") == "complete") {
        arr = completeData;
      } else if (localStorage.getItem("active") == "reject") {
        arr = rejectData;
      } else if (localStorage.getItem("active") == "notpick") {
        arr = pickUpNotData;
      } else {
        arr = allData;
      }
      let aa = arr.filter((item) => {
        return item.PickUpTime.toLowerCase().includes(value.toLowerCase());
      });
      setData(aa);
    }
  };

  // filter using category
  const changingCategory = (e) => {
    setCategory(e.target.value);
    if(e.target.value=='null'){
    fetchData()
  
    }
    else{
 
    const fetchData=async()=>{
    let res=await fetch(`${HOST}/api/FilterOrderInRealTimePanelCategory?CategoryPrimary=${e.target.value}`)
    let dataRes=await res.json();
    if(res.status==201){
  setData(dataRes.data)
    }

    }

    fetchData();
       
    }
  };





  // fetch new data buy button
const newData=()=>{
fetchData();

}
  return (
    <div className={Styles.admin}>
      <HeadTag title="Realtime Order" />
      <VerifyAdminLogin />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}

      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Anaylsis Order" />

<div className={StyleRealtime.orders}>
          <h1>Filter Records</h1>
          <h5>This Month Collection : <span>₹ {totalPrice}</span></h5>

          {/*! search bar section */}
          <div className={StyleRealtime.searchBar2}>
            <select value={time} onChange={changingTime} name="time" id="time">
              <option value="null">Select Month...</option>
              <option value="8.00-Am">8.00 Am</option>
              
            </select>
            
            <select
              value={category}
              onChange={changingCategory}
              name="category"
              id="category"
            >
              <option value="null">Select Year..</option>
            
            </select>
          </div>
       
       <div className={StyleRealtime.charts}>
<BarChart />
</div>
       
          </div>
        

        
      </div>


    
    </div>
  );
}
