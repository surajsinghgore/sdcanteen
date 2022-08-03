import React, { useState, useEffect } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
let HOST = process.env.NEXT_PUBLIC_API_URL;

export default function AddDrinkItem() {
  const [data, setData] = useState([]);
  // form ates
  const [drinkName, setDrinkName] = useState("");
  const [Price, setPrice] = useState("");
  const [Qtys, setQtys] = useState("");
  const [Category, setCategory] = useState("");
  const [Images, setImages] = useState("");
  const [imgs, setImgs] = useState();
  const [showImage, setShowImage] = useState(true);
  const [files, setFiles] = useState("");

  // images handle
  const handleChange = async (e) => {
    if (e.target.files[0]) {
      var file = e.target.files[0];
      setFiles(file);
      let url = await URL.createObjectURL(file);
      setImgs(url);
      setImages(url);
      setShowImage(false);
    } else {
      setShowImage(true);
    }
  };

  const AddDrinkItem = async (e) => {
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
    if (!Images) {
      toast.warn("Please Uploard Drink Image", {
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

    const data = new FormData();
    data.append("DrinkName", drinkName);
    data.append("Price", Price);
    data.append("Qty", Qtys);
    data.append("Category", Category);
    data.append("Image", files);

    let res = await fetch(`${HOST}/api/AddDrinkItem`, {
      method: "POST",
      headers: {
        admintoken: localStorage.getItem("admintoken"),
      },
      body: data,
    });

    if (data.status == "403") {
      toast.error("Please Login With Admin Credentials", {
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
        router.push("/admin/Login");
      }
      return 0;
    }
    if (res.status === 500) {
      toast.error("Only JPG , PNG , JPEG Images are Allowed To Upload", {
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
    let datas = await res.json();

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
    // dublicate error message
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
        router.push("/admin/ShowDrinkItem");
      }
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      router.push("/admin/Login");
    }
    async function dataFetch() {
      let ress = await fetch(`${HOST}/api/ShowDrinkCategory`);
      let datas = await ress.json();
      await setData(datas.data);
    }
    dataFetch();
  }, []);

  return (
    <div className={Styles.admin}>
      <HeadTag title="Add Drink Item" />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Add Drink Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection=""
          subsectionURL="/admin/ShowDrinkItem"
          current="ADD DRINK ITEM"
        />

        {/* form add food */}

        <div className={StyleFood.Form} style={{ marginTop: "0.5%" }}>
          <div className={StyleFood.heading}>
            <h1>Enter New Drink Item For Website</h1>
          </div>
          <div className={StyleFood.form_element}>
            <li>
              <p>
                Enter Drink Name <span>*</span>
              </p>
              <input
                type="text"
                name="DrinkName"
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
                <option value="no">Select Category</option>
                {data.map((item, index) => {
                  return (
                    <option value={item.DrinkCategoryName} key={index}>
                      {item.DrinkCategoryName}
                    </option>
                  );
                })}
              </select>
            </li>
            <li>
              <p>
                Uploard Drink Photo <span>*</span>
              </p>
              <input
                type="file"
                name="photo"
                id="photoDrink"
                onChange={handleChange}
              />
            </li>
            <li>
              <p>Photo Realtime Preview</p>
              <div className={StyleFood.preview_photo}>
                {showImage ? (
                  <h1>please uploard Image</h1>
                ) : (
                  <Image
                    src={imgs}
                    alt=""
                    id="output"
                    width={600}
                    height={600}
                  />
                )}
              </div>
            </li>
            <button onClick={AddDrinkItem}> ADD DRINK</button>
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
