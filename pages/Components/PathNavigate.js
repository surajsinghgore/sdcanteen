import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import StyleFood from "../../styles/AddFood.module.css";



export default function PathNavigate(props) {
  return (
    <div role="presentation" className={StyleFood.BreadCrumbs}>
     <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href={props.mainSectionURL}>
{props.mainSection}
  </Link>
  {(props.subsection) ?  <Link
    underline="hover"
    color="inherit"
    href={props.subsectionURL}
  >
  {props.subsection}
  </Link> : ''}
 
  <Typography color="text.primary" style={{fontWeight:"600"}}>{props.current}</Typography>
</Breadcrumbs>
    </div>
  );
}
