import not from '../styles/notFound.module.css'

let img = `let ImagePath=process.env.NEXT_PUBLIC_IMAGESPACEPATH;
`
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
