import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import style from "../styles/SearchBar.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import Image from "next/image";
import { AllContext } from "../context/AllContext";
import { Rating } from "react-simple-star-rating";
import { useCart } from "react-use-cart";
import { FaSort } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { BiTime } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import RateItem from "./RateItem";
export default function OrderItem() {
  // item rate manage
  const { refresh } = useContext(AllContext);
  const [ratingData, setRatingData] = useState([]);
  const [copyData, setCopyData] = useState([]);
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
  const [rateSearch, setRateSearch] = useState();
  const [timeSearch, setTimeSearch] = useState();
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
          if (dataRess.data.length != 0) {
            setCopyData(dataRess.data);
            setRatingData(dataRess.data);
            setAvg(dataRess.data[0].Rating);
            setRevLen(dataRess.data[0].ItemsReviwers.length);
          } else {
            setCopyData([]);
            setRatingData([]);
            setAvg(5);
            setRevLen(0);
          }
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
            let findAvgCount = 0;
            let five = 0;
            if (dataRess.data.length != 0) {
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
            }
            if (ZeroPointFive != 0) {
              findAvgCount++;
            }
            if (OnePointFive != 0) {
              findAvgCount++;
            }
            if (TwoPointFive != 0) {
              findAvgCount++;
            }
            if (ThreePointFive != 0) {
              findAvgCount++;
            }
            if (FourPointFive != 0) {
              findAvgCount++;
            }
            if (One != 0) {
              findAvgCount++;
            }
            if (two != 0) {
              findAvgCount++;
            }
            if (three != 0) {
              findAvgCount++;
            }
            if (four != 0) {
              findAvgCount++;
            }
            if (five != 0) {
              findAvgCount++;
            }

            let calZeroPointFive = 0;
            let calOne = 0;
            let calOnePointFive = 0;
            let caltwo = 0;
            let calTwoPointFive = 0;
            let calthree = 0;
            let calThreePointFive = 0;
            let calfour = 0;
            let calFourPointFive = 0;
            let calfive = 0;
            if (ZeroPointFive != 0) {
              calZeroPointFive =
                ((ZeroPointFive * 0.5) / (5 * ZeroPointFive)) * 100;
            }
            if (OnePointFive != 0) {
              calOnePointFive =
                ((OnePointFive * 1.5) / (5 * OnePointFive)) * 100;
            }
            if (TwoPointFive != 0) {
              calTwoPointFive =
                ((TwoPointFive * 2.5) / (5 * TwoPointFive)) * 100;
            }
            if (ThreePointFive != 0) {
              calThreePointFive =
                ((ThreePointFive * 3.5) / (5 * ThreePointFive)) * 100;
            }
            if (FourPointFive != 0) {
              calFourPointFive =
                ((FourPointFive * 4.5) / (5 * FourPointFive)) * 100;
            }
            if (One != 0) {
              calOne = ((One * 1) / (5 * One)) * 100;
            }
            if (two != 0) {
              caltwo = ((two * 2) / (5 * two)) * 100;
            }
            if (three != 0) {
              calthree = ((three * 3) / (5 * three)) * 100;
            }
            if (four != 0) {
              calfour = ((four * 4) / (5 * four)) * 100;
            }
            if (five != 0) {
              calfive = ((five * 5) / (5 * five)) * 100;
            }

            let AllPercantegTotal =
              calZeroPointFive +
              calOne +
              calOnePointFive +
              caltwo +
              calTwoPointFive +
              calthree +
              calThreePointFive +
              calfour +
              calFourPointFive +
              calfive;
            let avgs = (AllPercantegTotal / (100 * findAvgCount)) * 100;
            setQuality(avgs);
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
            let findAvgCount = 0;
            let five = 0;
            if (dataRess.data.length != 0) {
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
            }
            if (ZeroPointFive != 0) {
              findAvgCount++;
            }
            if (OnePointFive != 0) {
              findAvgCount++;
            }
            if (TwoPointFive != 0) {
              findAvgCount++;
            }
            if (ThreePointFive != 0) {
              findAvgCount++;
            }
            if (FourPointFive != 0) {
              findAvgCount++;
            }
            if (One != 0) {
              findAvgCount++;
            }
            if (two != 0) {
              findAvgCount++;
            }
            if (three != 0) {
              findAvgCount++;
            }
            if (four != 0) {
              findAvgCount++;
            }
            if (five != 0) {
              findAvgCount++;
            }

            let calZeroPointFive = 0;
            let calOne = 0;
            let calOnePointFive = 0;
            let caltwo = 0;
            let calTwoPointFive = 0;
            let calthree = 0;
            let calThreePointFive = 0;
            let calfour = 0;
            let calFourPointFive = 0;
            let calfive = 0;
            if (ZeroPointFive != 0) {
              calZeroPointFive =
                ((ZeroPointFive * 0.5) / (5 * ZeroPointFive)) * 100;
            }
            if (OnePointFive != 0) {
              calOnePointFive =
                ((OnePointFive * 1.5) / (5 * OnePointFive)) * 100;
            }
            if (TwoPointFive != 0) {
              calTwoPointFive =
                ((TwoPointFive * 2.5) / (5 * TwoPointFive)) * 100;
            }
            if (ThreePointFive != 0) {
              calThreePointFive =
                ((ThreePointFive * 3.5) / (5 * ThreePointFive)) * 100;
            }
            if (FourPointFive != 0) {
              calFourPointFive =
                ((FourPointFive * 4.5) / (5 * FourPointFive)) * 100;
            }
            if (One != 0) {
              calOne = ((One * 1) / (5 * One)) * 100;
            }
            if (two != 0) {
              caltwo = ((two * 2) / (5 * two)) * 100;
            }
            if (three != 0) {
              calthree = ((three * 3) / (5 * three)) * 100;
            }
            if (four != 0) {
              calfour = ((four * 4) / (5 * four)) * 100;
            }
            if (five != 0) {
              calfive = ((five * 5) / (5 * five)) * 100;
            }

            let AllPercantegTotal =
              calZeroPointFive +
              calOne +
              calOnePointFive +
              caltwo +
              calTwoPointFive +
              calthree +
              calThreePointFive +
              calfour +
              calFourPointFive +
              calfive;
            let avgs = (AllPercantegTotal / (100 * findAvgCount)) * 100;

            setPrices(avgs);
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
            let findAvgCount = 0;
            let five = 0;
            if (dataRess.data.length != 0) {
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
            }
            if (ZeroPointFive != 0) {
              findAvgCount++;
            }
            if (OnePointFive != 0) {
              findAvgCount++;
            }
            if (TwoPointFive != 0) {
              findAvgCount++;
            }
            if (ThreePointFive != 0) {
              findAvgCount++;
            }
            if (FourPointFive != 0) {
              findAvgCount++;
            }
            if (One != 0) {
              findAvgCount++;
            }
            if (two != 0) {
              findAvgCount++;
            }
            if (three != 0) {
              findAvgCount++;
            }
            if (four != 0) {
              findAvgCount++;
            }
            if (five != 0) {
              findAvgCount++;
            }

            let calZeroPointFive = 0;
            let calOne = 0;
            let calOnePointFive = 0;
            let caltwo = 0;
            let calTwoPointFive = 0;
            let calthree = 0;
            let calThreePointFive = 0;
            let calfour = 0;
            let calFourPointFive = 0;
            let calfive = 0;
            if (ZeroPointFive != 0) {
              calZeroPointFive =
                ((ZeroPointFive * 0.5) / (5 * ZeroPointFive)) * 100;
            }
            if (OnePointFive != 0) {
              calOnePointFive =
                ((OnePointFive * 1.5) / (5 * OnePointFive)) * 100;
            }
            if (TwoPointFive != 0) {
              calTwoPointFive =
                ((TwoPointFive * 2.5) / (5 * TwoPointFive)) * 100;
            }
            if (ThreePointFive != 0) {
              calThreePointFive =
                ((ThreePointFive * 3.5) / (5 * ThreePointFive)) * 100;
            }
            if (FourPointFive != 0) {
              calFourPointFive =
                ((FourPointFive * 4.5) / (5 * FourPointFive)) * 100;
            }
            if (One != 0) {
              calOne = ((One * 1) / (5 * One)) * 100;
            }
            if (two != 0) {
              caltwo = ((two * 2) / (5 * two)) * 100;
            }
            if (three != 0) {
              calthree = ((three * 3) / (5 * three)) * 100;
            }
            if (four != 0) {
              calfour = ((four * 4) / (5 * four)) * 100;
            }
            if (five != 0) {
              calfive = ((five * 5) / (5 * five)) * 100;
            }

            let AllPercantegTotal =
              calZeroPointFive +
              calOne +
              calOnePointFive +
              caltwo +
              calTwoPointFive +
              calthree +
              calThreePointFive +
              calfour +
              calFourPointFive +
              calfive;
            let avgs = (AllPercantegTotal / (100 * findAvgCount)) * 100;

            setService(avgs);
          }

          QualityRateCalculate();
          PriceRateCalculate();
          ServiceRateCalculate();
        }
      }
    };
    dataRatingFetch();
  }, [refresh, productId]);

  // check wheater rating is allowed or not
  useEffect(() => {
    const check = async () => {
      if (localStorage.getItem("login") != undefined) {
        if (productId != undefined) {
          let fetchRes = await fetch(
            `${HOST}/api/ValidateRatingOrNot?productId=${productId}`
          );
          if (fetchRes.status == 404) {
            setAllowComment(false);
          }
          if (fetchRes.status == 201) {
            setAllowComment(true);
          }
        }
      }
    };

    check();
  }, [productId, refresh]);

  // filter using rating star
  const filterUsingRate = (e) => {
    setRateSearch(e.target.value);
    // orginialData
    let datas = copyData;
    if (e.target.value == "all") {
      const dataRatingFetch = async () => {
        if (productId != undefined) {
          let fetchRate = await fetch(
            `${HOST}/api/ShowRatingOfItems?productId=${productId}`
          );
          const dataRess = await fetchRate.json();
          if (fetchRate.status == 201) {
            setRatingData(dataRess.data);
            setCopyData(dataRess.data);
          }
        }
      };
      dataRatingFetch();
    }

    if (datas != undefined) {
      var filteredArray = datas
        .filter((element) =>
          element.ItemsReviwers.some(
            (subElement) => subElement.QualityRate === e.target.value
          )
        )
        .map((element) => {
          let n = Object.assign({}, element, {
            ItemsReviwers: element.ItemsReviwers.filter(
              (subElement) => subElement.QualityRate === e.target.value
            ),
          });
          return n;
        });

      setRatingData(filteredArray);
    }
  };
  //filter using lattest or oldest
  const fetchOldData = async () => {
    if (productId != undefined) {
      let fetchRate = await fetch(
        `${HOST}/api/SortRatingOldest?productId=${productId}`
      );
      let data = await fetchRate.json();
      setRatingData(data.data);
    }
  };
  const fetchNewData = async () => {
    if (productId != undefined) {
      let fetchRate = await fetch(
        `${HOST}/api/SortRatingInLatest?productId=${productId}`
      );
      let data = await fetchRate.json();
      setRatingData(data.data);
    }
  };
  const filterUsingTime = (e) => {
    setTimeSearch(e.target.value);
    if (e.target.value == "all") {
      const dataRatingFetch = async () => {
        if (productId != undefined) {
          let fetchRate = await fetch(
            `${HOST}/api/ShowRatingOfItems?productId=${productId}`
          );
          const dataRess = await fetchRate.json();
          if (fetchRate.status == 201) {
            setRatingData(dataRess.data);
            setCopyData(dataRess.data);
          }
        }
      };
      dataRatingFetch();
    }
    if (e.target.value == "oldest") {
      fetchOldData();
    }
    if (e.target.value == "latest") {
      fetchNewData();
    }
  };


// report comment
const reportComment=(item)=>{
console.log(item)
if(localStorage.getItem('login')!='true'||localStorage.getItem('login')==undefined){
      toast.warn("Please Login With Clinet Credentials", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const redirectClient=()=>{
      router.push('/ClientLogin')
      }
      setTimeout(redirectClient,1500);
      return ;
}
 confirmAlert({
      title: "Confirm to Report ",
      message: "Are you sure to report this comment ?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
         let CommentReportId=item._id;
         let Message=item.Message;
         let UserId=item.userId;

         if(CommentReportId==undefined || CommentReportId==""){
          toast.warn("Please Try Again", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
         } 
          if(Message==undefined || Message==""){
          toast.warn("Please Try Again", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
         } 
          if(UserId==undefined || UserId==""){
          toast.warn("Please Try Again", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
         } 
            let res = await fetch(`${HOST}/api/ReportComments`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                CommentReportId: CommentReportId,
                Message: Message,UserId:UserId
              }),
            });

            let data = await res.json();
  if (res.status == 401) {
         toast.error(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
      }
        if (res.status == 400) {
         toast.warn(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
      }
      if (res.status == 501) {
         toast.warn("Internal Server Error", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
      }
 toast.success(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
}
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
                  <h1>{parseFloat(avg).toFixed(2)} / 5</h1>
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
                    <div className={style.percent}>{parseInt(quality)}%</div>
                  </li>
                  <li>
                    <div className={style.headings}>Price</div>
                    <div className={style.progress}>
                      <div
                        className={style.pro}
                        style={{ width: `${prices}%` }}
                      ></div>
                    </div>
                    <div className={style.percent}>{parseInt(prices)}%</div>
                  </li>
                  <li>
                    <div className={style.headings}>Service</div>
                    <div className={style.progress}>
                      <div
                        className={style.pro}
                        style={{ width: `${service}%` }}
                      ></div>
                    </div>
                    <div className={style.percent}>{parseInt(service)}%</div>
                  </li>
                </div>
              </div>
              {/* filter search logic */}
              <div className={style.filterReview}>
                <div className={style.titles}>Reviewed by {revLen} user</div>
                <div className={style.filterSection}>
                  <div className={style.sections}>
                    <h1>
                      <FaSort /> Sort :{" "}
                    </h1>
                    <select
                      value={timeSearch}
                      onChange={(e) => filterUsingTime(e)}
                    >
                      <option value="all">All Reviews</option>
                      <option value="latest">Latest Order</option>
                      <option value="oldest">Oldest Order</option>
                    </select>
                  </div>

                  <div className={style.sections}>
                    <h1>
                      <FaFilter /> Filter :
                    </h1>
                    <select
                      value={rateSearch}
                      onChange={(e) => filterUsingRate(e)}
                    >
                      <option value="all">All Star</option>
                      <option value="5">5 Star</option>
                      <option value="4.5">4.5 Star</option>
                      <option value="4">4 Star</option>
                      <option value="3.5">3.5 Star</option>
                      <option value="3">3 Star</option>
                      <option value="2.5">2.5 Star</option>
                      <option value="2">2 Star</option>
                      <option value="1.5">1.5 Star</option>
                      <option value="1">1 Star</option>
                      <option value="0.5">0.5 Star</option>
                    </select>
                  </div>
                </div>
              </div>


              {/* realreviews Corner */}
              <div className={style.reviewsSectionField}>
                <div className={style.childs}>
                  {ratingData[0] != undefined ? (
                    ratingData[0].ItemsReviwers != undefined ? (
                      ratingData[0].ItemsReviwers.map((item) => {
                        return (
                          <div className={style.reviewSection} key={item._id}>
                            <div className={style.topSection}>
                              <div className={style.starSection}>
                                <Rating
                                  initialValue={item.QualityRate}
                                  readonly="true"
                                  size={30}
                                  fillColor="rgb(18, 124, 156)"
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
                          <GoReport className={style.reportBtn} title="Report This Comment" onClick={()=>reportComment(item)}/>
                          </div>
                        );
                      })
                    ) : (
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
                            <BiTime className={style.icon} /> <p>- </p>
                          </div>
                        </div>

                        <div className={style.commentStyle}>
                          <p>No Comments yet on this Product</p>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className={style.reviewSection}>
                      <div className={style.topSection}>
                        <div className={style.starSection}>
                          <Rating
                            initialValue={0}
                            readonly="true"
                            size={30}
                            fillColor="rgb(254, 58, 58)"
                            allowFraction
                          />
                          <p> - / -</p>
                        </div>
                        <div className={style.userDetails}>
                          <h2>By : admin</h2>
                        </div>

                        <div className={style.icons}>
                          <AiOutlineCalendar className={style.icon} /> <p> -</p>
                          <BiTime className={style.icon} /> <p>- </p>
                        </div>
                      </div>

                      <div className={style.commentStyle}>
                        <p>No Reviews Found</p>
                      </div>
                    </div>
                  )}
                </div>

                {allowComment == true ? (
                  <RateItem productIds={productId} />
                ) : (
                  ""
                )}
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
