import React, { useContext,useEffect,useState } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import router from "next/router";
import { AllContext } from "../../context/AllContext";
import Link from "next/link";
import Image from "next/image";

function UpdateCoffeeImage() {
  const { filterCoffeeItemsData } = useContext(AllContext);
  const [imgs, setImgs] = useState('' );
  const [files, setFiles] = useState("");

useEffect(()=>{
if(filterCoffeeItemsData){
setImgs(`/CoffeeItemImages/${filterCoffeeItemsData[0].Image}`)
}
},[filterCoffeeItemsData])
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
    dataImage.append("_id", filterCoffeeItemsData[0]._id);
    dataImage.append("oldImage", filterCoffeeItemsData[0].Image);
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
    let response = await fetch(`${HOST}/api/UpdateCoffeeImage`, {
      method: "POST",
      headers: { admintoken: localStorage.getItem("admintoken") },
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
        `${filterCoffeeItemsData[0].FoodName} Image Successfully Updated`,
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
        router.push("/admin/UpdateCoffeeItem");
      }
    }
  };

  return (
    <div className={Styles.admin}>
      <HeadTag title="Update Coffee Image" />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Update Coffee Item Image" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Update Coffee Item"
          subsectionURL="/admin/UpdateCoffeeItem"
          current="UPDATE COFFEE ITEM IMAGE"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Enter New Coffee Image For Website</h1>
          </div>
          <div className={StyleFood.form_element}>
            <div
              className="imageChange"
              style={{ textAlign: "center", color: "blue" }}
            >
              <h3>
                <Link href="/admin/UpdateCoffeeItemForm">
                  Click Here To Change Coffee General Details
                </Link>
              </h3>
            </div>
            <li>
              <p>
                Uploard Coffee Photo <span>*</span>
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


export default  UpdateCoffeeImage;

