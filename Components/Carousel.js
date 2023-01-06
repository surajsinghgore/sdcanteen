import Image from 'next/image';
import React, {useEffect ,useState} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide  } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";



// import required modules
import { Autoplay,  Navigation } from "swiper";

import Img1 from '../public/1.jpg';
import Img2 from '../public/2.jpg';
import Img3 from '../public/c1.jpg';
import Img4 from '../public/j1.jpg';
import Img5 from '../public/d1.jpg';
import Link from 'next/link';


function Carousel(){

 return(<>

 <Swiper
        spaceBetween={10}
        centeredSlides={true}
   slidesPerView={1}
        autoplay={{
          delay: 2500,
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
<Image src={Img5} alt="img1" height={559} width={1366}/>
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