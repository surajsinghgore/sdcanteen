import dynamic from 'next/dynamic'
const Styles = dynamic(() => import('../styles/admin.module.css'))
// const home = dynamic(() => import('../styles/Home.module.css'))
import home from "../styles/Home.module.css";

const HeadTag = dynamic(() => import('../Components/Head'))
const Header = dynamic(() => import('../Components/Header'))
const Footer = dynamic(() => import('../Components/Footer'))
const Carousel = dynamic(() => import('../Components/Carousel'))

import useNextBlurhash from "use-next-blurhash";
import Image from "next/image";

// swiper bottom
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
let img1 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014800/1_gwamyw.jpg`;
let img2 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014801/2_ws3au4.jpg`;
let img3 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014800/3_vmdw99.jpg`;
let img4 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014801/4_v3h2fj.webp`;
let img5 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014802/5_wwh9i7.png`;
let img6 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014802/6_weopcm.webp`;
let img7 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014807/7_vul7ru.webp`;
let img8 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014801/8_rydkxc.jpg`;
let img9 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014802/9_nqr95e.jpg`;
let img10 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014800/10_aopxta.jpg`;
let img11 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014800/11_ufuqlf.jpg`;
let img12 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014801/12_wlbp1e.jpg`;

let p1 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014245/p1_pvhtmu.png`;
let p2 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014246/p2_g5k0gk.svg`;
import { Autoplay } from "swiper";
import TopFoodItems from '../Components/TopFoodItems';




const Home = ({HomeData}) => {
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

  // fetching facts
  
  return (
    <>
         <div className={Styles.admin}>
        <HeadTag title="Home" />
        <Header />

        {/* crousel */}
        <Carousel />
      </div>


<TopFoodItems HomeData={HomeData}/>






      {/* payment accept design */}
      <div className={home.payment}>
        <div className={home.icons}>
          <div className={home.img}>
            <Image
              src={p2}
              alt="accept"
              height={260}
              width={380}
              blurDataURL={blurDataUrl14}
              placeholder="blur"
              priority
            />
          </div>
        </div>
        <div className={home.titles}>We Accept Online Payment</div>
        <div className={home.accecpt}>
          <div className={home.img}>
            <Image
              src={p1}
              alt="accept"
              height={260}
              width={380}
              blurDataURL={blurDataUrl13}
              placeholder="blur"
              priority
            />
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
                <Image
                  src={img1}
                  alt="img1"
                  layout="fill"
                  blurDataURL={blurDataUrl1}
                  placeholder="blur"
                   priority
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={home.BottomInner}>
              <div className={home.imageBottom}>
                <Image
                  src={img2}
                  alt="img2"
                  layout="fill"
                  blurDataURL={blurDataUrl2}
                  placeholder="blur"
                  priority
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={home.BottomInner}>
              <div className={home.imageBottom}>
                <Image
                  src={img3}
                  alt="img3"
                  layout="fill"
                  blurDataURL={blurDataUrl3}
                  placeholder="blur"
                   priority
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={home.BottomInner}>
              <div className={home.imageBottom}>
                <Image
                  src={img4}
                  alt="img4"
                  layout="fill"
                  blurDataURL={blurDataUrl4}
                  placeholder="blur"
                   priority
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={home.BottomInner}>
              <div className={home.imageBottom}>
                <Image
                  src={img5}
                  alt="img5"
                  layout="fill"
                  blurDataURL={blurDataUrl5}
                  placeholder="blur"
                   priority
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={home.BottomInner}>
              <div className={home.imageBottom}>
                <Image
                  src={img6}
                  alt="img6"
                  layout="fill"
                  blurDataURL={blurDataUrl6}
                  placeholder="blur"
                   priority
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={home.BottomInner}>
              <div className={home.imageBottom}>
                <Image
                  src={img7}
                  alt="img7"
                  layout="fill"
                  blurDataURL={blurDataUrl7}
                  placeholder="blur"
                   priority
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={home.BottomInner}>
              <div className={home.imageBottom}>
                <Image
                  src={img8}
                  alt="img8"
                  layout="fill"
                  blurDataURL={blurDataUrl8}
                  placeholder="blur"
                   priority
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={home.BottomInner}>
              <div className={home.imageBottom}>
                <Image
                  src={img9}
                  alt="img9"
                  layout="fill"
                  blurDataURL={blurDataUrl9}
                  placeholder="blur"
                   priority
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={home.BottomInner}>
              <div className={home.imageBottom}>
                <Image
                  src={img10}
                  alt="img10"
                  layout="fill"
                  blurDataURL={blurDataUrl10}
                  placeholder="blur"
                   priority
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={home.BottomInner}>
              <div className={home.imageBottom}>
                <Image
                  src={img11}
                  alt="img11"
                  layout="fill"
                  blurDataURL={blurDataUrl11}
                  placeholder="blur"
                   priority
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={home.BottomInner}>
              <div className={home.imageBottom}>
                <Image
                  src={img12}
                  alt="img12"
                  layout="fill"
                  blurDataURL={blurDataUrl12}
                  placeholder="blur"
                   priority
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <Footer />
    </>
  );
};




export const getStaticProps = async () => {
let HOST = process.env.NEXT_PUBLIC_API_URL;
  const res =  await fetch(`${HOST}/api/HomePageAnaylsis`)
let HomeData = await res.json();
  if (!HomeData) {
    return {
      notFound: true,
    }
  }

  return {
    props: { HomeData }, // will be passed to the page component as props
  }
  
}

export default Home;


