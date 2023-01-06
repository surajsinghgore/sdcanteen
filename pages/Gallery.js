import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import gallery from "../styles/Gallery.module.css";
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { BsArrowsFullscreen } from 'react-icons/bs';
import { useEffect,useState } from "react";

import GalleryData from "../Data/Gallery";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation ,Autoplay} from "swiper";

export default function Gallery() {
const [start,setStart]=useState(1);
const [fs,setFs]=useState(false);

const fullScreen=(number)=>{
setFs(true)
setStart(number-1)
}



useEffect(()=>{
console.log(GalleryData)
},[])
  return (
    <div>
    <div className={Styles.admin}>
      <HeadTag title="Gallery" />
   <Header />
</div>


 <div className={gallery.gallery}>
 <h1>Gallery Page</h1>
 <div className={gallery.main}>

 {(GalleryData.map((item)=>{
 return  <div className={gallery.card} key={item.countNumber}>
 <div className={gallery.fulls}>
 <div className={gallery.cont} title="Full Screen" onClick={()=>fullScreen(item.countNumber)}>
 <BsArrowsFullscreen className={gallery.iconsFull}/></div>
 
 </div>
 <div className={gallery.imgs}>
 <Image src={item.ImagePath} alt="img1" height={200} width={400} />
 </div>
 <div className={gallery.data}>
{item.title}
 </div>
 </div>
 }))}






 </div>
 </div>

{(fs)? 
<div className={gallery.full}>
<div className={gallery.blur}>
</div>
<div className={gallery.close} onClick={()=>setFs(false)} title="close">
x
</div>

<div className={gallery.mainDiv}>
      <Swiper
      initialSlide={start}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }} 
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation,Autoplay]}
         id="mySwiper1"
  
      >
{GalleryData.map((item,index)=>{
return <SwiperSlide key={index}>
           <div className={gallery.inner}>
           <div className={gallery.imageSection}>
           <Image src={item.ImagePath} width={960} height={450} alt="img"/>
           </div>
          <div className={gallery.ps}>
         {item.title}
          </div>
            </div></SwiperSlide>
})}
            



          
   
      </Swiper>
    </div>


</div>
:""}

   <Footer />
    </div>
  )
}
