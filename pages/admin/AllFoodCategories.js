import React, { useEffect, useState ,useContext} from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import FoodStyles from "../../styles/AllFoodCategories.module.css";
import Head from "next/head";
import AdminLeftMenu from "../Components/AdminLeftMenu";
import PathNavigate from "../Components/PathNavigate";
import AdminRightInnerHeader from "../Components/AdminRightInnerHeader";
import FoodAllCategoryComponent from "../Components/FoodAllCategoryComponent";
import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";
import {AllContext} from '../context/AllContext';
let HOST=process.env.NEXT_PUBLIC_API_URL;




function AllFoodCategories({datas}) {

const {deletes}=useContext(AllContext);

  const [search, setSearch] = useState("");
  const [data, setData] = useState(datas);
  const [data1, setData1] = useState(datas);

  const [dataLength, setDataLength] = useState(10);

  useEffect(() => {
          async function dataFetch() {
let ress = await fetch(`${HOST}/api/ShowFoodCategory`);
      let data = await ress.json();
      let datass = await data.data;
setData(datass)
setData1(datass)
   }
    dataFetch();
  },[deletes]);

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
  
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>SD CANTEEN | MANAGE FOOD CATEGORIES</title>
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
        <AdminRightInnerHeader title="Food Categories Manage" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection=""
          subsectionURL=""
          innerSubjection="MANAGE FOOD CATEGORIES"
          innerSubjectionURL="/admin/AllFoodCategories"
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

            {data.slice(0, parseInt(dataLength)).map((item, index) => {
              return (
               
                  <FoodAllCategoryComponent
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

export default AllFoodCategories;






export async function getServerSideProps(context) {
 let ress = await fetch(`${HOST}/api/ShowFoodCategory`);
      let data = await ress.json();
      let datas = await data.data;


  return {
    props: {datas},
  }
}