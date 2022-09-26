import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import CartStyle from "../styles/Cart.module.css";
import Styles from "../styles/admin.module.css";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from 'next/router'
import VerifyClientMiddleware from "./VerifyClientMiddleware";
import { useEffect,useState } from "react";
import Style1 from "../styles/OrderDetails.module.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { useCart } from "react-use-cart";
export default function PaymentMethod() {
const [OrderFoodTime,setOrderFoodTime]=useState();
const {

    emptyCart 
  } = useCart()

useEffect(()=>{
if(!localStorage.getItem('OrderFoodTime')){
router.push('/OrderDetails');
}
setOrderFoodTime(localStorage.getItem('OrderFoodTime'));
},[])

useEffect(()=>{

},[])

const InitaitePayment=()=>{

let value=document.querySelector("input[type='radio'][name=payment]:checked").value;
if(value=="COD"){
confirmAlert({
      title: "Confirm To Placed Order ?",
      message: "Order can't cancelled Onced Placed ",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {


const id=localStorage.getItem("clientId");
const clientToken=localStorage.getItem("clientToken");
const PickUpTime=localStorage.getItem("OrderFoodTime");
const items=localStorage.getItem("react-use-cart");
let cartData=JSON.parse(items)
const PaymentMethod=value;
let array=[];
for(let i=0;i<cartData.items.length;i++){
let ItemName;

if(cartData.items[i].FoodName){
 ItemName=cartData.items[i].FoodName;
}
if(cartData.items[i].JuiceName){
 ItemName=cartData.items[i].JuiceName;
}
if(cartData.items[i].CoffeeName){
ItemName=cartData.items[i].CoffeeName;
}
if(cartData.items[i].DrinkName){
ItemName =cartData.items[i].DrinkName;

}   
      const Qty=parseInt(cartData.items[i].QtyBook);
      const Amount=parseInt(cartData.items[i].totalAmount);
      const ProductOriginalAmount=parseInt(cartData.items[i].price);
      const Category=cartData.items[i].Category;
      array.push({ItemName,Qty,Amount,Category,ProductOriginalAmount})  
}
      let sum=0;
for (let i = 0; i < cartData.items.length; i++) {
    let number=parseInt(cartData.items[i].totalAmount)
    sum+=number;
}
const TotalAmount=sum;
     let res = await fetch(`${HOST}/api/OrderItem`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                clienttoken: clientToken,
              },
              body: JSON.stringify({
                _id: id,
               PickUpTime,PaymentMethod,ItemsOrder:array,TotalAmount
              }),
            });

            let data = await res.json();
 if (data.status == "501") {
              toast.error(`${data.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return 0;
            }
              if (data.status == "404") {
              toast.warn(`${data.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return 0;
            }
            if(data.status=="201"){
            emptyCart();
            localStorage.removeItem('OrderFoodTime')
            localStorage.setItem("orderToken",data.tokenUser);
              toast.success("Order Successfully Placed", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
   const pushToCompleteOrder=()=>{
        router.push('/OrderComplete');
        }
          setTimeout(pushToCompleteOrder,1500);


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

}


  return (
    <>
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
              <div className={CartStyle.circle}>
                1
              </div>
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
              <div className={`${CartStyle.circle} ${CartStyle.circle1}`}>3 </div>
              <div className={CartStyle.discription}>
                <p> PAYMENT METHOD </p>
              </div>
            </div>
          </div>
        </div>





{/* cart List */}
<div className={CartStyle.cartItem}>
<div className={CartStyle.cartTable}>
<h4 style={{textAlign:"center",fontSize:"30px",color:"red"}}>Note-: Order Can't Cancelled Once Placed.</h4>
<h3 style={{paddingLeft:"4%",fontSize:"30px"}}>Select Payment Mode</h3>
<div className={Style1.payment}>
<form>
<div className={Style1.div}>
 <input type="radio" name="payment" id="Online" 
value="Online" defaultChecked /><label htmlFor="Online" style={{cursor:"pointer"}}> <h4>: Online Payment</h4></label>
</div>
<div className={Style1.div}>
 <input type="radio" name="payment" id="cod" 
value="COD" /><label htmlFor="cod" style={{cursor:"pointer"}}><h4>: Cash On Delivery</h4></label>
</div>
</form>
</div>
</div>


<div className={CartStyle.bottom}>
<Link href="/OrderDetails"><button className={CartStyle.more} style={{width:"300px"}}>Update Pickup Time</button></Link>
<div className={CartStyle.subtotal}>

{ (OrderFoodTime!="")? <button style={{marginTop:"4.4%",marginRight:"5%",height:"50px"}} onClick={InitaitePayment} >Placed Order</button>:
<button style={{marginTop:"4.4%",marginRight:"5%",height:"50px"}} disabled>Placed Order</button>
}

</div>
</div>

</div>
      </div>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
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
