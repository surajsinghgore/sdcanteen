import React from 'react'
import { Line } from 'react-chartjs-2'
export default function LineChart() {
const data={
labels:['jan','feb','mar','apr','may'],
datasets:[
{
label:"sales for 2022",
data:[4,6,7,9,10]
},
{
label:"sales for 2021",
data:[2,4,1,2,1]
}
]
}


const optionss={
title:{
display:true,
text:'line chart'
},
scales:{
yAxes:[{
ticks:{
min:0,
max:10,
stepSize:1
}
}]
}
}
  return (
    <Line data={data} options={optionss}/>
  )
}
