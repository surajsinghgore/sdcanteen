import React, { useContext, useState, useEffect } from "react";
import Styles from "../../styles/admin.module.css";
import StyleFood from "../../styles/AddFood.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import PathNavigate from "../../Components/PathNavigate";
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import { AllContext } from "../../context/AllContext";
import Link from "next/link";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import VerifyAdminLogin from './VerifyAdminLogin';
import Switch from "react-switch";
import LoadingBar from "react-top-loading-bar";
export default function UpdateDrinkItemForm() {const [progress, setProgress] = useState(0);
  const { filterDrinkItemsData,updateDrinkItem } = useContext(AllContext);
const [checked, setChecked] = useState(true);
   const [normalPrice, setNormalPrice] = useState(0);
const [normalPriceName,setNormalPriceName]=useState("Normal Price")
  const [mediumPrice, setMediumPrice] = useState(0);
  const [mediumPriceName, setMediumPriceName] = useState("Medium Price");
  const [smallPrice, setSmallPrice] = useState(0);
  const [smallPriceName, setSmallPriceName] = useState("small Price");
  const [largePrice, setLargePrice] = useState(0);
  const [largePriceName, setLargePriceName] = useState("Large Price");
  const [data, setData] = useState([]);
  const [drinkName, setDrinkName] = useState();
  const [Qtys, setQtys] = useState();
  const [Category, setCategory] = useState();
  const [description, setDescription] = useState("");

const handleChanges=()=>{
  setChecked(!checked)
  }



 const send=()=>{

if (filterDrinkItemsData.datas!=undefined||filterDrinkItemsData.datas!=null) {  
      setDrinkName(filterDrinkItemsData.datas.DrinkName);
      setQtys(filterDrinkItemsData.datas.Qty);
      setCategory(filterDrinkItemsData.datas.Category);
               setDescription(filterDrinkItemsData.datas.Description)
if(filterDrinkItemsData.datas.Active=="ON"){
setChecked(true)
}
else{
setChecked(false)
}

if(filterDrinkItemsData.normal!=null){setNormalPrice(parseInt(filterDrinkItemsData.normal))}else{setNormalPrice("")}
if(filterDrinkItemsData.medium!=null){setMediumPrice(parseInt(filterDrinkItemsData.medium))}else{
setMediumPrice("")
}
if(filterDrinkItemsData.large!=null){setLargePrice(parseInt(filterDrinkItemsData.large))}else{
setLargePrice("")
}
if(filterDrinkItemsData.small!=null){setSmallPrice(parseInt(filterDrinkItemsData.small))}else{
setSmallPrice("")
}
    }
    else{
    
    
     router.push('/admin/UpdateDrinkItem')
    return ;
    }
  }
  useEffect(() => {
 
send();
  
       async function dataFetch() {setProgress(40)
      let ress = await fetch(`${HOST}/api/ShowDrinkCategory`);
      let datas = await ress.json();setProgress(100)
      await setData(datas.data);
    }
    dataFetch();
 },[filterDrinkItemsData]);



  const updateItems = async () => {
       if (!drinkName) {
      toast.warn("Please Enter Drink Name", {
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
    if (!description) {
      toast.warn("Please Enter Description of Item", {
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
 if (!Category) {
      toast.warn("Please Enter Category of Item", {
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
 if (Category=="no") {
      toast.warn("Please Select Category of Item", {
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
// normal Prize Get
if((smallPrice=="")&&(mediumPrice=="")&&(largePrice=="")){
if(normalPrice==""){
   toast.warn("Please Enter Atleast Normal Price Of Item", {
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
}


if((smallPrice!="")||(mediumPrice!="")||(largePrice!="")){
if(normalPrice!=""){
   toast.warn("Please Enter Only Normal Price or Different Size Price", {
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
}
if(parseInt(smallPrice)<=0 || parseInt(mediumPrice)<=0 || parseInt(largePrice)<=0 || parseInt(normalPrice)<=0){
toast.warn("Price Not Be Zero Or Below Zero", {
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

let active;
if(checked==true){
active="ON"
}
else{
active="OFF"
}
setProgress(40)
    let response = await fetch(`${HOST}/api/UpdateDrinkItem`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        
      },
      body: JSON.stringify({
        _id: filterDrinkItemsData.datas._id,
        DrinkName: drinkName,
        Qty: Qtys,
        Category: Category,
          Description:description ,largesize:largePrice,mediumsize:mediumPrice,
          Active:active,normalsize:normalPrice,smallsize:smallPrice,
      }),
    });

  let datas=await response.json();setProgress(100)
  if (response.status == 401) {
      toast.error("Please Login With Admin Credentials", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(RedirectFunction, 1500);
      function RedirectFunction() {
        router.push("/admin/Login");
      }
      }
  
    if (response.status == 204) {
      toast.error(`${datas.message}`, {
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
    if (response.status == 409) {
      toast.warn(`${datas.message}`, {
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

    if (response.status == 400) {
      toast.warn(`${datas.message}`, {
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
   if (response.status == 404) {
      toast.warn(`${datas.message}`, {
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
    if (response.status == 201) {
      toast.success(`${drinkName} is Successfully Added`, {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
        setTimeout(RedirectFunction, 1500);
      function RedirectFunction() {
        router.push("/admin/UpdateDrinkItem");
      updateDrinkItem(filterDrinkItemsData.datas._id)
      }
    }
  }
  return (
    <div className={Styles.admin}> <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  


      <HeadTag title="Update Drink Item Form" />
<VerifyAdminLogin />


      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Update Drink Item Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Update Drink Item"
          subsectionURL="/admin/UpdateDrinkItem"
          current="UPDATE DRINK ITEM GENERAL DATA"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Enter New Drink Item For Website</h1>
          </div>
          <div className={StyleFood.form_element}>
            <div
              className="imageChange"
              style={{ textAlign: "center", color: "blue" }}
            >
              <h3>
                <Link href="/admin/UpdateDrinkImage">
                  Click Here To Change Drink Item Image
                </Link>
              </h3>
            </div>
                   <li>
              <p>
                Enter Drink Name <span>*</span>
              </p>
              <input
                type="text"
                name="DrinkName"
                value={drinkName}
                onChange={(e) => setDrinkName(e.target.value)}
              />
            </li>

    
            <li>
              <p>Enter Drink Qty</p>
              <input
                type="text"
                name="JuiceQty"
                value={Qtys}
                readOnly={true}
                onChange={(e) => setQtys(e.target.value)}
              />
            </li>

            <li className={StyleFood.selects}>
              <p>Enter Drink Category <span>*</span></p>
              <select
                name="Juicecategory"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="no">Select Category</option>
                {(data!=undefined) ? <>  {data.map((item, index) => {
                  return (
                    <option value={item.DrinkCategoryName} key={index}>
                      {item.DrinkCategoryName}
                    </option>
                  );
                })}
                </>
                :"" }
              
              </select>
            </li>


<li className={StyleFood.Pricess}>
<h6>Enter Price <span>*</span></h6>
<p><input type="text" name="normalPriceName" className={StyleFood.priceHeading} value={normalPriceName} onChange={(e)=>setNormalPriceName(e.target.value)} readOnly/>   <input
                type="Number"
                name="JuiceQty"
                className={StyleFood.prices}
                value={normalPrice}
                onChange={(e) => setNormalPrice(e.target.value)}
              /> </p>
<h4>Or</h4>
<p>
<input type="text" name="smallPriceName" className={StyleFood.priceHeading} value={smallPriceName} onChange={(e)=>setSmallPriceName(e.target.value)} readOnly/> 
  <input
                type="Number"
                name="JuiceQty"
                className={StyleFood.prices}
                value={smallPrice}
                onChange={(e) => setSmallPrice(e.target.value)}
              /> </p>

   <p>
   <input type="text" name="mediumPriceName" className={StyleFood.priceHeading} value={mediumPriceName} onChange={(e)=>setMediumPriceName(e.target.value)} readOnly/> 
   <input
                type="Number"
                name="JuiceQty"
                className={StyleFood.prices}
                value={mediumPrice}
                onChange={(e) => setMediumPrice(e.target.value)}
              /> </p>  

       <p>
       <input type="text" name="largePriceName" className={StyleFood.priceHeading} value={largePriceName} onChange={(e)=>setLargePriceName(e.target.value)} readOnly />  <input
                type="Number"
                name="JuiceQty"
                className={StyleFood.prices}
                value={largePrice}
                onChange={(e) => setLargePrice(e.target.value)}
              /> </p>                
</li>

              <li className={StyleFood.description}>
                <p>
               Enter Description Category<span>*</span>
              </p>
            <textarea value={description} name="description" onChange={(e)=>setDescription(e.target.value)}>
            
            </textarea>
            </li>
                  <li className={StyleFood.btns}>  
            <p>Product Visibility Status </p>
             <Switch
          onChange={handleChanges}
          checked={checked}
          className={StyleFood.react_switch1}
          offColor='#FF1E1E'
        />
            </li>
            <button onClick={updateItems}> UPDATE DRINK</button>
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

