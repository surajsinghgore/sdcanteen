import HeadTag from "../Components/Head";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Image from "next/image";
import Link from "next/link";
import Styles from "../styles/admin.module.css";
import ClientStyle from "../styles/Signup.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbDeviceMobileMessage } from "react-icons/tb";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import router from "next/router";
let HOST = process.env.NEXT_PUBLIC_API_URL;

export default function OtpVerifyClientRegister() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
 const [progress, setProgress] = useState(0);
  useEffect(() => {
    setEmail(localStorage.getItem("clientRegistrationEmail"));
    setTimeout(Redirect, 1000);
    function Redirect() {
      if (email == null || email==undefined) {
        router.push("/");
      }
    }
  }, []);

  const VerifyUser = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.success("Please Enter OTP", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
    }

    let count = 0;
    let otpDigit = parseInt(otp);
    let sum = 0;
    while (otpDigit) {
      sum += otpDigit % 10;
      ++count;
      otpDigit = Math.floor(otpDigit / 10);
    }
    if (count !== 6) {
      toast.warn("Please Enter 6 Digit OTP", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
    }
setProgress(40)

    const res = await fetch(`${HOST}/api/VerifyOtp`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Otp: otp,
      }),
    });
    let data = await res.json();
setProgress(60)

    if (data.status == 401) {
      toast.warn(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
setProgress(100)

      return ;
    }

    if (data.status == 400) {
      toast.warn(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.removeItem("clientRegistrationEmail");
      localStorage.removeItem("clientRegistrationId");
setProgress(100)

      setTimeout(Redirect, 1500);
      function Redirect() {
        router.push("/Signup");
      }
      return ;
    }
    if (data.status == 403) {
      toast.warn(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.removeItem("clientRegistrationEmail");
      setTimeout(Redirect, 1500);
      function Redirect() {
        router.push("/Signup");
      }
      return ;
    }
    if (data.status == 501) {
      toast.warn(`${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
    }
    if (data.status == 201) {
      toast.success("Otp Verified Successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.removeItem("clientRegistrationEmail");
      setTimeout(Redirect, 1500);
      function Redirect() {
        router.push("/ClientLogin");
      }
    }
  };
  return (
    <div>
     <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  
      <div className={Styles.admin}>
        <HeadTag title="Client Otp Verify" />
        <Header />

        <div className={ClientStyle.clientLogin}>
          <div className={ClientStyle.form}>
            <h3>SD CANTEEN</h3>
            <h2>
              Otp Successfully send to <span>{email}</span>
            </h2>
            <li>
              <h6 style={{ top: "-48%" }}>
                Enter 6 Digit Otp send to Email Id <span>*</span>
              </h6>
              <input
                type="number"
                name=""
                placeholder="Enter OTP"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <TbDeviceMobileMessage className={ClientStyle.icon} />
            </li>
            <button style={{ marginLeft: "36%" }} onClick={VerifyUser}>
              {" "}
              Verify User
            </button>
            <div className={ClientStyle.path}>
              <h4>
                <Link href="/ClientLogin">Resend Otp Again ?</Link>
              </h4>
              <h4 style={{ marginLeft: "12%" }}>
                <Link href="/Signup">Wrong Email Id ?</Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
}
