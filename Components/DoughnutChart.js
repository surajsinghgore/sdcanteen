import React from 'react'
import { Doughnut } from 'react-chartjs-2'
export default function DoughnutChart() {
const data={
labels:['jan','feb','mar','apr','may'],
datasets:[
{
label:"sales for 2022",
data:[4,6,7,9,10]
}
]
}


const optionss={
title:{
display:true,
text:'Doughnut chart'
}
}

  return (
    <Doughnut data={data} options={optionss}/>
  )
}
