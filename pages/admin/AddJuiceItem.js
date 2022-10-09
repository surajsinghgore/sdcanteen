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
import VerifyAdminLogin from './VerifyAdminLogin';

export default function AddJuiceItem() {
  const [data, setData] = useState([]);
  // form ates
  const [juiceName, setJuiceName] = useState("");
  const [Price, setPrice] = useState("");
  const [Qtys, setQtys] = useState("");
  const [Category, setCategory] = useState("");
  const [Images, setImages] = useState("");
  const [imgs, setImgs] = useState();
  const [showImage, setShowImage] = useState(true);
  const [files, setFiles] = useState("");
  const [description, setDescription] = useState("");
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

  const AddJuiceItem = async (e) => {
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
    }if (!description) {
      toast.warn("Please Enter Description of Item", {
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
      toast.warn("Please Uploard Juice Image", {
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
    data.append("JuiceName", juiceName);
    data.append("Price", Price);
    data.append("Qty", Qtys);
    data.append("Category", Category);
    data.append("Image", files);

data.append("Description", description);

    let res = await fetch(`${HOST}/api/AddJuiceItem`, {
      method: "POST",
      body: data,
    });
  if (res.status == 401) {
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
      }
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
        router.push("/admin/ShowJuiceItem");
      }
    }
  };
  useEffect(() => {

    async function dataFetch() {
      let ress = await fetch(`${HOST}/api/ShowJuiceCategory`);
      let datas = await ress.json();
      await setData(datas.data);
    }
    dataFetch();
  }, []);

  return (
    <div className={Styles.admin}>
      <HeadTag title="Add Juice Item" />
      {/* left panel bar */}
      <AdminLeftMenu />
<VerifyAdminLogin />
      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Add Juice Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection=""
          subsectionURL="/admin/ShowJuiceItem"
          current="ADD JUICE ITEM"
        />

        {/* form add food */}

        <div className={StyleFood.Form} style={{ marginTop: "0.5%" }}>
          <div className={StyleFood.heading}>
            <h1>Enter New Juice Item For Website</h1>
          </div>
          <div className={StyleFood.form_element}>
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
                <option value="no">Select Category</option>
                {data.map((item, index) => {
                  return (
                    <option value={item.JuiceCategoryName} key={index}>
                      {item.JuiceCategoryName}
                    </option>
                  );
                })}
              </select>
            </li>
              <li className={StyleFood.description}>
                <p>
               Enter Description Category<span>*</span>
              </p>
            <textarea value={description} name="description" onChange={(e)=>setDescription(e.target.value)}>
            
            </textarea>
            </li>
            <li>
              <p>
                Uploard Juice Photo <span>*</span>
              </p>
              <input
                type="file"
                name="photo"
                id="photoJuice"
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
            <button onClick={AddJuiceItem}> ADD JUICE</button>
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
