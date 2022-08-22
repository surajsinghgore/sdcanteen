import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Image from 'next/image'
import Link from 'next/link'
import LoginImage from '../public/login.webp'
import Styles from "../styles/admin.module.css";
import ClientStyle from "../styles/ClinetLogin.module.css";
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';


export default function ClientLogin() {
  return (
    <div>
    <div className={Styles.admin}>
      <HeadTag title="Client Login" />
   <Header />

<div className={ClientStyle.clientLogin}>
<div className={ClientStyle.form}>
<h3>SD CANTEEN</h3>
<li>
<h6>Enter Email/Mobile To Login</h6>
<input type="text" name="" placeholder="Email / Mobile" />
<MdOutlineAlternateEmail className={ClientStyle.icon} />
</li>
<li>
<h6>Enter Password To Login</h6>
<input type="password" name="" placeholder="Password" />
<RiLockPasswordLine className={ClientStyle.icon} />
</li>
<button>Login</button>
<div className={ClientStyle.path}>
<h4><Link href="/Signup">Register New User?</Link></h4>
<h4><Link href="/admin">Admin Login </Link></h4>
</div>
</div>

<div className={ClientStyle.image}>
<Image src={LoginImage} alt="login image" height={320} width={300} className={ClientStyle.img}/>
</div>
</div>


    </div>
   <Footer />
    </div>
  )
}
