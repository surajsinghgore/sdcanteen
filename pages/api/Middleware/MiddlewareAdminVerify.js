const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const VerifyAdmin = async (req, res, next) => {
  try {
    let token = req.cookies.adminToken;
    // token not present then
    if (!token) {
      returnres.status(403).send({
        message: "please login with admin credentials",
        status: "403",
      });
    }

    let data = await jwt.verify(token, JWT_SECRET);
    if (!data) {
     return res.status(403).send({
        message: "please login with admin credentials",
        status: "403",
      });
    }
    req.user = data.user;
  } catch (error) {
    console.log(error);
   return res
      .status(403)
      .send({ message: "please login with admin credentials", status: "403" });
  }
};
module.exports = VerifyAdmin;
