import React, { useEffect, useState } from "react";
import Styles from "../../styles/admin.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";

// icons
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { MdFoodBank } from "react-icons/md";
import { BiCoffee } from "react-icons/bi";
import { BiDrink } from "react-icons/bi";
import { GiManualJuicer } from "react-icons/gi";
import { MdPayment } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
const index = () => {
  const [dash, setDash] = useState(true);
  const [food, setFood] = useState(true);
  const [coffee, setCoffee] = useState(true);
  const [order, setOrder] = useState(true);
  const [payment, setPayment] = useState(true);
  const [drink, setDrink] = useState(true);
  const [juice, setJuice] = useState(true);

  useEffect(() => {}, []);

  // dashoard enables
  const enableLinks = (names) => {
    // dashboard
    if (names == "dashboard") {
      if (dash) {
        document.getElementById("dashboard_menu").style.display = "block";
        document.getElementById("top_dash").style.display = "none";
        document.getElementById("bottom_dash").style.display = "block";
        setDash(false);
      } else {
        document.getElementById("dashboard_menu").style.display = "none";
        document.getElementById("top_dash").style.display = "block";
        document.getElementById("bottom_dash").style.display = "none";
        setDash(true);
      }
    }

    // food
    if (names == "food") {
      if (food) {
        document.getElementById("food_menu").style.display = "block";
        document.getElementById("top_food").style.display = "none";
        document.getElementById("bottom_food").style.display = "block";
        setFood(false);
      } else {
        document.getElementById("food_menu").style.display = "none";
        document.getElementById("top_food").style.display = "block";
        document.getElementById("bottom_food").style.display = "none";
        setFood(true);
      }
    }

    // coffee
    if (names == "coffee") {
      if (coffee) {
        document.getElementById("coffee_menu").style.display = "block";
        document.getElementById("top_coffee").style.display = "none";
        document.getElementById("bottom_coffee").style.display = "block";
        setCoffee(false);
      } else {
        document.getElementById("coffee_menu").style.display = "none";
        document.getElementById("top_coffee").style.display = "block";
        document.getElementById("bottom_coffee").style.display = "none";
        setCoffee(true);
      }
    }

    // drink
    if (names == "drink") {
      if (drink) {
        document.getElementById("drink_menu").style.display = "block";
        document.getElementById("top_drink").style.display = "none";
        document.getElementById("bottom_drink").style.display = "block";
        setDrink(false);
      } else {
        document.getElementById("drink_menu").style.display = "none";
        document.getElementById("top_drink").style.display = "block";
        document.getElementById("bottom_drink").style.display = "none";
        setDrink(true);
      }
    }
    // juice

    if (names == "juice") {
      if (juice) {
        document.getElementById("juice_menu").style.display = "block";
        document.getElementById("top_juice").style.display = "none";
        document.getElementById("bottom_juice").style.display = "block";
        setJuice(false);
      } else {
        document.getElementById("juice_menu").style.display = "none";
        document.getElementById("top_juice").style.display = "block";
        document.getElementById("bottom_juice").style.display = "none";
        setJuice(true);
      }
    }

    // order
    if (names == "order") {
      if (order) {
        document.getElementById("order_menu").style.display = "block";
        document.getElementById("top_order").style.display = "none";
        document.getElementById("bottom_order").style.display = "block";
        setOrder(false);
      } else {
        document.getElementById("order_menu").style.display = "none";
        document.getElementById("top_order").style.display = "block";
        document.getElementById("bottom_order").style.display = "none";
        setOrder(true);
      }
    }

    // payment
    if (names == "payment") {
      if (payment) {
        document.getElementById("payment_menu").style.display = "block";
        document.getElementById("top_payment").style.display = "none";
        document.getElementById("bottom_payment").style.display = "block";
        setPayment(false);
      } else {
        document.getElementById("payment_menu").style.display = "none";
        document.getElementById("top_payment").style.display = "block";
        document.getElementById("bottom_payment").style.display = "none";
        setPayment(true);
      }
    }
  };

  return (
    <div className={Styles.admin}>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>SD CANTEEN | Admin Dashboard</title>
        <meta name="description" content="sd canteen website" />
        <meta name="author" content="suraj singh" />
        <meta
          keyword=""
          content="sd canteen, sd college,admin login,admin dash board"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* left panel bar */}

      <div className={Styles.leftPanel}>
        <div className={Styles.logo_img}>
          <Image src={logo} width="250" height="100" alt="logo " />
        </div>

        {/* menu */}
        <div className={Styles.menu_Links}>
          {/* dashboard */}
          <li onClick={() => enableLinks("dashboard")}>
            {dash ? "" : <></>}
            <div className={dash ? `${Styles.styles}` : `${Styles.styles1}`}>
              <div className={Styles.icon}>
                <MdOutlineDashboard />
              </div>

              <span className={Styles.title}>Dashboard</span>

              <div className={Styles.arrows}>
                <div className={Styles.top} id="top_dash">
                  <IoIosArrowForward />
                </div>
                <div className={Styles.bottom} id="bottom_dash">
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

            <ul id="dashboard_menu">
              <li>
                <Link href="/admin">Home Dashboard</Link>
              </li>
            </ul>
          </li>

          {/* food menu */}
          <li onClick={() => enableLinks("food")}>
            <div className={food ? `${Styles.styles}` : `${Styles.styles1}`}>
              <div className={Styles.icon}>
                <MdFoodBank />
              </div>

              <span className={Styles.title}>Foods</span>

              <div className={Styles.arrows}>
                <div className={Styles.top} id="top_food">
                  <IoIosArrowForward />
                </div>
                <div className={Styles.bottom} id="bottom_food">
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

            <ul id="food_menu">
              <li>
                <Link href="/admin">ADD FOOD</Link>
              </li>
              <li>
                <Link href="/admin">UPDATE FOODS</Link>
              </li>
              <li>
                <Link href="/admin">DELETE FOODS</Link>
              </li>
              <li>
                <Link href="/admin">VIEW FOODS</Link>
              </li>
              <li>
                <Link href="/admin">MANAGE FOODS CATEGORIES</Link>
              </li>
            </ul>
          </li>

          {/* Cooffees */}
          <li onClick={() => enableLinks("coffee")}>
            <div className={coffee ? `${Styles.styles}` : `${Styles.styles1}`}>
              <div className={Styles.icon}>
                <BiCoffee />
              </div>

              <span className={Styles.title}>Coffees</span>

              <div className={Styles.arrows}>
                <div className={Styles.top} id="top_coffee">
                  <IoIosArrowForward />
                </div>
                <div className={Styles.bottom} id="bottom_coffee">
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

            <ul id="coffee_menu">
              <li>
                <Link href="/admin">ADD COFFEES</Link>
              </li>
              <li>
                <Link href="/admin">UPDATE COFFEES</Link>
              </li>
              <li>
                <Link href="/admin">DELETE COFFEES</Link>
              </li>
              <li>
                <Link href="/admin">VIEW COFFEES</Link>
              </li>
              <li>
                <Link href="/admin">MANAGE COFFEES CATEGORIES</Link>
              </li>
            </ul>
          </li>

          {/* cold drinks */}

          <li onClick={() => enableLinks("drink")}>
            <div className={drink ? `${Styles.styles}` : `${Styles.styles1}`}>
              <div className={Styles.icon}>
                <BiDrink />
              </div>

              <span className={Styles.title}>Drinks</span>

              <div className={Styles.arrows}>
                <div className={Styles.top} id="top_drink">
                  <IoIosArrowForward />
                </div>
                <div className={Styles.bottom} id="bottom_drink">
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

            <ul id="drink_menu">
              <li>
                <Link href="/admin">ADD DRINKS</Link>
              </li>
              <li>
                <Link href="/admin">UPDATE DRINKS</Link>
              </li>
              <li>
                <Link href="/admin">DELETE DRINKS</Link>
              </li>
              <li>
                <Link href="/admin">VIEW DRINKS</Link>
              </li>
              <li>
                <Link href="/admin">MANAGE DRINKS CATEGORIES</Link>
              </li>
            </ul>
          </li>
          {/* JUICES */}
          <li onClick={() => enableLinks("juice")}>
            <div className={juice ? `${Styles.styles}` : `${Styles.styles1}`}>
              <div className={Styles.icon}>
                <GiManualJuicer />
              </div>

              <span className={Styles.title}>Juices</span>

              <div className={Styles.arrows}>
                <div className={Styles.top} id="top_juice">
                  <IoIosArrowForward />
                </div>
                <div className={Styles.bottom} id="bottom_juice">
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

            <ul id="juice_menu">
              <li>
                <Link href="/admin">ADD JUICES</Link>
              </li>
              <li>
                <Link href="/admin">UPDATE JUICES</Link>
              </li>
              <li>
                <Link href="/admin">DELETE JUICES</Link>
              </li>
              <li>
                <Link href="/admin">VIEW JUICES</Link>
              </li>
              <li>
                <Link href="/admin">MANAGE JUICES CATEGORIES</Link>
              </li>
            </ul>
          </li>

          {/* orders */}

          <li onClick={() => enableLinks("order")}>
            <div className={order ? `${Styles.styles}` : `${Styles.styles1}`}>
              <div className={Styles.icon}>
                <BiDetail />
              </div>

              <span className={Styles.title}>Orders</span>

              <div className={Styles.arrows}>
                <div className={Styles.top} id="top_order">
                  <IoIosArrowForward />
                </div>
                <div className={Styles.bottom} id="bottom_order">
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

            <ul id="order_menu">
              <li>
                <Link href="/admin">REALTIME ORDERS</Link>
              </li>
              <li>
                <Link href="/admin">PENDING ORDERS</Link>
              </li>
              <li>
                <Link href="/admin">PAST ORDERS</Link>
              </li>
            </ul>
          </li>

          {/* payments */}

          <li onClick={() => enableLinks("payment")}>
            <div className={payment ? `${Styles.styles}` : `${Styles.styles1}`}>
              <div className={Styles.icon}>
                <MdPayment />
              </div>

              <span className={Styles.title}>Payments</span>

              <div className={Styles.arrows}>
                <div className={Styles.top} id="top_payment">
                  <IoIosArrowForward />
                </div>
                <div className={Styles.bottom} id="bottom_payment">
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

            <ul id="payment_menu">
              <li>
                <Link href="/admin">THIS MONTH'S COLLECTION</Link>
              </li>
              <li>
                <Link href="/admin">PAST TRANSACTIONS</Link>
              </li>
              <li>
                <Link href="/admin">FAILURE PAYMENTS</Link>
              </li>
            </ul>
          </li>
          {/* logout */}
          <li>
            <div className={Styles.styles}>
              <div className={Styles.icon}>
                <BiLogOut />
              </div>

              <span className={Styles.title}>Logout </span>
            </div>
          </li>
        </div>
      </div>

      {/* right bar */}
    </div>
  );
};

export default index;
