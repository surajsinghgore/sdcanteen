import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import style from "../styles/SearchBar.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { useCart } from "react-use-cart";
import { FaSort } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import RateItem from "./RateItem";
export default function OrderItem() {
  // item rate manage
  const [ratingData, setRatingData] = useState([]);
  const [quality, setQuality] = useState(100);
  const [prices, setPrices] = useState(100);
  const [service, setService] = useState(100);
  const [avg, setAvg] = useState(5);
  const [allowComment, setAllowComment] = useState(false);
  const [revLen, setRevLen] = useState(0);
  const [price, setPrice] = useState("");
  const [selected, setSelected] = useState("yes");
  const { addItem, removeItem, items, emptyCart } = useCart();
  const [add, setAdd] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  const query = router.query.orderItem;
  const [productId, setProductId] = useState();
  useEffect(() => {
    const FindDataUsingSearch = async () => {
      if (query != undefined) {
        const res = await fetch(`${HOST}/api/ShowSingleItem?item=${query}`);
        const dataRes = await res.json();
        if (res.status == 201) {
          await setData(dataRes.data);
          await setPrice(dataRes.data[0].ItemCost[0].Price);
          await setSelected(dataRes.data[0].ItemCost[0].sizeName);
          await setProductId(dataRes.data[0]._id);
          localStorage.setItem("itemOrder", dataRes.data[0].ItemCost[0]._id);
        }
      }
    };
    FindDataUsingSearch();
  }, [query]);

  const setItems = (name, price, id) => {
    setPrice(price);
    setSelected(name);
    localStorage.setItem("itemOrder", id);
  };

  const AddToCart = (item) => {
    let subId = localStorage.getItem("itemOrder");
    let subData = item[0].ItemCost.filter((items) => {
      return items._id == subId;
    });

    if (subData.length == 0 || subData == undefined) {
      toast.warn(`sorry something went wrong, please try again later`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      emptyCart();
      localStorage.removeItem("itemOrder");
      return;
    }
    let id = item[0]._id;
    let price = subData[0].Price;
    let Qty = item[0].Qty;
    let Image = item[0].Image;
    let Category = item[0].Category;
    let Size = subData[0].sizeName;
    let QtyBook = 1;
    let totalAmount = subData[0].Price;
    let foodFind;
    let coffeeFind;
    let drinkFind;
    let juiceFind;
    for (let i = 0; i < item.length; i++) {
      foodFind = data[i].FoodName;
      coffeeFind = data[i].CoffeeName;
      drinkFind = data[i].DrinkName;
      juiceFind = data[i].JuiceName;
    }

    if (foodFind != undefined) {
      let FoodName = item[0].FoodName;
      addItem({
        id,
        price,
        FoodName,
        Qty,
        Image,
        Size,
        subId,
        Category,
        QtyBook,
        totalAmount,
      });
      toast.success(`${FoodName} successfully added to cart`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (coffeeFind != undefined) {
      let CoffeeName = item[0].CoffeeName;
      addItem({
        id,
        price,
        CoffeeName,
        Qty,
        Image,
        Size,
        subId,
        Category,
        QtyBook,
        totalAmount,
      });
      toast.success(`${CoffeeName} successfully added to cart`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }
    if (drinkFind != undefined) {
      let DrinkName = item[0].DrinkName;
      addItem({
        id,
        price,
        DrinkName,
        Qty,
        Image,
        Size,
        subId,
        Category,
        QtyBook,
        totalAmount,
      });
      toast.success(`${DrinkName} successfully added to cart`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }
    if (juiceFind != undefined) {
      let JuiceName = item[0].JuiceName;
      addItem({
        id,
        price,
        JuiceName,
        Qty,
        Size,
        Image,
        subId,
        Category,
        QtyBook,
        totalAmount,
      });
      toast.success(`${JuiceName} successfully added to cart`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }
  };
  const RemoveFromCart = (item) => {
    if (item[0] != undefined) {
      let id = item[0]._id;
      removeItem(id);
      toast.error(`Item successfully removed from cart`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setAdd(true);
    }
  };
  // add and remove manage
  useEffect(() => {
    setAdd(true);
    items.map((itemm) => {
      if (data[0] != undefined) {
        if (itemm.id == data[0]._id) {
          setAdd(false);
        }
      }
    });
  });
  const BuyNow = (item) => {
    let check = false;
    let cartData = items;

    for (let j = 0; j < cartData.length; j++) {
      if (item.FoodName != undefined) {
        if (cartData[j].FoodName == item[0].FoodName) {
          check = true;
        }
      }
      if (item.CoffeeName != undefined) {
        if (cartData[j].CoffeeName == item[0].CoffeeName) {
          check = true;
        }
      }

      if (item.DrinkName != undefined) {
        if (cartData[j].DrinkName == item[0].DrinkName) {
          check = true;
        }
      }

      if (item.JuiceName != undefined) {
        if (cartData.items[j].JuiceName == item[0].JuiceName) {
          check = true;
        }
      }
    }
    if (check == false) {
      let subId = localStorage.getItem("itemOrder");
      let subData = item[0].ItemCost.filter((items) => {
        return items._id == subId;
      });

      if (subData.length == 0 || subData == undefined) {
        toast.warn(`please try agian `, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        emptyCart();
        localStorage.removeItem("itemOrder");
        return;
      }
      let id = item[0]._id;
      let price = subData[0].Price;
      let Qty = item[0].Qty;
      let Image = item[0].Image;
      let Category = item[0].Category;
      let Size = subData[0].sizeName;
      let QtyBook = 1;
      let totalAmount = subData[0].Price;
      let foodFind;
      let coffeeFind;
      let drinkFind;
      let juiceFind;
      for (let i = 0; i < item.length; i++) {
        foodFind = data[i].FoodName;
        coffeeFind = data[i].CoffeeName;
        drinkFind = data[i].DrinkName;
        juiceFind = data[i].JuiceName;
      }

      if (foodFind != undefined) {
        let FoodName = item[0].FoodName;
        addItem({
          id,
          price,
          FoodName,
          Qty,
          Image,
          Size,
          subId,
          Category,
          QtyBook,
          totalAmount,
        });
        toast.success(`${FoodName} successfully added to cart`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/Cart");
        return;
      }
      if (coffeeFind != undefined) {
        let CoffeeName = item[0].CoffeeName;
        addItem({
          id,
          price,
          CoffeeName,
          Qty,
          Image,
          Size,
          subId,
          Category,
          QtyBook,
          totalAmount,
        });
        toast.success(`${CoffeeName} successfully added to cart`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/Cart");
        return;
      }
      if (drinkFind != undefined) {
        let DrinkName = item[0].DrinkName;
        addItem({
          id,
          price,
          DrinkName,
          Qty,
          Image,
          Size,
          subId,
          Category,
          QtyBook,
          totalAmount,
        });
        toast.success(`${DrinkName} successfully added to cart`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/Cart");
        return;
      }
      if (juiceFind != undefined) {
        let JuiceName = item[0].JuiceName;
        addItem({
          id,
          price,
          JuiceName,
          Qty,
          Size,
          Image,
          subId,
          Category,
          QtyBook,
          totalAmount,
        });
        toast.success(`${JuiceName} successfully added to cart`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/Cart");
        return;
      }
    }
  };

  // load rating data
  useEffect(() => {
    const dataRatingFetch = async () => {
      if (productId != undefined) {
        let fetchRate = await fetch(
          `${HOST}/api/ShowRatingOfItems?productId=${productId}`
        );
        const dataRess = await fetchRate.json();
        if (fetchRate.status == 201) {
          setRatingData(dataRess.data);
          setAvg(dataRess.data[0].Rating);
          setRevLen(dataRess.data[0].ItemsReviwers.length);
          function QualityRateCalculate() {
            let ZeroPointFive = 0;
            let OnePointFive = 0;
            let TwoPointFive = 0;
            let ThreePointFive = 0;
            let FourPointFive = 0;
            let One = 0;
            let two = 0;
            let three = 0;
            let four = 0;
            let five = 0;
            dataRess.data[0].ItemsReviwers.map((item) => {
              if (item.QualityRate == "0.5") {
                ZeroPointFive++;
              }

              if (item.QualityRate == "1") {
                One++;
              }
              if (item.QualityRate == "1.5") {
                OnePointFive++;
              }
              if (item.QualityRate == "2") {
                two++;
              }
              if (item.QualityRate == "2.5") {
                TwoPointFive++;
              }
              if (item.QualityRate == "3") {
                three++;
              }
              if (item.QualityRate == "3.5") {
                ThreePointFive++;
              }
              if (item.QualityRate == "4") {
                four++;
              }
              if (item.QualityRate == "4.5") {
                FourPointFive++;
              }
              if (item.QualityRate == "5") {
                five++;
              }
            });
            ZeroPointFive = ZeroPointFive * 10;
            One = One * 10;
            OnePointFive = OnePointFive * 10;
            two = two * 10;
            TwoPointFive = TwoPointFive * 10;
            three = three * 10;
            ThreePointFive = ThreePointFive * 10;
            four = four * 10;
            FourPointFive = FourPointFive * 10;
            five = five * 10;
            let OverAllServiceRate =
              (5 * five +
                4.5 * FourPointFive +
                4 * four +
                3.5 * ThreePointFive +
                3 * three +
                2.5 * TwoPointFive +
                2 * two +
                1.5 * OnePointFive +
                1 * One +
                0.5 * ZeroPointFive) /
              100;
            setQuality(OverAllServiceRate * 100);
          }
          function PriceRateCalculate() {
            let ZeroPointFive = 0;
            let OnePointFive = 0;
            let TwoPointFive = 0;
            let ThreePointFive = 0;
            let FourPointFive = 0;
            let One = 0;
            let two = 0;
            let three = 0;
            let four = 0;
            let five = 0;
            dataRess.data[0].ItemsReviwers.map((item) => {
              if (item.PriceRate == "0.5") {
                ZeroPointFive++;
              }
              if (item.PriceRate == "1") {
                One++;
              }
              if (item.PriceRate == "1.5") {
                OnePointFive++;
              }
              if (item.PriceRate == "2") {
                two++;
              }
              if (item.PriceRate == "2.5") {
                TwoPointFive++;
              }
              if (item.PriceRate == "3") {
                three++;
              }
              if (item.PriceRate == "3.5") {
                ThreePointFive++;
              }
              if (item.PriceRate == "4") {
                four++;
              }
              if (item.PriceRate == "4.5") {
                FourPointFive++;
              }
              if (item.PriceRate == "5") {
                five++;
              }
            });
            ZeroPointFive = ZeroPointFive * 10;
            One = One * 10;
            OnePointFive = OnePointFive * 10;
            two = two * 10;
            TwoPointFive = TwoPointFive * 10;
            three = three * 10;
            ThreePointFive = ThreePointFive * 10;
            four = four * 10;
            FourPointFive = FourPointFive * 10;
            five = five * 10;
            let OverAllServiceRate =
              (5 * five +
                4.5 * FourPointFive +
                4 * four +
                3.5 * ThreePointFive +
                3 * three +
                2.5 * TwoPointFive +
                2 * two +
                1.5 * OnePointFive +
                1 * One +
                0.5 * ZeroPointFive) /
              100;
            setPrices(OverAllServiceRate * 100);
          }
          function ServiceRateCalculate() {
            let ZeroPointFive = 0;
            let OnePointFive = 0;
            let TwoPointFive = 0;
            let ThreePointFive = 0;
            let FourPointFive = 0;
            let One = 0;
            let two = 0;
            let three = 0;
            let four = 0;
            let five = 0;
            dataRess.data[0].ItemsReviwers.map((item) => {
              if (item.ServiceRate == "0.5") {
                ZeroPointFive++;
              }
              if (item.ServiceRate == "1") {
                One++;
              }
              if (item.ServiceRate == "1.5") {
                OnePointFive++;
              }
              if (item.ServiceRate == "2") {
                two++;
              }
              if (item.ServiceRate == "2.5") {
                TwoPointFive++;
              }
              if (item.ServiceRate == "3") {
                three++;
              }
              if (item.ServiceRate == "3.5") {
                ThreePointFive++;
              }
              if (item.ServiceRate == "4") {
                four++;
              }
              if (item.ServiceRate == "4.5") {
                FourPointFive++;
              }
              if (item.ServiceRate == "5") {
                five++;
              }
            });
            ZeroPointFive = ZeroPointFive * 10;
            One = One * 10;
            OnePointFive = OnePointFive * 10;
            two = two * 10;
            TwoPointFive = TwoPointFive * 10;
            three = three * 10;
            ThreePointFive = ThreePointFive * 10;
            four = four * 10;
            FourPointFive = FourPointFive * 10;
            five = five * 10;
            let OverAllServiceRate =
              (5 * five +
                4.5 * FourPointFive +
                4 * four +
                3.5 * ThreePointFive +
                3 * three +
                2.5 * TwoPointFive +
                2 * two +
                1.5 * OnePointFive +
                1 * One +
                0.5 * ZeroPointFive) /
              100;
            setService(OverAllServiceRate * 100);
          }
          QualityRateCalculate();
          PriceRateCalculate();
          ServiceRateCalculate();
        }
      }
    };
    dataRatingFetch();
  }, [productId]);


// check wheater rating is allowed or not
useEffect(()=>{
console.log(allowComment)
const check=async()=>{
if(localStorage.getItem('login')!=undefined){
 if (productId != undefined) {
 let fetchRes = await fetch(`${HOST}/api/ValidateRatingOrNot?productId=${productId}`)
if(fetchRes.status==404){
setAllowComment(false);
}
if(fetchRes.status==201){
setAllowComment(true);
}
}
}
}

check();
},[productId])
  function FilterCard() {
    let foodFind;
    let coffeeFind;
    let drinkFind;
    let juiceFind;

    for (let i = 0; i < data.length; i++) {
      foodFind = data[i].FoodName;
      coffeeFind = data[i].CoffeeName;
      drinkFind = data[i].DrinkName;
      juiceFind = data[i].JuiceName;
    }

    if (foodFind != undefined) {
      return (
        <>
          <div className={style.topSection}>
            <div className={style.left}>
              <Image
                src={`/FoodItemImages/${data[0].Image}`}
                alt="image"
                width={"480px"}
                height={"400px"}
                objectFit="cover"
              />
            </div>
            <div className={style.right}>
              <h1>{data[0].FoodName}</h1>
              <div className={style.star}>
                <div className={style.startSection}>
                  <Rating
                    initialValue={avg}
                    readonly="true"
                    className={style.startIcon}
                    allowFraction
                  />

                  <h5>({revLen} Customer Review)</h5>
                </div>
              </div>
              <h3>₹ {price}</h3>
              <div className={style.subSection}>
                <div className={style.subHeading}>Qty :</div>
                <div className={style.subData}>{data[0].Qty}</div>
                <div className={style.subHeading}>Category :</div>
                <div className={style.subData}>{data[0].Category}</div>
              </div>
              <hr />

              <div className={style.filterItem}>
                <h1>Select Size</h1>

                <div className={style.form}>
                  {data[0].ItemCost.map((itemss) => {
                    return (
                      <div className={style.radioCard} key={itemss._id}>
                        <li>
                          <label>
                            <span>
                              <input
                                type="radio"
                                name="size"
                                onClick={() =>
                                  setItems(
                                    itemss.sizeName,
                                    itemss.Price,
                                    itemss._id
                                  )
                                }
                                value={itemss.sizeName}
                                defaultChecked={selected === itemss.sizeName}
                              />
                              {itemss.sizeName == "largesize"
                                ? "Large"
                                : itemss.sizeName == "smallsize"
                                ? "Small"
                                : itemss.sizeName == "mediumsize"
                                ? "Medium"
                                : itemss.sizeName == "halfsize"
                                ? "Half"
                                : itemss.sizeName == "normalsize"
                                ? "Normal"
                                : ""}
                            </span>
                          </label>
                        </li>
                      </div>
                    );
                  })}
                </div>
              </div>
              {!add ? (
                <button
                  className={style.btn3}
                  onClick={() => RemoveFromCart(data)}
                >
                  Remove From Cart
                </button>
              ) : (
                <button className={style.btn1} onClick={() => AddToCart(data)}>
                  Add To Cart
                </button>
              )}
              <button className={style.btn2} onClick={() => BuyNow(data)}>
                Buy Now
              </button>
            </div>
          </div>
          <div className={style.description}>{data[0].Description}</div>

          <div className={style.reviews} id="reviews">
            <div className={style.heading}>Rating & Reviews</div>

            <div className={style.box}>
              <div className={style.top}>
                <div className={style.avgRate}>
                  <h1>{avg} / 5</h1>
                  <div className={style.rates}>
                    <Rating
                      initialValue={avg}
                      readonly="true"
                      className={style.startIcon}
                      allowFraction
                    />
                    <p>Based On {revLen} rating</p>
                  </div>
                </div>

                <div className={style.totalStar}>
                  <li>
                    <div className={style.headings}>Quality</div>
                    <div className={style.progress}>
                      <div
                        className={style.pro}
                        style={{ width: `${quality}%` }}
                      ></div>
                    </div>
                    <div className={style.percent}>{quality}%</div>
                  </li>
                  <li>
                    <div className={style.headings}>Price</div>
                    <div className={style.progress}>
                      <div
                        className={style.pro}
                        style={{ width: `${prices}%` }}
                      ></div>
                    </div>
                    <div className={style.percent}>{prices}%</div>
                  </li>
                  <li>
                    <div className={style.headings}>Service</div>
                    <div className={style.progress}>
                      <div
                        className={style.pro}
                        style={{ width: `${service}%` }}
                      ></div>
                    </div>
                    <div className={style.percent}>{service}%</div>
                  </li>
                </div>
              </div>

              <div className={style.filterReview}>
                <div className={style.titles}>Reviewed by {revLen} user</div>

                <div className={style.filterSection}>
                  <div className={style.sections}>
                    <h1>
                      <FaSort /> Sort :{" "}
                    </h1>
                    <select>
                      <option value="">All Review</option>
                      <option value="">Latest First</option>
                      <option value="">Oldest First</option>
                    </select>
                  </div>

                  <div className={style.sections}>
                    <h1>
                      <FaFilter /> Filter :
                    </h1>
                    <select>
                      <option value="">All Star</option>
                      <option value="">5 Star</option>
                      <option value="">4 Star</option>
                      <option value="">3 Star</option>
                      <option value="">2 Star</option>
                      <option value="">1 Star</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* realreviews Corner */}
              <div className={style.reviewsSectionField}>
                <div className={style.childs}>
                  {ratingData[0] != undefined
                    ? ratingData[0].ItemsReviwers != undefined
                      ? ratingData[0].ItemsReviwers.map((item) => {
                          return (
                            <div className={style.reviewSection} key={item._id}>
                              <div className={style.topSection}>
                                <div className={style.starSection}>
                                  <Rating
                                    initialValue={item.QualityRate}
                                    readonly="true"
                                    size={30}
                                    fillColor="rgb(254, 58, 58)"
                                    allowFraction
                                  />
                                  <p> {item.QualityRate} / 5</p>
                                </div>
                                <div className={style.userDetails}>
                                  <h2>By : {item.userName}</h2>
                                </div>

                                <div className={style.icons}>
                                  <AiOutlineCalendar className={style.icon} />{" "}
                                  <p> {item.Date}</p>
                                  <BiTime className={style.icon} />{" "}
                                  <p>{item.Time} </p>
                                </div>
                              </div>

                              <div className={style.commentStyle}>
                                <p>{item.Message}</p>
                              </div>
                            </div>
                          );
                        })
                      :    <div className={style.reviewSection}>
                              <div className={style.topSection}>
                                <div className={style.starSection}>
                                  <Rating
                                    initialValue={5}
                                    readonly="true"
                                    size={30}
                                    fillColor="rgb(254, 58, 58)"
                                    allowFraction
                                  />
                                  <p> 5 / 5</p>
                                </div>
                                <div className={style.userDetails}>
                                  <h2>By : admin</h2>
                                </div>

                                <div className={style.icons}>
                                  <AiOutlineCalendar className={style.icon} />{" "}
                                  <p> -</p>
                                  <BiTime className={style.icon} />{" "}
                                  <p>- </p>
                                </div>
                              </div>

                              <div className={style.commentStyle}>
                                <p>No Comments yet on this Product</p>
                              </div>
                            </div>
                    : <><div className={style.reviewSection}>
                              <div className={style.topSection}>
                                <div className={style.starSection}>
                                  <Rating
                                    initialValue={5}
                                    readonly="true"
                                    size={30}
                                    fillColor="rgb(254, 58, 58)"
                                    allowFraction
                                  />
                                  <p> 5 / 5</p>
                                </div>
                                <div className={style.userDetails}>
                                  <h2>By : admin</h2>
                                </div>

                                <div className={style.icons}>
                                  <AiOutlineCalendar className={style.icon} />{" "}
                                  <p> -</p>
                                  <BiTime className={style.icon} />{" "}
                                  <p>- </p>
                                </div>
                              </div>

                              <div className={style.commentStyle}>
                                <p>No Comments yet on this Product</p>
                              </div>
                            </div>
<div className={style.reviewSection}>
                              <div className={style.topSection}>
                                <div className={style.starSection}>
                                  <Rating
                                    initialValue={5}
                                    readonly="true"
                                    size={30}
                                    fillColor="rgb(254, 58, 58)"
                                    allowFraction
                                  />
                                  <p> 5 / 5</p>
                                </div>
                                <div className={style.userDetails}>
                                  <h2>By : admin</h2>
                                </div>

                                <div className={style.icons}>
                                  <AiOutlineCalendar className={style.icon} />{" "}
                                  <p> -</p>
                                  <BiTime className={style.icon} />{" "}
                                  <p>- </p>
                                </div>
                              </div>

                              <div className={style.commentStyle}>
                                <p>No Comments yet on this Product</p>
                              </div>
                            </div>
</>}
                </div>

                {(allowComment==true)? (
                  <RateItem productIds={productId} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </>
      );
    } else if (coffeeFind != undefined) {
      return (
        <>
          <div className={style.topSection}>
            <div className={style.left}>
              <img
                src={`/CoffeeItemImages/${data[0].Image}`}
                alt="image"
                className={style.coffeImage}
              />
            </div>
            <div className={style.right}>
              <h1>{data[0].CoffeeName}</h1>
              <div className={style.star}>
                <div className={style.startSection}>
                  <Rating
                    initialValue="5"
                    readonly="true"
                    className={style.startIcon}
                    allowFraction
                  />

                  <h5>(1 Customer Review)</h5>
                </div>
              </div>
              <h3>₹ {price}</h3>
              <div className={style.subSection}>
                <div className={style.subHeading}>Qty :</div>
                <div className={style.subData}>{data[0].Qty}</div>
                <div className={style.subHeading}>Category :</div>
                <div className={style.subData}>{data[0].Category}</div>
              </div>
              <hr />

              <div className={style.filterItem}>
                <h1>Select Size</h1>
                <div className={style.form}>
                  {data[0].ItemCost.map((itemss) => {
                    return (
                      <div className={style.radioCard} key={itemss._id}>
                        <li>
                          <label>
                            <span>
                              <input
                                type="radio"
                                name="size"
                                onClick={() =>
                                  setItems(
                                    itemss.sizeName,
                                    itemss.Price,
                                    itemss._id
                                  )
                                }
                                value={itemss.sizeName}
                                defaultChecked={selected === itemss.sizeName}
                              />
                              {itemss.sizeName == "largesize"
                                ? "Large"
                                : itemss.sizeName == "smallsize"
                                ? "Small"
                                : itemss.sizeName == "mediumsize"
                                ? "Medium"
                                : itemss.sizeName == "halfsize"
                                ? "Half"
                                : itemss.sizeName == "normalsize"
                                ? "Normal"
                                : ""}
                            </span>
                          </label>
                        </li>
                      </div>
                    );
                  })}
                </div>
              </div>
              {!add ? (
                <button
                  className={style.btn3}
                  onClick={() => RemoveFromCart(data)}
                >
                  Remove From Cart
                </button>
              ) : (
                <button className={style.btn1} onClick={() => AddToCart(data)}>
                  Add To Cart
                </button>
              )}
              <button className={style.btn2} onClick={() => BuyNow(data)}>
                Buy Now
              </button>
            </div>
          </div>
          <div className={style.description}>{data[0].Description}</div>

          <div className={style.reviews} id="reviews">
            <div className={style.heading}>Rating & Reviews</div>

            <div className={style.box}>
              <div className={style.top}>
                <div className={style.avgRate}>
                  <h1>5 / 5</h1>
                  <div className={style.rates}>
                    <Rating
                      initialValue="5"
                      readonly="true"
                      className={style.startIcon}
                      allowFraction
                    />
                    <p>Based On 1 rating</p>
                  </div>
                </div>

                <div className={style.totalStar}>
                  <li>
                    <div className={style.headings}>Quality</div>
                    <div className={style.progress}></div>
                    <div className={style.percent}>100%</div>
                  </li>
                  <li>
                    <div className={style.headings}>Price</div>
                    <div className={style.progress}></div>
                    <div className={style.percent}>100%</div>
                  </li>
                  <li>
                    <div className={style.headings}>Service</div>
                    <div className={style.progress}></div>
                    <div className={style.percent}>100%</div>
                  </li>
                </div>
              </div>

              <div className={style.filterReview}>
                <div className={style.titles}>Reviewed by 1 user</div>

                <div className={style.filterSection}>
                  <div className={style.sections}>
                    <h1>
                      <FaSort /> Sort :{" "}
                    </h1>
                    <select>
                      <option value="">All Review</option>
                      <option value="">Latest First</option>
                      <option value="">Oldest First</option>
                    </select>
                  </div>

                  <div className={style.sections}>
                    <h1>
                      <FaFilter /> Filter :
                    </h1>
                    <select>
                      <option value="">All Star</option>
                      <option value="">5 Star</option>
                      <option value="">4 Star</option>
                      <option value="">3 Star</option>
                      <option value="">2 Star</option>
                      <option value="">1 Star</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* realreviews Corner */}
              <div className={style.reviewsSectionField}>
                <div className={style.childs}>
                  <div className={style.reviewSection}></div>
                </div>

                <RateItem />
              </div>
            </div>
          </div>
        </>
      );
    } else if (drinkFind != undefined) {
      return (
        <>
          <div className={style.topSection}>
            <div className={style.left}>
              <img
                src={`/DrinkItemImages/${data[0].Image}`}
                alt="image"
                className={style.drinkImage}
              />
            </div>
            <div className={style.right}>
              <h1>{data[0].DrinkName}</h1>
              <div className={style.star}>
                <div className={style.startSection}>
                  <Rating
                    initialValue="5"
                    readonly="true"
                    className={style.startIcon}
                    allowFraction
                  />

                  <h5>(1 Customer Review)</h5>
                </div>
              </div>
              <h3>₹ {price}</h3>
              <div className={style.subSection}>
                <div className={style.subHeading}>Qty :</div>
                <div className={style.subData}>{data[0].Qty}</div>
                <div className={style.subHeading}>Category :</div>
                <div className={style.subData}>{data[0].Category}</div>
              </div>
              <hr />

              <div className={style.filterItem}>
                <h1>Select Size</h1>
                <div className={style.form}>
                  {data[0].ItemCost.map((itemss) => {
                    return (
                      <div className={style.radioCard} key={itemss._id}>
                        <li>
                          <label>
                            <span>
                              <input
                                type="radio"
                                name="size"
                                onClick={() =>
                                  setItems(
                                    itemss.sizeName,
                                    itemss.Price,
                                    itemss._id
                                  )
                                }
                                value={itemss.sizeName}
                                defaultChecked={selected === itemss.sizeName}
                              />
                              {itemss.sizeName == "largesize"
                                ? "Large"
                                : itemss.sizeName == "smallsize"
                                ? "Small"
                                : itemss.sizeName == "mediumsize"
                                ? "Medium"
                                : itemss.sizeName == "halfsize"
                                ? "Half"
                                : itemss.sizeName == "normalsize"
                                ? "Normal"
                                : ""}
                            </span>
                          </label>
                        </li>
                      </div>
                    );
                  })}
                </div>
              </div>
              {!add ? (
                <button
                  className={style.btn3}
                  onClick={() => RemoveFromCart(data)}
                >
                  Remove From Cart
                </button>
              ) : (
                <button className={style.btn1} onClick={() => AddToCart(data)}>
                  Add To Cart
                </button>
              )}
              <button className={style.btn2} onClick={() => BuyNow(data)}>
                Buy Now
              </button>
            </div>
          </div>
          <div className={style.description}>{data[0].Description}</div>

          <div className={style.reviews} id="reviews">
            <div className={style.heading}>Rating & Reviews</div>

            <div className={style.box}>
              <div className={style.top}>
                <div className={style.avgRate}>
                  <h1>5 / 5</h1>
                  <div className={style.rates}>
                    <Rating
                      initialValue="5"
                      readonly="true"
                      className={style.startIcon}
                      allowFraction
                    />
                    <p>Based On 1 rating</p>
                  </div>
                </div>

                <div className={style.totalStar}>
                  <li>
                    <div className={style.headings}>Quality</div>
                    <div className={style.progress}></div>
                    <div className={style.percent}>100%</div>
                  </li>
                  <li>
                    <div className={style.headings}>Price</div>
                    <div className={style.progress}></div>
                    <div className={style.percent}>100%</div>
                  </li>
                  <li>
                    <div className={style.headings}>Service</div>
                    <div className={style.progress}></div>
                    <div className={style.percent}>100%</div>
                  </li>
                </div>
              </div>

              <div className={style.filterReview}>
                <div className={style.titles}>Reviewed by 1 user</div>

                <div className={style.filterSection}>
                  <div className={style.sections}>
                    <h1>
                      <FaSort /> Sort :{" "}
                    </h1>
                    <select>
                      <option value="">All Review</option>
                      <option value="">Latest First</option>
                      <option value="">Oldest First</option>
                    </select>
                  </div>

                  <div className={style.sections}>
                    <h1>
                      <FaFilter /> Filter :
                    </h1>
                    <select>
                      <option value="">All Star</option>
                      <option value="">5 Star</option>
                      <option value="">4 Star</option>
                      <option value="">3 Star</option>
                      <option value="">2 Star</option>
                      <option value="">1 Star</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* realreviews Corner */}
              <div className={style.reviewsSectionField}>
                <div className={style.childs}>
                  <div className={style.reviewSection}></div>

                  <div className={style.reviewSection}></div>
                  <div className={style.reviewSection}></div>
                  <div className={style.reviewSection}></div>
                  <div className={style.reviewSection}></div>
                  <div className={style.reviewSection}></div>
                  <div className={style.reviewSection}></div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (juiceFind != undefined) {
      return (
        <>
          <div className={style.topSection}>
            <div className={style.left}>
              <img
                src={`/JuiceItemImages/${data[0].Image}`}
                alt="image"
                className={style.juiceImage}
              />
            </div>
            <div className={style.right}>
              <h1>{data[0].JuiceName}</h1>
              <div className={style.star}>
                <div className={style.startSection}>
                  <Rating
                    initialValue="5"
                    readonly="true"
                    className={style.startIcon}
                    allowFraction
                  />

                  <h5>(1 Customer Review)</h5>
                </div>
              </div>
              <h3>₹ {price}</h3>
              <div className={style.subSection}>
                <div className={style.subHeading}>Qty :</div>
                <div className={style.subData}>{data[0].Qty}</div>
                <div className={style.subHeading}>Category :</div>
                <div className={style.subData}>{data[0].Category}</div>
              </div>
              <hr />

              <div className={style.filterItem}>
                <h1>Select Size</h1>

                <div className={style.form}>
                  {data[0].ItemCost.map((itemss) => {
                    return (
                      <div className={style.radioCard} key={itemss._id}>
                        <li>
                          <label>
                            <span>
                              <input
                                type="radio"
                                name="size"
                                onClick={() =>
                                  setItems(
                                    itemss.sizeName,
                                    itemss.Price,
                                    itemss._id
                                  )
                                }
                                value={itemss.sizeName}
                                defaultChecked={selected === itemss.sizeName}
                              />
                              {itemss.sizeName == "largesize"
                                ? "Large"
                                : itemss.sizeName == "smallsize"
                                ? "Small"
                                : itemss.sizeName == "mediumsize"
                                ? "Medium"
                                : itemss.sizeName == "halfsize"
                                ? "Half"
                                : itemss.sizeName == "normalsize"
                                ? "Normal"
                                : ""}
                            </span>
                          </label>
                        </li>
                      </div>
                    );
                  })}
                </div>
              </div>
              {!add ? (
                <button
                  className={style.btn3}
                  onClick={() => RemoveFromCart(data)}
                >
                  Remove From Cart
                </button>
              ) : (
                <button className={style.btn1} onClick={() => AddToCart(data)}>
                  Add To Cart
                </button>
              )}
              <button className={style.btn2} onClick={() => BuyNow(data)}>
                Buy Now
              </button>
            </div>
          </div>
          <div className={style.description}>{data[0].Description}</div>

          <div className={style.reviews} id="reviews">
            <div className={style.heading}>Rating & Reviews</div>

            <div className={style.box}>
              <div className={style.top}>
                <div className={style.avgRate}>
                  <h1>5 / 5</h1>
                  <div className={style.rates}>
                    <Rating
                      initialValue="5"
                      readonly="true"
                      className={style.startIcon}
                      allowFraction
                    />
                    <p>Based On 1 rating</p>
                  </div>
                </div>

                <div className={style.totalStar}>
                  <li>
                    <div className={style.headings}>Quality</div>
                    <div className={style.progress}></div>
                    <div className={style.percent}>100%</div>
                  </li>
                  <li>
                    <div className={style.headings}>Price</div>
                    <div className={style.progress}></div>
                    <div className={style.percent}>100%</div>
                  </li>
                  <li>
                    <div className={style.headings}>Service</div>
                    <div className={style.progress}></div>
                    <div className={style.percent}>100%</div>
                  </li>
                </div>
              </div>

              <div className={style.filterReview}>
                <div className={style.titles}>Reviewed by 1 user</div>

                <div className={style.filterSection}>
                  <div className={style.sections}>
                    <h1>
                      <FaSort /> Sort :{" "}
                    </h1>
                    <select>
                      <option value="">All Review</option>
                      <option value="">Latest First</option>
                      <option value="">Oldest First</option>
                    </select>
                  </div>

                  <div className={style.sections}>
                    <h1>
                      <FaFilter /> Filter :
                    </h1>
                    <select>
                      <option value="">All Star</option>
                      <option value="">5 Star</option>
                      <option value="">4 Star</option>
                      <option value="">3 Star</option>
                      <option value="">2 Star</option>
                      <option value="">1 Star</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* realreviews Corner */}
              <div className={style.reviewsSectionField}>
                <div className={style.childs}>
                  <div className={style.reviewSection}></div>

                  <div className={style.reviewSection}></div>
                  <div className={style.reviewSection}></div>
                  <div className={style.reviewSection}></div>
                  <div className={style.reviewSection}></div>
                  <div className={style.reviewSection}></div>
                  <div className={style.reviewSection}></div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <div className={Styles.admin}>
        <HeadTag title="Search Item" />
        <Header />
      </div>

      <div className={style.searchSection}>
        {/* top section */}

        <FilterCard />
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
