import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Image from 'next/image'
import router from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "../styles/admin.module.css";
import ProfileStyles from "../styles/ClientProfileUpload.module.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import React, { useEffect,useState } from "react";
import boyProfile from '/public/men.png'
import girlProfile from '/public/girl.png'

import { AiOutlineCloudUpload } from 'react-icons/ai';
export default function ClientProfileUpload() {
  const [imgs, setImgs] = useState(boyProfile);
  const [files, setFiles] = useState("");


useEffect(()=>{
const getData=async()=>{
const res = await fetch(`${HOST}/api/ShowClientDetails`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
let data=await res.json();
if(!data){
router.push('/')
}
  if(data.unauthorized){
  toast.error(`${data.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
 setTimeout(Redirect, 1200);
    function Redirect() {
        localStorage.removeItem('clientToken')
  localStorage.removeItem('clientId')
  router.push('/ClientLogin')
    }
  }

   if(data.wrongUser){
   toast.error(`${data.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
 setTimeout(Redirect, 1200);
    function Redirect() {
        localStorage.removeItem('clientToken')
  localStorage.removeItem('clientId')
  router.push('/ClientLogin')
    }

  }
if(data.data.Profile!==""){
router.push('/')
}
  if(data.data.Gender=='male'){
  setImgs(boyProfile)
  }
  if(data.data.Gender=='female'){
  setImgs(girlProfile)
  }
}
getData();
},[])
 const handleChange = async (e) => {
    if (e.target.files[0]) {
      var file = e.target.files[0];
      setFiles(file);
      let url = await URL.createObjectURL(file);
      setImgs(url);
    }
  };



const uploadProfileImage=async(e)=>{
e.preventDefault();

if(!files){
toast.warn('Please Upload Profile Photo', {
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
const data = new FormData();
    data.append("Profile", files);
 let res = await fetch(`${HOST}/api/ClientProfile`, {
      method: "POST",
      body: data,
    });

    let datas=await res.json();
    if(res.status==400){
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
    if(res.status==401){
const redirects=()=>{
toast.error('Please Login First', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
router.push("/ClientLogin");
return ;
}
setTimeout(redirects,2000);
}
 if(res.status==501){
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
    if(res.status==201){
         toast.success('Profile Photo Successfully uploaded', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});   
 setTimeout(Redirect, 1200);
    function Redirect() {
  router.push('/')
    }
    
    }
}
  return (
    <div>
    <div className={Styles.admin}>
      <HeadTag title="Uploard Client Profile" />
   <Header />
       </div>

    <div className={ProfileStyles.Profile}>
    <div className={ProfileStyles.left}>
<h1>Please Upload your Profile Photo</h1>
<div className={ProfileStyles.div}>

    <label className={ProfileStyles.custom_file_upload}>
<input
                type="file"
                name="photo"
                id="photoFood"
                onChange={handleChange}
              />
   <AiOutlineCloudUpload className={ProfileStyles.upload_icon} /> Select Profile
</label>
</div>
<button onClick={uploadProfileImage}>Upload Profile</button>
</div>


 <div className={ProfileStyles.right}>
 <div className={ProfileStyles.image}>
  <Image src={imgs} alt="" id="output" width={780} height={800} />
 </div>
</div>
</div>



   <Footer />

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
