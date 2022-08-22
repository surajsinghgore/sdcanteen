import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Image from 'next/image'
import Link from 'next/link'
import Styles from "../styles/admin.module.css";
import ClientStyle from "../styles/Signup.module.css";

import { TbDeviceMobileMessage } from 'react-icons/tb';



export default function OtpVerifyClientRegister() {
  return (
    <div>
    <div className={Styles.admin}>
      <HeadTag title="Client Signup" />
   <Header />

<div className={ClientStyle.clientLogin}>
<div className={ClientStyle.form}>
<h3>SD CANTEEN</h3>
<h2>Otp Successfully send to <span>surajthakurrs45@gmail.com</span></h2>
<li>
<h6 style={{top:"-48%"}}>Enter 6 Digit Otp send to Email Id <span>*</span></h6>
<input type="number" name="" placeholder="Enter OTP" maxLength={6}/>
<TbDeviceMobileMessage className={ClientStyle.icon} />
</li>
<button style={{marginLeft:"36%"}}>Verify User</button>
<div className={ClientStyle.path}>
<h4><Link href="/ClientLogin">Resend Otp Again ?</Link></h4>
<h4 style={{marginLeft:"12%"}}><Link href="/Signup">Wrong Email Id ?</Link></h4>
</div>
</div>

</div>


    </div>
   <Footer />
    </div>
  )
}
