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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
export default function AllOrders() {
  // const { statesForRealtime } = useContext(AllContext);
  const [placeHolders, setPlaceHolders] = useState('Search...');
  const [category, setCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
const [tag,setTag]=useState('all')
 const [data,setData]=useState([]);
const [progress, setProgress] = useState(0);
const fetchAllData=async()=>{

 setProgress(40)
let data=await fetch(`${HOST}/api/ShowAllOrders?tag=all&search=${""}`);
let resData=await data.json();
 setProgress(100)
if(data.status==201){
setData(resData.data)
}
}

 useEffect(()=>{
 fetchAllData();
 },[])
// manage category
const manageCategory=async(e)=>{
setCategory(e.target.value)
setSearchInput('')
if(e.target.value=='all'){
setPlaceHolders('Search');
setTag('all');
fetchAllData();
}

if(e.target.value=='token'){setPlaceHolders('Enter 6 Digit Token eg [xxxxxx] ')
setTag('TokenUser');
}

if(e.target.value=='clinetname'){setPlaceHolders('Enter Client Full Name eg [s----- -----]')
setTag('FullName')
}
if(e.target.value=='clinetemail'){setPlaceHolders('Enter Client Email Address eg [---@fg.com]')
setTag('Email')
}
if(e.target.value=='clinetphone'){setPlaceHolders('Enter Client 10 Digit Phone Number eg [91---------]')
setTag('Mobile')
}
if(e.target.value=='fulldate'){setPlaceHolders('Enter Order\'s Full Date eg [--.--.----]')
setTag('OrderDate')
}
if(e.target.value=='fulltime'){setPlaceHolders('Enter Order\'s Full Time   eg [10.11-am]')
setTag('PickUpTime')
}
if(e.target.value=='paymentmethod'){setPlaceHolders('Enter Payment Method eg [complete]')
setTag('PaymentMethod')
}
if(e.target.value=='productname'){setPlaceHolders('Enter Item Name eg [maggi]')
setTag('ItemName')
}
if(e.target.value=='productcategory'){setPlaceHolders('Enter Item Category eg [foodcategory]')
setTag('CategoryPrimary')
}
if(e.target.value=='orderstatus'){setPlaceHolders('Enter Order\' Status eg [pending]')
setTag('OrderStatus')
}
if(e.target.value=='totalamount'){setPlaceHolders('Enter Order Total Amount eg [100]')
setTag('TotalAmount')
}

}


const manageSearch=async(e)=>{
setSearchInput(e.target.value)
if(tag=='all'){
toast.warn('Please Select Category from Dropdown Menu', {
      position: "bottom-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setSearchInput('')
    return ;
}

let data=await fetch(`${HOST}/api/ShowAllOrders?tag=${tag}&search=${e.target.value}`);
let resData=await data.json();
if(data.status==201){
setData([]);
setData(resData.data)
}
}
  return (
    <div className={Styles.admin}>
     <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  
      <HeadTag title="All Orders" />
      <VerifyAdminLogin />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}

      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="All Orders Details" />

        <div className={StyleRealtime.orders}>
         <h1>Filter Records</h1>
          <h5>Total Orders : <span>{(data.length!=0)? data.length:"0"}</span></h5>
          <div className={StyleRealtime.searchBar1}>
            <select name="time" id="time" value={category} onChange={(e)=>manageCategory(e)}>
              <option value="all">All Records</option>
              <option value="token">Search Using Client Token</option>
              <option value="clinetname">Search Using Client Name</option>
              <option value="clinetemail">Search Using Client Email Address</option>
              <option value="clinetphone">Search Using Client Phone Number</option>
              <option value="fulldate">Search Using Full Date</option>
              <option value="fulltime">Search Using Full Time</option>
              <option value="paymentmethod">Search Using Payment Method</option>
              <option value="productname">Search Using Product Name</option>
              <option value="productcategory">Search Using Product Category</option>
              <option value="orderstatus">Search Using Order Status</option>
              <option value="totalamount">Search Using Total Amount</option>
            </select>
           <input type="search" placeholder={placeHolders} value={searchInput} onChange={(e)=>manageSearch(e)}/>
          </div>


      <div className={StyleRealtime.tables_section}>
            {/* .pen .con .rej */}

            {data != 0 ? (
              <div>
                {data.map((item) => {
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
}
