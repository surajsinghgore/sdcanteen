import StyleFood from "../styles/AddFood.module.css";
import { BiCurrentLocation } from 'react-icons/bi';
import Switch from "react-switch";
import { useEffect, useState } from "react";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AdminRightInnerHeader(props) {

 const [checked, setChecked] = useState(false);
// refresh page problem fix
  useEffect(()=>{
  if(localStorage.getItem('orderStatus')){
  if(localStorage.getItem('orderStatus')=="true"){
  setChecked(false)
  }
  else{
  setChecked(true)
  }
  }
  },[])


  const handleChange=() => {
  
    setChecked(!checked);
    localStorage.setItem('orderStatus',checked)
const sendData=async()=>{

// fetch Update Data
const res1 = await fetch(`${HOST}/api/ShowOrderOnOffStatus`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      }
    });
    let data=await res1.json();

        if(res1.status==501){
toast.error('Internal Server Error', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
    }
 if(res1.status==404){
toast.warn('No Record Found', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
    }
    let id;
// update status
if(data.data){
id=data.data[0]._id;
if(data.data[0].Status!==checked){
if(!id){
toast.warn('Id Not Found', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}
const res = await fetch(`${HOST}/api/UpdateOnOffStatus`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Status: checked,id:id
      }),
    });

    if(res.status==501){
toast.error('Internal Server Error', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
    }
    if(res.status==400){
toast.warn('Status is Empty', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
    }

    if(checked==true){
    toast.error('Order Is OFF Now', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
    }
    else{
    toast.success('Order Is  ON Now', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
    }
  

}
}
}

sendData();
  };
  return (
    <div className={StyleFood.topHeader}>
    {/* heading section */}
    <div className={StyleFood.heading_section}>
    <i>
    
    <BiCurrentLocation />
    </i>
    <h1>{props.title}</h1>
    </div>

    {/* alert */}
<div className="alert">


</div>
    {/* profile */}
    <div className={StyleFood.profile_section}>
   <h1>order controller:</h1>
   <label>
        <Switch
          onChange={handleChange}
          checked={checked}
          className={StyleFood.react_switch}
          offColor='#FF1E1E'
        />
      </label>
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
  )
}
