import React, { useContext ,useState, useEffect } from "react";
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
export default function UpdateJuiceItemForm() {
  const { filterJuiceItemsData } = useContext(AllContext);

  const [data, setData] = useState([]);
  const [juiceName, setJuiceName] = useState();
  const [Price, setPrice] = useState();
  const [Qtys, setQtys] = useState();
  const [Category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState('');

  useEffect(() => {
    if (filterJuiceItemsData) {
      setJuiceName(filterJuiceItemsData[0].JuiceName);
      setPrice(filterJuiceItemsData[0].Price);
      setQtys(filterJuiceItemsData[0].Qty);
      setCategory(filterJuiceItemsData[0].Category);
         setSubCategory(filterJuiceItemsData[0].Category)

    }
    async function dataFetch() {
      let ress = await fetch(`${HOST}/api/ShowJuiceCategory`);
      let datas = await ress.json();
      await setData(datas.data);
    }
    dataFetch();
  }, [filterJuiceItemsData]);

  const updateItems = async (e) => {
    e.preventDefault();
    if (!juiceName) {
      toast.warn("Please Enter Juice Name", {
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
      toast.warn("Please Enter Juice Price", {
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
    let FOODNAMESAME = filterJuiceItemsData.filter((item) => {
      return item.JuiceName == juiceName;
    });

    let PRICESAME = filterJuiceItemsData.filter((item) => {
      return item.Price == Price;
    });
    let QTYSAME = filterJuiceItemsData.filter((item) => {
      return item.Qty == Qtys;
    });
    let CATEGORYSAME = filterJuiceItemsData.filter((item) => {
      return item.Category == Category;
    });

    if (!FOODNAMESAME.length == 0) {
      if (!PRICESAME.length == 0) {
        if (!QTYSAME.length == 0) {
          if (!CATEGORYSAME.length == 0) {
            toast.warn(
              "Same Data Is Not Allowed To Update, Please Update Juice Item Records",
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

    let response = await fetch(`${HOST}/api/UpdateJuiceItem`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        admintoken: localStorage.getItem("admintoken"),
      },
      body: JSON.stringify({
        _id: filterJuiceItemsData[0]._id,
        JuiceName: juiceName,
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
      toast.success(`${juiceName} is Successfully Added`, {
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
        router.push("/admin/UpdateJuiceItem");
      }
    }
  };

  return (
    <div className={Styles.admin}>
      <HeadTag title="Update Juice Item Form" />
      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Update Juice Item Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Update Juice Item"
          subsectionURL="/admin/UpdateJuiceItem"
          current="UPDATE JUICE ITEM GENERAL DATA"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Enter New Juice Item For Website</h1>
          </div>
          <div className={StyleFood.form_element}>
            <div
              className="imageChange"
              style={{ textAlign: "center", color: "blue" }}
            >
              <h3>
                <Link href="/admin/UpdateJuiceImage">
                  Click Here To Change Juice Item Image
                </Link>
              </h3>
            </div>
            <li>
              <p>
                Enter Juice Name <span>*</span>
              </p>
              <input
                type="text"
                name="juiceName"
                value={juiceName}
                onChange={(e) => setJuiceName(e.target.value)}
              />
            </li>
            <li>
              <p>
                Enter Juice Price <span>*</span>
              </p>
              <input
                type="number"
                name="JuicePrice"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </li>

            <li>
              <p>Enter Juice Qty</p>
              <input
                type="text"
                name="JuiceQty"
                value={Qtys}
                onChange={(e) => setQtys(e.target.value)}
              />
            </li>

            <li>
              <p>Enter Juice Category</p>
              <select
                name="Juicecategory"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={subCategory}>
                 {subCategory}
                </option>
                {data.map((item, index) => {
                  return (
                    <option value={item.JuiceCategoryName} key={index}>
                      {item.JuiceCategoryName}
                    </option>
                  );
                })}
              </select>
            </li>
            <button onClick={updateItems}> UPDATE JUICE</button>
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
