import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Styles from "../styles/admin.module.css";
import TermStyle from "../styles/terms.module.css";
import help from "../styles/HelpCenter.module.css";

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';

import { HiOutlineSearch } from 'react-icons/hi';
import Link from "next/link";
import { useEffect, useState } from "react";
const SearchData=[
{title:"cancel order",link:"ordercancel"},
{title:"account recovered",link:"accountrecovered"},
{title:"forget password",link:"forgetpassword"},
{title:"facing any issue",link:"issurefacing"},
]
export default function HelpAndSupport() {
  const [search,setSearch]=useState('')
const [data,setData]=useState([]);

  const Searching=(e)=>{
  setSearch(e.target.value)
    let newFilter=SearchData.filter((item)=>{
  return item.title.toLowerCase().includes(e.target.value.toLowerCase())
  })
  setData(newFilter)

if(document.getElementById("searchss").value=="")
  {
 setData([])
  }
 
  }
  
  const enable=(searchs)=>{
  console.log(document.getElementById(searchs).style.display)
  if((document.getElementById(searchs).style.display)=="block"){
  document.getElementById(searchs).style.display="none"
  let up=`up${searchs}`
  let down=`down${searchs}`
  document.getElementById(up).style.display="none"
  document.getElementById(down).style.display="block";
  }

  else{
  document.getElementById(searchs).style.display="block"
  let up=`up${searchs}`
  let down=`down${searchs}`
  document.getElementById(up).style.display="block"
  document.getElementById(down).style.display="none";
  }

  }

  const enable1=(searchs)=>{
  
 setData([])
 let s=`${searchs}s`
var scrollDiv = document.getElementById(s).offsetTop;
window.scrollTo({ top: scrollDiv-70, behavior: 'smooth'});
document.getElementById(searchs).style.display="block"
  let up=`up${searchs}`
  let down=`down${searchs}`
  document.getElementById(up).style.display="block"
  document.getElementById(down).style.display="none";
  
  }

  return (
    <div>
    <div className={Styles.admin}>
      <HeadTag title="Help And Support" />
   <Header />

    <div className={TermStyle.term}>
<h1>How can we help you ?</h1>

<div className={help.help}>
<div className={help.searchSection}>
<input type="search" name="search"  placeholder="Start typing our search..." value={search} onChange={(e)=>Searching(e)} id="searchss"/>
<div className={help.icons}>
<HiOutlineSearch />
</div>
{(data.length!=0)? <>
<div className={help.suggestions} >
{(data.length!=0)? <>
{(data.map((item,index)=>{
return <li key={index} onClick={()=>enable1(item.link)}>{item.title}</li>
}))}
</>: ""}
</div></>: ""}
</div>
<p>Or you can read the following articles</p>

</div>

{/* all articles */}
<div className={help.articles}>
<h1>Getting Started</h1>
{/* 1 */}
<div className={help.article} id="ordercancels">
<div className={help.title}  onClick={()=>enable('ordercancel')} >
cancel order 

<div className={help.sign} id="downordercancel"><MdOutlineKeyboardArrowDown /></div>
<div className={help.sign1} id="upordercancel"><MdOutlineKeyboardArrowUp /></div>

</div>
<div className={help.solution} id="ordercancel">
<h5>for Cancellation of order you need to follow the following steps:-</h5>
<h6>Note:- After cancellation of order [ cash on delivery ] option willbe disabled lifetime from your account. </h6>
<h4>Step 1: <span>Call on this Number : +91-1234567890</span></h4>
<h3>or</h3>
<h4>Step 2: <span>Write your Query on this Page <Link href="/Contact"><span className={help.link}>Click Here</span></Link></span></h4>
</div>

</div>

{/* 2 */}

<div className={help.article} id="accountrecovereds">
<div className={help.title} onClick={()=>enable('accountrecovered')} >
Account Recovered 

<div className={help.sign} id="downaccountrecovered"><MdOutlineKeyboardArrowDown /></div>
<div className={help.sign1} id="upaccountrecovered"><MdOutlineKeyboardArrowUp /></div>

</div>
<div className={help.solution} id="accountrecovered">
<h5>for recovered your account you need to follow the following steps:-</h5>
<h4>Step 1: <span>Call on this Number : +91-1234567890</span></h4>
<h3>or</h3>
<h4>Step 2: <span>Write your Query on this Page <Link href="/Contact"><span className={help.link}>Click Here</span></Link></span></h4>
</div>

</div>

{/* 3 */}
<div className={help.article} id="forgetpasswords">
<div className={help.title} onClick={()=>enable('forgetpassword')} >
Forget Password

<div className={help.sign} id="downforgetpassword"><MdOutlineKeyboardArrowDown /></div>
<div className={help.sign1} id="upforgetpassword"><MdOutlineKeyboardArrowUp /></div>

</div>
<div className={help.solution} id="forgetpassword">
<h5>To reset our account password you need to follow the following steps:-</h5>
<h4>Step 1: <span>Go to Login Page or <Link href="/Contact"><span className={help.link}>Click Here</span></Link></span></h4>
<h4>Step 2: <span>Click on forget password option</span></h4>
<h4>Step 3: <span>Provide our Email Id which you registred with account</span></h4>
<h4>Step 4: <span>Enter OTP which you recevied on your Email Address</span></h4>
<h4>Step 5: <span>Reset New Password</span></h4>
<h3>or</h3>
<h4> <span>If You face any difficulty write your query: <Link href="/Contact"><span className={help.link}>Click Here</span></Link></span></h4>
</div>

</div>

{/* 4 */}
<div className={help.article} id="issurefacings">
<div className={help.title} onClick={()=>enable('issurefacing')} >
Facing Any Issue 

<div className={help.sign} id="downissurefacing"><MdOutlineKeyboardArrowDown /></div>
<div className={help.sign1} id="upissurefacing"><MdOutlineKeyboardArrowUp /></div>

</div>
<div className={help.solution} id="issurefacing">
<h5>if You facing any issue with this website you need to follow the following steps:-</h5>
<h4> <span>Write your Query on this Page <Link href="/Contact"><span className={help.link}>Click Here</span></Link></span></h4>
</div>

</div>

</div>

     </div>
    </div>
   <Footer />
    </div>
  )
}
