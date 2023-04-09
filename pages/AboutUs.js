import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import about from "../styles/AboutUs.module.css";
import Link from 'next/link'
import Image from 'next/image'


let bannerImg = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014250/about_cfi9i8.jpg`;
let crew = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014243/crew_eyhhyz.jpg`;
import { BiShoppingBag } from 'react-icons/bi';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { MdOutlineGppGood } from 'react-icons/md';
import { MdAvTimer } from 'react-icons/md';
import { GoDeviceMobile } from 'react-icons/go';
import { MdOutlineFastfood } from 'react-icons/md';

let food = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014247/food_jxjsba.png`
let juice = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014245/juice_rafk8s.png`
let coffee = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014243/nescafe_kwdgwf.jpg`
export default function AboutUS() {
  return (
    <div>
    <div className={Styles.admin}>
      <HeadTag title="About Us" />
   <Header />

  <div className={about.aboutUs}>
  
  {/* banner section */}
<div className={about.banner}>
<div className={about.imgs}>
<Image src={bannerImg} alt="banner" width={1350} height={500} /> 
</div>
<div className={about.heading}>
<div className={about.title}>About Us</div>
<div className={about.path}><Link href={"/"}> Home</Link> - About Us</div>
</div>
</div>




<div className={about.canteenSection}>
<h1>Canteen Areas</h1>

<div className={about.FullCard}>
<div className={about.left}>
<div className={about.imgs}>
<Image src={food} width={500} height={400} alt="food" />
</div>
</div>
<div className={about.right}>
<h1>Our Beautiful Food Area</h1>
<p>Food service spaces are increasingly becoming extensions of the classroom. They provide a pleasant environment for social interaction that promotes collaborative learning, with the added benefit of being able to grab a bite to eat. To facilitate this important function, the space should include WiFi and furniture with built-in outlets that bring power from the floor to the work surface.

Living Room Extension

It’s a mistake to design a space for students to sit and eat. Students visit food service spaces to eat and talk, eat and read, eat and check email. One student might stop in between classes for a coffee and to review her lesson plan before an exam. A group of students may gather mid-afternoon to collaborate on a project. </p>
</div>
</div>




<div className={about.FullCard1}>
<div className={about.left}>
<div className={about.imgs}>
<Image src={coffee} width={500} height={400} alt="coffee" />
</div>
</div>
<div className={about.right}>
<h1>Our Beautiful Nescafe Area</h1>
<p>Keeping high college students on campus where they can be properly supervised is often a challenge. Offering their favorite caffeinated beverages in-house is one way to meet that challenge, especially for college that have open campuses where students are permitted to leave. As many college remove soda and vending machines from college grounds, replacing them with a coffee bar can be a great alternative, giving students an off-campus type of experience inside the college.
By setting up and running a coffee stand, students can actually benefit from hands-on learning during their business classes. If they re working in conjunction with the school nutrition department, even better! All parties benefit when a coffee cart draws more students into the school cafeteria.</p>
</div>
</div>


<div className={about.FullCard}>
<div className={about.left}>
<div className={about.imgs}>
<Image src={juice} width={500} height={400} alt="juice" />
</div>
</div>
<div className={about.right}>
<h1>Our Beautiful Juice Area</h1>
<p>Juicing is no healthier than eating whole fruits and vegetables.

Juicing extracts the juice from fresh fruits or vegetables. The liquid contains most of the vitamins, minerals and plant chemicals (phytonutrients) found in the fruit. However, whole fruits and vegetables also have healthy fiber, which is lost during most juicing.

Some believe that juicing is better than eating whole fruits and vegetables because your body can absorb the nutrients better and it gives your digestive system a rest from digesting fiber. They say juicing can reduce your risk of cancer, boost your immune system, remove toxins from your body, aid digestion and help you lose weight.

However, there no scientific evidence that extracted juices are healthier than the juice you get by eating the fruit or vegetable itself.
</p>
</div>
</div>


</div>





{/* crew section */}
<div className={about.crew}>
<div className={about.crewImg}>
<Image src={crew} alt="creq" width={900} height={500}/>
</div>

</div>



{/* provide */}
<div className={about.provide}>
<h1>What We Provide?</h1>
<p>Various facilities provides by sd canteen</p>
<div className={about.cards}>

{/* price and quality */}
<div className={about.card}>
<div className={about.icons}>
<BiShoppingBag />
</div>
<div className={about.title}>
<h2>Best Prices & Offers</h2>
</div>
<div className={about.details}>

We provide best prices on our items without any extra cost and we also provides various offers on our items.
</div>
</div>

{/* payment */}
<div className={about.card}>
<div className={about.icons}>
<RiSecurePaymentFill />
</div>
<div className={about.title}>
<h2>Secure Payment</h2>
</div>
<div className={about.details}>
we make our payment system fast and secure so that your card details protected. You can made payment without any worries 
</div>
</div>

{/* 100% Satisfaction Guarantee */}
<div className={about.card}>
<div className={about.icons}>
<MdOutlineGppGood />
</div>
<div className={about.title}>
<h2>100% Satisfaction Guarantee</h2>
</div>
<div className={about.details}>
we provide 100% best service in our region without any discrimination.
Our clients fully satisfied with the service we provide
</div>
</div>

</div>


<div className={about.cards}>

{/* fast order */}
<div className={about.card}>
<div className={about.icons}>
<MdAvTimer />
</div>
<div className={about.title}>
<h2>Fast Order Processed</h2>
</div>
<div className={about.details}>

Our canteen proccess the order as fast as possible so that our client not have to wait or standing in lines 
</div>
</div>

{/* easy to use */}
<div className={about.card}>
<div className={about.icons}>
<GoDeviceMobile />
</div>
<div className={about.title}>
<h2>Easy To Use Website</h2>
</div>
<div className={about.details}>
we design our website site in that manner so that any technical and non-technical person can order items easily
</div>
</div>

{/* vaious food items*/}
<div className={about.card}>
<div className={about.icons}>
<MdOutlineFastfood />
</div>
<div className={about.title}>
<h2>Varoius Item Options</h2>
</div>
<div className={about.details}>
we offers best and huge options to our clints so that they try something new every time without compromise their taste
</div>
</div>

</div>



</div>



  </div>
    
    </div>
   <Footer />
    </div>
  )
}
