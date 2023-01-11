import { Bar as ChartJS } from 'chart.js/auto'
import { Bar }            from 'react-chartjs-2'
export default function MultiBarChart({datas}) {
  const data={
labels:['January','February','March','April','May','June','July','August','September','October','November','December'],
datasets:datas





}

  return (
    <Bar data={data}/>
  )
}
