import { Pie as ChartJS } from 'chart.js/auto'
import { Pie }            from 'react-chartjs-2'
export default function MultiPieChart({datas}) {

const data={
 labels: [
    'COD',
    'ONLINE',
  ],
  datasets: datas,
  options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Doughnut Chart'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
}



  return (
    <Pie data={data}/>
  )
}
