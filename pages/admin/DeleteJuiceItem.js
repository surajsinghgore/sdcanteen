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
import VerifyAdminLogin from './VerifyAdminLogin';


export default function DeleteJuiceItem({ datas }) {
  const [useEffectCall, setUseEffectCall] = useState(false);
  const [juiceNameSearch, setJuiceNameSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [data, setData] = useState([]);

  const [fetchData, setFetchData] = useState([]);
  const [demmyData, setDummyData] = useState([]);

  // filter using Juice name
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

  // deleting item
  const DeleteJuiceItems = async (item) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this Juice item ?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            if (!item._id) {
              toast.warn("Please Provide Correct Id Of Item", {
                position: "bottom-right",
                autoClose: 5000,
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
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return ;
            }
            let res = await fetch(`${HOST}/api/DeleteJuiceItem`, {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
               
              },
              body: JSON.stringify({
                _id: item._id,
                imagePath: item.Image,
              }),
            });
  if (res.status == 401) {
      toast.error("Please Login With Admin Credentials", {
        position: "bottom-right",
        autoClose: 5000,
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
                autoClose: 5000,
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
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return ;
            }
            if (data.status == "201") {
              toast.success(`Juice Item Successfully Deleted`, {
                position: "bottom-right",
                autoClose: 5000,
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
  }, [useEffectCall]);
  return (
    <div className={Styles.admin}>
      <HeadTag title="Delete Juice Item" />

      {/* left panel bar */}
      <AdminLeftMenu />
<VerifyAdminLogin />


      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Delete Food Item Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection=""
          subsectionURL="/admin/ShowJuiceItem"
          current="DELETE JUICE ITEM"
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
                            color: "red",
                            cursor: "pointer",
                            fontSize: "24px",
                          }}
                          title="Click To Delete"
                        >
                          <AiFillDelete
                            onClick={() => DeleteJuiceItems(item)}
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

export async function getServerSideProps(context) {
  let ress = await fetch(`${HOST}/api/ShowJuiceItem`);
  let data = await ress.json();
  let datas = await data.data;

  return {
    props: { datas },
  };
}
