import React, { useContext ,useState, useEffect } from "react";
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
import VerifyAdminLogin from './VerifyAdminLogin';
import Switch from "react-switch";
let HOST = process.env.NEXT_PUBLIC_API_URL;
export default function UpdateJuiceItemForm() {
let array=[];
  const { filterJuiceItemsData,updateJuiceItem } = useContext(AllContext);
 const [checked, setChecked] = useState(true);
   const [normalPrice, setNormalPrice] = useState("");
const [normalPriceName,setNormalPriceName]=useState("Normal Price")
  const [mediumPrice, setMediumPrice] = useState("");
  const [mediumPriceName, setMediumPriceName] = useState("Medium Size Price");
  const [smallPrice, setSmallPrice] = useState("");
  const [smallPriceName, setSmallPriceName] = useState("Half Size Price");
  const [largePrice, setLargePrice] = useState("");
  const [largePriceName, setLargePriceName] = useState("Large Size Price");
  const [data, setData] = useState([]);
  const [juiceName, setJuiceName] = useState();
  const [Qtys, setQtys] = useState();
  const [Category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState("");


  const handleChanges=()=>{
  setChecked(!checked)
  }


  useEffect(() => {
    if (filterJuiceItemsData[0]!=undefined) {
      setJuiceName(filterJuiceItemsData[0].JuiceName);
      setQtys(filterJuiceItemsData[0].Qty);
      setCategory(filterJuiceItemsData[0].Category);
         setSubCategory(filterJuiceItemsData[0].Category)
               setDescription(filterJuiceItemsData[0].Description)
if(filterJuiceItemsData[0].Active=="ON"){
setChecked(true)
}
else{
setChecked(false)
}

filterJuiceItemsData[0].ItemCost.map((item)=>{
if(item.sizeName=="normalsize"){
setNormalPrice(item.Price)
}
if(item.sizeName=="mediumsize"){
setMediumPrice(item.Price)
}
if(item.sizeName=="largesize"){
setLargePrice(item.Price)
}
if(item.sizeName=="smallsize"){
setSmallPrice(item.Price)
}
})
   }
   else{
        function back(){
    router.push('/admin/UpdateJuiceItem')
          }
    setTimeout(2000,back);
}
    async function dataFetch() {
      let ress = await fetch(`${HOST}/api/ShowJuiceCategory`);
      let datas = await ress.json();
      await setData(datas.data);
    }
    dataFetch();
  }, [filterJuiceItemsData]);

  const updateItems = async (e) => {
    e.preventDefault();
    if (!juiceName) {
      toast.warn("Please Enter Juice Name", {
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
    if (!description) {
      toast.warn("Please Enter Description of Item", {
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
 if (!Category) {
      toast.warn("Please Enter Category of Item", {
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
 if (Category=="no") {
      toast.warn("Please Select Category of Item", {
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
    // matching Weather Data Change OR Not
 if(normalPrice){
array.push({"normalsize":normalPrice})
}
if(mediumPrice){
array.push({"mediumsize":mediumPrice})

}
if(largePrice){
array.push({"largesize":largePrice})
}
if(smallPrice){
array.push({"smallsize":smallPrice})
}


if((smallPrice=="")&&(mediumPrice=="")&&(largePrice=="")){
if(normalPrice==""){
   toast.warn("Please Enter Atleast Normal Price Of Item", {
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
}


if((smallPrice!="")||(mediumPrice!="")||(largePrice!="")){
if(normalPrice!=""){
   toast.warn("Please Enter Only Normal Price or Different Size Price", {
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
}
if(parseInt(smallPrice)<=0 || parseInt(mediumPrice)<=0 || parseInt(largePrice)<=0 || parseInt(normalPrice)<=0){
toast.warn("Price Not Be Zero Or Below Zero", {
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

let active;
if(checked==true){
active="ON"
}else{
active="OFF"
}




    let response = await fetch(`${HOST}/api/UpdateJuiceItem`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        
      },
      body: JSON.stringify({
        _id: filterJuiceItemsData[0]._id,
        JuiceName: juiceName,
        Qty: Qtys,
        Category: Category,
          Description:description ,
          ItemCost:array,
          Active:active
      }),
    });
  if (response.status == 401) {
      toast.error("Please Login With Admin Credentials", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(RedirectFunction, 1000);
      function RedirectFunction() {
        router.push("/admin/Login");
      }
      }
    let datas = await response.json();
    if (response.status == 204) {
      toast.error(`${datas.message}`, {
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

    if (response.status == 409) {
      toast.warn(`${datas.message}`, {
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

    if (response.status == 400) {
      toast.warn(`${datas.message}`, {
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
   if (response.status == 404) {
      toast.warn(`${datas.message}`, {
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
    if (response.status == 201) {
      toast.success(`${juiceName} is Successfully Added`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      updateJuiceItem();
      setTimeout(RedirectFunction, 1000);
      function RedirectFunction() {
        router.push("/admin/UpdateJuiceItem");
      }
    }
  };

  return (
    <div className={Styles.admin}>
    <VerifyAdminLogin />
      <HeadTag title="Update Juice Item Form" />
      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Update Juice Item Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Update Juice Item"
          subsectionURL="/admin/UpdateJuiceItem"
          current="UPDATE JUICE ITEM GENERAL DATA"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Enter New Juice Item For Website</h1>
          </div>
          <div className={StyleFood.form_element}>
            <div
              className="imageChange"
              style={{ textAlign: "center", color: "blue" }}
            >
              <h3>
                <Link href="/admin/UpdateJuiceImage">
                  Click Here To Change Juice Item Image
                </Link>
              </h3>
            </div>
                  <li>
              <p>
                Enter Juice Name <span>*</span>
              </p>
              <input
                type="text"
                name="juiceName"
                value={juiceName}
                onChange={(e) => setJuiceName(e.target.value)}
              />
            </li>

    
            <li>
              <p>Enter Juice Qty</p>
              <input
                type="text"
                name="JuiceQty"
                value={Qtys}
                readOnly={true}
                onChange={(e) => setQtys(e.target.value)}
              />
            </li>

            <li className={StyleFood.selects}>
              <p>Enter Juice Category <span>*</span></p>
              <select
                name="Juicecategory"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="no">Select Category</option>
                {(data!=undefined) ? <>  {data.map((item, index) => {
                  return (
                    <option value={item.JuiceCategoryName} key={index}>
                      {item.JuiceCategoryName}
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
            <p>Product Visiblity Status </p>
             <Switch
          onChange={handleChanges}
          checked={checked}
          className={StyleFood.react_switch1}
          offColor='#FF1E1E'
        />
            </li>
                  <button onClick={updateItems}> UPDATE JUICE</button>
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
