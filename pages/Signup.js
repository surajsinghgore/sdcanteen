import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
let HOST = process.env.NEXT_PUBLIC_API_URL;
import Link from 'next/link'
import Styles from "../styles/admin.module.css";
import ClientStyle from "../styles/Signup.module.css";
import { BiUserPin } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { TbAddressBook } from 'react-icons/tb';
import { AiOutlineMail } from 'react-icons/ai';
import { GoDeviceMobile } from 'react-icons/go';
import { BsGenderFemale } from 'react-icons/bs';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { useState ,useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from 'next/router'
import HidePagesAfterLogin from "./HidePagesAfterLogin";
export default function Signup() {
 const [fullName,setFullName]=useState("");
 const [age,setAge]=useState("");
 const [email,setEmail]=useState("");
 const [mobile,setMobile]=useState("");
 const [gender,setGender]=useState("Select your gender");
 const [address,setAddress]=useState("");
 const [password,setPassword]=useState("");
 const [cpassword,setCpassword]=useState("");




 const sendData=async (e)=>{
 e.preventDefault();

if(!fullName){
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
 toast.warn(`Please Enter Age`, {
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
if(!password){
 toast.warn(`Please Enter Password`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });  return ;
}
if(!cpassword){
 toast.warn(`Please Enter Confirm Password`, {
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
if(password!==cpassword){
 toast.warn(`Password And Confirm Password Not Match`, {
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
const res = await fetch(`${HOST}/api/ClientRegister`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        FullName:fullName,Age:age,Email:email,Mobile:mobile,Gender:gender,FullAddress:address,Password:password
      }),
    });
let data=await res.json();
if(data.status==501){
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
if(data.otpError){
  toast.warn(`${data.message}`, {
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
      router.push("/Signup");
    }
return ;
}
if(data.status=="400"){
for(let i=0;i<data.errors.length;i++){
if(i<1){
  toast.warn(`${data.errors[i].msg}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
continue;
}
}
return ;
}
if(data.status==400){
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
if(data.status==401){
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

if(data.status==201){
toast.success(`Otp Send Successfully to ${data.data.Email}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
localStorage.setItem('clientRegistrationEmail',data.data.Email)
  setTimeout(Redirect, 1200);
    function Redirect() {
      router.push("/OtpVerifyClientRegister");
    }
}
  }
  return (
    <div>
    <HidePagesAfterLogin />
    <div className={Styles.admin}>
      <HeadTag title="Client Signup" />
   <Header />

<div className={ClientStyle.clientLogin}>
<div className={ClientStyle.form}>
<h3>SD CANTEEN</h3>
<form>
<li>
<h6>Enter Full Name <span>*</span></h6>
<input type="text" name="fullname" placeholder="Enter full name" value={fullName} onChange={(e)=>setFullName(e.target.value)} required/>
<BiUserPin className={ClientStyle.icon} />
</li>

<li>
<h6>Enter Age <span>*</span></h6>
<input type="number" name="age" placeholder="Enter your age" value={age} onChange={(e)=>setAge(e.target.value)} required/>
<BsPersonBoundingBox className={ClientStyle.icon} />
</li>

<li>
<h6>Enter Email Account <span>*</span></h6>
<input type="email" name="email" placeholder="Enter email id" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="new-password" required />
<AiOutlineMail className={ClientStyle.icon} />
</li>


<li>
<h6>Enter Mobile Number <span>*</span></h6>
<input type="number" name="mobile" placeholder="Enter email id" value={mobile} onChange={(e)=>setMobile(e.target.value)} required/>
<GoDeviceMobile className={ClientStyle.icon} />
</li>

<li>
<h6>Select Gender <span>*</span></h6>
<select name="gender" value={gender} onChange={(e)=>setGender(e.target.value)} required>
<option value="">Select your gender</option>
<option>Male</option>
<option>Female</option>
<option>Transgender</option>
<option></option>
</select>
<BsGenderFemale className={ClientStyle.icon} />
</li>

<li>
<h6>Enter Full Address <span>*</span></h6>
<input type="text" name="address" placeholder="Enter Address" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
<TbAddressBook className={ClientStyle.icon} />
</li>
<li>
<h6>Enter Password <span>*</span></h6>
<input type="password" name="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="new-password" required/>
<RiLockPasswordLine className={ClientStyle.icon} />
</li>
<li>
<h6>Enter Confirm Password <span>*</span></h6>
<input type="password" name="confirmpassword" placeholder="Confirm Password" value={cpassword} onChange={(e)=>setCpassword(e.target.value)} required/>
<RiLockPasswordLine className={ClientStyle.icon} />
</li>
<button style={{marginLeft:"35%"}} onClick={sendData}>Create Account</button>
</form>
<div className={ClientStyle.path}>
<h4><Link href="/ClientLogin">Already Registered ?</Link></h4>
<h4 style={{marginLeft:"15%"}}><Link href="/admin">Admin Login </Link></h4>

</div>
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
