import React, { useState, useEffect } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import LoadingBar from "react-top-loading-bar";
import VerifyAdminLogin from './VerifyAdminLogin';

function AddDrinkCategory() {
const [progress, setProgress] = useState(0);
  const [DrinkCategory, setDrinkCategory] = useState("");
  const addCategory = async (e) => {
    if (!DrinkCategory) {
      toast.warn("Please Enter Drink Category Name In The Field", {
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
setProgress(40)
    const res = await fetch(`${HOST}/api/AddDrinkCategory`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        DrinkCategoryName: DrinkCategory,
      }),
    });
    let data = await res.json();
  setProgress(100)
  if (res.status == 401) {
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
    if (data.status == "403") {
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
      return ;
    }
    // dublicate error message
    if (data.status == "501") {
      toast.error(`${data.message}`, {
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
    // empty or not check
    if (data.status == "402") {
      toast.warn(`${data.message}`, {
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
    // dublicate error message
    if (data.status == "400") {
      toast.warn(`${DrinkCategory} Is Already Exists In Drink Category`, {
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

    toast.success(`${DrinkCategory} Drink Category Successfully Added`, {
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
      router.push("/admin/AllDrinkCategory");
    }

    setDrinkCategory("");
  };
  return (
    <div className={Styles.admin}>
         <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  
    <VerifyAdminLogin />
      <HeadTag title="Add Drink Category" />
      <AdminLeftMenu />
      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Add Drink Categories" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Drink Category"
          subsectionURL="/admin/AllDrinkCategory"
          current="ADD DRINK CATEGORY"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Enter New Drink Categories List For Food Website</h1>
          </div>
          <div className={StyleFood.form_element}>
            <li style={{ width: "90%" }}>
              <p>
                Enter Drink Category Name <span>*</span>
              </p>
              <input
                type="text"
                name="foodName"
                style={{ width: "95%" }}
                onChange={(e) => setDrinkCategory(e.target.value)}
                value={DrinkCategory}
              />
            </li>

            <button
              style={{ marginTop: "4%", marginLeft: "6%" }}
              onClick={addCategory}
            >
              {" "}
              ADD CATEGORY
            </button>
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

export default AddDrinkCategory;
