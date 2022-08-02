import React, { useContext } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../Components/Head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from "../Components/PathNavigate";
import AdminRightInnerHeader from "../Components/AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import router from "next/router";
import { AllContext } from "../context/AllContext";
import Link from "next/link";
let HOST = process.env.NEXT_PUBLIC_API_URL;

export default function UpdateCoffeeItemForm() {
  const { filterCoffeeItemsData } = useContext(AllContext);

  const [data, setData] = useState([]);
  // form ates
  const [CoffeeName, setCoffeeName] = useState();
  const [Price, setPrice] = useState();
  const [Qtys, setQtys] = useState();
  const [Category, setCategory] = useState();

  useEffect(() => {
    if (filterCoffeeItemsData) {
      setCoffeeName(filterCoffeeItemsData[0].CoffeeName);
      setPrice(filterCoffeeItemsData[0].Price);
      setQtys(filterCoffeeItemsData[0].Qty);
      setCategory(filterCoffeeItemsData[0].Category);
    }
    async function dataFetch() {
      let ress = await fetch(`${HOST}/api/ShowCoffeeCategory`);
      let datas = await ress.json();
      await setData(datas.data);
    }
    dataFetch();
  }, [filterCoffeeItemsData]);

  const updateItems = async (e) => {
    e.preventDefault();
    if (!CoffeeName) {
      toast.warn("Please Enter Coffee Name", {
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
      toast.warn("Please Enter Coffee Price", {
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
    let FOODNAMESAME = filterCoffeeItemsData.filter((item) => {
      return item.CoffeeName == CoffeeName;
    });

    let PRICESAME = filterCoffeeItemsData.filter((item) => {
      return item.Price == Price;
    });
    let QTYSAME = filterCoffeeItemsData.filter((item) => {
      return item.Qty == Qtys;
    });
    let CATEGORYSAME = filterCoffeeItemsData.filter((item) => {
      return item.Category == Category;
    });

    if (!FOODNAMESAME.length == 0) {
      if (!PRICESAME.length == 0) {
        if (!QTYSAME.length == 0) {
          if (!CATEGORYSAME.length == 0) {
            toast.warn(
              "Same Data Is Not Allowed To Update, Please Update Coffee Item Records",
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

    let response = await fetch(`${HOST}/api/UpdateCoffeeItem`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        admintoken: localStorage.getItem("admintoken"),
      },
      body: JSON.stringify({
        _id: filterCoffeeItemsData[0]._id,
        CoffeeName: CoffeeName,
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
      toast.success(`${CoffeeName} is Successfully Added`, {
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
        router.push("/admin/UpdateCoffeeItem");
      }
    }
  };

  return (
    <div className={Styles.admin}>
      <HeadTag title="Update Coffee Item" />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Update Coffee Item Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Update Coffee Item"
          subsectionURL="/admin/UpdateCoffeeItem"
          current="UPDATE COFFEE ITEM GENERAL DATA"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Enter New Coffee Item For Website</h1>
          </div>
          <div className={StyleFood.form_element}>
            <div
              className="imageChange"
              style={{ textAlign: "center", color: "blue" }}
            >
              <h3>
                <Link href="/admin/UpdateCoffeeImage">
                  Click Here To Change Coffee Item Image
                </Link>
              </h3>
            </div>
            <li>
              <p>
                Enter Coffee Name <span>*</span>
              </p>
              <input
                type="text"
                name="CoffeeName"
                value={CoffeeName}
                onChange={(e) => setCoffeeName(e.target.value)}
              />
            </li>
            <li>
              <p>
                Enter Coffee Price <span>*</span>
              </p>
              <input
                type="number"
                name="CoffeePrice"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </li>

            <li>
              <p>Enter Coffee Qty</p>
              <input
                type="text"
                name="CoffeeQty"
                value={Qtys}
                onChange={(e) => setQtys(e.target.value)}
              />
            </li>

            <li>
              <p>Enter Coffee Category</p>
              <select
                name="Coffeecategory"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={filterCoffeeItemsData[0].Category}>
                  {filterCoffeeItemsData[0].Category}
                </option>
                {data.map((item, index) => {
                  return (
                    <option value={item.CoffeeCategoryName} key={index}>
                      {item.CoffeeCategoryName}
                    </option>
                  );
                })}
              </select>
            </li>
            <button onClick={updateItems}> UPDATE COFFEE</button>
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
