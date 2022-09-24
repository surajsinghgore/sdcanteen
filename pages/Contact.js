import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import ContactStyle from "../styles/Contact.module.css";
import banner from '../public/contactbanner.jpg';
import shape from '../public/shape.png';
import line from '../public/line-cauve.png';
import router from 'next/router'
import Image from 'next/image';
import Banner from "../Components/Banner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoLocation } from 'react-icons/go';
import { FiPhoneCall } from 'react-icons/fi';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { FaFax } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { useForm, ValidationError } from '@formspree/react';
export default function Contact() {
const [userName,setUserName]=useState("");
const [userEmail,setUserEmail]=useState("");
const [userMobile,setUserMobile]=useState("");
const [userMessage,setUserMessage]=useState("");


 const [state, handleSubmit] = useForm("xrgdejno");
const fire=(e)=>{
e.preventDefault();
if((userName=="")||(userEmail=="")||(userMobile=="")||(userMessage=="")){
   toast.warn('Please Fill all the form fields', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return 0;
}
    toast.success('Message Successfully Send. You will get response within ( 24 Hours )', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(Redirect, 1200);
    function Redirect() {
      router.push("/");
    }
}


//  useEffect(()=>{
 
//   if (state.succeeded) {
//  toast.success('Message Successfully Send. You will get response within ( 24 Hours )', {
//       position: "bottom-right",
//       autoClose: 2000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//       setUserName("");
//       setUserEmail("");
//       setUserMobile("");
//       setUserMessage("");
//   }
  
//  },[state])
 


  return (
    <>
     <div className={Styles.admin}>
     <HeadTag title="Contact Us" />
   <Header />
<Banner BannerImage={banner} Height={400} Width={1350}
CurrentPageUrl="/Contact" CurrentPage="Contact Us" SubPage="Page" H1Style={{paddingRight:"75%",marginTop:"0%"}} PStyle={{paddingRight:"71%"}}/>
 </div>




<div className={ContactStyle.contactIcons}>
<li>
<div className={ContactStyle.Icon}>
<div className={ContactStyle.Div}>
<Image src={shape} alt="shape" height={75} width={80}/></div>
<GoLocation className={ContactStyle.icons}/>
</div>
<div className={ContactStyle.deatils}>
<p>ggdsd sector 32-C chandigarh
</p>
</div>
</li>


<li>
<div className={ContactStyle.Icon}>
<div className={ContactStyle.Div}>
<Image src={shape} alt="shape" height={75} width={80}/></div>
<FiPhoneCall className={ContactStyle.icons}/>
</div>
<div className={ContactStyle.deatils}>
<p style={{marginTop:"15%"}}>+0172 491 2400
</p>
</div>
</li>



<li>
<div className={ContactStyle.Icon}>
<div className={ContactStyle.Div}>
<Image src={shape} alt="shape" height={75} width={80}/></div>
<HiOutlineMailOpen className={ContactStyle.icons}/>
</div>
<div className={ContactStyle.deatils}>
<p style={{marginTop:"15%"}}>info@ggdsd.ac.in
</p>
</div>
</li>

<li>
<div className={ContactStyle.Icon}>
<div className={ContactStyle.Div}>
<Image src={shape} alt="shape" height={75} width={80}/></div>
<FaFax className={ContactStyle.icons}/>
</div>
<div className={ContactStyle.deatils}>
<p style={{marginTop:"15%"}}>+91-172-2661077
</p>
</div>
</li>
</div>

<div className={ContactStyle.curli_line}>
<Image src={line} alt="shape" height={75} width={1350}/>
</div>

<div className={ContactStyle.form}>
<div className={ContactStyle.left}>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1395.880377230655!2d76.77054255924733!3d30.703901985301545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed8c1f11d227%3A0x70bd95668a9bd51f!2sNescafe%20Cafe%20SD%20College!5e1!3m2!1sen!2sin!4v1660984992813!5m2!1sen!2sin" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>
<div className={ContactStyle.right}>
<h3>GET IN TOUCH</h3>
<h2>Send Us Message</h2>
<p>Please provide your details below so that we get in touch.</p>
<form onSubmit={handleSubmit}>
<input type="text" name="name" placeholder="Full Name" className={ContactStyle.Names} value={userName} onChange={(e)=>setUserName(e.target.value)}/>
<input type="email" name="email" placeholder="Email Id" className={ContactStyle.Email} value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>

<input type="number" name="number" placeholder="Mobile Number" className={ContactStyle.Number} value={userMobile} onChange={(e)=>setUserMobile(e.target.value)}/>

<textarea name="meesage" className={ContactStyle.Message} placeholder="Your Message" value={userMessage} onChange={(e)=>setUserMessage(e.target.value)}></textarea>
<button disabled={state.submitting} onClick={fire}>SUBMIT NOW</button>
</form>
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
   <Footer />
    
    </>
  )
}
