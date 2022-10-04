import React, { useContext, useState, useEffect } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import { AllContext } from "../../context/AllContext";
import Link from "next/link";
let HOST = process.env.NEXT_PUBLIC_API_URL;

import VerifyAdminLogin from './VerifyAdminLogin';


export default function UpdateDrinkItemForm() {
  const { filterDrinkItemsData } = useContext(AllContext);

  const [data, setData] = useState([]);
  // form ates
  const [drinkName, setDrinkName] = useState();
  const [Price, setPrice] = useState();
  const [Qtys, setQtys] = useState();
  const [Category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState('');

  useEffect(() => {
    if (filterDrinkItemsData) {
      setDrinkName(filterDrinkItemsData[0].DrinkName);
      setPrice(filterDrinkItemsData[0].Price);
      setQtys(filterDrinkItemsData[0].Qty);
      setCategory(filterDrinkItemsData[0].Category);
         setSubCategory(filterDrinkItemsData[0].Category)
    }
    async function dataFetch() {
      let ress = await fetch(`${HOST}/api/ShowDrinkCategory`);
      let datas = await ress.json();
      await setData(datas.data);
    }
    dataFetch();
  }, [filterDrinkItemsData]);

  const updateItems = async (e) => {
    e.preventDefault();
    if (!drinkName) {
      toast.warn("Please Enter Drink Name", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return 0;
    }
    if (!Price) {
      toast.warn("Please Enter Drink Price", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return 0;
    }

    // matching Weather Data Change OR Not
    let FOODNAMESAME = filterDrinkItemsData.filter((item) => {
      return item.DrinkName == drinkName;
    });

    let PRICESAME = filterDrinkItemsData.filter((item) => {
      return item.Price == Price;
    });
    let QTYSAME = filterDrinkItemsData.filter((item) => {
      return item.Qty == Qtys;
    });
    let CATEGORYSAME = filterDrinkItemsData.filter((item) => {
      return item.Category == Category;
    });

    if (!FOODNAMESAME.length == 0) {
      if (!PRICESAME.length == 0) {
        if (!QTYSAME.length == 0) {
          if (!CATEGORYSAME.length == 0) {
            toast.warn(
              "Same Data Is Not Allowed To Update, Please Update Drink Item Records",
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
            return 0;
          }
        }
      }
    }

    let response = await fetch(`${HOST}/api/UpdateDrinkItem`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",

      },
      body: JSON.stringify({
        _id: filterDrinkItemsData[0]._id,
        DrinkName: drinkName,
        Price: Price,
        Qty: Qtys,
        Category: Category,
      }),
    });

    let datas = await response.json();

    if (datas.status == "501") {
      toast.error(`${datas.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return 0;
    }

    if (datas.status == "400") {
      toast.warn(`${datas.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return 0;
    }

    if (datas.status == "201") {
      toast.success(`${drinkName} is Successfully Added`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(RedirectFunction, 1000);
      function RedirectFunction() {
        router.push("/admin/UpdateDrinkItem");
      }
    }
  };

  return (
    <div className={Styles.admin}>
      <HeadTag title="Update Drink Item Form" />
<VerifyAdminLogin />


      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Update Drink Item Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Update Drink Item"
          subsectionURL="/admin/UpdateDrinkItem"
          current="UPDATE DRINK ITEM GENERAL DATA"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Enter New Drink Item For Website</h1>
          </div>
          <div className={StyleFood.form_element}>
            <div
              className="imageChange"
              style={{ textAlign: "center", color: "blue" }}
            >
              <h3>
                <Link href="/admin/UpdateDrinkImage">
                  Click Here To Change Drink Item Image
                </Link>
              </h3>
            </div>
            <li>
              <p>
                Enter Drink Name <span>*</span>
              </p>
              <input
                type="text"
                name="drinkName"
                value={drinkName}
                onChange={(e) => setDrinkName(e.target.value)}
              />
            </li>
            <li>
              <p>
                Enter Drink Price <span>*</span>
              </p>
              <input
                type="number"
                name="DrinkPrice"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </li>

            <li>
              <p>Enter Drink Qty</p>
              <input
                type="text"
                name="DrinkQty"
                value={Qtys}
                onChange={(e) => setQtys(e.target.value)}
              />
            </li>

            <li>
              <p>Enter Drink Category</p>
              <select
                name="Drinkcategory"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={subCategory}>
                 {subCategory}
                </option>
                {data.map((item, index) => {
                  return (
                    <option value={item.DrinkCategoryName} key={index}>
                      {item.DrinkCategoryName}
                    </option>
                  );
                })}
              </select>
            </li>
            <button onClick={updateItems}> UPDATE DRINK</button>
          </div>
        </div>
      </div>
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
    </div>
  );
}

