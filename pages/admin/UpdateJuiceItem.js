import React, { useContext,useState, useEffect  } from "react";
import Styles from "../../styles/admin.module.css";
import ShowStyles from "../../styles/ShowFoodItem.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import { FiEdit } from "react-icons/fi";
import Image from "next/image";
import VerifyAdminLogin from './VerifyAdminLogin';


import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import { AllContext } from "../../context/AllContext";
let HOST = process.env.NEXT_PUBLIC_API_URL;

 function UpdateJuiceItem() {
  const { updateJuiceItem } = useContext(AllContext);
  const [juiceNameSearch, setJuiceNameSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [data, setData] = useState([]);

  const [fetchData, setFetchData] = useState([]);
  const [demmyData, setDummyData] = useState([]);

  // filter using food name
  const filterJuiceName = async (e) => {
    setJuiceNameSearch(e.target.value);
    let newData = await demmyData.filter((item) => {
      return item.JuiceName.toLowerCase().includes(
        juiceNameSearch.toLowerCase()
      );
    });
    setFetchData(newData);
    let juiceNameSearchs = document.getElementById("juiceNameSearchs");
    if (juiceNameSearchs.value == "") {
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

  // update food
  const UpdateJuiceItems = async (_id) => {
    updateJuiceItem(_id);
    router.push("/admin/UpdateJuiceItemForm");
  };

  useEffect(() => {
    async function dataFetch() {
      let ress = await fetch(`${HOST}/api/ShowJuiceCategory`);
      let datas = await ress.json();
      await setData(datas.data);
    }
    dataFetch();

    async function dataCategoryFetch() {
      let ress = await fetch(`${HOST}/api/ShowJuiceItem`);
      let datas = await ress.json();
      await setFetchData(datas.data);
      await setDummyData(datas.data);
    }
    dataCategoryFetch();
  }, []);
  return (
    <div className={Styles.admin}>
      <HeadTag title="Update Juice Item" />


<VerifyAdminLogin />


      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Update Juice Item Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection=""
          subsectionURL="/admin/ShowJuiceItem"
          current="UPDATE JUICE ITEM"
        />

        {/* form add food */}

        <div className={ShowStyles.display_List} style={{ marginTop: "0.5%" }}>
          <div className={ShowStyles.top}>
            <div className={ShowStyles.deatils}>
              <h1>All Juice Items</h1>
              <p>Details of all Juice</p>
            </div>
            <div className={ShowStyles.search}>
              <input
                type="search"
                name="name"
                placeholder="Search By Juice Name..."
                value={juiceNameSearch}
                onChange={filterJuiceName}
                id="juiceNameSearchs"
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
                    <option value={item.JuiceCategoryName} key={index}>
                      {item.JuiceCategoryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className={ShowStyles.card_container}>
            <div className={ShowStyles.cards}>
              <li className={ShowStyles.Image_Section}>Item Photo</li>
              <li className={ShowStyles.Item_Name}>Juice Name</li>
              <li className={ShowStyles.Item_Price}>Price</li>
              <li className={ShowStyles.Item_Category}>Category</li>
              <li className={ShowStyles.Item_Qty}>Action</li>
            </div>

            {fetchData.length != 0 ? (
              <>
                {fetchData.slice(0, 15).map((item, index) => {
                  return (
                    <div className={ShowStyles.card} key={index}>
                      <li className={ShowStyles.Image_Section}>
                        <Image
                          src={`/JuiceItemImages/${item.Image}`}
                          alt={item.Image}
                          height="550"
                          width="800"
                          loading="lazy"
                        />
                      </li>
                      <li className={ShowStyles.Item_Name}>
                        <p>{item.JuiceName}</p>
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
                      <li className={ShowStyles.Item_Category}>
                        <p>{item.Category}</p>
                      </li>
                      <li className={ShowStyles.Item_Qty}>
                        <p
                          style={{
                            color: "blue",
                            cursor: "pointer",
                            fontSize: "24px",
                          }}
                          title="Click To Update"
                        >
                          <FiEdit onClick={() => UpdateJuiceItems(item._id)} />
                        </p>
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
  let ress = await fetch(`${HOST}/api/ShowJuiceItem`);
  let data = await ress.json();
  let datas = await data.data;

  return {
    props: { datas },
  };
}

export default  UpdateJuiceItem;
