import React from 'react'
import { Bubble } from 'react-chartjs-2'
export default function BubbleChart() {
const data={
labels:['jan'],
  datasets: [{
    label: 'First Dataset',
    data: [{
      x: 20,
      y: 30,
      r: 15
    }, {
      x: 40,
      y: 10,
      r: 10
    }],
    backgroundColor: 'rgb(255, 99, 132)'
  }
  ,
  {
    label: 'Second Dataset',
    data: [{
      x: 5,
      y: 3,
      r: 25
    }, {
      x: 20,
      y: 30,
      r: 10
    }],
    backgroundColor: 'rgb(155, 99, 132)'
  }]
}


const optionss={
title:{
display:true,
text:'Bubble chart'
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
    <Bubble data={data} options={optionss}/>
  )
}
