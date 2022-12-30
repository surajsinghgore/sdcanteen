import HeadTag from "../Components/Head";
import Styles from "../styles/admin.module.css";
import router from 'next/router'
import VerifyClientMiddleware from "./VerifyClientMiddleware";
import { useCart } from "react-use-cart";
import { useEffect } from "react";
export default function RedirectPageToOrderComplete() {
const { emptyCart } = useCart();
useEffect(()=>{
if(router.query.id!=""||router.query.id!=undefined){
emptyCart();
  localStorage.removeItem("OrderFoodTime");
  localStorage.removeItem("PickUpTime1");
 router.push("/OrderComplete")
}
})
 useEffect(() => {
        history.pushState(null, '', router.asPath);
        window.addEventListener('popstate', function (event) {
            history.pushState(null, '', router.asPath);
        });
    }, []);
useEffect(()=>{
router.push("/OrderComplete")
})
  return (
    <>
       <div className={Styles.admin}>
     <HeadTag title="Redirect Page" />
    <VerifyClientMiddleware />
  <h1>Please Do not refresh the page . Please wait for 10 seconds.......</h1>
   </div>      
    </>
  );
}
