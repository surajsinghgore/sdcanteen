import React from "react";
import Styles from "../styles/admin.module.css";
import HeadTag from "../Components/Head";
import AdminLeftMenu from "../Components/AdminLeftMenu";

const Home = () => {
  return (
    <div className={Styles.admin}>
      <HeadTag title="Admin" />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}
    </div>
  );
};

export default Home;
