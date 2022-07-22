import StyleFood from "../../styles/AddFood.module.css";
import { BiCurrentLocation } from 'react-icons/bi';

export default function AdminRightInnerHeader(props) {
  return (
    <div className={StyleFood.topHeader}>
    {/* heading section */}
    <div className={StyleFood.heading_section}>
    <i>
    
    <BiCurrentLocation />
    </i>
    <h1>Add Food Page</h1>
    </div>

    {/* alert */}
<div className="alert">


</div>
    {/* profile */}
    <div className="profile_section">
    
    </div>
    </div>
  )
}
