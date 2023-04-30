import React from 'react'
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { BiFoodMenu } from "react-icons/bi";
import { BiHappy } from "react-icons/bi";
import { RiNumbersFill } from "react-icons/ri";
import { MdOutlineAccountBox } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import home from "../styles/Home.module.css";

  
const TopFoodItems = ({ HomeData }) => {
  const [countOn, setCountOn] = useState(false);
  const [topSearchData, setTopSearchData] = useState([]);
  const [topRateData, setTopRateData] = useState([]);
  const [visitor, setVisitor] = useState("");
  const [happyClient, setHappyClient] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [allOrders, setAllOrders] = useState("");
useEffect(() => {
console.log(HomeData)
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
              {/* top trending items cards */}

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
                            <img
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
                            <img
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


        </>
    )
}
  
export default TopFoodItems;



