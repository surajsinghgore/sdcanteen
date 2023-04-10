import Link from 'next/link'
import { IoMdArrowDropright } from 'react-icons/io';
import { useEffect, useState } from 'react';
export default function Footer() {
const [year,setYear]=useState();
useEffect(()=>{
let date=new Date();
setYear(date.getFullYear())
},[])
  return (
    <footer>
    {/* logo */}
    <div className="footer">
    <div className="legal">
<h1>Legal </h1>
<li><Link href="/HelpAndSupport"><a><IoMdArrowDropright />Help & Support</a></Link></li>
<li><Link href="/TermsAndCondition"><a><IoMdArrowDropright />Terms & Conditions</a></Link></li>
<li><Link href="/RefundAndCancellation"><a><IoMdArrowDropright />Refund & Cancellation</a></Link></li>
<li><Link href="/Privacy"><a><IoMdArrowDropright />Privacy Policy</a></Link></li>
<li><Link href="/OfferTerm"><a><IoMdArrowDropright />Offer Terms</a></Link></li>
    </div>
    {/* menu links */}
<div className="menu">
<h1>Hot Menu</h1>
<li><Link href="/Items/burger"><a><IoMdArrowDropright /> Burger</a></Link></li>
<li><Link href="/Items/sandwich"><a><IoMdArrowDropright /> Sandwich</a></Link></li>
<li><Link href="/Items/cold coffee"><a><IoMdArrowDropright /> Cold Coffee</a></Link></li>
<li><Link href="/Items/fast food"><a><IoMdArrowDropright /> Fast Food</a></Link></li>
<li><Link href="/JuiceItem"><a><IoMdArrowDropright /> Juices</a></Link></li>
<li><Link href="/CoffeeItem"><a><IoMdArrowDropright />Cold Drink</a></Link></li>
</div>


{/* timing */}
<div className="timing">
<h1>Opening Hours</h1>
<li><span>Monday</span> : 8.00 AM - 6.00 PM</li>
<li><span>Tuesday</span> : 8.00 AM - 6.00 PM</li>
<li><span>Wednesday</span> : 8.00 AM - 6.00 PM</li>
<li><span>Thursday</span> : 8.00 AM - 6.00 PM</li>
<li><span>Friday</span> : 8.00 AM - 6.00 PM</li>
<li><span>Saturday</span> : 8.00 AM - 6.00 PM</li>
<li><span>Sunday</span> : <span id="bold">Closed</span></li>
<li><span id="note">**Note**</span> : <span id="bold">Closed on Holidays</span></li>
</div>
</div>
{/* copyright */}
<div className="copyright">
<hr/> © {year} SD CANTEEN . All Rights Reserved by <span><a href="http://ggdsd.ac.in/" target="__blank"> SD College </a></span><hr/>
</div>
    </footer>
  )
}
