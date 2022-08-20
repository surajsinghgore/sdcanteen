import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import ContactStyle from "../styles/Contact.module.css";
import banner from '../public/contactbanner.jpg';
import shape from '../public/shape.png';
import line from '../public/line-cauve.png';
import Link from 'next/link';
import Image from 'next/image';
import Banner from "../Components/Banner";
import { GoLocation } from 'react-icons/go';
import { FiPhoneCall } from 'react-icons/fi';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { FaFax } from 'react-icons/fa';

export default function Contact() {
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
<form>
<input type="text" placeholder="Full Name" className={ContactStyle.Names} />
<input type="text" placeholder="Email Id" className={ContactStyle.Email} />
<input type="number" placeholder="Mobile Number" className={ContactStyle.Number}/>
<textarea name="meesage" className={ContactStyle.Message} placeholder="Your Message"></textarea>
<button>SUBMIT NOW</button>
</form>
</div>
</div>    
   <Footer />
    
    </>
  )
}
