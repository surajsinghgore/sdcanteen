import Image from "next/image";
import LoaderImage from '../public/loader.gif';

export default function Loader({loader}) {
  return (
    <>
    {(loader)? <div className="b">
    <div className="bg">
    <div className="loader">
    <Image src={LoaderImage} layout='fill'
    objectFit='contain' alt="loader" className="image"/>
        </div>
        </div>
        </div> : ""}
    </>
  )
}
