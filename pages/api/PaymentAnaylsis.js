import OrderSchemaDataBase from './Schema/OrderSchema'
import PaymentSchemaDataBase from "./Schema/PaymentSchema";



export default async function PaymentAnaylsis(req,res) {
   if (req.method == "POST") {
      try{

      let orderData=await OrderSchemaDataBase.find();
      let paymentData=await PaymentSchemaDataBase.find();
//   total earning data
let TotalEarning=[];
let TotalEarningSum=[];
let TotalPayments=[]
let TotalPaymentsSum=[]
let RevenueOnline=[]
let RevenueOnlineSum=[]
let successOrder=[]
let successOrderSum=[]
let failedOrder=[]
let failedOrderSum=[]
let pendingOrder=[]
let pendingOrderSum=[]


let codOrder=[]
let codOrderSum=[]
let codOrderTotal=[]
let codOrderTotalSum=[]



let earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
const year1=parseInt(req.body.year1);
const year2=parseInt(req.body.year2);
const year3=parseInt(req.body.year3);

//!3 three records search
if((req.body.year1)&&(req.body.year2)&&(req.body.year3)){
// !3.1first year fetch
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year1)){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year1)){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year1)){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year1)){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year1)){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year1)){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year1)){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year1)){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year1)){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year1)){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year1)){earnDec=earnDec+orderData[i].AmountReceived;}
}
TotalEarning.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
let total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
TotalEarningSum.push({year:year1,total})
// reset
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
// second year values
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year2)){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year2)){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year2)){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year2)){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year2)){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year2)){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year2)){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year2)){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year2)){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year2)){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year2)){earnDec=earnDec+orderData[i].AmountReceived;}
}
TotalEarning.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])
let total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
TotalEarningSum.push({year:year2,total1})
// reset
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
// third year values
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year3)){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year3)){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year3)){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year3)){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year3)){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year3)){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year3)){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year3)){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year3)){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year3)){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year3)){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year3)){earnDec=earnDec+orderData[i].AmountReceived;}
}
TotalEarning.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year3])
let total2=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
TotalEarningSum.push({year:year3,total2})






//!3.2 all payments count
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnDec++;}
}
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
TotalPaymentsSum.push({year:year1,total})
TotalPayments.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
// second uear
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnDec++;}
}
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnDec++;}
}
total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
TotalPaymentsSum.push({year:year2,total1})
TotalPayments.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])
// third
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnDec++;}
}
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year3)&&(paymentData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year3)&&(paymentData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year3)&&(paymentData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year3)&&(paymentData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year3)&&(paymentData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year3)&&(paymentData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year3)&&(paymentData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year3)&&(paymentData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year3)&&(paymentData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year3)&&(paymentData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year3)&&(paymentData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year3)&&(paymentData[i].PaymentMethod=="online")){earnDec++;}
}
total2=0;
 total2=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
TotalPaymentsSum.push({year:year3,total2})
TotalPayments.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year3])





//!3.3 cost online by online payments
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnDec=earnDec+orderData[i].AmountReceived;}
}

total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
RevenueOnlineSum.push({year:year1,total})
RevenueOnline.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])

earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnDec=earnDec+orderData[i].AmountReceived;}
}

total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
RevenueOnlineSum.push({year:year2,total1})
RevenueOnline.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])


earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnDec=earnDec+orderData[i].AmountReceived;}
}
total2=0;
 total2=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
RevenueOnlineSum.push({year:year3,total2})
RevenueOnline.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year3])


//!3.4 total Success Payments
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
successOrderSum.push({year:year1,total})
successOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
// second
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnDec++;}
}
total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
successOrderSum.push({year:year2,total1})
successOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])
//third
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="online")){earnDec++;}
}
total2=0;
 total2=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
successOrderSum.push({year:year3,total2})
successOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year3])


//!3.5 failed
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
failedOrderSum.push({year:year1,total})
failedOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
// second
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnDec++;}
}
total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
failedOrderSum.push({year:year2,total1})
failedOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])
// third
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="failed")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="failed")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="failed")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="failed")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="failed")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="failed")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="failed")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="failed")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="failed")){earnDec++;}
}
total2=0;
 total2=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
failedOrderSum.push({year:year3,total2})
failedOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year3])

//!3.6 pending
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
pendingOrderSum.push({year:year1,total})
pendingOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
// second
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnDec++;}
}
total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
pendingOrderSum.push({year:year2,total1})
pendingOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])
// third
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="pending")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="pending")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="pending")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="pending")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="pending")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="pending")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="pending")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="pending")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year3)&&(paymentData[i].PaymentOrderStatus=="pending")){earnDec++;}
}
total2=0;
 total2=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
pendingOrderSum.push({year:year3,total2})
pendingOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year3])






//!3.7 cod number 
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
codOrderTotalSum.push({year:year1,total})
codOrderTotal.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
// second
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnDec++;}
}
total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
codOrderTotalSum.push({year:year2,total1})
codOrderTotal.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])
// third
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")){earnDec++;}
}
total2=0;
 total2=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
codOrderTotalSum.push({year:year3,total2})
codOrderTotal.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year3])

// !3.8 revenue of cod
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnDec=earnDec+orderData[i].AmountReceived;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
codOrderSum.push({year:year1,total})
codOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
// second
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnDec=earnDec+orderData[i].AmountReceived;}
}
total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
codOrderSum.push({year:year2,total1})
codOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])
// third
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year3)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnDec=earnDec+orderData[i].AmountReceived;}
}
total2=0;
 total2=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
codOrderSum.push({year:year3,total2})
codOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year3])



return res.status(200).json({TotalEarning,TotalEarningSum,TotalPaymentsSum,TotalPayments,RevenueOnlineSum,RevenueOnline,successOrderSum,successOrder,failedOrder,failedOrderSum,pendingOrder,pendingOrderSum,codOrder,
codOrderSum,
codOrderTotal,
codOrderTotalSum})
}

//!2 two records search
if((req.body.year1)&&(req.body.year2)){
//!2.1 first year value fetch
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year1)){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year1)){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year1)){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year1)){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year1)){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year1)){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year1)){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year1)){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year1)){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year1)){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year1)){earnDec=earnDec+orderData[i].AmountReceived;}
}
TotalEarning.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
let total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
TotalEarningSum.push({year:year1,total})
// reset
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
// second year values
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year2)){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year2)){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year2)){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year2)){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year2)){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year2)){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year2)){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year2)){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year2)){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year2)){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year2)){earnDec=earnDec+orderData[i].AmountReceived;}
}
TotalEarning.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])
let total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
TotalEarningSum.push({year:year2,total1})






//!2.2 all payments count
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnDec++;}
}
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
TotalPaymentsSum.push({year:year1,total})
TotalPayments.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
// second uear
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnDec++;}
}
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(paymentData[i].PaymentMethod=="online")){earnDec++;}
}
total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
TotalPaymentsSum.push({year:year2,total1})
TotalPayments.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])




//!2.3 cost online by online payments
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnDec=earnDec+orderData[i].AmountReceived;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
RevenueOnlineSum.push({year:year1,total})
RevenueOnline.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnDec=earnDec+orderData[i].AmountReceived;}
}
total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
RevenueOnlineSum.push({year:year2,total1})
RevenueOnline.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])



//!2.4 total Success Payments
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
successOrderSum.push({year:year1,total})
successOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
// second
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="online")){earnDec++;}
}
total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
successOrderSum.push({year:year2,total1})
successOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])





//!2.5 failed
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
failedOrderSum.push({year:year1,total})
failedOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
// second
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="failed")){earnDec++;}
}
total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
failedOrderSum.push({year:year2,total1})
failedOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])


//!2.6 pending
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
pendingOrderSum.push({year:year1,total})
pendingOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
// second
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(paymentData[i].PaymentOrderStatus=="pending")){earnDec++;}
}
total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
pendingOrderSum.push({year:year2,total1})
pendingOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])




//!2.7 cod number 
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
codOrderTotalSum.push({year:year1,total})
codOrderTotal.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
// second
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")){earnDec++;}
}
total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
codOrderTotalSum.push({year:year2,total1})
codOrderTotal.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])
// !2.8 revenue of cod
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnDec=earnDec+orderData[i].AmountReceived;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
codOrderSum.push({year:year1,total})
codOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
// second
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year2)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnDec=earnDec+orderData[i].AmountReceived;}
}
total1=0;
 total1=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
codOrderSum.push({year:year2,total1})
codOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year2])





return res.status(200).json({TotalEarning,TotalEarningSum,TotalPaymentsSum,TotalPayments,RevenueOnlineSum,RevenueOnline,successOrderSum,successOrder,failedOrder,failedOrderSum,pendingOrder,pendingOrderSum,codOrder,
codOrderSum,
codOrderTotal,
codOrderTotalSum})
}

//!1 single
if((year1)){
//!1.1 all earing monthwise
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year1)){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year1)){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year1)){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year1)){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year1)){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year1)){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year1)){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year1)){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year1)){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year1)){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year1)){earnDec=earnDec+orderData[i].AmountReceived;}
}
TotalEarning.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])
let total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
TotalEarningSum.push({year:year1,total})

//!1.2 all payments count
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnDec++;}
}
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(paymentData[i].PaymentMethod=="online")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
TotalPaymentsSum.push({year:year1,total})
TotalPayments.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])


//!1.3 cost online by online payments
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnDec=earnDec+orderData[i].AmountReceived;}
}

total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
RevenueOnlineSum.push({year:year1,total})
RevenueOnline.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])

//!1.4 total Success Payments
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="online")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
successOrderSum.push({year:year1,total})
successOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])


//!1.5 failed
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="failed")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
failedOrderSum.push({year:year1,total})
failedOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])

//!1.6 pending
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<paymentData.length;i++){
let dateStr=paymentData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(paymentData[i].PaymentOrderStatus=="pending")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
pendingOrderSum.push({year:year1,total})
pendingOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])

//!1.7 cod number 
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnJan++;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnFeb++;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnMar++;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnApr++;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnMay++;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnJun++;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnJul++;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnAug++;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnsSep++;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnOct++;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnNov++;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")){earnDec++;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
codOrderTotalSum.push({year:year1,total})
codOrderTotal.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])

// !1.8 revenue of cod
earnJan=0,earnFeb=0,earnMar=0,earnApr=0,earnMay=0,earnJun=0,earnJul=0,earnAug=0,earnsSep=0,earnOct=0,earnNov=0,earnDec=0;
for(let i=0;i<orderData.length;i++){
let dateStr=orderData[i].OrderDate.split('.');
if((dateStr[1]==1)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJan=earnJan+orderData[i].AmountReceived;}
if((dateStr[1]==2)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnFeb=earnFeb+orderData[i].AmountReceived;}
if((dateStr[1]==3)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnMar=earnMar+orderData[i].AmountReceived;}
if((dateStr[1]==4)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnApr=earnApr+orderData[i].AmountReceived;}
if((dateStr[1]==5)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnMay=earnMay+orderData[i].AmountReceived;}
if((dateStr[1]==6)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJun=earnJun+orderData[i].AmountReceived;}
if((dateStr[1]==7)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnJul=earnJul+orderData[i].AmountReceived;}
if((dateStr[1]==8)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnAug=earnAug+orderData[i].AmountReceived;}
if((dateStr[1]==9)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnsSep=earnsSep+orderData[i].AmountReceived;}
if((dateStr[1]==10)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnOct=earnOct+orderData[i].AmountReceived;}
if((dateStr[1]==11)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnNov=earnNov+orderData[i].AmountReceived;}
if((dateStr[1]==12)&&(dateStr[2]==year1)&&(orderData[i].PaymentMethod=="cod")&&(orderData[i].OrderStatus=="complete")){earnDec=earnDec+orderData[i].AmountReceived;}
}
total=0;
 total=earnJan+earnFeb+earnMar+earnApr+earnMay+earnJun+earnJul+earnAug+earnsSep+earnOct+earnNov+earnDec;
codOrderSum.push({year:year1,total})
codOrder.push([earnJan,earnFeb,earnMar,earnApr,earnMay,earnJun,earnJul,earnAug,earnsSep,earnOct,earnNov,earnDec,year1])



// online and cod together






return res.status(200).json({TotalEarning,TotalEarningSum,TotalPaymentsSum,TotalPayments,RevenueOnlineSum,RevenueOnline,successOrderSum,successOrder,failedOrder,failedOrderSum,pendingOrder,pendingOrderSum,codOrder,
codOrderSum,
codOrderTotal,
codOrderTotalSum})
}



  
  } catch (error) {
    console.log(error)
      res.status(501).json({ message: error });
    }
   }
}
