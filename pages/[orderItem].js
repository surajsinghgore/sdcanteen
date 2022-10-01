import { useRouter } from "next/router"
import { useState,useEffect } from "react";
import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import style from "../styles/SearchBar.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import Image from 'next/image';
import {  useCart } from "react-use-cart";

export default function OrderItem() {
 const {
    addItem ,
    removeItem,
      items,
  } = useCart();
  const [add,setAdd]=useState(true);
const [data,setData]=useState([]);
const router=useRouter();
const query=router.query.orderItem;
useEffect(()=>{
const FindDataUsingSearch=async()=>{
 const res = await fetch(`${HOST}/api/ShowSingleItem?item=${query}`);
 const dataRes=await res.json();
if(res.status==201){
await setData(dataRes.data)
}
}
FindDataUsingSearch();
},[query])

const AddToCart=(item)=>{
let id=item[0]._id;
let price=item[0].Price;
let Qty=item[0].Qty;
let Image=item[0].Image;
let Category=item[0].Category;
let QtyBook=1;
let totalAmount=item[0].Price;
let foodFind;
let coffeeFind;
let drinkFind;
let juiceFind;
for(let i=0;i<item.length;i++){
foodFind=data[i].FoodName;
coffeeFind=data[i].CoffeeName;
drinkFind=data[i].DrinkName;
juiceFind=data[i].JuiceName;
}
if(foodFind!=undefined){
let FoodName=item[0].FoodName;
addItem({id,price,FoodName,Qty,Image,Category,QtyBook,totalAmount})
 toast.success(`${FoodName} successfully added to cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}
if(coffeeFind!=undefined){
let CoffeeName=item[0].CoffeeName;
addItem({id,price,CoffeeName,Qty,Image,Category,QtyBook,totalAmount})
 toast.success(`${CoffeeName} successfully added to cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}
if(drinkFind!=undefined){
let DrinkName=item[0].DrinkName;
addItem({id,price,DrinkName,Qty,Image,Category,QtyBook,totalAmount})
 toast.success(`${DrinkName} successfully added to cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}
if(juiceFind!=undefined){
let JuiceName=item[0].JuiceName;
addItem({id,price,JuiceName,Qty,Image,Category,QtyBook,totalAmount})
 toast.success(`${JuiceName} successfully added to cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}

}
const RemoveFromCart=(item)=>{
if(item[0]!=undefined){
let id=item[0]._id;
removeItem(id);
 toast.error(`Item successfully removed from cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
setAdd(true);
}
}
// add and remove manage
useEffect(()=>{
setAdd(true)
items.map((itemm)=>{
if(data[0]!=undefined){
if(itemm.id==data[0]._id){
setAdd(false);
}
}
})
})
const BuyNow=(item)=>{
let id=item[0]._id;
let price=item[0].Price;
let Qty=item[0].Qty;
let Image=item[0].Image;
let Category=item[0].Category;
let QtyBook=1;
let totalAmount=item[0].Price;
let foodFind;
let coffeeFind;
let drinkFind;
let juiceFind;
for(let i=0;i<item.length;i++){
foodFind=data[i].FoodName;
coffeeFind=data[i].CoffeeName;
drinkFind=data[i].DrinkName;
juiceFind=data[i].JuiceName;
}
if(foodFind!=undefined){
let FoodName=item[0].FoodName;
addItem({id,price,FoodName,Qty,Image,Category,QtyBook,totalAmount})
 router.push("/Cart");
}
if(coffeeFind!=undefined){
let CoffeeName=item[0].CoffeeName;
addItem({id,price,CoffeeName,Qty,Image,Category,QtyBook,totalAmount})
 router.push("/Cart");

}
if(drinkFind!=undefined){
let DrinkName=item[0].DrinkName;
addItem({id,price,DrinkName,Qty,Image,Category,QtyBook,totalAmount})
 router.push("/Cart");

}
if(juiceFind!=undefined){
let JuiceName=item[0].JuiceName;
addItem({id,price,JuiceName,Qty,Image,Category,QtyBook,totalAmount})
 router.push("/Cart");

}

}
 function FilterCard(){
let foodFind;
let coffeeFind;
let drinkFind;
let juiceFind;

for(let i=0;i<data.length;i++){
foodFind=data[i].FoodName;
coffeeFind=data[i].CoffeeName;
drinkFind=data[i].DrinkName;
juiceFind=data[i].JuiceName;
}

// console.log(foodFind,coffeeFind,drinkFind,juiceFind)
if(foodFind!=undefined){
return(<>
 <div className={style.left}> 
   <Image src={`/FoodItemImages/${data[0].Image}`} alt="image" width={"480px"} height={"400px"} objectFit='cover'/>
     </div>
 <div className={style.right}>    
<h1>{data[0].FoodName}</h1>
   <h3>₹ {data[0].Price}</h3>
   <hr />
   <h4>Qty: {data[0].Qty}</h4>
   <h5>Category: {data[0].Category}</h5>
{(!add)?
   <button className={style.btn3} onClick={()=>RemoveFromCart(data)}>Remove From Cart</button>
    :
   <button className={style.btn1} onClick={()=>AddToCart(data)}>Add To Cart</button>
   
    }
   <button className={style.btn2} onClick={()=>BuyNow(data)}>Buy Now</button>
    </div>
    </>
    )
}
else if(coffeeFind!=undefined){
return(
<>
<div className={style.left}> 
   <img src={`/CoffeeItemImages/${data[0].Image}`} alt="image" className={style.coffeImage} />
     </div>
 <div className={style.right}>    
<h1>{data[0].CoffeeName}</h1>
   <h3>₹ {data[0].Price}</h3>
   <hr />
   <h4>Qty: {data[0].Qty}</h4>
   <h5>Category: {data[0].Category}</h5>
  {(!add)?
   <button className={style.btn3} onClick={()=>RemoveFromCart(data)}>Remove From Cart</button>
    :
   <button className={style.btn1} onClick={()=>AddToCart(data)}>Add To Cart</button>
   
    }
   <button className={style.btn2} onClick={()=>BuyNow(data)}>Buy Now</button>
    </div>
    </>)
}
else if(drinkFind!=undefined){
return(
<>
<div className={style.left}> 
   <img src={`/DrinkItemImages/${data[0].Image}`} alt="image" className={style.drinkImage} />
     </div>
 <div className={style.right}>    
<h1>{data[0].DrinkName}</h1>
   <h3>₹ {data[0].Price}</h3>
   <hr />
   <h4>Qty: {data[0].Qty}</h4>
   <h5>Category: {data[0].Category}</h5>
 {(!add)?
   <button className={style.btn3} onClick={()=>RemoveFromCart(data)}>Remove From Cart</button>
    :
   <button className={style.btn1} onClick={()=>AddToCart(data)}>Add To Cart</button>
   
    }
   <button className={style.btn2} onClick={()=>BuyNow(data)}>Buy Now</button>
    </div>
   </>)
}
else if(juiceFind!=undefined){
return(
<>
<div className={style.left}> 
   <img src={`/JuiceItemImages/${data[0].Image}`} alt="image" className={style.juiceImage}/>
     </div>
 <div className={style.right}>    
<h1>{data[0].JuiceName}</h1>
   <h3>₹ {data[0].Price}</h3>
   <hr />
   <h4>Qty: {data[0].Qty}</h4>
   <h5>Category: {data[0].Category}</h5>
   {(!add)?
   <button className={style.btn3} onClick={()=>RemoveFromCart(data)}>Remove From Cart</button>
    :
   <button className={style.btn1} onClick={()=>AddToCart(data)}>Add To Cart</button>
   
    }
   <button className={style.btn2} onClick={()=>BuyNow(data)}>Buy Now</button>
    </div>
   </>
   )
}

}

  return (
      <>
      <div className={Styles.admin}>
        <HeadTag title="Search Item" />
        <Header />
      </div>
    
   <div className={style.searchSection}>
   {/* top section */}
   <div className={style.topSection}>
  <FilterCard />

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


  )
}
