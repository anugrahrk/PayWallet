const JWT_SECRET=require("./config")
const jwt=require("jsonwebtoken")
const AuthMware=(req,res,next)=>{   
    const authheader=req.headers.authorization
    if(!authheader || !authheader.startsWith("Bearer ")){
        return res.status(403).json({
            msg:"Invalid Auth"
        })
    }
    const token=authheader.split(" ")[1]
    try{
        const decoded=jwt.verify(token,JWT_SECRET)
        req.userId=decoded.userId
        next()
    }
    catch(err){
        return res.status(403).json({
            msg:"Invalid JWT"
        })
    }
}
module.exports={
    AuthMware
}