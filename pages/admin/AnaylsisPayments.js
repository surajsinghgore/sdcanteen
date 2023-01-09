import React from "react";
import Styles from "../../styles/admin.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import VerifyAdminLogin from './VerifyAdminLogin';
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import StyleFood from "../../styles/AddFood.module.css";


const AnaylsisPayments = () => {
  return (
    <div className={Styles.admin}>
      <HeadTag title="Anaylsis Payments" />
<VerifyAdminLogin />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}

      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Anaylsis Payments" />
     

        </div>
    </div>
  );
};

export default AnaylsisPayments;
