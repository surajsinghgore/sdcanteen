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
import Img3 from '../public/3.jpg';
import Img4 from '../public/4.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css'; 


function Carousel(){
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

// setTimeout(enables,1000);
// function enables(){
// document.getElementById('hh1').style.animation="example 1s ease-in";
// document.getElementById('hh1').style.transform="translateX(0%)";
// document.getElementById('btnh1').style.animation="example 1s ease-in";
// document.getElementById('btnh1').style.transform="translateX(0%)";
// }



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
      thumbs={{ swiper: thumbsSwiper }}
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
      {/* <p>Current slide is {swiperSlide.isActive ? 'active' : 'not active'}</p> */}
 </>)


 }
 
 export default Carousel