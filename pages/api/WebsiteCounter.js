import DbConnection from "./Middleware/DbConnection";
import websiteCounter from "./Schema/WebsiteCounterSchema";
export default async function WebsiteCounter(req, res) {
  if (req.method == "POST") {
    try {
      DbConnection();
 let d=new Date();
 let fullDate=d.toLocaleDateString();
 let fullTime=d.toLocaleTimeString();
 let browser=req.body.Browser;
let data=new websiteCounter({
Browser:browser,HitFullDate:fullDate,HitFullTime:fullTime
})
await data.save();
       return res.status(201)
      
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: error, status: "501" });
    }
  }
}
