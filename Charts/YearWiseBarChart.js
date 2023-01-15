import { Bar as ChartJS } from 'chart.js/auto'
import { Bar }            from 'react-chartjs-2'
export default function YearWiseBarChart({datas,years}) {
let arr1=[]
let arr2=[]
let arr3=[]
if(years!=undefined){
if(years.length==1){let array=datas.slice(0,2);arr1.push(array)}
if(years.length==2){
let array=datas.slice(0,2);
arr1.push(array);
let array1=datas.slice(2,4);
arr2.push(array1)

}
if(years.length==3){
let array=datas.slice(0,2);arr1.push(array);
let array1=datas.slice(2,4);arr2.push(array1)
let array2=datas.slice(4,6);
arr3.push(array2)
}
}

let newArray=[]
if(arr1.length!=0){
newArray.push(arr1[0])

}
if(arr2.length!=0){
newArray.push(arr2[0])
}
if(arr3.length!=0){
newArray.push(arr3[0])
}

console.log(newArray,datas)
  const data={
labels:[2024,2023,2022],
datasets: [{data:[2,6]},{data:[2,6]},{data:[2,6]},{data:[2,6]},{data:[22,63]}],

}

  return (
    <Bar data={data}/>
  )
}
