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
import router from "next/router";
import { MdRefresh } from 'react-icons/md';
import Loader from "../../Components/Loader";

export default function RealtimeOrder() {
 const [loader,setLoader]=useState(true);
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
  setLoader(true)
    let ress = await fetch(`${HOST}/api/ShowOrdersRealtime`);
    let datass = await ress.json();
    setLoader(false)

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
    setLoader(true)

    let res=await fetch(`${HOST}/api/FilterOrderInRealTimePanelCategory?CategoryPrimary=${e.target.value}`)
    let dataRes=await res.json();setLoader(false)

    if(res.status==201){
  setData(dataRes.data)
    }

    }

    fetchData();
       
    }
  };


  // filter using anayalsis

  const allDatasFunction = () => {
    localStorage.setItem("active", "all");
    setData(allData);
    setToken("");
    setCustomerName("");
    setCategory("");
    setTime("");
    router.push("/admin/RealtimeOrder");
  };

  const completeFunction = () => {
    localStorage.setItem("active", "complete");
    setData(completeData);
    setToken("");
    setCustomerName("");
    setCategory("");
    setTime("");
    router.push("/admin/RealtimeOrder");
  };
  const pendingFunction = () => {
    localStorage.setItem("active", "pending");
    setData(pendingData);
    setToken("");
    setCustomerName("");
    setCategory("");
    setTime("");
    router.push("/admin/RealtimeOrder");
  };
  const rejectFunction = () => {
    localStorage.setItem("active", "reject");
    setData(rejectData);
    setToken("");
    setCustomerName("");
    setCategory("");
    setTime("");
    router.push("/admin/RealtimeOrder");
  };
  const notpickFunction = () => {
    localStorage.setItem("active", "notpick");
    setData(pickUpNotData);
    setToken("");
    setCustomerName("");
    setCategory("");
    setTime("");
    router.push("/admin/RealtimeOrder");
  };

  // fetch new data buy button
const newData=()=>{
fetchData();

}
  return (
    <div className={Styles.admin}>  <Loader loader={loader}/>
      <HeadTag title="Realtime Order" />
      <VerifyAdminLogin />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}

      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Realtime Order Panel" />

        <div className={StyleRealtime.orders}>
          <h1>Filter Records</h1>
          <h5>Todays Collection : <span>₹ {totalPrice}</span></h5>

          {/*! search bar section */}
          <div className={StyleRealtime.searchBar}>
            <input
              type="search"
              name="token"
              value={token}
              placeholder="Search Token Id ..."
              onChange={changingToken}
              id="token"
            />
            <input
              type="search"
              name="curstomername"
              value={customerName}
              placeholder="Search Customer Name..."
              onChange={changingName}
              id="names"
            />
            <select value={time} onChange={changingTime} name="time" id="time">
              <option value="null">Search Time Slot...</option>
              <option value="8.00-Am">8.00 Am</option>
              <option value="8.15-Am">8.15 Am</option>
              <option value="8.30-Am">8.30 Am</option>
              <option value="8.45-Am">8.45 Am</option>
              <option value="9.00-AM">9.00 Am</option>
              <option value="9.15-AM">9.15 Am</option>
              <option value="9.30-AM">9.30 Am</option>
              <option value="9.45-AM">9.45 Am</option>
              <option value="10.00-Am">10.00 Am</option>
              <option value="10.15-Am">10.15 Am</option>
              <option value="10.30-Am">10.30 Am</option>
              <option value="10.45-Am">10.45 Am</option>
              <option value="11.00-Am">11.00 Am</option>
              <option value="11.15-Am">11.15 Am</option>
              <option value="11.30-Am">11.30 Am</option>
              <option value="11.45-Am">11.45 Am</option>
              <option value="12.00-Pm">12.00 Pm</option>
              <option value="12.15-Pm">12.15 Pm</option>
              <option value="12.30-Pm">12.30 Pm</option>
              <option value="12.45-Pm">12.45 Pm</option>
              <option value="1.00-Pm">1.00 Pm</option>
              <option value="1.15-Pm">1.15 Pm</option>
              <option value="1.30-Pm">1.30 Pm</option>
              <option value="1.45-Pm">1.45 Pm</option>
              <option value="2.00-Pm">2.00 Pm</option>
              <option value="2.15-Pm">2.15 Pm</option>
              <option value="2.30-Pm">2.30 Pm</option>
              <option value="2.45-Pm">2.45 Pm</option>
              <option value="3.00-Pm">3.00 Pm</option>
              <option value="3.15-Pm">3.15 Pm</option>
              <option value="3.30-Pm">3.30 Pm</option>
              <option value="3.45-Pm">3.45 Pm</option>
              <option value="4.00-Pm">4.00 Pm</option>
              <option value="4.15-Pm">4.15 Pm</option>
              <option value="4.30-Pm">4.30 Pm</option>
              <option value="4.45-Pm">4.45 Pm</option>
              <option value="5.00-Pm">5.00 Pm</option>
              <option value="5.15-Pm">5.15 Pm</option>
              <option value="5.30-Pm">5.30 Pm</option>
              <option value="5.45-Pm">5.45 Pm</option>
              <option value="6.00-Pm">6.00 Pm</option>
            </select>
            <select
              value={category}
              onChange={changingCategory}
              name="category"
              id="category"
            >
              <option value="null">Select Category..</option>
              <option value="foodcategory">Food Category</option>
              <option value="coffeecategory">Coffee Category</option>
              <option value="drinkcategory">Drink Category</option>
              <option value="juicecategory">Juice Category</option>
            </select>
          </div>

          {/* analysis section */}
          <div className={StyleRealtime.analysis}>
            <div className={StyleRealtime.div1} onClick={allDatasFunction}>
              Total Orders : {totalOrder}
            </div>
            <div className={StyleRealtime.div2} onClick={completeFunction}>
              Complete Orders: {completeOrder}
            </div>
            <div className={StyleRealtime.div3} onClick={pendingFunction}>
              Pending Orders: {pendingOrder}
            </div>
            <div className={StyleRealtime.div4} onClick={rejectFunction}>
              Reject Orders : {rejectOrder}
            </div>
            <div className={StyleRealtime.div5} onClick={notpickFunction}>
              Orders Not On Time: {notPickOrder}
            </div>
          </div>

          <div className={StyleRealtime.tables_section}>
            {/* .pen .con .rej */}

            {datas != 0 ? (
              <div>
                {datas.map((item) => {
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
                      <div className={StyleRealtime.contain}>
                        <div className={StyleRealtime.tableheaddata}>
                          <div className={StyleRealtime.div1}>
                            {item.TokenUser}
                          </div>
                          <div className={StyleRealtime.div2}>
                            {item.FullName}
                          </div>
                          <div className={StyleRealtime.div3}>
                            {item.PickUpTime}
                          </div>
                          <div className={StyleRealtime.div4}>
                            {item.TotalAmount}
                          </div>
                          <div className={StyleRealtime.div5}>
                            {item.PaymentMethod}
                          </div>
                          <div className={StyleRealtime.div6}>{item.Email}</div>
                          <div className={StyleRealtime.div7}>
                            {item.Mobile}
                          </div>
                        </div>
                        {/* sub data */}
                        {/* heading */}
                        <div className={StyleRealtime.tableheadingsub}>
                          <div className={StyleRealtime.div1}>Item Name</div>
                          <div className={StyleRealtime.div2}>
                            Product Price
                          </div>
                          <div className={StyleRealtime.div3}>Qty</div>
                          <div className={StyleRealtime.div4}>Category</div>
                          <div className={StyleRealtime.div5}>Total Amount</div>
                          <div className={StyleRealtime.div6}>
                            Amount Received
                          </div>
                          <div className={StyleRealtime.div7}>Order Status</div>
                          <div className={StyleRealtime.div8}>Action</div>
                        </div>
                     
                          <ShowHideInRealtime item={item.ItemsOrder} key={item._id} />
                      
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <h6>No Orders Found</h6>
            )}
          </div>
        </div>
      </div>


      <div className={Styles.refresh} onClick={newData}>
      <MdRefresh className={Styles.icon}  />
      </div>
    </div>
  );
}
