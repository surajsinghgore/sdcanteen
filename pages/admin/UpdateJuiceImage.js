import React, { useContext , useState,useEffect } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
let ImagePath=process.env.NEXT_PUBLIC_IMAGESPACEPATH;
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import VerifyAdminLogin from './VerifyAdminLogin';
import imges from '../../public/banner4.jpg'
import LoadingBar from "react-top-loading-bar";
import router from "next/router";
import { AllContext } from "../../context/AllContext";
import Link from "next/link";
import Image from "next/image";

export default function UpdateJuiceImage() {const [progress, setProgress] = useState(0);
  const { filterJuiceItemsData } = useContext(AllContext);
  const [imgs, setImgs] = useState(imges);
  const [files, setFiles] = useState("");

useEffect(()=>{
if(filterJuiceItemsData.datas!=undefined){
setImgs(` ${ImagePath}/JuiceItemImages/${filterJuiceItemsData.datas.Image}`)
} else{
    router.push('/admin/UpdateJuiceItem')
}
},[filterJuiceItemsData])
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
    dataImage.append("_id", filterJuiceItemsData.datas._id);
    dataImage.append("oldImage", filterJuiceItemsData.datas.Image);
    dataImage.append("Image", files);

    if (!files) {
      toast.warn("Please Uploard New Photo To Change", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
    } setProgress(40)
    let response = await fetch(`${HOST}/api/UpdateJuiceImage`, {
      method: "POST",
      headers: { admintoken: localStorage.getItem("admintoken") },
      body: dataImage,
    }); setProgress(100)
  if (response.status == 401) {
      toast.error("Please Login With Admin Credentials", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(RedirectFunction, 1500);
      function RedirectFunction() {
        router.push("/admin/Login");
      }
      }
    if (response.status === 500) {
      toast.error("Only JPG , PNG , JPEG Images are Allowed To Upload", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
    }
    let datas = await response.json();
    if (datas.status == "501") {
      toast.error(`${datas.message}`, {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
    }
    if (datas.status == "400") {
      toast.warn(`${datas.message}`, {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
    }

    if (datas.status == "201") {
      toast.success(
        `${filterJuiceItemsData.datas.JuiceName} Image Successfully Updated`,
        {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      setTimeout(RedirectFunction, 1500);
      function RedirectFunction() {
        router.push("/admin/UpdateJuiceItem");
      }
    }
  };

  return (
    <div className={Styles.admin}> <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  
      <HeadTag title="Update Juice Image" />


<VerifyAdminLogin />


      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Update Juice Item Image" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Update Juice Item"
          subsectionURL="/admin/UpdateJuiceItem"
          current="UPDATE JUICE ITEM IMAGE"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Enter New Juice Image For Website</h1>
          </div>
          <div className={StyleFood.form_element}>
            <div
              className="imageChange"
              style={{ textAlign: "center", color: "blue" }}
            >
              <h3>
                <Link href="/admin/UpdateJuiceItemForm">
                  Click Here To Change Juice General Details
                </Link>
              </h3>
            </div>
            <li>
              <p>
                Uploard Juice Photo <span>*</span>
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
        autoClose={1200}
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
