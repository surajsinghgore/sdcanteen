import { Pie as ChartJS } from 'chart.js/auto'
import { Pie }            from 'react-chartjs-2'
export default function MultiPieChart({browserData,years}) {

const data={
 labels: [
    'COD',
    'ONLINE',
  ],
  datasets: [{
       data: mainData,
     backgroundColor: [
              "#FDB45C",
              "#878a87",
            ],
           label:`Browser used In ${years}`,
    hoverOffset: 4
  }],
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
