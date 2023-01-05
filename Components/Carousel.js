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
<h1 id="hh1">After a good dinner one can forgive anybody, even one's own relations.</h1>
<button id="btnh1">Order Food Now</button>
</div>
</div>
        </SwiperSlide>


        <SwiperSlide>
        <div className="div1">
<div className="imgs-section">
<Image src={Img2} alt="img1" height={559} width={1366}/>
</div>
<div className="details">
<h1 id="hh1">After a good dinner one can forgive anybody, even one's own relations.</h1>
<button id="btnh1">Order Food Now</button>
</div>
</div>
        </SwiperSlide>
      </Swiper>

 </>)


 }
 
 export default Carousel