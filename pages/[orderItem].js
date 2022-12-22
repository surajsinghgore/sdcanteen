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
import RateItem from "./RateItem";
export default function OrderItem() {
  // item rate manage
  const [price, setPrice] = useState("");
  const [selected, setSelected] = useState("yes");
  const { addItem, removeItem, items, emptyCart } = useCart();
  const [add, setAdd] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  const query = router.query.orderItem;
const [productId,setProductId]=useState();
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
                {(localStorage.getItem('login')!=undefined)? <RateItem productIds={productId}/>:""}



              </div>
            </div>
          </div>
     
        </>
      );
    } 
    else if (coffeeFind != undefined) {
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
    } 
    else if (drinkFind != undefined) {
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
    } 
    else if (juiceFind != undefined) {
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
