import React, { useState } from "react";
import Image from "next/image";
import HeadTag from "../../Components/Head";
import styles from "../../styles/Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
// login images banner
import loginImage from "../../public/admin/loginImg.svg";
import USerProfile from "../../public/admin/loginProfile.png";

const Login = () => {
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");
  let HOST = process.env.NEXT_PUBLIC_API_URL;

  const LoginFunction = async (e) => {
    e.preventDefault();

    // check field empty or not
    if (!secret) {
      toast.warn("Please enter Secret ID", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return 0;
    }
    if (!password) {
      toast.warn("Please enter password", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return 0;
    }

    // send request to server
    const res = await fetch(`${HOST}/api/AdminLogin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        secret,
        password,
      }),
    });
    let data = await res.json();

    // details
    if (data.status == "401") {
      toast.warn(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return 0;
    }
    if (data.status == "501") {
      toast.error(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return 0;
    }

    // success
    toast.success(`${data.message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // redirect to admin page after successfully login
    localStorage.setItem("admintoken", data.token);
    setTimeout(myGreeting, 1200);
    function myGreeting() {
      router.push("/admin");
    }
  };

  return (
    <div className={styles.login}>
      <HeadTag title="Admin Login" />

      <div className={styles.left_section}>
        <div className={styles.image}>
          <Image
            src={loginImage}
            alt="login banner image"
            width={800}
            height={550}
          />
        </div>
      </div>
      <div className={styles.right_section}>
        <div className={styles.image}>
          <Image
            src={USerProfile}
            alt="login banner image"
            width={800}
            height={800}
          />
        </div>
        <h1>Sign in to Admin Panel</h1>
        <div className={styles.form}>
          <form autoComplete="new-password"> 
            <input
              type="text"
              name="secret"
              placeholder="Enter Secret Id"
              required
              value={secret}
              onChange={(e) => setSecret(e.target.value)} 
              autoComplete="new-password"       
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
             autoComplete="new-password"
            />

            <button onClick={LoginFunction}>Click to login</button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
