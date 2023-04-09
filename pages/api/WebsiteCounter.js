import DbConnection from "./Middleware/DbConnection";
import websiteCounter from "./Schema/WebsiteCounterSchema";
export default async function WebsiteCounter(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
 let d=new Date();
 let date=d.getDate()
 let month=(d.getMonth()+1)
 let year=d.getFullYear();
 let fullDate=date+"/"+month+"/"+year;
let hour=d.getHours()
let OrderTimes;
let m=parseInt(d.getMinutes());
if(m<=9){
m = '0'+m;
}
if(hour>=12){
OrderTimes=hour+"."+m+"-"+"PM";
}
else{
OrderTimes=hour+"."+m+"-"+"AM";
}

 let browser=req.body.Browser;
let data=new websiteCounter({
Browser:browser,HitFullDate:fullDate,HitFullTime:OrderTimes
})
         await data.save();
       return res.status(201).send("success")
      
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
