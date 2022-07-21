const jwt = require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET_KEY;

export default function Middleware(req,res,next) {
 const UserToken= req.header('auth-token'); //auth-token is the name of token
if(!UserToken){
    res.status(401).send({error:"user not login "})
}

try {
    const data=jwt.verify(UserToken, JWT_SECRET);
req.user=data.user;

next();
} catch (error) {
    res.status(401).send({error:"user not login "})
}
}
