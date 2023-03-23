import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import CartStyle from "../styles/Cart.module.css";
import Styles from "../styles/admin.module.css";
import Link from "next/link";
var randtoken = require('rand-token');
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader";
import router from "next/router";
import VerifyClientMiddleware from "./VerifyClientMiddleware";
import { useEffect, useState } from "react";
import Style1 from "../styles/OrderDetails.module.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { useCart } from "react-use-cart";
import LoadingBar from "react-top-loading-bar";
import Head from "next/head";
import Script from "next/script";
export default function PaymentMethod() {
const [loader,setLoader]=useState(false);
  const [totals, setTotal] = useState("0");
  const [checkCod, setCheckCod] = useState(true);
 const [progress, setProgress] = useState(0);
  const [arrays, setArrays] = useState([]);
  const [carts, setCarts] = useState([]);
  const [OrderFoodTime, setOrderFoodTime] = useState();
  const { emptyCart, updateItem } = useCart();

const tempringSave=async()=>{
    setLoader(true)
    setCarts(JSON.parse(localStorage.getItem("react-use-cart")));
      const items = localStorage.getItem("react-use-cart");
      let cartData = JSON.parse(items);
      let sum = 0;
let datatemp = await fetch(`${HOST}/api/CheckItemTempering`, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                data:cartData
                }),
              });
let Datas=await datatemp.json();
if(datatemp.status==201){
 setArrays(Datas.data)
sum=Datas.sum
}
for(let i=0;i<arrays.length;i++){
for(let j=0;j<cartData.items.length;j++){
if(cartData.items[j].id==arrays[i].id){
 updateItem(cartData.items[j].id, {
                  QtyBook: arrays[i].Qty,
                  price: arrays[i].ProductOriginalAmount,
                  totalAmount: ( arrays[i].ProductOriginalAmount)*( arrays[i].Qty),
                });
}
}
}
  setLoader(false)
      setTotal(sum);
}


  useEffect(() => {

tempringSave();
    
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("OrderFoodTime")) {
      router.push("/Cart");
    }
    setOrderFoodTime(localStorage.getItem("OrderFoodTime"));
  }, []);


// cod enable disable logic
  useEffect(()=>{

  const check=async()=>{
  const res=await fetch(`${HOST}/api/CodEnableCheck`)
  if(res.status==400){
  setCheckCod(false);
  }
  }
  if(localStorage.getItem('login')!=undefined){
  check();
  
  }
  },[])

  const InitaitePayment = () => {
  tempringSave();
    let value = document.querySelector(
      "input[type='radio'][name=payment]:checked"
    ).value;


// online payment
if(value == "Online"){


confirmAlert({
        title: "Confirm To Placed Order Using Online Payment ?",
        message: "Order can't cancelled Onced Placed ",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {

 
let d=new Date();
var token = randtoken.generate(15)+d.getDate()+d.getMonth()+d.getFullYear();
const TokenId=token;
 let TxnToken;
  if(TotalAmount==0){
   toast.warn(     "Amount Not Zero",
                  {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
              
return;

  }
 const PickUpTime = localStorage.getItem("OrderFoodTime");
              const PaymentMethod = value;
              if (totals <= 0) {
                emptyCart();
                toast.warn(
                  "Tempering Is Not Allowed In Cart,Plese Add Item Again",
                  {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );

                const pushToCompleteOrder = () => {
                  router.push("/");
                };
                setTimeout(pushToCompleteOrder, 1500);
                return;
              }
              if (arrays.length == 0 || arrays == undefined || arrays == "") {
                emptyCart();
                toast.warn(
                  "Tempering Is Not Allowed In Cart,Plese Add Item Again",
                  {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
                const pushToCompleteOrder = () => {
                  router.push("/");
                };
                setTimeout(pushToCompleteOrder, 1500);
                return;
              }
              const TotalAmount = totals;
              const PickUpTime1 = localStorage.getItem("PickUpTime1");

const InitiatePayment=async()=>{
setProgress(20)
// get token for transcation
         

let ress = await fetch(`${HOST}/api/PreTransaction`, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                amount:TotalAmount,orderId:TokenId, PickUpTime,
                  PickUpTime1,
                  PaymentMethod,
                  ItemsOrder: arrays,
                  TotalAmount,
                }),
              });

setProgress(40)
              let datas=await ress.json();
             
              if(datas.body.extraParamsMap===null){
                  toast.error(
                  "Payment Portal is under maintenance",
                  {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
               setProgress(100)
                return ;

              }
              TxnToken=datas.body.txnToken;
         
setProgress(60);

        var config = {
         "root": "",
         "flow": "DEFAULT",
         "data": {
          "orderId": TokenId,
          "token": TxnToken,
          "tokenType": "TXN_TOKEN",
          "amount":TotalAmount
         },
         "handler": {
            "notifyMerchant": function(eventName,data){
              
            } 
          }
        };
setProgress(80);

window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
setProgress(100);
  
window.Paytm.CheckoutJS.invoke();
}).catch(function onError(error){
console.log("error => ",error);
});


   
}

InitiatePayment();

            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });







}

    if (value == "COD") {
      confirmAlert({
        title: "Confirm To Placed Order ?",
        message: "Order can't cancelled Onced Placed ",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              const PickUpTime = localStorage.getItem("OrderFoodTime");
              const PaymentMethod = value;
              if (totals <= 0) {
             
                emptyCart();
                toast.warn(
                  "Tempering Is Not Allowed In Cart,Plese Add Item Again",
                  {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );

                const pushToCompleteOrder = () => {
                  router.push("/Cart");
                };
                setTimeout(pushToCompleteOrder, 1500);
                return;
              }
              if (arrays.length == 0 || arrays == undefined || arrays == "") {
                emptyCart();
            
                toast.warn(
                  "Tempering Is Not Allowed In Cart,Plese Add Item Again",
                  {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
                const pushToCompleteOrder = () => {
                  router.push("/Cart");
                };
                setTimeout(pushToCompleteOrder, 1500);
                return;
              }
              const TotalAmount = totals;
setProgress(40)

              const PickUpTime1 = localStorage.getItem("PickUpTime1");
              let res = await fetch(`${HOST}/api/OrderItem`, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  PickUpTime,
                  PickUpTime1,
                  PaymentMethod,
                  ItemsOrder: arrays,
                  TotalAmount,
                }),
              });

              let data = await res.json();
              if (data.status == "501") {
                toast.error(`${data.message}`, {
                  position: "bottom-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
setProgress(100)

                return;
              }
              if (data.status == "404") {
                toast.warn(`${data.message}`, {
                  position: "bottom-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
setProgress(100)

                return;
              }
              if (data.status == "201") {
                emptyCart();
                localStorage.removeItem("OrderFoodTime");
                localStorage.removeItem("itemOrder");
                localStorage.removeItem("PickUpTime1");
                toast.success("Order Successfully Placed", {
                  position: "bottom-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
setProgress(100)


                const pushToCompleteOrder = () => {
                  router.push("/OrderComplete");
                };
                setTimeout(pushToCompleteOrder, 1500);
              }
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    }
  };

  return (
    <>
<Loader loader={loader}/>
 <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={1000}
        progress={progress}
        transitionTime={100}
      />  
    {/* 1.0 */}
    <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
    </Head>

    {/* 1.1 */}
   
    <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`} crossorigin="anonymous"></Script>

      <VerifyClientMiddleware />
      <div className={Styles.admin}>
        <HeadTag title="Payment Method" />
        <Header />
      </div>
      {/* cart */}
      <div className={CartStyle.cart}>
        <h1> Payment Method</h1>
        <div className={CartStyle.progress}>
          <hr />

          <div className={CartStyle.number}>
            <div className={CartStyle.num1}>
              <div className={CartStyle.circle}>1</div>
              <div className={CartStyle.discription}>
                <p> SHOPPING CART </p>
              </div>
            </div>
          </div>

          <div className={CartStyle.number}>
            <div className={CartStyle.num1}>
              <div className={CartStyle.circle}>2 </div>
              <div className={CartStyle.discription}>
                <p> ORDER DETAILS </p>
              </div>
            </div>
          </div>

          <div className={CartStyle.number}>
            <div className={CartStyle.num1}>
              <div className={`${CartStyle.circle} ${CartStyle.circle1}`}>
                3{" "}
              </div>
              <div className={CartStyle.discription}>
                <p> PAYMENT METHOD </p>
              </div>
            </div>
          </div>
        </div>

        {/* cart List */}
        <div className={CartStyle.cartItem}>
          <div className={CartStyle.cartTable}>
            <h4 style={{ textAlign: "center", fontSize: "30px", color: "red" }}>
              Note-: Order Can&#39;t Cancelled Once Placed.
            </h4>
            <h3 style={{ paddingLeft: "4%", fontSize: "30px" }}>
              Select Payment Mode
            </h3>
            <div className={Style1.payment}>
              <form>
                <div className={Style1.div}>
                  <input
                    type="radio"
                    name="payment"
                    id="Online"
                    value="Online"
                    defaultChecked
                  />
                  <label htmlFor="Online" style={{ cursor: "pointer" }}>
                    {" "}
                    <h4>: Online Payment</h4>
                  </label>
                </div>
                
                {(checkCod)? <div className={Style1.div}>
                  <input type="radio" name="payment" id="cod" value="COD" />
                  <label htmlFor="cod" style={{ cursor: "pointer" }}>
                    <h4>: Cash On Delivery</h4>
                  </label>
                </div>: " "}
               


              </form>
            </div>
            <h4
              style={{
                textAlign: "center",
                fontSize: "30px",
                color: "black",
                marginTop: "-0%",
              }}
            >
              Total Payable Amount-:{" "}
              <span style={{ color: "red" }}>{totals}</span>
            </h4>
            {carts.length != 0 ? (
              <>
                <h4
                  style={{
                    textAlign: "center",
                    fontSize: "25px",
                    color: "black",
                  }}
                >
                  Total Items Booked-:{" "}
                  <span style={{ color: "red" }}>{carts.items.length}</span>{" "}
                  <span style={{ color: "blue", paddingLeft: "15%" }}>
                    {" "}
                    <Link href="/Cart">Click to view items List</Link>
                  </span>
                </h4>
              </>
            ) : (
              ""
            )}
          </div>

          <div className={CartStyle.bottom}>
            <Link href="/OrderDetails">
              <button className={CartStyle.more} style={{ width: "300px" }}>
                Update Pickup Time
              </button>
            </Link>
            <div className={CartStyle.subtotal}>
              {OrderFoodTime != "" ? (
                <button
                  style={{
                    marginTop: "4.4%",
                    marginRight: "5%",
                    height: "50px",
                  }}
                  onClick={InitaitePayment}
                >
                  Placed Order
                </button>
              ) : (
                <button
                  style={{
                    marginTop: "4.4%",
                    marginRight: "5%",
                    height: "50px",
                  }}
                  disabled
                >
                  Placed Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

     
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
