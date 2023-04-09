var cookie = require('cookie');
export default async (req, res) => {
try {
res.setHeader('Set-Cookie',[ cookie.serialize('clinetToken', "", {
      httpOnly: true,
        path: '/',
     maxAge: -1,expires:new Date(Date.now()+1000),
    }),
     cookie.serialize(
            'clinetId', "",
             {
                 httpOnly: true,
     maxAge: -1,expires:new Date(Date.now()+ 1000),
                path: '/'
            }
        )
    
    ]);
return res.status(201).json({msg:"Logout Successfully"})
} catch (error) {
  res.status(501).json({message:"internal server error"})
  console.log(error)
}
}




