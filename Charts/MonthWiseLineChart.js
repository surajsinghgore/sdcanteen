import { Line as ChartJS } from 'chart.js/auto'
import { Line }            from 'react-chartjs-2'
export default function MonthWiseLineChart({montwisedata,years}) {
let datasMonthWise=[]
for(let i=0;i<montwisedata.length;i++){
datasMonthWise.push(montwisedata[i])
}
const data={
labels:['January','February','March','April','May','June','July','August','September','October','November','December'],
datasets:[
{
label:`Monthwise Website Visits In ${years}`,
data:datasMonthWise,backgroundColor:'#fa528a',
borderColor:'#fa528a',
color:'#000'
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
