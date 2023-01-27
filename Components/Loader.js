import Image from "next/image";
 
let ImagePath=process.env.NEXT_PUBLIC_IMAGESPACEPATH;

let LoaderImage = ` ${ImagePath}/ExtraImages/loader.gif`;

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
