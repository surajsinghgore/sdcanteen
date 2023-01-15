import { lightBlue } from '@mui/material/colors'
import { Bar as ChartJS } from 'chart.js/auto'
import { Bar }            from 'react-chartjs-2'
export default function Top10Items({datas}) {


  const data={
labels:['January','February','March','April','May','June','July','August','September','October','November','December'],
datasets:[{label:'sandwich',data:[5,6,3,2,7,8,1,5,6,7,10,23],
backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1,
    }
    
    ]
,options: {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    }
    






}

  return (
    <Bar data={data}/>
  )
}
