import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
// import Style from '../styles/ClientPanel.module.css'
import Styles from "../styles/admin.module.css";
import style from '../styles/ClientPanel.module.css'
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader";
import { useEffect ,useState} from "react";
import Link from 'next/link'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import router from 'next/router'
import boyProfile from '../public/men.png'
import Image from 'next/image'
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegUserCircle } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import { MdFastfood } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';

export default function ClientManage() {
 const [imgs, setImgs] = useState(boyProfile);
  const [files, setFiles] = useState("");
const [loader,setLoader]=useState(false);
const [general,setGeneral]=useState(true)
const [password,setPassword]=useState(false)
const [opass,setOpass]=useState("")
const [npass,setNpass]=useState("")
const [cnpass,setCnpass]=useState("")
const [ud,setUd]=useState(false);
const [email,setEmail]=useState("")
const [age,setAge]=useState("")
const [gender,setGender]=useState("")
const [mobile,setMobile]=useState("")
const [fullname,setFullName]=useState("")
const [address,setAddress]=useState("")
const [gen,setGen]=useState(true);
const [uprofile,setUprofile]=useState(false)
const [data,setData]=useState([]);
useEffect(()=>{
setLoader(true)
if(localStorage.getItem('login')!=undefined){
const getData=async()=>{
const res = await fetch(`${HOST}/api/ShowClientDetails`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      }
    });

let data=await res.json();
setLoader(false)

if(data!=undefined){

if(res.status==404){
const redirects=()=>{
toast.error('Record Not Found', {
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
toast.error('Internal Server Error.Please try Again', {
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

if(data.data!==undefined){
setData(data.data)
setImgs(`/ClientImages/${data.data.Profile}`)
setFullName(data.data.FullName)
setAge(data.data.Age)
setEmail(data.data.Email)
setGender(data.data.Gender)
setAddress(data.data.FullAddress)
setMobile(data.data.Mobile)

}
}
}
getData();
}
else{
router.push("/ClientLogin");
}

},[])
const generalActive=()=>{
setGeneral(true)
setPassword(false)
 setGen(true)
}
const passwordActive=()=>{
setGeneral(false)
 setGen(false)
setPassword(true)
}

const uploardImageBtn=()=>{
setUprofile(true)





}

const lagout=()=>{

const getData=async()=>{
const res = await fetch(`${HOST}/api/LogoutClient`);
await res.json();
if(res.status==201){
toast.success('User Logout Successfully', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
localStorage.removeItem('login')
 localStorage.removeItem("itemOrder");
const redirect=()=>{
router.push("/ClientLogin");
}
setTimeout(redirect,2000);
}

}
getData();
}


// update general details function fire
const updateGeneral=(e)=>{
 e.preventDefault();
if((data.FullAddress==address) &&(data.FullName==fullname) &&(data.Age==age) &&(data.Email==email) &&(data.Mobile==mobile) &&(data.Gender==gender) ){
toast.warn('Same Record Not Update', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return ;
}
if(!fullname){
 toast.warn(`Please Enter FullName`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return ;
}
if(!age){
 toast.warn("Please Enter Age", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });  return ;
}
if(!email){
 toast.warn(`Please Enter Email`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });  return ;
}
if(!mobile){
 toast.warn(`Please Enter Mobile`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });  return ;
}
if(!gender){
 toast.warn(`Please Enter Gender`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });  return ;
}
if(!address){
 toast.warn(`Please Enter Address`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}
}
let count=0;
let n=parseInt(mobile);
  do {
    n /= 10;
    ++count;
  } while (n != 0);

console.log(count)

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
    <><Loader loader={loader}/>
      <div className={Styles.admin}>
     <HeadTag title="Client Panel" />
   <Header />
   </div>
  
<div className={style.clientPanel}>
<div className={style.left}>
<div className={style.imageSection}>
 <Image src={imgs} alt="profile"width={350} height={300} className={style.imgs}/>

<div className={style.update} title="Update Profile" onClick={uploardImageBtn}><MdEdit className={style.edit}/>Edit</div>
</div>
<div className={style.title}>
<h1>{fullname}</h1>
</div>
<hr />
<div className={style.links}>
<li className={(general)? style.link:""} onClick={generalActive}>
<div className={style.icon}><div className={style.ic}><FaRegUserCircle /></div></div>
<div className={style.text}>General</div>
</li>

<li className={(password)? style.link:""} onClick={passwordActive}>
<div className={style.icon}><div className={style.ic}><RiLockPasswordLine /></div></div>
<div className={style.text}>Password</div>
</li>
<Link href="/PastOrder"><a><li>
<div className={style.icon}><div className={style.ic}><MdFastfood /></div></div>
<div className={style.text}>Orders</div>
</li></a></Link>

<li onClick={lagout}>
<div className={style.icon}><div className={style.ic}><TbLogout /></div></div>
<div className={style.text}>Logout</div>
</li>

</div>
</div>



<div className={style.right}>
{/* general details */}
{(gen) ?
 <div className={style.general}>
<div className={style.top}>
<div className={style.headingTop}>General Details</div>
<div className={style.topicons} title="Edit Details" onClick={()=>setUd(true)}><MdEdit className={style.edit}/> Edit</div>
</div>
{/* details */}
<div className={style.forms}>

<li>
<div className={style.tt}>FullName</div>
<div className={style.dd}>
 <input type="text" placeholder="Your Fullname" value={fullname} readOnly />
</div>
</li>

<li>
<div className={style.tt}>Age</div>
<div className={style.dd}>
 <input type="number" placeholder="Your Age" value={age} readOnly/>
</div>
</li>


<li>
<div className={style.tt}>Email</div>
<div className={style.dd}>

 <input type="email" placeholder="Your Email Id" value={email} readOnly />


</div>
</li>


<li>
<div className={style.tt}>Mobile</div>
<div className={style.dd}>
 <input type="number" placeholder="Your Mobile Number" value={mobile} readOnly />


</div>
</li>

<li>
<div className={style.tt}>Gender</div>
<div className={style.dd} >
 <select value={gender} disabled>
<option>Male</option>
<option>Female</option>
<option>Transgender</option>
</select>
</div>
</li>


<li className={style.text}>
<div className={style.tt}>Full Address</div>
<div className={style.dd}> <textarea placeholder="Your Full Address" value={address} readOnly ></textarea>


</div>
</li>
</div>
</div>:
// 
<div className={style.password}>
<div className={style.top}>
<div className={style.headingTop}>Password Details Manage</div>
</div>
{/* details */}
<div className={style.forms}>

<li>
<div className={style.tt}>Current Password</div>
<div className={style.dd}>
 <input type="password" placeholder="Enter current password" value={opass} onChange={(e)=>setOpass(e.target.value)} id="password" autoComplete="new-password"  />
</div>
</li>

<li>
<div className={style.tt}>New Password</div>
<div className={style.dd}>
 <input type="password" placeholder="Enter new password" value={npass} onChange={(e)=>setNpass(e.target.value)} id="password" autoComplete="new-password"  />
</div>
</li>


<li>
<div className={style.tt}>Re-enter new password  </div>
<div className={style.dd}>
 <input type="password" placeholder="Enter again new password" value={cnpass} onChange={(e)=>setCnpass(e.target.value)} id="password" autoComplete="new-password"  />


</div>
</li>
<li>
<button>Change Password</button>

</li>
</div>
</div>

}


</div>

{(ud)? 
<div className={style.updateGeneral}>
<div className={style.shadow}></div>
<div className={style.form}>

<div className={style.general}>
<div className={style.top}>
<div className={style.headingTop}>Edit General Details</div>
<div className={style.topicons} title="Close Details" onClick={()=>setUd(false)}><span>x</span></div>
</div>
{/* details */}
<div className={style.forms}>
<li>
<div className={style.tt}>FullName</div>
<div className={style.dd}>
 <input type="text" placeholder="Your Fullname" value={fullname} onChange={(e)=>setFullName(e.target.value)} />

</div>
</li>

<li>
<div className={style.tt}>Age</div>
<div className={style.dd}>

 <input type="number" placeholder="Your Age" value={age} onChange={(e)=>setAge(e.target.value)} />

</div>
</li>


<li>
<div className={style.tt}>Email</div>
<div className={style.dd}>
<input type="email" placeholder="Your Email Id" value={email} onChange={(e)=>setEmail(e.target.value)} />
</div>
</li>


<li>
<div className={style.tt}>Mobile</div>
<div className={style.dd}>
 <input type="number" placeholder="Your Mobile Number" value={mobile} onChange={(e)=>setMobile(e.target.value)} />
</div>
</li>

<li>
<div className={style.tt}>Gender</div>
<div className={style.dd} >
<select value={gender} onChange={(e)=>setGender(e.target.value)} >
<option>Male</option>
<option>Female</option>
<option>Transgender</option>
</select> 
</div>
</li>


<li className={style.text}>
<div className={style.tt}>Full Address</div>
<div className={style.dd}>
 <textarea placeholder="Your Full Address" value={address} onChange={(e)=>setAddress(e.target.value)}  ></textarea>
</div>
</li>
</div>

</div>





<button onClick={updateGeneral}>Update Details</button>

</div>




</div>: ""}


{(uprofile)? 
 <div className={style.profile}>
<div className={style.shadow}></div>
<div className={style.form}>

<div className={style.general}>
<div className={style.top}>
<div className={style.headingTop}>Upload New Profile </div>
<div className={style.topicons} title="Close Details" onClick={()=>setUprofile(false)}><span>x</span></div>
</div>
{/* details */}
<div className={style.upsection}>
  <div className={style.lefts}>
<div className={style.div}>

    <label className={style.custom_file_upload}>
<input
                type="file"
                name="photo"
                id="photoFood"
                onChange={handleChange}
              />
   <AiOutlineCloudUpload className={style.upload_icon} /> Select Profile
</label>
</div>
<button onClick={uploadProfileImage}>Click to upload</button>
</div>





 <div className={style.rights}>
 <div className={style.imageSections} style={{paddingTop:"13%",marginLeft:"115px"}}>
  <Image src={imgs} alt="client profile" id="output" width={300} height={300} style={{borderRadius:"50%"}}/>
</div>
</div>





</div>

</div>



</div>




</div>: ""}



</div>






   <Footer />
 <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
