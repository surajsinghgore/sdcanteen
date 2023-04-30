import Styles from "../styles/admin.module.css";
import home from "../styles/Home.module.css";
import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import useNextBlurhash from "use-next-blurhash";
import Carousel from "../Components/Carousel";
import Image from "next/image";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
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
import { useEffect, useState } from "react";
let p1 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014245/p1_pvhtmu.png`;
let p2 = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014246/p2_g5k0gk.svg`;
import { Autoplay } from "swiper";
import Loader from "../Components/Loader";
import { BiFoodMenu } from "react-icons/bi";
import { BiHappy } from "react-icons/bi";
import { RiNumbersFill } from "react-icons/ri";
import { MdOutlineAccountBox } from "react-icons/md";

import Link from "next/link";
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
  const [countOn, setCountOn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [topSearchData, setTopSearchData] = useState([]);
  const [topRateData, setTopRateData] = useState([]);
  const [visitor, setVisitor] = useState("");
  const [happyClient, setHappyClient] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [allOrders, setAllOrders] = useState("");
  // fetching facts
  useEffect(() => {

    if(HomeData){
            setTopSearchData(HomeData.TopTrendingItems);
        setTopRateData(HomeData.TopRatedFoodData);
        setAllOrders(HomeData.orderDataCount);
        setTotalItems(HomeData.allItemsCount);
        setVisitor(HomeData.visitorDataCount);
        setHappyClient(HomeData.HappyClients);
    }

  }, [HomeData]);
  return (
    <>
      <Loader loader={loader} />

      <div className={Styles.admin}>
        <HeadTag title="Home" />
        <Header />

        {/* crousel */}
        <Carousel />
      </div>

      {/* cards */}

      <div className={home.homeCards} >
        {topSearchData!=undefined ? (
          <>
            <h1>Top 5 Trending Food Items</h1>
            {topSearchData.map((items) => {
              return (
                <div className={home.card} key={items._id}>
                  {/* foodName */}
                  {items.FoodName ? (
                    <Link href={`/${items.FoodName}`}>
                      <a>
                        <div>
                          <div className={home.img}>
                            <Image
                              src={items.Image}
                              alt={items.ImageName}
                              height={260}
                              width={380}
                              priority
                            />
                          </div>
                          <div className={home.data}>
                            <h4>{items.FoodName}</h4>
                            <p>{items.Description.substring(0, 220)}</p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
      </div>
      {/* top rated items */}
      <div className={home.homeCards}>
        {topRateData !=undefined ? (
          <>
            <h1> Five Best Rated Foods Items</h1>
            {topRateData.map((items) => {
              return (
                <div className={home.card} key={items._id}>
                  {/* foodName */}
                  {items.FoodName ? (
                    <Link href={`/${items.FoodName}`}>
                      <a>
                        <div>
                          <div className={home.img}>
                            <Image
                              src={items.Image}
                              alt={items.ImageName}
                              height={260}
                              width={380}
                              priority
                            />
                          </div>
                          <div className={home.data}>
                            <h4>{items.FoodName}</h4>
                            <p>{items.Description.substring(0, 220)}</p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
      </div>

      {/* facts */}
      <div className={home.f}>
        <h1> FUN FACTS </h1>
      </div>
      <ScrollTrigger
        onEnter={() => setCountOn(true)}
        onExit={() => setCountOn(false)}
      >
        <div className={home.facts}>
          <div className={home.fact}>
            <div className={home.icons}>
              <BiFoodMenu />
            </div>
            <h5>Delicacy Of Items</h5>
            <p>
              {countOn && <CountUp start={0} end={totalItems} duration={1} />}
            </p>
          </div>

          <div className={home.fact}>
            <div className={home.icons}>
              <MdOutlineAccountBox />
            </div>
            <h5>Total Visits </h5>
            <p>{countOn && <CountUp start={0} end={visitor} duration={1} />}</p>
          </div>

          <div className={home.fact}>
            <div className={home.icons}>
              <RiNumbersFill />
            </div>
            <h5>Orders Placed</h5>
            <p>
              {countOn && <CountUp start={0} end={allOrders} duration={1} />}
            </p>
          </div>

          <div className={home.fact}>
            <div className={home.icons}>
              <BiHappy />
            </div>
            <h5> Happy clients</h5>
            <p>
             
              {countOn && <CountUp start={0} end={happyClient} duration={1} />}
            </p>
          </div>
        </div>
      </ScrollTrigger>
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

export default Home;




export const getServerSideProps = async () => {
let HOST = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${HOST}/api/HomePageAnaylsis`);
      let HomeData = await res.json();
      

  return {
    props: {HomeData}, // will be passed to the page component as props
  }
}