import Styles from "../styles/admin.module.css";
import home from "../styles/Home.module.css";
import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Carousel from "../Components/Carousel";
import Image from "next/image";

// swiper bottom
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
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
import p1 from '../public/p1.png'
import p2 from '../public/p2.svg'
import { Autoplay } from "swiper";
const Home = () => {
  return (<>
    <div className={Styles.admin}>
      <HeadTag title="Home" />
   <Header />

   {/* crousel */}
   <Carousel />

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
