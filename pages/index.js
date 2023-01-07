import Styles from "../styles/admin.module.css";
import home from "../styles/Home.module.css";
import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Carousel from "../Components/Carousel";
import Image from "next/image";
let HOST = process.env.NEXT_PUBLIC_API_URL;

// swiper bottom
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import im from '../public/FoodItemImages/2022-10-15T07-43-59.923Z-18.jpg'
import img1 from '../public/bottomBanner/1.jpg'
import img2 from '../public/bottomBanner/2.jpeg'
import img3 from '../public/bottomBanner/3.jpg'
import img4 from '../public/bottomBanner/4.webp'
import img5 from '../public/bottomBanner/5.png'
import img6 from '../public/bottomBanner/6.webp'
import img7 from '../public/bottomBanner/7.webp'
import img8 from '../public/bottomBanner/8.jpg'
import img9 from '../public/bottomBanner/9.jpg'
import img10 from '../public/bottomBanner/10.jpg'
import img11 from '../public/bottomBanner/11.jpg'
import img12 from '../public/bottomBanner/12.jpg'
import { useEffect ,useState} from "react";
import p1 from '../public/p1.png'
import p2 from '../public/p2.svg'
import { Autoplay } from "swiper";
import Loader from "../Components/Loader";

import Link from "next/link";
const Home = () => {
const [loader,setLoader]=useState(false);

const [topSearchData,setTopSearchData]=useState([])
const [topRateData,setTopRateData]=useState([])
const [visitor,setVisitor]=useState("")
const [happyClient,setHappyClient]=useState("")
const [totalItems,setTotalItems]=useState("")
const [allOrders,setAllOrders]=useState("")
useEffect(()=>{
const getAll=async()=>{
setLoader(true)
const res=await fetch(`${HOST}/api/HomePageAnaylsis`);
let HomeData=await res.json()
setLoader(false)
if(res.status==201){
console.log(HomeData)
setTopSearchData(HomeData.TopTrendingItems)
setTopRateData(HomeData.TopRatedFoodData)
setAllOrders(HomeData.orderDataCount)
setTotalItems(HomeData.allItemsCount)
setVisitor(HomeData.visitorDataCount)
setHappyClient(HomeData.HappyClients)
}
}
getAll()
},[])
  return (<>
<Loader loader={loader}/>

    <div className={Styles.admin}>
      <HeadTag title="Home" />
   <Header />

   {/* crousel */}
   <Carousel />

</div>

{/* cards */}

<div className={home.homeCards}>
<h1>Top 5 Trending Items of This Site</h1>
{(topSearchData.length!=0)?<>
{(topSearchData.map((items)=>{
return <div className={home.card} key={items._id}>
{/* foodName */}
{(items.FoodName)?<Link href={`/${items.FoodName}`}><a>
<div>
<div className={home.img}>
<Image src={`/FoodItemImages/${items.Image}`} alt="food" height={260} width={380} />
</div> 
<div className={home.data}>
<h4>{items.FoodName}</h4>
<p>{items.Description.substring(0,220)}</p>
</div>
</div></a></Link> :""}
{/* coffeeName */}
{(items.CoffeeName)?<Link href={`/${items.CoffeeName}`}><a>
<div>
<div className={home.img}>
<Image src={`/CoffeeItemImages/${items.Image}`} alt="food" height={260} width={380} />
</div> 
<div className={home.data}>
<h4>{items.CoffeeName}</h4>
<p>{items.Description.substring(0,220)}</p>
</div>
</div></a></Link> :""}

{/* juice */}

{(items.JuiceName)?<Link href={`/${items.JuiceName}`}><a>
<div>
<div className={home.img}>
<Image src={`/JuiceItemImages/${items.Image}`} alt="food" height={260} width={380} />
</div> 
<div className={home.data}>
<h4>{items.JuiceName}</h4>
<p>{items.Description.substring(0,220)}</p>
</div>
</div></a></Link> :""}

{/* drink */}
{(items.DrinkName)?<Link href={`/${items.DrinkName}`}><a>
<div>
<div className={home.img}>
<Image src={`/DrinkItemImages/${items.Image}`} alt="food" height={260} width={380} />
</div> 
<div className={home.data}>
<h4>{items.DrinkName}</h4>
<p>{items.Description.substring(0,220)}</p>
</div>
</div></a></Link> :""}

</div>
}))}
</>:""}




</div>

{/* payment accept design */}
<div className={home.payment}>
<div className={home.icons}>
<div className={home.img}>

<Image src={p2} alt="accept" layout="responsive"/>
</div>

</div>
<div className={home.titles}>
We Accept Online Payment
</div>
<div className={home.accecpt}>
<div className={home.img}>
<Image src={p1} alt="accept" layout="responsive"/>
</div>
</div>
</div>

{/* bottom crousel */}
<div className={home.bottomSwiper}>

 <Swiper
        slidesPerView={3}
        spaceBetween={-149}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
                       modules={[Autoplay]}
               className="mySwiper"
      >
        <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img1} alt="img1" layout="responsive"/>
        </div>
        </div>
        </SwiperSlide>
     <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img2} alt="img2" layout="responsive"/>
        </div>
        </div>
        </SwiperSlide>
           <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img3} alt="img3" layout="responsive"/>
        </div>
        </div>
        </SwiperSlide>

   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img4} alt="img4" layout="responsive"/>
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img5} alt="img5" layout="responsive"/>
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img6} alt="img6" layout="responsive"/>
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img7} alt="img7" layout="responsive"/>
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img8} alt="img8" layout="responsive"/>
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img9} alt="img9" layout="responsive"/>
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img10} alt="img10" layout="responsive"/>
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img11} alt="img11" layout="responsive"/>
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img12} alt="img12" layout="responsive"/>
        </div>
        </div>
        </SwiperSlide>





      </Swiper>


    </div>
   <Footer />
    </>
  );
};

export default Home;
