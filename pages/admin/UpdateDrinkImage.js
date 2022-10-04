import React, { useContext,useState,useEffect } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import imges from '../../public/banner4.jpg'
import VerifyAdminLogin from './VerifyAdminLogin';


import router from "next/router";
import { AllContext } from "../../context/AllContext";
import Link from "next/link";
import Image from "next/image";

export default function UpdateDrinkImage() {
  const { filterDrinkItemsData } = useContext(AllContext);
  const [imgs, setImgs] = useState(imges);
  const [files, setFiles] = useState("");
useEffect(()=>{
if(filterDrinkItemsData){
setImgs(`/DrinkItemImages/${filterDrinkItemsData[0].Image}`)
}
},[filterDrinkItemsData])
  // images handle
  const handleChange = async (e) => {
    if (e.target.files[0]) {
      var file = e.target.files[0];
      setFiles(file);
      let url = await URL.createObjectURL(file);
      setImgs(url);
    }
  };

  const updateImage = async (e) => {
    e.preventDefault();

    const dataImage = new FormData();
    dataImage.append("_id", filterDrinkItemsData[0]._id);
    dataImage.append("oldImage", filterDrinkItemsData[0].Image);
    dataImage.append("Image", files);

    if (!files) {
      toast.warn("Please Uploard New Photo To Change", {
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
    let response = await fetch(`${HOST}/api/UpdateDrinkImage`, {
      method: "POST",
      
      body: dataImage,
    });

    if (response.status === 500) {
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
      toast.success(
        `${filterDrinkItemsData[0].DrinkName} Image Successfully Updated`,
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

      setTimeout(RedirectFunction, 1000);
      function RedirectFunction() {
        router.push("/admin/UpdateDrinkItem");
      }
    }
  };

  return (
    <div className={Styles.admin}>
      <HeadTag title="Update Drink Image" />
<VerifyAdminLogin />


      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Update Drink Item Image" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Update Drink Item"
          subsectionURL="/admin/UpdateDrinkItem"
          current="UPDATE DRINK ITEM IMAGE"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Enter New Drink Image For Website</h1>
          </div>
          <div className={StyleFood.form_element}>
            <div
              className="imageChange"
              style={{ textAlign: "center", color: "blue" }}
            >
              <h3>
                <Link href="/admin/UpdateDrinkItemForm">
                  Click Here To Change Drink General Details
                </Link>
              </h3>
            </div>
            <li>
              <p>
                Uploard Drink Photo <span>*</span>
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
                <Image src={imgs} alt="" id="output" width={600} height={600} />
              </div>
            </li>
            <button onClick={updateImage}> UPDATE IMAGE</button>
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
