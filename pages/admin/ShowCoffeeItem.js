import React from "react";
import Styles from "../../styles/admin.module.css";
import ShowStyles from "../../styles/ShowFoodItem.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
let ImagePath=process.env.NEXT_PUBLIC_IMAGESPACEPATH;
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import VerifyAdminLogin from './VerifyAdminLogin';
import Loader from "../../Components/Loader";

export default function ShowCoffeeItem({ datas }) {
  const [coffeeNameSearch, setCoffeeNameSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [data, setData] = useState([]);
 const [loader,setLoader]=useState(true);

  const [fetchData, setFetchData] = useState(datas);
  const [demmyData, setDummyData] = useState(datas);

  // filter using food name
  const filterCoffeeName = async (e) => {
    setCoffeeNameSearch(e.target.value);
    let newData = await demmyData.filter((item) => {
      return item.CoffeeName.toLowerCase().includes(
        coffeeNameSearch.toLowerCase()
      );
    });
    setFetchData(newData);
    let foodNameSearchs = document.getElementById("foodCoffeeSearchs");
    if (foodNameSearchs.value == "") {
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
    setLoader(true)
      let response = await fetch(`${HOST}/api/ShowCoffeeCategory`, {
        method: "GET",
      
      });
      let dataCategory = await response.json();setLoader(false)
      await setData(dataCategory.data);
    }
    dataFetch();
  }, []);

  return (
    <div className={Styles.admin}> <Loader loader={loader}/>
      <HeadTag title="Show Coffee Item" />
<VerifyAdminLogin />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Coffee Item Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection=""
          subsectionURL="/admin/ShowCoffeeItem"
          current="SHOW COFFEE ITEM"
        />

        {/* form add food */}

        <div className={ShowStyles.display_List} style={{ marginTop: "0.5%" }}>
          <div className={ShowStyles.top}>
            <div className={ShowStyles.deatils}>
              <h1>All Coffee Items</h1>
              <p>Details of all Coffee</p>
            </div>
            <div className={ShowStyles.search}>
              <input
                type="search"
                name="name"
                placeholder="Search By Coffee Name..."
                value={coffeeNameSearch}
                onChange={filterCoffeeName}
                id="foodCoffeeSearchs"
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
                    <option value={item.CoffeeCategoryName} key={index}>
                      {item.CoffeeCategoryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className={ShowStyles.card_container}>
            <div className={ShowStyles.cards}>
              <li className={ShowStyles.Image_Section}>Item Photo</li>
              <li className={ShowStyles.Item_Name}>Coffee Name</li>
              <li className={ShowStyles.Item_Price}>Price</li>
              <li className={ShowStyles.Item_Qty}>Qty</li>
                        <li className={ShowStyles.Item_Visibilty}>Visibility</li>
              <li className={ShowStyles.Item_Category}>Category</li>
            </div>

            {fetchData.length != 0 ? (
              <>
                {fetchData.slice(0, 15).map((item, index) => {
                  return (
                    <div className={ShowStyles.card} key={index}>
                      <li className={ShowStyles.Image_Section}>
                        <Image
                          src={item.Image}
                          alt={item.Image}
                          height="550"
                          width="800"
                   priority="true"
                        />
                      </li>
                      <li className={ShowStyles.Item_Name}>
                        <p>{item.CoffeeName}</p>
                      </li>
                  <li className={ShowStyles.Item_Price}>
                            {(item.ItemCost!=undefined) ?
                            <>
                            {(item.ItemCost.length==1)?
                             <>
                          {item.ItemCost.map((items)=>{
                      return(
                        <p key={items._id} className={ShowStyles.One}>
                        <b>{items.sizeName} : </b>{items.Price}
                        </p>
                                            )
                      })}
                             </>:
                            <>
     {item.ItemCost.map((items)=>{
                      return(
                        <p key={items._id} className={ShowStyles.Many}>
                        <b>{items.sizeName} : </b>{items.Price}
                        </p>
                                            )
                      })}
                            </>
                            }
                       
                      </>
                      :""}
                     
                      </li>
                      <li className={ShowStyles.Item_Qty}>
                        <p>{item.Qty}</p>
                      </li>
                         <li className={ShowStyles.Item_Visibilty}>
                      {(item.Active=="ON")? <div className={ShowStyles.ON}>{item.Active}</div>: <div className={ShowStyles.OFF}>{item.Active}</div>}
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
  let ress = await fetch(`${HOST}/api/ShowCoffeeItem`);
  let data = await ress.json();
  let datas = await data.data;

  return {
    props: { datas },
  };
}
