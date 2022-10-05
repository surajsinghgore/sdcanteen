import React,{useState,useEffect} from 'react'
import Styles from "../styles/admin.module.css";
import Link from "next/link";
import router from 'next/router'
let HOST = process.env.NEXT_PUBLIC_API_URL;
import { BiMenu } from 'react-icons/bi';
import { BiLoader } from 'react-icons/bi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { CgPlayListRemove } from 'react-icons/cg';
import "react-toastify/dist/ReactToastify.css";
import StyleRealtime from "../styles/RealtimeOrder.module.css";
import SingleItemRealtime from './SingleItemInRealtime';
function ShowHideInRealtime({item}) {
const [datas,setDatas]=useState([]);
useEffect(()=>{
setDatas(item);
},[])
  return (
     <>
    {(datas.length!=0)?<div>
    {(datas.map((item)=>{
    return(
<SingleItemRealtime item={item}/>
    )
    }))}
    
    </div> : ""} 

</>
  )
}


export default ShowHideInRealtime;