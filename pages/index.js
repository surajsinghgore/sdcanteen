import Styles from "../styles/admin.module.css";
import home from "../styles/Home.module.css";
import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import useNextBlurhash from "use-next-blurhash";
let ImagePath=process.env.NEXT_PUBLIC_IMAGESPACEPATH;
import Carousel from "../Components/Carousel";
import Image from "next/image";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import CountUp from 'react-countup'
import ScrollTrigger from "react-scroll-trigger";
// swiper bottom
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
let img1 = `${ImagePath}/bottomBanner/1.jpg`
let img2 = `${ImagePath}/bottomBanner/2.jpeg`
let img3 = `${ImagePath}/bottomBanner/3.jpg`
let img4 = `${ImagePath}/bottomBanner/4.webp`
let img5 = `${ImagePath}/bottomBanner/5.png`
let img6 = `${ImagePath}/bottomBanner/6.webp`
let img7 = `${ImagePath}/bottomBanner/7.webp`
let img8 = `${ImagePath}/bottomBanner/8.jpg`
let img9 = `${ImagePath}/bottomBanner/9.jpg`
let img10 = `${ImagePath}/bottomBanner/10.jpg`
let img11 = `${ImagePath}/bottomBanner/11.jpg`
let img12 = `${ImagePath}/bottomBanner/12.jpg`
import { useEffect ,useState} from "react";
let p1 = `${ImagePath}/ExtraImages/p1.png`
let p2 = `${ImagePath}/ExtraImages/p2.svg`
import { Autoplay } from "swiper";
import Loader from "../Components/Loader";
import { BiFoodMenu } from 'react-icons/bi';
import { BiHappy } from 'react-icons/bi';
import { RiNumbersFill } from 'react-icons/ri';
import { MdOutlineAccountBox } from 'react-icons/md';

import Link from "next/link";
const Home = () => {


const [blurDataUrl1] = useNextBlurhash("LnPsFhNfyYs+-?t7sle.yZRjMxax");
const [blurDataUrl2] = useNextBlurhash("LiM?I~WB-;Rj~qoeNKoJK7kCVss:");
const [blurDataUrl3] = useNextBlurhash("LWLC-4jGJArq}?NFX5xYBpnhw]WA");
const [blurDataUrl4] = useNextBlurhash("LGFp]MKj1J+^|t5-K4}X0~J7}s=x");
const [blurDataUrl5] = useNextBlurhash("LAOwoy~9#m=x-AID9et69LI=%1kD");
const [blurDataUrl6] = useNextBlurhash("L8GH@#ITx80f1n4nZ|OY02%3IE^j");
const [blurDataUrl7] = useNextBlurhash("LCOdHst~QU-mLJH[#S~AL,0P,H}X");
const [blurDataUrl8] = useNextBlurhash("LMKJ#$?J.9L0]M$,ogFwc[$kt6Na");
const [blurDataUrl9] = useNextBlurhash("LEG8y3RPR[ou~pslx^J8B.sC$jJ6");
const [blurDataUrl10] = useNextBlurhash("LTH-JI~UNyEL-:t6M|smo%o#WXxZ");
const [blurDataUrl11] = useNextBlurhash("LnPY^+?vtSW??va#aKV@yZRiV@sR");
const [blurDataUrl12] = useNextBlurhash("LMJ7%XjFKkpx%LnNk?s;PqWBivw[");
const [blurDataUrl13] = useNextBlurhash("LRRV^Pj[%hxao#M|V@t6_MNGMdoe");
const [blurDataUrl14] = useNextBlurhash("LJQA29J7?b=y-pD%oz%g~VR6IUpI");


const [countOn,setCountOn]=useState(false)
const [loader,setLoader]=useState(false);
const [topSearchData,setTopSearchData]=useState([])
const [topRateData,setTopRateData]=useState([])
const [visitor,setVisitor]=useState("")
const [happyClient,setHappyClient]=useState("")
const [totalItems,setTotalItems]=useState("")
const [allOrders,setAllOrders]=useState("")
useEffect(()=>{
const getAll=async()=>{

const res=await fetch(`${HOST}/api/HomePageAnaylsis`);
let HomeData=await res.json()

if(res.status==201){
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
<h1>Top Trending Foods </h1>
{(topSearchData.length!=0)?<>
{(topSearchData.map((items)=>{
return <div className={home.card} key={items._id}>
{/* foodName */}
{(items.FoodName)?<Link href={`/${items.FoodName}`}><a>
<div>
<div className={home.img}>
<Image src={`${ImagePath}/${items.Image}`} alt="food" height={260} width={380} />
</div> 
<div className={home.data}>
<h4>{items.FoodName}</h4>
<p>{items.Description.substring(0,220)}</p>
</div>
</div></a></Link> :""}


</div>
}))}
</>:""}




</div>
{/* top rated items */}
<div className={home.homeCards}>
<h1> Best Rated Foods </h1>
{(topRateData.length!=0)?<>
{(topRateData.map((items)=>{
return <div className={home.card} key={items._id}>
{/* foodName */}
{(items.FoodName)?<Link href={`/${items.FoodName}`}><a>
<div>
<div className={home.img}>
<Image src={`${ImagePath}/${items.Image}`} alt="food" height={260} width={380} />
</div> 
<div className={home.data}>
<h4>{items.FoodName}</h4>
<p>{items.Description.substring(0,220)}</p>
</div>
</div></a></Link> :""}


</div>
}))}
</>:""}




</div>


{/* facts */}
<div className={home.f}> 
<h1> FUN FACTS </h1>
</div>
<ScrollTrigger onEnter={()=>setCountOn(true)} onExit={()=>setCountOn(false)}>

<div className={home.facts}>


<div className={home.fact}>
<div className={home.icons}>
<BiFoodMenu/>
</div>
<h5>Delicacy Of Items</h5>
<p>{(countOn)&&<CountUp start={0} end={totalItems} duration={2}/>}</p>
</div>

<div className={home.fact}>
<div className={home.icons}>
<MdOutlineAccountBox/>
</div>
<h5>Total Visits </h5>
<p>{(countOn)&&<CountUp start={0} end={visitor} duration={2}/>}</p>
</div>

<div className={home.fact}>
<div className={home.icons}>
<RiNumbersFill/>
</div>
<h5>Orders Placed</h5>
<p>{(countOn)&&<CountUp start={0} end={allOrders} duration={2}/>}</p>
</div>


<div className={home.fact}>
<div className={home.icons}>
<BiHappy/>
</div>
<h5> Happy clients</h5>
<p> {(countOn)&&<CountUp start={0} end={happyClient} duration={2}/>}</p>
</div>


</div>
</ScrollTrigger>
{/* payment accept design */}
<div className={home.payment}>
<div className={home.icons}>
<div className={home.img}>

<Image src={p2} alt="accept"  height={260} width={380}   blurDataURL={blurDataUrl14} placeholder="blur" priority="true"/>
</div>

</div>
<div className={home.titles}>
We Accept Online Payment
</div>
<div className={home.accecpt}>
<div className={home.img}>
<Image src={p1} alt="accept"  height={260} width={380}  blurDataURL={blurDataUrl13} placeholder="blur" priority="true"/>
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
        <Image src={img1} alt="img1" layout="fill"  blurDataURL={blurDataUrl1} placeholder="blur"  />
        </div>
        </div>
        </SwiperSlide>
     <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img2} alt="img2" layout="fill"  blurDataURL={blurDataUrl2} placeholder="blur" />
        </div>
        </div>
        </SwiperSlide>
           <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img3} alt="img3" layout="fill"  blurDataURL={blurDataUrl3} placeholder="blur" />
        </div>
        </div>
        </SwiperSlide>

   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img4} alt="img4" layout="fill"  blurDataURL={blurDataUrl4} placeholder="blur" />
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img5} alt="img5" layout="fill" blurDataURL={blurDataUrl5} placeholder="blur"  />
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img6} alt="img6" layout="fill"  blurDataURL={blurDataUrl6} placeholder="blur" />
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img7} alt="img7" layout="fill" blurDataURL={blurDataUrl7} placeholder="blur"  />
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img8} alt="img8" layout="fill"  blurDataURL={blurDataUrl8} placeholder="blur" />
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img9} alt="img9" layout="fill"  blurDataURL={blurDataUrl9} placeholder="blur" />
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img10} alt="img10" layout="fill"  blurDataURL={blurDataUrl10} placeholder="blur" />
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img11} alt="img11" layout="fill"  blurDataURL={blurDataUrl11} placeholder="blur" />
        </div>
        </div>
        </SwiperSlide>
   <SwiperSlide>
        <div className={home.BottomInner}>
        <div className={home.imageBottom}>
        <Image src={img12} alt="img12" layout="fill" blurDataURL={blurDataUrl12} placeholder="blur"  />
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
