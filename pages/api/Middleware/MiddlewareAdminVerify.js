const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const VerifyAdmin = async (req, res, next) => {
  try {
    let token = req.headers["admintoken"];
    // token not present then
    if (!token) {
      res
        .status(403)
        .send({
          message: "please login with admin credentials",
          status: "403",
        });
    }

    let data = await jwt.verify(token, JWT_SECRET);
    if (!data) {
      res
        .status(403)
        .send({
          message: "please login with admin credentials",
          status: "403",
        });
    }
    req.user = data.user;
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .send({ message: "please login with admin credentials", status: "403" });
  }
};
module.exports = VerifyAdmin;

// const handler = nextConnect();

// handler.post(async(req,res)=>{
// let OriginalSecretAdminLoginId=process.env.OriginalSecretAdminLoginId;

// try{
// DbConnection();

// if(OriginalSecretAdminLoginId==secret){
// return res.status(201).json({status:"201",message:"correct"});
// }

// }

// catch(e){
// console.log(e)
// res.status(501).json({message:"Internal Server Error",status:"201"})

// }

// })

// export default handler
