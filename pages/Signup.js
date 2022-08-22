import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Image from 'next/image'
import Link from 'next/link'
import Styles from "../styles/admin.module.css";
import ClientStyle from "../styles/Signup.module.css";

import { BiUserPin } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { TbAddressBook } from 'react-icons/tb';
import { AiOutlineMail } from 'react-icons/ai';
import { GoDeviceMobile } from 'react-icons/go';
import { BsGenderFemale } from 'react-icons/bs';
import { IoMdPhotos } from 'react-icons/io';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { useState } from "react";


export default function Signup() {
 const [files, setFiles] = useState("");
  const [showImage, setShowImage] = useState(true);
  const [imgs, setImgs] = useState();
  const [Images, setImages] = useState("");
   const handleChange = async (e) => {
    if (e.target.files[0]) {
      var file = e.target.files[0];
      setFiles(file);
      let url = await URL.createObjectURL(file);
      setImgs(url);
      setImages(url);
      setShowImage(false);
    } else {
      setShowImage(true);
    }
  };
  return (
    <div>
    <div className={Styles.admin}>
      <HeadTag title="Client Signup" />
   <Header />

<div className={ClientStyle.clientLogin}>
<div className={ClientStyle.form}>
<h3>SD CANTEEN</h3>
<li>
<h6>Enter Full Name <span>*</span></h6>
<input type="text" name="" placeholder="Enter full name" />
<BiUserPin className={ClientStyle.icon} />
</li>

<li>
<h6>Enter Age <span>*</span></h6>
<input type="number" name="" placeholder="Enter your age" />
<BsPersonBoundingBox className={ClientStyle.icon} />
</li>

<li>
<h6>Enter Email Account <span>*</span></h6>
<input type="email" name="" placeholder="Enter email id" />
<AiOutlineMail className={ClientStyle.icon} />
</li>


<li>
<h6>Enter Mobile Number <span>*</span></h6>
<input type="number" name="" placeholder="Enter email id" />
<GoDeviceMobile className={ClientStyle.icon} />
</li>

<li>
<h6>Select Gender <span>*</span></h6>
<select name="gender">
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
<input type="text" name="" placeholder="Enter Address" />
<TbAddressBook className={ClientStyle.icon} />
</li>

<li>
<h6>Uploard your Profile Photo<span>*</span></h6>
              <input
                type="file"
                name="photo"
                id="photoJuice"
                onChange={handleChange}
              />
<IoMdPhotos className={ClientStyle.icon} />
            </li>
          
                {showImage ? (
               ""
                ) : (
                  <li style={{marginTop:"-1%",marginBottom:"2%"}}>
              <div className={ClientStyle.preview_photo}>
                  <Image
                    src={imgs}
                    alt=""
                    id="output"
                    width={300}
                    height={300}
                  />
              </div>
            </li>
                )}








<li>
<h6>Enter Password <span>*</span></h6>
<input type="password" name="" placeholder="Password" />
<RiLockPasswordLine className={ClientStyle.icon} />
</li>
<li>
<h6>Enter Confirm Password <span>*</span></h6>
<input type="password" name="" placeholder="Confirm Password" />
<RiLockPasswordLine className={ClientStyle.icon} />
</li>
<button style={{marginLeft:"30%"}}>Create Account</button>
<div className={ClientStyle.path}>
<h4><Link href="/ClientLogin">Already Registered ?</Link></h4>
<h4 style={{marginLeft:"15%"}}><Link href="/admin">Admin Login </Link></h4>

</div>
</div>

</div>


    </div>
   <Footer />
    </div>
  )
}
