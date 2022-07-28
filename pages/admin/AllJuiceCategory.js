import React, { useEffect, useState ,useContext} from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import FoodStyles from "../../styles/AllFoodCategories.module.css";
import Head from "next/head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from "../Components/PathNavigate";
import AdminRightInnerHeader from "../Components/AdminRightInnerHeader";
import JuiceAllCategoryComponent from "../Components/JuiceAllCategoryComponent";
import Link from "next/link";
import LoadingBar from "react-top-loading-bar";
import { IoIosAddCircleOutline } from "react-icons/io";
import {AllContext} from '../context/AllContext';

function AllJuiceCategories() {
const {deletes}=useContext(AllContext);

  const [progress, setProgress] = useState(0);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [dataLength, setDataLength] = useState(10);

  useEffect(() => {
    async function dataFetch() {
      let ress = await fetch("http://localhost:3000/api/ShowJuiceCategory");
      let datas = await ress.json();
      await setData(datas.data);
      await setData1(datas.data);
      setProgress(100);
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
      <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        progress={progress}
        transitionTime={100}
      />
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>SD CANTEEN | MANAGE JUICE CATEGORIES</title>
        <meta name="description" content="sd canteen website" />
        <meta name="author" content="suraj singh" />
        <meta
          keyword=""
          content="sd canteen, sd college,admin login,admin dash board"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Juice Categories Manage" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection=""
          subsectionURL=""
          innerSubjection="MANAGE JUICE CATEGORIES"
          innerSubjectionURL="/admin/AllJuiceCategory"
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

            {data.slice(0, parseInt(dataLength)).map((item, index) => {
              return (
             
                  <JuiceAllCategoryComponent
                    data={item}
                    ind={index}
                    key={index}
                  />
              
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllJuiceCategories;
