import React, { useEffect, useState, useContext } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import FoodStyles from "../../styles/AllFoodCategories.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import FoodAllCategoryComponent from "../../Components/FoodAllCategoryComponent";
import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AllContext } from "../../context/AllContext";
import VerifyAdminLogin from "./VerifyAdminLogin";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import LoadingBar from "react-top-loading-bar";
function AllFoodCategories() {
  const { deletes } = useContext(AllContext);
const [progress, setProgress] = useState(0);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [dataLength, setDataLength] = useState(10);

  useEffect(() => {
    async function dataFetch() {
    
 setProgress(40)

      let ress = await fetch(`${HOST}/api/ShowFoodCategory`);
      let data = await ress.json();
      let datass = await data.data;
 setProgress(100)
      setData(datass);
      setData1(datass);
    }
    dataFetch();
  }, [deletes]);

  // search bar working
  const Searchs = async (e) => {
    setSearch(e.target.value);

    let datass = await data1.filter((item) => {
      return item.FoodCategoryName.toLowerCase().includes(
        search.toLocaleLowerCase()
      );
    });
    setData(datass);
    let searchdata = document.getElementById("searchdata");
    if (searchdata.value == "") {
      setData(data1);
    }
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
      <HeadTag title="All Food Category" />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Food Categories Manage" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection=""
          subsectionURL="/admin/AllFoodCategories"
          current="FOOD CATEGORY"
        />

        <div className={FoodStyles.ListView}>
          <div className={FoodStyles.addCategory}>
            <Link href="/admin/AddFoodCategory">
              <button>
                <i>
                  <IoIosAddCircleOutline />
                </i>{" "}
                Add New Food Category
              </button>
            </Link>
          </div>
          <div className={FoodStyles.Subtop}>
            <div className={FoodStyles.showData}>
              Show Data
              <input
                type="number"
                name="sort"
                value={dataLength}
                onChange={(e) => setDataLength(e.target.value)}
              />
            </div>
            <div className={FoodStyles.searchBar}>
              <input
                type="search"
                name="searchdata"
                id="searchdata"
                placeholder="Search ..."
                value={search}
                onChange={Searchs}
              />
            </div>
          </div>
          <div className={FoodStyles.ListData}>
            <div className={FoodStyles.Heading}>
              <li>Food Categories Name</li>
              <li>Action</li>
            </div>
            {data.length != 0 ? (
              <>
                {data.slice(0, parseInt(dataLength)).map((item, index) => {
                  return (
                    <FoodAllCategoryComponent
                      data={item}
                      ind={index}
                      key={index}
                    />
                  );
                })}{" "}
              </>
            ) : (
              <h1
                style={{
                  fontSize: "20px",
                  textAlign: "Center",
                  color: "rgb(79, 79, 79)",
                  marginTop: "3%",
                }}
              >
                SORRY NO ITEM FOUND
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllFoodCategories;
