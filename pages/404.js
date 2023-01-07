import not from '../styles/notFound.module.css'
import img from '../public/404.webp'
import Image from 'next/image'                
import Router from 'next/router'
export default function NotFound() {
const redirect=()=>{
Router.push("/")
}
  return (
    <div className={not.notFound}>
   <div className={not.imgsSection}>
   <Image src={img} alt="image error " layout="responsive" />
   </div>
   <button onClick={redirect}>Take Me Home</button>
    </div>
  )
}
