import React from "react";
import Styles from "../../styles/admin.module.css";
import HeadTag from "../../Components/Head";
import AdminLeftMenu from "../../Components/AdminLeftMenu";
import VerifyAdminLogin from './VerifyAdminLogin';
import AdminRightInnerHeader from "../../Components/AdminRightInnerHeader";
import StyleFood from "../../styles/AddFood.module.css";
import comm from "../../styles/ManageComments.module.css";
import { useEffect } from "react";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Loader from "../../Components/Loader";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let HOST = process.env.NEXT_PUBLIC_API_URL;


const ManageComments = () => {
 const [progress, setProgress] = useState(0);
 const [loader,setLoader]=useState(true);
const [data,setData]=useState([])

const allCommentsGet=async()=>{
setLoader(true)
const res=await fetch(`${HOST}/api/ShowToxicComments`);
let data=await res.json();
setLoader(false)
if(res.status==200){
setData(data.data)
}

}
useEffect(()=>{
allCommentsGet()
},[])

const toxic=(item)=>{
  confirmAlert({
      title: "Confirm to Process",
      message: "Are you sure this comment contain toxic text ?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            if (!item) {
              toast.warn("Please Provide Correct Id ", {
                position: "bottom-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return ;
            }
setProgress(40)
            
            let res = await fetch(`${HOST}/api/ManageComments`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                id: item,
                status:"yes"
              }),
            });

            let data = await res.json();
setProgress(100)
            
  if (res.status == 401) {
      toast.error("Please Login With Admin Credentials", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
      }
            
  if (res.status == 400) {
      toast.warn(`${data.message}`, {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
      }
            if (res.status == 501) {
              toast.error(`Internal Server Error`, {
                position: "bottom-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return ;
            }

        
            if (res.status == 200) {
              toast.success(`Successfully this Message is Taken Down`, {
                position: "bottom-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
                   allCommentsGet();
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });

}
const notToxic=(item)=>{

  confirmAlert({
      title: "Confirm to Process",
      message: "Are you sure this comment  not contain any toxic text ?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            if (!item) {
              toast.warn("Please Provide Correct Id ", {
                position: "bottom-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return ;
            }
setProgress(40)
            
            let res = await fetch(`${HOST}/api/ManageComments`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                id: item,
                status:"no"
              }),
            });

            let data = await res.json();
setProgress(100)
            
  if (res.status == 401) {
      toast.error("Please Login With Admin Credentials", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return ;
      }

            if (res.status == 501) {
              toast.error(`Internal Server Error`, {
                position: "bottom-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return ;
            }

        
            if (res.status == 200) {
              toast.success(` Successfully This Message is Proccessed`, {
                position: "bottom-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
           allCommentsGet();
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });

}
  return (
    <div className={Styles.admin}>
    <Loader loader={loader}/>
         <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  
      <HeadTag title="Admin" />
<VerifyAdminLogin />

      {/* left panel bar */}
      <AdminLeftMenu />

      {/* right bar */}

      <div className={StyleFood.rightSideBar}>
        <AdminRightInnerHeader title="Manage Toxic Comments" />

     <div className={comm.mainComments}>
     {(data.length!=0)?<>
     
     {(data.map((item)=>{
     return   <div className={comm.section} key={item._id}>
   <h3>Number Of Reports : <span>{item.NumberOfReports}</span></h3>
     <div className={comm.comment}>
     {item.Message}
     </div>

     <div className={comm.options}>
     <div className={comm.div1}> <button onClick={()=>toxic(item._id)} title="Really Toxic ?">Toxic</button>  </div>
     <div className={comm.div2}>
   <button onClick={()=>notToxic(item._id)} title="Really Not Toxic ?">Not Toxic</button>
     </div>
     </div>
     </div>
     }))}
     </> : <h1>No Comments Reported Yet</h1>}
   


     </div>

        </div>
             <ToastContainer
        position="bottom-right"
        autoClose={1200}
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

export default ManageComments;
