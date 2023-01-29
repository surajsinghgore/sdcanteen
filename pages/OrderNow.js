import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import order from "../styles/OrderNow.module.css";
import Link from 'next/link'
let ImagePath=process.env.NEXT_PUBLIC_IMAGESPACEPATH;
import Image from 'next/image'
let food = `${ImagePath}/ExtraImages/food.png`
let coffee = `${ImagePath}/ExtraImages/coffee.webp`
let drink = `${ImagePath}/ExtraImages/drink.webp`
import router from 'next/router'
let juice = `${ImagePath}/ExtraImages/juice.png`
export default function OrderNow() {
const foodRedirect=()=>{
router.push("/FoodItem")
}
const coffeeRedirect=()=>{
router.push("/CoffeeItem")

}
const drinkRedirect=()=>{
router.push("/DrinkItem")

}
const juiceRedirect=()=>{
router.push("/JuiceItem")

}
  return (
    <div>
    <div className={Styles.admin}>
      <HeadTag title="Order Now" />
   <Header />

  
    <div className={order.order}>
    <h1>Try our tasty Items</h1>
 
  
  <div className={order.cardSection}>
  
  <div className={order.food} onClick={foodRedirect}>
  <div className={order.imgs}>
  <Image src={food} alt="food" height="300" width="300" priority="true" />
  </div>
  <h1>Food Items</h1>
  </div>


  <div className={order.food} onClick={coffeeRedirect}>
  <div className={order.imgs}>
  <Image src={coffee} alt="food" height="300" width="300"priority="true" />
  </div>
  <h1>Coffee Items</h1>
  </div>


   <div className={order.food} onClick={juiceRedirect}>
  <div className={order.imgs} style={{paddingLeft:"5%",paddingTop:"4%",paddingBottom:"5%"}}>
  <Image src={juice} alt="food" height="270" width="260" priority="true" />
  </div>
  <h1 style={{paddingTop:"1%"}}>Juice Items</h1>
  </div>

 <div className={order.food} onClick={drinkRedirect}>
  <div className={order.imgs}>
  <Image src={drink} alt="food" height="300" width="300" priority="true" />
  </div>
  <h1>Drink Items</h1>
  </div>
  </div>   </div>
    </div>
   <Footer />
    </div>
  )
}
