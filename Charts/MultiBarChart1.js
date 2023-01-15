import { Pie }            from 'react-chartjs-2'
export default function MultiBarChart1({datas}) {
let labless=[];
let datass=[]
if(datas!=undefined){
for(let i=0;i<datas.length;i++){
labless.push(datas[i].label)
datass.push(datas[i].data)
}
}
const data={
 labels: labless,
  datasets: [{
    label: 'Rate',
    data: datass,
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      '#ca0cf0',
      '#04d9b9','#02e840','#e86e02','#e86e02','#e81102','#4b02e8'
    ],
    hoverOffset: 7
  }]
}

  return (
    <Pie data={data}/>
  )
}
