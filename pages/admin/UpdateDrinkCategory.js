import React, { useEffect, useState, useContext } from "react";
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
import { AllContext } from "../../context/AllContext";

import VerifyAdminLogin from './VerifyAdminLogin';


function UpdateDrinkCategory() {
  const { filterAllFoodCategoriesData } = useContext(AllContext);

  const [DrinkCategoryName, setDrinkCategoryName] = useState("");

  const updateFoodCategory = async () => {
    if (!DrinkCategoryName) {
      toast.warn("Please Enter Somethig In Drink Category Name Field", {
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
    let res = await fetch(`${HOST}/api/UpdateDrinksCategory`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",

      },
      body: JSON.stringify({
        _id: filterAllFoodCategoriesData,
        DrinkCategoryName,
      }),
    });

    let dataRes = await res.json();

    if (dataRes.status == "403") {
      toast.error("Please Login With Admin Credentials", {
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
    if (dataRes.status == "400") {
      toast.warn(`${dataRes.message}`, {
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

    if (dataRes.status == "501") {
      toast.error(`${dataRes.message}`, {
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

    toast.success(`${dataRes.message}`, {
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
      router.push("/admin/AllDrinkCategory");
    }
  };

  useEffect(() => {
    if (filterAllFoodCategoriesData) {
      setDrinkCategoryName(filterAllFoodCategoriesData[0].DrinkCategoryName);
    }
  }, [filterAllFoodCategoriesData]);

  return (
    <div className={Styles.admin}>
      <HeadTag title="Update Drink Category" />
<VerifyAdminLogin />


      <AdminLeftMenu />
      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Add Food Categories" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Drink Category"
          subsectionURL="/admin/AllDrinkCategory"
          current="UPDATE DRINK CATEGORY"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Update Previous Categories Name For Food Website</h1>
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
                onChange={(e) => setDrinkCategoryName(e.target.value)}
                value={DrinkCategoryName}
              />
            </li>

            <button
              style={{ marginTop: "4%", marginLeft: "6%" }}
              onClick={updateFoodCategory}
            >
              {" "}
              UPDATE CATEGORY
            </button>
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

export default UpdateDrinkCategory;
