import React from "react";
import Styles from "../../styles/admin.module.css";
import ShowStyles from "../../styles/ShowFoodItem.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
export default function ShowDrinkItem({ datas }) {
  const [drinkNameSearch, setDrinkNameSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [data, setData] = useState([]);

  const [fetchData, setFetchData] = useState(datas);
  const [demmyData, setDummyData] = useState(datas);

  // filter using food name
  const filterDrinkName = async (e) => {
    setDrinkNameSearch(e.target.value);
    let newData = await demmyData.filter((item) => {
      return item.DrinkName.toLowerCase().includes(
        drinkNameSearch.toLowerCase()
      );
    });
    setFetchData(newData);
    let drinkDrinkSearchs = document.getElementById("drinkDrinkSearchs");
    if (drinkDrinkSearchs.value == "") {
      setFetchData(demmyData);
    }
  };

  // filter using category
  const filterCategory = async (e) => {
    setCategorySearch(e.target.value);
    let value = e.target.value;
    let newData = await demmyData.filter((item) => {
      return item.Category == value;
    });
    setFetchData(newData);

    if (e.target.value == "") {
      setFetchData(demmyData);
    }
  };

  useEffect(() => {
    async function dataFetch() {
      let response = await fetch(`${HOST}/api/ShowDrinkCategory`, {
        method: "GET",
        headers: {
          admintoken: localStorage.getItem("admintoken"),
        },
      });
      let dataCategory = await response.json();
      await setData(dataCategory.data);
    }
    dataFetch();
  }, []);

  return (
    <div className={Styles.admin}>
      <HeadTag title="Show Drink Item" />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Drink Item Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection=""
          subsectionURL="/admin/ShowDrinkItem"
          current="SHOW DRINK ITEM"
        />

        {/* form add food */}

        <div className={ShowStyles.display_List} style={{ marginTop: "0.5%" }}>
          <div className={ShowStyles.top}>
            <div className={ShowStyles.deatils}>
              <h1>All Drink Items</h1>
              <p>Details of all Drink</p>
            </div>
            <div className={ShowStyles.search}>
              <input
                type="search"
                name="name"
                placeholder="Search By Drink Name..."
                value={drinkNameSearch}
                onChange={filterDrinkName}
                id="drinkDrinkSearchs"
              />
              <select
                name="category"
                value={categorySearch}
                onChange={filterCategory}
                id="dropDown"
              >
                <option value="">Search By Category ..</option>
                {data.map((item, index) => {
                  return (
                    <option value={item.DrinkCategoryName} key={index}>
                      {item.DrinkCategoryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className={ShowStyles.card_container}>
            <div className={ShowStyles.cards}>
              <li className={ShowStyles.Image_Section}>Item Photo</li>
              <li className={ShowStyles.Item_Name}>Drink Name</li>
              <li className={ShowStyles.Item_Price}>Price</li>
              <li className={ShowStyles.Item_Qty}>Qty</li>
              <li className={ShowStyles.Item_Category}>Category</li>
            </div>

            {fetchData.length != 0 ? (
              <>
                {fetchData.slice(0, 15).map((item, index) => {
                  return (
                    <div className={ShowStyles.card} key={index}>
                      <li className={ShowStyles.Image_Section}>
                        <Image
                          src={`/DrinkItemImages/${item.Image}`}
                          alt={item.Image}
                          height="550"
                          width="800"
                          loading="lazy"
                        />
                      </li>
                      <li className={ShowStyles.Item_Name}>
                        <p>{item.DrinkName}</p>
                      </li>
                      <li className={ShowStyles.Item_Price}>
                        <p>{item.Price}</p>
                      </li>
                      <li className={ShowStyles.Item_Qty}>
                        <p>{item.Qty}</p>
                      </li>
                      <li className={ShowStyles.Item_Category}>
                        <p>{item.Category}</p>
                      </li>
                    </div>
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

export async function getServerSideProps(context) {
  let ress = await fetch(`${HOST}/api/ShowDrinkItem`);
  let data = await ress.json();
  let datas = await data.data;

  return {
    props: { datas },
  };
}
