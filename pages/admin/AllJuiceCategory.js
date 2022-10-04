import React, { useEffect, useState, useContext } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import FoodStyles from "../../styles/AllFoodCategories.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import JuiceAllCategoryComponent from "../../Components/JuiceAllCategoryComponent";
import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AllContext } from "../../context/AllContext";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import VerifyAdminLogin from './VerifyAdminLogin';


function AllJuiceCategory() {
  const { deletes } = useContext(AllContext);

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [dataLength, setDataLength] = useState(10);

  useEffect(() => {
    async function dataFetch() {
      let ress = await fetch(`${HOST}/api/ShowJuiceCategory`);
      let datas = await ress.json();
      await setData(datas.data);
      await setData1(datas.data);
    }
    dataFetch();
  }, [deletes]);

  // search bar working
  const Searchs = async (e) => {
    setSearch(e.target.value);

    let datass = await data1.filter((item) => {
      return item.JuiceCategoryName.toLowerCase().includes(
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
      <HeadTag title="All Juice Category" />

      {/* left panel bar */}
      <AdminLeftMenu />
<VerifyAdminLogin />


      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Juice Categories Manage" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection=""
          subsectionURL="/admin/AllJuiceCategory"
          current="JUICE CATEGORY"
        />

        <div className={FoodStyles.ListView}>
          <div className={FoodStyles.addCategory}>
            <Link href="/admin/AddJuiceCategory">
              <button>
                <i>
                  <IoIosAddCircleOutline />
                </i>{" "}
                Add New Juice Category
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
              <li>Juice Categories Name</li>
              <li>Action</li>
            </div>

            {data.length != 0 ? (
              <>
                {" "}
                {data.slice(0, parseInt(dataLength)).map((item, index) => {
                  return (
                    <JuiceAllCategoryComponent
                      data={item}
                      ind={index}
                      key={index}
                    />
                  );
                })}
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

export default AllJuiceCategory;
