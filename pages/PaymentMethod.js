import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import CartStyle from "../styles/Cart.module.css";
import Styles from "../styles/admin.module.css";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import VerifyClientMiddleware from "./VerifyClientMiddleware";
import { useEffect, useState } from "react";
import Style1 from "../styles/OrderDetails.module.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { useCart } from "react-use-cart";
export default function PaymentMethod() {
  const [totals, setTotal] = useState("0");
  const [arrays, setArrays] = useState([]);
  const [carts, setCarts] = useState([]);
  const [OrderFoodTime, setOrderFoodTime] = useState();
  const { emptyCart, updateItem } = useCart();

  useEffect(() => {
    setCarts(JSON.parse(localStorage.getItem("react-use-cart")));
    const dataFetch = async () => {
      const items = localStorage.getItem("react-use-cart");
      let cartData = JSON.parse(items);

      let array = [];
      let sum = 0;
      let coffeeData = [];
      let drinkData = [];
      let foodData = [];
      let juiceData = [];

      const coffeeItem = await fetch(`${HOST}/api/ShowCoffeeItem`);
      const drinkItem = await fetch(`${HOST}/api/ShowDrinkItem`);
      const foodItem = await fetch(`${HOST}/api/ShowFoodItem`);
      const juiceItem = await fetch(`${HOST}/api/ShowJuiceItem`);
      coffeeData = await coffeeItem.json();
      drinkData = await drinkItem.json();
      foodData = await foodItem.json();
      juiceData = await juiceItem.json();

      for (let j = 0; j < cartData.items.length; j++) {
        //  filter food Price
        if (cartData.items[j].FoodName) {
          for (let i = 0; i < foodData.data.length; i++) {
            if (foodData.data[i].FoodName == cartData.items[j].FoodName) {
              if (foodData.data[i].Category == cartData.items[j].Category) {
                let QtyBook = parseInt(cartData.items[j].QtyBook);
                let pricesFilter = foodData.data[i].ItemCost.filter((itx) => {
                  return itx._id == cartData.items[j].subId;
                });
                let OriginalPrice = parseInt(pricesFilter[0].Price);
                let Size = pricesFilter[0].sizeName;
                if (QtyBook < 1) {
                  emptyCart();
                  toast.error(
                    "Sorry Tempering Is Not Allowed with Food Details",
                    {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }
                  );
                  const pushToCompleteOrder = () => {
                    router.push("/");
                  };
                  setTimeout(pushToCompleteOrder, 1500);
                }
                sum += QtyBook * OriginalPrice;
                let ItemName = foodData.data[i].FoodName;
                let Qty = QtyBook;
                let Category = foodData.data[i].Category;
                let ProductOriginalAmount = OriginalPrice;
                let Amount = QtyBook * OriginalPrice;
                let CategoryPrimary = "foodcategory";
                updateItem(cartData.items[j].id, {
                  QtyBook: Qty,
                  price: ProductOriginalAmount,
                  totalAmount: Amount,
                });
                array.push({
                  ItemName,
                  Qty,
                  Amount,
                  Category,
                  Size,
                  ProductOriginalAmount,
                  CategoryPrimary,
                });
              }
            }
          }
        }

        //! filter using coffee
        if (cartData.items[j].CoffeeName) {
          for (let i = 0; i < coffeeData.data.length; i++) {
            if (coffeeData.data[i].CoffeeName == cartData.items[j].CoffeeName) {
              if (coffeeData.data[i].Category == cartData.items[j].Category) {
                let QtyBook = parseInt(cartData.items[j].QtyBook);
                let pricesFilter = coffeeData.data[i].ItemCost.filter((itx) => {
                  return itx._id == cartData.items[j].subId;
                });
                let OriginalPrice = parseInt(pricesFilter[0].Price);
                let Size = pricesFilter[0].sizeName;
                if (QtyBook < 1) {
                  emptyCart();
                  toast.error(
                    "Sorry Tempering Is Not Allowed with Food Details",
                    {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }
                  );
                  const pushToCompleteOrder = () => {
                    router.push("/");
                  };
                  setTimeout(pushToCompleteOrder, 1500);
                }
                sum += QtyBook * OriginalPrice;
                let ItemName = coffeeData.data[i].CoffeeName;
                let Qty = QtyBook;
                let Category = coffeeData.data[i].Category;
                let ProductOriginalAmount = OriginalPrice;
                let Amount = QtyBook * OriginalPrice;
                let CategoryPrimary = "coffeecategory";
                updateItem(cartData.items[j].id, {
                  QtyBook: Qty,
                  price: ProductOriginalAmount,
                  totalAmount: Amount,
                });
                array.push({
                  ItemName,
                  Qty,
                  Amount,
                  Category,
                  Size,
                  ProductOriginalAmount,
                  CategoryPrimary,
                });
              }
            }
          }
        }

        // !Drink Name

        if (cartData.items[j].DrinkName) {
          for (let i = 0; i < drinkData.data.length; i++) {
            if (drinkData.data[i].DrinkName == cartData.items[j].DrinkName) {
              if (drinkData.data[i].Category == cartData.items[j].Category) {
                let QtyBook = parseInt(cartData.items[j].QtyBook);
                let pricesFilter = drinkData.data[i].ItemCost.filter((itx) => {
                  return itx._id == cartData.items[j].subId;
                });
                let OriginalPrice = parseInt(pricesFilter[0].Price);
                let Size = pricesFilter[0].sizeName;
                if (QtyBook < 1) {
                  emptyCart();
                  toast.error(
                    "Sorry Tempering Is Not Allowed with Food Details",
                    {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }
                  );
                  const pushToCompleteOrder = () => {
                    router.push("/");
                  };
                  setTimeout(pushToCompleteOrder, 1500);
                }
                sum += QtyBook * OriginalPrice;
                let ItemName = drinkData.data[i].DrinkName;
                let Qty = QtyBook;
                let Category = drinkData.data[i].Category;
                let ProductOriginalAmount = OriginalPrice;
                let Amount = QtyBook * OriginalPrice;
                let CategoryPrimary = "drinkcategory";
                updateItem(cartData.items[j].id, {
                  QtyBook: Qty,
                  price: ProductOriginalAmount,
                  totalAmount: Amount,
                });
                array.push({
                  ItemName,
                  Qty,
                  Amount,
                  Category,
                  Size,
                  ProductOriginalAmount,
                  CategoryPrimary,
                });
              }
            }
          }
        }

        // !Juice Data

        if (cartData.items[j].JuiceData) {
          for (let i = 0; i < juiceData.data.length; i++) {
            if (juiceData.data[i].JuiceData == cartData.items[j].JuiceData) {
              if (juiceData.data[i].Category == cartData.items[j].Category) {
                let QtyBook = parseInt(cartData.items[j].QtyBook);
                let pricesFilter = juiceData.data[i].ItemCost.filter((itx) => {
                  return itx._id == cartData.items[j].subId;
                });
                let OriginalPrice = parseInt(pricesFilter[0].Price);
                let Size = pricesFilter[0].sizeName;
                if (QtyBook < 1) {
                  emptyCart();
                  toast.error(
                    "Sorry Tempering Is Not Allowed with Food Details",
                    {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }
                  );
                  const pushToCompleteOrder = () => {
                    router.push("/");
                  };
                  setTimeout(pushToCompleteOrder, 1500);
                }
                sum += QtyBook * OriginalPrice;
                let ItemName = juiceData.data[i].JuiceData;
                let Qty = QtyBook;
                let Category = juiceData.data[i].Category;
                let ProductOriginalAmount = OriginalPrice;
                let Amount = QtyBook * OriginalPrice;
                let CategoryPrimary = "juicecategory";
                updateItem(cartData.items[j].id, {
                  QtyBook: Qty,
                  price: ProductOriginalAmount,
                  totalAmount: Amount,
                });
                array.push({
                  ItemName,
                  Qty,
                  Amount,
                  Category,
                  Size,
                  ProductOriginalAmount,
                  CategoryPrimary,
                });
              }
            }
          }
        }
      }

      setArrays(array);
      setTotal(sum);
    };

    dataFetch();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("OrderFoodTime")) {
      router.push("/Cart");
    }
    setOrderFoodTime(localStorage.getItem("OrderFoodTime"));
  }, []);

  // cod method
  const InitaitePayment = () => {
    let value = document.querySelector(
      "input[type='radio'][name=payment]:checked"
    ).value;
    if (value == "COD") {
      confirmAlert({
        title: "Confirm To Placed Order ?",
        message: "Order can't cancelled Onced Placed ",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              const PickUpTime = localStorage.getItem("OrderFoodTime");
              const PaymentMethod = value;
              if (totals <= 0) {
                emptyCart();
                toast.warn(
                  "Tempering Is Not Allowed In Cart,Plese Add Item Again",
                  {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );

                const pushToCompleteOrder = () => {
                  router.push("/");
                };
                setTimeout(pushToCompleteOrder, 2000);
                return;
              }
              if (arrays.length == 0 || arrays == undefined || arrays == "") {
                emptyCart();
                toast.warn(
                  "Tempering Is Not Allowed In Cart,Plese Add Item Again",
                  {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
                const pushToCompleteOrder = () => {
                  router.push("/");
                };
                setTimeout(pushToCompleteOrder, 2000);
                return;
              }
              const TotalAmount = totals;

              const PickUpTime1 = localStorage.getItem("PickUpTime1");
              let res = await fetch(`${HOST}/api/OrderItem`, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  PickUpTime,
                  PickUpTime1,
                  PaymentMethod,
                  ItemsOrder: arrays,
                  TotalAmount,
                }),
              });

              let data = await res.json();
              if (data.status == "501") {
                toast.error(`${data.message}`, {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                return;
              }
              if (data.status == "404") {
                toast.warn(`${data.message}`, {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                return;
              }
              if (data.status == "201") {
                emptyCart();
                localStorage.removeItem("OrderFoodTime");
                localStorage.removeItem("PickUpTime1");
                localStorage.setItem("orderToken", data.tokenUser);
                toast.success("Order Successfully Placed", {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                const pushToCompleteOrder = () => {
                  router.push("/OrderComplete");
                };
                setTimeout(pushToCompleteOrder, 1500);
              }
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    }
  };

  return (
    <>
      <VerifyClientMiddleware />
      <div className={Styles.admin}>
        <HeadTag title="Payment Method" />
        <Header />
      </div>
      {/* cart */}
      <div className={CartStyle.cart}>
        <h1> Payment Method</h1>
        <div className={CartStyle.progress}>
          <hr />

          <div className={CartStyle.number}>
            <div className={CartStyle.num1}>
              <div className={CartStyle.circle}>1</div>
              <div className={CartStyle.discription}>
                <p> SHOPPING CART </p>
              </div>
            </div>
          </div>

          <div className={CartStyle.number}>
            <div className={CartStyle.num1}>
              <div className={CartStyle.circle}>2 </div>
              <div className={CartStyle.discription}>
                <p> ORDER DETAILS </p>
              </div>
            </div>
          </div>

          <div className={CartStyle.number}>
            <div className={CartStyle.num1}>
              <div className={`${CartStyle.circle} ${CartStyle.circle1}`}>
                3{" "}
              </div>
              <div className={CartStyle.discription}>
                <p> PAYMENT METHOD </p>
              </div>
            </div>
          </div>
        </div>

        {/* cart List */}
        <div className={CartStyle.cartItem}>
          <div className={CartStyle.cartTable}>
            <h4 style={{ textAlign: "center", fontSize: "30px", color: "red" }}>
              Note-: Order Can't Cancelled Once Placed.
            </h4>
            <h3 style={{ paddingLeft: "4%", fontSize: "30px" }}>
              Select Payment Mode
            </h3>
            <div className={Style1.payment}>
              <form>
                <div className={Style1.div}>
                  <input
                    type="radio"
                    name="payment"
                    id="Online"
                    value="Online"
                    defaultChecked
                  />
                  <label htmlFor="Online" style={{ cursor: "pointer" }}>
                    {" "}
                    <h4>: Online Payment</h4>
                  </label>
                </div>
                <div className={Style1.div}>
                  <input type="radio" name="payment" id="cod" value="COD" />
                  <label htmlFor="cod" style={{ cursor: "pointer" }}>
                    <h4>: Cash On Delivery</h4>
                  </label>
                </div>
              </form>
            </div>
            <h4
              style={{
                textAlign: "center",
                fontSize: "30px",
                color: "black",
                marginTop: "-0%",
              }}
            >
              Total Payable Amount-:{" "}
              <span style={{ color: "red" }}>{totals}</span>
            </h4>
            {carts.length != 0 ? (
              <>
                <h4
                  style={{
                    textAlign: "center",
                    fontSize: "25px",
                    color: "black",
                  }}
                >
                  Total Items Booked-:{" "}
                  <span style={{ color: "red" }}>{carts.items.length}</span>{" "}
                  <span style={{ color: "blue", paddingLeft: "15%" }}>
                    {" "}
                    <Link href="/Cart">Click to view items List</Link>
                  </span>
                </h4>
              </>
            ) : (
              ""
            )}
          </div>

          <div className={CartStyle.bottom}>
            <Link href="/OrderDetails">
              <button className={CartStyle.more} style={{ width: "300px" }}>
                Update Pickup Time
              </button>
            </Link>
            <div className={CartStyle.subtotal}>
              {OrderFoodTime != "" ? (
                <button
                  style={{
                    marginTop: "4.4%",
                    marginRight: "5%",
                    height: "50px",
                  }}
                  onClick={InitaitePayment}
                >
                  Placed Order
                </button>
              ) : (
                <button
                  style={{
                    marginTop: "4.4%",
                    marginRight: "5%",
                    height: "50px",
                  }}
                  disabled
                >
                  Placed Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
