import React, { useContext ,useState, useEffect} from "react";
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

 function UpdateCoffeeItemForm() {
  const { filterCoffeeItemsData ,updateCoffeeItem} = useContext(AllContext);
let array=[];
const [checked, setChecked] = useState(true);
   const [normalPrice, setNormalPrice] = useState("");
const [normalPriceName,setNormalPriceName]=useState("")
  const [mediumPrice, setMediumPrice] = useState("");
  const [mediumPriceName, setMediumPriceName] = useState("");
  const [smallPrice, setSmallPrice] = useState("");
  const [smallPriceName, setSmallPriceName] = useState("");
  const [largePrice, setLargePrice] = useState("");
  const [largePriceName, setLargePriceName] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState(['']);
  const [CoffeeName, setCoffeeName] = useState('');
  const [Price, setPrice] = useState('');
  const [Qtys, setQtys] = useState('');
  const [Category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');


const handleChanges=()=>{
  setChecked(!checked)
  }

  useEffect(() => {
  setNormalPriceName("Normal Price")
  setMediumPriceName("Medium Size Price")
  setSmallPriceName("Small Size Price")
  setLargePriceName("Large Size Price")
    if (filterCoffeeItemsData[0]!=undefined) {
      setCoffeeName(filterCoffeeItemsData[0].CoffeeName);
      setPrice(filterCoffeeItemsData[0].Price);
      setQtys(filterCoffeeItemsData[0].Qty);
      setCategory(filterCoffeeItemsData[0].Category);
      setSubCategory(filterCoffeeItemsData[0].Category)
      setDescription(filterCoffeeItemsData[0].Description)
   
   
   
if(filterCoffeeItemsData[0].Active=="ON"){
setChecked(true)
}
else{
setChecked(false)
}

filterCoffeeItemsData[0].ItemCost.map((item)=>{
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
    router.push('/admin/UpdateCoffeeItem')
          }
    setTimeout(2000,back);
    }
    async function dataFetch() {
      let ress = await fetch(`${HOST}/api/ShowCoffeeCategory`);
      let datas = await ress.json();
      await setData(datas.data);
    }
    dataFetch();
  }, [filterCoffeeItemsData]);

  const updateItems = async (e) => {
   e.preventDefault();
    if (!CoffeeName) {
      toast.warn("Please Enter Coffee Name", {
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




    let response = await fetch(`${HOST}/api/UpdateCoffeeItem`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        
      },
      body: JSON.stringify({
        _id: filterCoffeeItemsData[0]._id,
        CoffeeName: CoffeeName,
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
      toast.success(`${CoffeeName} is Successfully Added`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      updateCoffeeItem();
      setTimeout(RedirectFunction, 1000);
      function RedirectFunction() {
        router.push("/admin/UpdateCoffeeItem");
      }
    }
  };

  return (
    <div className={Styles.admin}>
      <HeadTag title="Update Coffee Item" />

      {/* left panel bar */}
      <AdminLeftMenu />

<VerifyAdminLogin />

      {/* right bar */}
      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Update Coffee Item Page" />
        <PathNavigate
          mainSection="Admin"
          mainSectionURL="/admin"
          subsection="Update Coffee Item"
          subsectionURL="/admin/UpdateCoffeeItem"
          current="UPDATE COFFEE ITEM GENERAL DATA"
        />

        {/* form add food */}

        <div className={StyleFood.Form}>
          <div className={StyleFood.heading}>
            <h1>Enter New Coffee Item For Website</h1>
          </div>
          <div className={StyleFood.form_element}>
            <div
              className="imageChange"
              style={{ textAlign: "center", color: "blue" }}
            >
              <h3>
                <Link href="/admin/UpdateCoffeeImage">
                  Click Here To Change Coffee Item Image
                </Link>
              </h3>
            </div>
               <li>
              <p>
                Enter Coffee Name <span>*</span>
              </p>
              <input
                type="text"
                name="juiceName"
                value={CoffeeName}
                onChange={(e) => setCoffeeName(e.target.value)}
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
              <p>Enter Coffee Category <span>*</span></p>
              <select
                name="Juicecategory"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="no">Select Category</option>
                {(data!=undefined) ? <>  {data.map((item, index) => {
                  return (
                    <option value={item.CoffeeCategoryName} key={index}>
                      {item.CoffeeCategoryName}
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
            <button onClick={updateItems}> UPDATE COFFEE</button>
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

export default UpdateCoffeeItemForm