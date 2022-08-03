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

export default function AddFoodItem() {
  const [data, setData] = useState([]);
  const [FoodName, setFoodName] = useState("");
  const [Price, setPrice] = useState("");
  const [Qtys, setQtys] = useState("");
  const [Category, setCategory] = useState("");
  const [Images, setImages] = useState("");
  const [imgs, setImgs] = useState();
  const [showImage, setShowImage] = useState(true);
  const [files, setFiles] = useState("");

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

  const AddFoodItem = async (e) => {
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
    if (!Images) {
      toast.warn("Please Uploard Food Image", {
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
    data.append("FoodName", FoodName);
    data.append("Price", Price);
    data.append("Qty", Qtys);
    data.append("Category", Category);
    data.append("Image", files);

    let res = await fetch(`${HOST}/api/AddFoodItem`, {
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
        router.push("/admin/ShowFoodItem");
      }
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      router.push("/admin/Login");
    }
    async function dataFetch() {
      let ress = await fetch(`${HOST}/api/ShowFoodCategory`);
      let datas = await ress.json();
      await setData(datas.data);
    }
    dataFetch();
  }, []);

  return (
    <div className={Styles.admin}>
      <HeadTag title="Add Food Item" />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Add Food Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection=""
          subsectionURL="/admin/ShowFoodItem"
          current="ADD FOOD ITEM"
        />

        {/* form add food */}

        <div className={StyleFood.Form} style={{ marginTop: "0.5%" }}>
          <div className={StyleFood.heading}>
            <h1>Enter New Food Item For Website</h1>
          </div>
          <div className={StyleFood.form_element}>
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
                <option value="no">Select Category</option>
                {data.map((item, index) => {
                  return (
                    <option value={item.FoodCategoryName} key={index}>
                      {item.FoodCategoryName}
                    </option>
                  );
                })}
              </select>
            </li>
            <li>
              <p>
                Uploard Food Photo <span>*</span>
              </p>
              <input
                type="file"
                name="photo"
                id="photoFood"
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
            <button onClick={AddFoodItem}> ADD FOOD</button>
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
