import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide  } from "swiper/react";
let ImagePath=process.env.NEXT_PUBLIC_IMAGESPACEPATH;

import useNextBlurhash from "use-next-blurhash";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";



// import required modules
import { Autoplay,  Navigation } from "swiper";

let Img1 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014248/1_awcnfk.jpg`;
let Img2 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014249/2_gksqma.jpg`;
let Img3 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014251/c1_emtkwo.jpg`;
let Img4 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014245/j1_rgqtri.jpg`;
let Img5 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014243/d1_fplyr9.jpg`;
import Link from 'next/link';


function Carousel(){
const [blurDataUrl1] = useNextBlurhash("LHIWo+~WxbtkWAIVs9XR0L9aE2Io");
const [blurDataUrl2] = useNextBlurhash("L7F|xd^j035n01;f67Ip04EL~9kp");
const [blurDataUrl3] = useNextBlurhash("LBBM6]01k8?H~A57%1%29txtxaNF");
const [blurDataUrl4] = useNextBlurhash("LuKJ1[NMRkkC9*W?aKWYtDs.bdj@");
const [blurDataUrl5] = useNextBlurhash("LBEvvV0i66=J2t{},sS|0i}qSeWX");
 return(<>

 <Swiper
        spaceBetween={10}
        centeredSlides
   slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
navigation
        modules={[Autoplay,  Navigation]}
        id="mySwiper"

      >

        <SwiperSlide>
        <div className="div1">
<div className="imgs-section">
                              
<Image src={Img1} alt="img1" height={700} width={1400}  blurDataURL={blurDataUrl1} placeholder="blur" priority/>
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
<Image src={Img3} alt="img1" height={700} width={1400}  blurDataURL={blurDataUrl3} placeholder="blur" priority/>
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
<Image src={Img4} alt="img1" height={700} width={1400}  blurDataURL={blurDataUrl4} placeholder="blur" priority/>
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
<Image src={Img2} alt="img1" height={700} width={1400}  blurDataURL={blurDataUrl2} placeholder="blur" priority/>
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
<Image src={Img5} alt="img1" height={700} width={1400}  blurDataURL={blurDataUrl5} placeholder="blur" priority />
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