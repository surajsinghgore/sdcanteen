import React,{   useState ,useContext} from 'react'
import FoodStyles from "../styles/AllFoodCategories.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from 'next/router'
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { AllContext } from "../context/AllContext";
let HOST=process.env.NEXT_PUBLIC_API_URL;
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


function JuiceAllCategoryComponent({data,ind}) {
const {deletes,setDeletes,updateJuiceCategories}=useContext(AllContext);


const [show,setShow]=useState(false);

const showSubMenu=()=>{
setShow(true);


}
// update
const UpdateCategory=async(id)=>{
updateJuiceCategories(id);
router.push('/admin/UpdateJuiceCategory')
}

// delete
const deleteCategory=async(id)=>{


 confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to Delete this Juice Category ?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
let res=await fetch(`${HOST}/api/DeleteJuiceCategory`,{
    method: "DELETE",
    headers:{
        "Content-type": "application/json",
       
    },
    body: JSON.stringify({
        _id:id
    })
})

let dataRes=await res.json();

 if(dataRes.status=='403'){
toast.error('Please Login With Admin Credentials', {
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
if(dataRes.status=='400'){
toast.warn(`${dataRes.message}`, {
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



if(dataRes.status=='501'){
toast.warn(`${dataRes.message}`, {
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
setDeletes(!deletes)
setShow(false);
toast.success(`${dataRes.message}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});



}
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });

}

  return (
       <div className={FoodStyles.DataLists} key={ind}>
<div className={FoodStyles.DataList}>
<li>{data.JuiceCategoryName}</li>
{(show)? 
<li><AiOutlineCloseSquare className={FoodStyles.cursor_icon} onClick={()=>setShow(!show)}/></li>
: 
<li><AiOutlineMenu className={FoodStyles.cursor_icon} onClick={showSubMenu}/></li>
}
</div>
{(show)? 
<div className={FoodStyles.DropDown}>
<li className={FoodStyles.Update} onClick={()=>UpdateCategory(data._id)}><i><FaRegEdit /> </i>Update</li>
<li className={FoodStyles.delete} onClick={()=>deleteCategory(data._id)}><i><AiOutlineDelete /></i> Delete</li>
</div> :
 ' '}
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
  )
}

export default JuiceAllCategoryComponent