import React, { useContext,useState, useEffect } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import VerifyAdminLogin from './VerifyAdminLogin';

import { AllContext } from "../../context/AllContext";
import Link from "next/link";
let HOST = process.env.NEXT_PUBLIC_API_URL;


 function UpdateFoodItemForm() {
  const { filterFoodItemsData } = useContext(AllContext);

  const [data, setData] = useState([]);
  // form ates
  const [FoodName, setFoodName] = useState();
  const [Price, setPrice] = useState();
  const [Qtys, setQtys] = useState();
  const [Category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState('');

  useEffect(() => {
    if (filterFoodItemsData) {
      setFoodName(filterFoodItemsData[0].FoodName);
      setPrice(filterFoodItemsData[0].Price);
      setQtys(filterFoodItemsData[0].Qty);
      setCategory(filterFoodItemsData[0].Category);
         setSubCategory(filterFoodItemsData[0].Category)

    }
    async function dataFetch() {
      let ress = await fetch(`${HOST}/api/ShowFoodCategory`);
      let datas = await ress.json();
      await setData(datas.data);
    }
    dataFetch();
  }, [filterFoodItemsData]);

  const updateItems = async (e) => {
    e.preventDefault();
    if (!FoodName) {
      toast.warn("Please Enter Food Name", {
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
      toast.warn("Please Enter Food Price", {
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
    let FOODNAMESAME = filterFoodItemsData.filter((item) => {
      return item.FoodName == FoodName;
    });

    let PRICESAME = filterFoodItemsData.filter((item) => {
      return item.Price == Price;
    });
    let QTYSAME = filterFoodItemsData.filter((item) => {
      return item.Qty == Qtys;
    });
    let CATEGORYSAME = filterFoodItemsData.filter((item) => {
      return item.Category == Category;
    });

    if (!FOODNAMESAME.length == 0) {
      if (!PRICESAME.length == 0) {
        if (!QTYSAME.length == 0) {
          if (!CATEGORYSAME.length == 0) {
            toast.warn(
              "Same Data Is Not Allowed To Update, Please Update Food Item Records",
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

    let response = await fetch(`${HOST}/api/UpdateFoodItem`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      
      },
      body: JSON.stringify({
        _id: filterFoodItemsData[0]._id,
        FoodName: FoodName,
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
      toast.success(`${FoodName} is Successfully Added`, {
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
        router.push("/admin/UpdateFoodItem");
      }
    }
  };

  return (
    <div className={Styles.admin}>
      <HeadTag title="Update Food Item Form" />
<VerifyAdminLogin />
      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Update Food Item Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Update Food Item"
          subsectionURL="/admin/UpdateFoodItem"
          current="UPDATE FOOD ITEM GENERAL DATA"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Enter New Food Item For Website</h1>
          </div>
          <div className={StyleFood.form_element}>
            <div
              className="imageChange"
              style={{ textAlign: "center", color: "blue" }}
            >
              <h3>
                <Link href="/admin/UpdateFoodImage">
                  Click Here To Change Food Item Image
                </Link>
              </h3>
            </div>
            <li>
              <p>
                Enter Food Name <span>*</span>
              </p>
              <input
                type="text"
                name="foodName"
                value={FoodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </li>
            <li>
              <p>
                Enter Food Price <span>*</span>
              </p>
              <input
                type="number"
                name="foodPrice"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </li>

            <li>
              <p>Enter Food Qty</p>
              <input
                type="text"
                name="foodQty"
                value={Qtys}
                onChange={(e) => setQtys(e.target.value)}
              />
            </li>

            <li>
              <p>Enter Food Category</p>
              <select
                name="foodcategory"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                  <option value={subCategory}>
                 {subCategory}
                </option>
                {data.map((item, index) => {
                  return (
                    <option value={item.FoodCategoryName} key={index}>
                      {item.FoodCategoryName}
                    </option>
                  );
                })}
              </select>
            </li>
            <button onClick={updateItems}> UPDATE FOOD</button>
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


export default  UpdateFoodItemForm;