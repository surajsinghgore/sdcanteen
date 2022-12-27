import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import style from "../styles/SearchBar.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { Rating } from "react-simple-star-rating";
import { AllContext } from "../context/AllContext";
import { useContext } from "react";
export default function RateItem({productIds}) {
  const { userData ,refresh,setRefresh} = useContext(AllContext);
  // item rate manage
  const [itemRate, setItemRate] = useState(0);
  const [serviceRate, setServiceRate] = useState(0);
  const [qualityRate, setQualityRate] = useState(0);
  const [priceRate, setPriceRate] = useState(0);
const [userName,setUserName]=useState("");
const [userMessage,setUserMessage]=useState("");
  const handleItemRate = (rate) => setItemRate(rate);
  const handleServiceRate = (rate) => setServiceRate(rate);
  const handlePriceRate = (rate) => setPriceRate(rate);
  const handleQualityRate = (rate) => setQualityRate(rate);
// testing purpose
useEffect(()=>{
if(userData.data!=undefined){
setUserName(userData.data.FullName);
}
},[])


const submitRating=async(e)=>{

e.preventDefault();
let productId=productIds;
if(userName==""){
 toast.error('Please Login with clinet Id', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
}
if(userMessage==""){
toast.warn('Please Enter Something in Message', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
}
if(qualityRate==0){
toast.warn('Please Give Quality Rating ', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
}
if(serviceRate==0){
toast.warn('Please Give Service Rating ', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
}
if(priceRate==0){
toast.warn('Please Give Price Rating ', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
}
if(productId==""){
toast.warn('Please Give Product Id', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
}
if(itemRate==0){
toast.warn('Please Give OverAll Rating ', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
}

const res = await fetch(`${HOST}/api/RatingItems`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userName:userName,productId:productId,userMessage:userMessage,serviceRate:serviceRate,qualityRate:qualityRate,priceRate:priceRate,overallRate:itemRate
      }),
    });
let data=await res.json();
if(res.status==501){
toast.error('Internal Server Error.Please try Again', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
if(res.status==401){
toast.warn(`${data.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
if(res.status==498){
toast.warn(`${data.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
if(res.status==400){
toast.warn(`${data.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
if(res.status==403){
toast.warn(`${data.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return ;
}
if(res.status==201){
setRefresh(!refresh)
   window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
toast.success("Thanks For Giving Valuable Fedback for This Item", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

let rates=0;
setItemRate(rates) 
setUserMessage("")
return ;
}
}
 

  return (
    <>
        <div className={style.clientReview}>
                <h1>Leave feedback about this Coffee for others</h1>

                <form>
                  <input type="text" placeholder="Client Name" value={userName} readOnly />
                  <textarea
                    name="message"
                    value={userMessage}
                    onChange={(e)=>setUserMessage(e.target.value)}
                    placeholder="Write Your Reviews*"
                  ></textarea>

                  {/* Quality Rate */}
                  <div className={style.rateSection}>
                    {" "}
                    <h2>Quality Rate of Item: </h2>
                    <div className={style.rateClient}>
                      <Rating
                        initialValue={qualityRate}
                        allowFraction="true"
                        showTooltip
                        onClick={handleQualityRate}
                        tooltipClassName={style.tool}
                        className={style.sizesofStar}
                        transition
                      />
                    </div>
                  </div>

                  {/* service rate */}
                  <div className={style.rateSection}>
                    {" "}
                    <h2>Service Rate: </h2>
                    <div className={style.rateClient}>
                      <Rating
                        initialValue={serviceRate}
                        allowFraction="true"
                        showTooltip
                        onClick={handleServiceRate}
                        tooltipClassName={style.tool}
                        className={style.sizesofStar}
                        transition
                      />
                    </div>
                  </div>
                  {/* price rate */}
                  <div className={style.rateSection}>
                    {" "}
                    <h2>Price Rate of Item: </h2>
                    <div className={style.rateClient}>
                      <Rating
                        initialValue={priceRate}
                        allowFraction="true"
                        showTooltip
                        onClick={handlePriceRate}
                        tooltipClassName={style.tool}
                        className={style.sizesofStar}
                        transition
                      />
                    </div>
                  </div>

                  {/* rate Item */}
                  <div className={style.rateSection}>
                    {" "}
                    <h2>Overall Rate of Item: </h2>
                    <div className={style.rateClient}>
                      <Rating
                        initialValue={itemRate}
                        allowFraction="true"
                        showTooltip
                        onClick={handleItemRate}
                        tooltipClassName={style.tool}
                        className={style.sizesofStar}
                        transition
                      />
                    </div>
                  </div>
                </form>
                <button onClick={submitRating}>Submit Review</button>
              </div>
    </>
  );
}
