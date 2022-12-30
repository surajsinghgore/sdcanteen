const https = require('https');
const PaytmChecksum = require('paytmchecksum');
let mid=process.env.NEXT_PUBLIC_MID;
let HOST=process.env.NEXT_PUBLIC_API_URL;
import ClientDatas from "./Schema/ClientData";
import PaymentSchemaDataBase from "./Schema/PaymentSchema";
let mkey=process.env.NEXT_PUBLIC_MKEY;
import DbConnection from "./Middleware/DbConnection";
import VerifyClientUser from "./Middleware/ClientVerifyMiddleware";
var randtoken = require('rand-token');
export default async function PreTransaction(req, res) {
  if (req.method == "POST") {
try{
 DbConnection();
 let res1=await VerifyClientUser(req, res);
  if(res1==undefined){
    return res.status(401).json({ message: "Please login with Client credentails" });
    }
let CustomerId=res1.id;  
  const findClientData=await ClientDatas.findById({_id:CustomerId});
      if(!findClientData){
    res.status(404).json({status:"404",message:"Record Not Find with this User Id"})
      }
let TokenId=req.body.orderId;
let amount=req.body.amount;
const Email=findClientData.Email;
let currentDate=new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth()+1;
let year = currentDate.getFullYear();
let hours=currentDate.getHours();
let OrderTimes;
let m=parseInt(currentDate.getMinutes());
if(m<=9){
m = '0'+m;
}
if(hours>=12){
OrderTimes=currentDate.getHours()+"-"+m+" PM";
}
else{
OrderTimes=currentDate.getHours()+"-"+m+" AM";
}
      
      const Mobile=findClientData.Mobile;
      const FullAddress=findClientData.FullAddress;
      const FullName=findClientData.FullName;
      const PickUpTime=req.body.PickUpTime;
      const PickUpTime1=parseFloat(req.body.PickUpTime1).toFixed(2);
      const PickUpTime2=parseFloat(req.body.PickUpTime1).toFixed(2);
      const PaymentMethod="online";
      const UserId=CustomerId;
      const TotalAmount=req.body.TotalAmount;
      const OrderTime=OrderTimes;
      const OrderDate=`${day}.${month}.${year}`;

    

let array=[];
// geneate unqiue token 
   
    var token1 = randtoken.generate(6);
    let TokenNumber=TokenId;
    const TokenUser=token1;
for(let i=0;i<req.body.ItemsOrder.length;i++){
    const ItemName=req.body.ItemsOrder[i].ItemName;
      const Qty=req.body.ItemsOrder[i].Qty;
      const Amount=req.body.ItemsOrder[i].Amount;
      const ProductOriginalAmount=req.body.ItemsOrder[i].ProductOriginalAmount;
      const Category=req.body.ItemsOrder[i].Category;
      const Size=req.body.ItemsOrder[i].Size;
      const CategoryPrimary=req.body.ItemsOrder[i].CategoryPrimary;
      array.push({ItemName,Qty,Amount,Category,Size,CategoryPrimary,ProductOriginalAmount})  
}
 const sendItem=new PaymentSchemaDataBase({UserId,
      Email,Mobile,FullAddress,FullName,PickUpTime,PickUpTime1,PaymentMethod,OrderTime,OrderDate,TotalAmount:amount,OrderId:TokenNumber,TokenUser,PickUpTime2,
      ItemsOrder:array
      })
      let ress=await sendItem.save();

var paytmParams = {};
paytmParams.body = {
    "requestType"   : "Payment",
    "mid"           : `${mid}`,
    "websiteName"   : "sdcanteen",
    "orderId"       : `${TokenId}`,
    "callbackUrl"   : `${HOST}/api/PostTransaction?`,
    "txnAmount"     : {
        "value"     : `${amount}`,
        "currency"  : "INR",
    },
    "userInfo"      : {
        "custId"    : `${Email}`,
    },
};


PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), `${mkey}`).then(function(checksum){

    paytmParams.head = {
        "signature"    : checksum
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        hostname: 'securegw-stage.paytm.in',

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${TokenId}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    var response = "";
    var post_req = https.request(options, function(post_res) {
        post_res.on('data', function (chunk) {
            response += chunk;
        });

        post_res.on('end', function(){
          
let token=JSON.parse(response);
return res.status(200).json(token)
        });
    });

    post_req.write(post_data);
    post_req.end();
});

 }
 catch(error){
  console.log(error);
   res.status(501).json({ message: error, status: "501" });
  }


  }

 
}