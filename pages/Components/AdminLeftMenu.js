import React from 'react'
import AdminLeftPenelComponents from '../Components/AdminLeftPenelComponents';
import DataList from '../Data/AdminLeftPanelData';
import Styles from "../../styles/admin.module.css";
import logo from "../../public/logo.png";
import Image from "next/image";



function AdminLeftMenu() {

  return (
    <div className={Styles.leftPanel}>
      <div className={Styles.logo_img}>
        <Image src={logo} width="250" height="100" alt="logo " />
      </div>
      <div className={Styles.menu_Links}>
{DataList.map((item)=><AdminLeftPenelComponents item={item} key={item.id} />)}
        </div>
    </div>
  )
}

export default AdminLeftMenu



