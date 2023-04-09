var cookie = require('cookie');
export default async (req, res) => {
try {
res.setHeader('Set-Cookie',cookie.serialize('adminToken', "", {
      httpOnly: true,
        path: '/',
     maxAge: -1,expires:new Date(Date.now()+1000),
    })
    );
return res.status(201).json({msg:"Logout Successfully"})
} catch (error) {
  res.status(501).json({message:"internal server error"})
  console.log(error)
}
}




