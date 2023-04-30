import dynamic from 'next/dynamic'
import Image from 'next/image';
import Link from 'next/link';
const Style = dynamic(() => import('../styles/FoodItem.module.css'))

export default function Banner(props) {
  return (
          <div className={Style.Status}>
<div className={Style.banner}>
<Image src={props.BannerImage} alt="banner" height={props.Height} width={props.Width}      />
</div>
<div className={Style.path}>
{(props.H1Style)?<><h1 style={props.H1Style}>Menu</h1></> : <><h1>Menu</h1></>}
{(props.PStyle)?<><p style={props.PStyle}><Link href="/">Home</Link> - <Link href={props.CurrentPageUrl}>{props.CurrentPage}</Link>- <span>{props.SubPage}</span></p></> :
 <><p><Link href="/">Home</Link> - <Link href={props.CurrentPageUrl}>{props.CurrentPage}</Link>- <span>{props.SubPage}</span></p></>}
</div>
</div>
  )
}
