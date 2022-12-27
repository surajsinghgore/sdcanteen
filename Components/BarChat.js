// import React, {useContext, useEffect } from 'react'
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2'
// import { AllContext } from "../context/AllContext";
let date=new Date();
export default function BarChart() {
  // const { barData } = useContext(AllContext);
 
let year=date.getFullYear();
const data={
labels:['January','February','March','April','May','June','July','August','September','October','November','December'],
datasets:[
{
label:`Monthwise Order for ${year}`,
data:[4,6,7,9,10,67,12,42,56,7,8,90],
backgroundColor:'#fa528a',
borderColor:'#fa528a',
color:'#000'
}
]
}

  return (
    <Bar data={data} />
  )
}
