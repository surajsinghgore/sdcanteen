import Image from "next/image";
let LoaderImage = `https://res.cloudinary.com/dnxv21hr0/image/upload/v1681014247/loader_a4xalk.gif`;

export default function Loader({loader}) {
  return (
    <>
    {(loader)? <div className="b">
    <div className="bg">
    <div className="loader">
    <Image src={LoaderImage} layout='fill'
    objectFit='contain' alt="loader" className="image" priority="true"/>
        </div>
        </div>
        </div> : ""}
    </>
  )
}
