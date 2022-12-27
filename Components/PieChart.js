import React from 'react'
import { Pie } from 'react-chartjs-2'
export default function PieChart() {
const data={
 labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
}


const optionss={
title:{
display:true,
text:'Pie chart'
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
    <Pie data={data} options={optionss}/>
  )
}
