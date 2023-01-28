import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide  } from "swiper/react";
let ImagePath=process.env.NEXT_PUBLIC_IMAGESPACEPATH;

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";



// import required modules
import { Autoplay,  Navigation } from "swiper";

let Img1 = `${ImagePath}/ExtraImages/1.jpg`;
let Img2 = `${ImagePath}/ExtraImages/2.jpg`;
let Img3 = `${ImagePath}/ExtraImages/c1.jpg`;
let Img4 = `${ImagePath}/ExtraImages/j1.jpg`;
let Img5 = `${ImagePath}/ExtraImages/d1.jpg`;
import Link from 'next/link';


function Carousel(){

 return(<>

 <Swiper
        spaceBetween={10}
        centeredSlides={true}
   slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
navigation={true}
        modules={[Autoplay,  Navigation]}
        id="mySwiper"

      >

        <SwiperSlide>
        <div className="div1">
<div className="imgs-section">
<Image src={Img1} alt="img1" height={559} width={1366}/>
</div>
<div className="details">
<h1 id="hh1">You can	&#39;t make everyone happy. You	&#39;re not pizza</h1>

<button><Link href="/FoodItem"> Order Food Now</Link></button>
</div>
</div>
        </SwiperSlide>


        <SwiperSlide>
        <div className="div1">
<div className="imgs-section">
<Image src={Img3} alt="img1" height={559} width={1366}/>
</div>
<div className="details">
<h1 id="hh1">I don	&#39;t drink coffee to wake up. I wake up to drink coffee.</h1>
<button><Link href="/CoffeeItem">Order Coffee Now</Link></button>
</div>
</div>
        </SwiperSlide>

        <SwiperSlide>
        <div className="div1">
<div className="imgs-section">
<Image src={Img4} alt="img1" height={559} width={1366}/>
</div>
<div className="details">
<h1 id="hh1">Breakfast isn	&#39;t complete without quality juice.</h1>
<button><Link href="/JuiceItem">Order Juice Now</Link></button>
</div>
</div>
        </SwiperSlide>


        <SwiperSlide>
        <div className="div1">
<div className="imgs-section">
<Image src={Img2} alt="img1" height={559} width={1366}/>
</div>
<div className="details">
<h1 id="hh1">After a good dinner one can forgive anybody, even one	&#39;s own relatives.</h1>
<button>Order Food Now</button>
</div>
</div>
        </SwiperSlide>

        <SwiperSlide>
        <div className="div1">
<div className="imgs-section">
<Image src={Img5} alt="img1" height={559} width={1366} priority="true"/>
</div>
<div className="details">
<h1 id="hh1">Since I had my first sip of coke, life was never the same again.</h1>
<button><Link href="/DrinkItem">Order Drink Now</Link></button>
</div>
</div>
        </SwiperSlide>


      </Swiper>

 </>)


 }
 
 export default Carousel