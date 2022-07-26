import React from "react";
import Styles from "../../styles/admin.module.css";
import Head from "next/head";
import AdminLeftMenu from "../Components/AdminLeftMenu";


const index = () => {

  return (
    <div className={Styles.admin}>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>SD CANTEEN | Admin Dashboard</title>
        <meta name="description" content="sd canteen website" />
        <meta name="author" content="suraj singh" />
        <meta
          keyword=""
          content="sd canteen, sd college,admin login,admin dash board"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* left panel bar */}
     <AdminLeftMenu/>

      {/* right bar */}
    </div>
  );
};

export default index;
