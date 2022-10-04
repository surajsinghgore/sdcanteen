const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
var cookie = require('cookie');

export default async function AdminLogin(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  let OriginalSecretAdminLoginId = process.env.OriginalSecretAdminLoginId;
  let OriginalPasswordAdminLogin = process.env.OriginalPasswordAdminLogin;
  try {
    const { secret, password } = req.body;

    if (OriginalSecretAdminLoginId !== secret) {
      return res
        .status(401)
        .json({ status: "401", message: "Incorrect secret ID" });
    }
    if (OriginalPasswordAdminLogin !== password) {
      return res
        .status(401)
        .json({ status: "401", message: "Incorrect Password" });
    }

    if (
      OriginalSecretAdminLoginId == secret &&
      OriginalPasswordAdminLogin == password
    ) {
      let data = {
        secret: secret,
      };
      const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });

      // generate cookies for admin
      res.setHeader('Set-Cookie',cookie.serialize('adminToken', token, {
      httpOnly: true,
        path: '/',
    expires:new Date(Date.now()+ 3600000),
    // secure:true
    }) );
            return res
        .status(201)
        .json({ status: "201", message: "successfully login",  });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(501)
      .json({ status: "501", message: "Internal Server Error" });
  }
}
