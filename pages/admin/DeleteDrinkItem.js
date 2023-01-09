import React from "react";
import Styles from "../../styles/admin.module.css";
import ShowStyles from "../../styles/ShowFoodItem.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import { AiFillDelete } from "react-icons/ai";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import LoadingBar from "react-top-loading-bar";
import VerifyAdminLogin from './VerifyAdminLogin';


export default function DeleteDrinkItem({ datas }) {
  const [useEffectCall, setUseEffectCall] = useState(false);
  const [drinkNameSearch, setDrinkNameSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [data, setData] = useState([]);

const [progress, setProgress] = useState(0);

  const [fetchData, setFetchData] = useState([]);
  const [demmyData, setDummyData] = useState([]);

  // filter using coffee name
  const filterDrinkName = async (e) => {
    setDrinkNameSearch(e.target.value);
    let newData = await demmyData.filter((item) => {
      return item.DrinkName.toLowerCase().includes(
        drinkNameSearch.toLowerCase()
      );
    });
    setFetchData(newData);
    let drinkNameSearchs = document.getElementById("drinkNameSearchs");
    if (drinkNameSearchs.value == "") {
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

  // deleting item
  const DeleteDrinkItems = async (item) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this Drink item ?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            if (!item._id) {
              toast.warn("Please Provide Correct Id Of Item", {
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
            if (!item.Image) {
              toast.warn("Please Provide Correct Image Of Item", {
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
            let res = await fetch(`${HOST}/api/DeleteDrinkItem`, {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                _id: item._id,
                imagePath: item.Image,
              }),
            });
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
      return ;
      }
            let data = await res.json();
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

            if (data.status == "400") {
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
            if (data.status == "201") {
              toast.success(`Drink Item Successfully Deleted`, {
                position: "bottom-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setUseEffectCall(!useEffectCall);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    async function dataFetch() {
    
 setProgress(40)
      let ress = await fetch(`${HOST}/api/ShowDrinkCategory`);
      let datas = await ress.json();
      
 setProgress(100)
      await setData(datas.data);
    }
    dataFetch();

    async function dataCategoryFetch() {
    
 setProgress(40)
      let ress = await fetch(`${HOST}/api/ShowDrinkItem`);
      let datas = await ress.json();
      
 setProgress(100)
      await setFetchData(datas.data);
      await setDummyData(datas.data);
    }
    dataCategoryFetch();
  }, [useEffectCall]);
  return (
    <div className={Styles.admin}> <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  
      <HeadTag title="Delete Drink Item" />
<VerifyAdminLogin />


      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Delete Drink Item Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection=""
          subsectionURL="/admin/ShowDrinkItem"
          current="DELETE DRINK ITEM"
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
                id="drinkNameSearchs"
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
                            color: "red",
                            cursor: "pointer",
                            fontSize: "24px",
                          }}
                          title="Click To Delete"
                        >
                          <AiFillDelete
                            onClick={() => DeleteDrinkItems(item)}
                          />
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

export async function getServerSideProps(context) {
  let ress = await fetch(`${HOST}/api/ShowCoffeeItem`);
  let data = await ress.json();
  let datas = await data.data;

  return {
    props: { datas },
  };
}
