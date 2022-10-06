import React,{useState,useEffect} from 'react'
import "react-toastify/dist/ReactToastify.css";
import SingleItemRealtime from './SingleItemInRealtime';
function ShowHideInRealtime({item}) {
const [datas,setDatas]=useState([]);
useEffect(()=>{
setDatas(item);
},[])
  return (
     <>
    {(datas!=undefined)?<div>
    {(datas.map((item)=>{
    return(
<SingleItemRealtime item={item} key={item._id}/>
    )
    }))}
    
    </div> : ""} 

</>
  )
}


export default ShowHideInRealtime;