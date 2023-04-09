import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import StyleFood from "../styles/AddFood.module.css";

function PathNavigation({mainSectionURL,mainSection,subsectionURL,subsection,current}) {
  return (
    <div role="presentation" className={StyleFood.BreadCrumbs}>
     <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href={mainSectionURL}>
{mainSection}
  </Link>
  {(subsection) ?  <Link
    underline="hover"
    color="inherit"
    href={subsectionURL}
  >
  {subsection}
  </Link> : ''}
 
  <Typography color="text.primary" style={{fontWeight:"600"}}>{current}</Typography>
</Breadcrumbs>
    </div>)
}



 export default  PathNavigation