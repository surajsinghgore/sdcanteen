import { Bar as ChartJS } from 'chart.js/auto'
import { Bar }            from 'react-chartjs-2'
export default function MonthWiseBar({browserData,labels}) {
let datasMonthWise=[]
for(let i=0;i<browserData.length;i++){
datasMonthWise.push(browserData[i])
}
  const data={
labels:['January','February','March','April','May','June','July','August','September','October','November','December'],
datasets:[
{
label: labels,
data:datasMonthWise,
backgroundColor:'#fa528a',
borderColor:'#fa528a',
color:'#000'
}
]
}

  return (
    <Bar data={data}/>
  )
}
