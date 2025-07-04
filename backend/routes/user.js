const express=require("express")
const router=express.Router()
const zod=require("zod")
const {User,Account}=require("../db")
const jwt=require("jsonwebtoken")
const JWT_SECRET = require("../config")
const {AuthMware}=require("../Middleware")

const zodSchema=zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string()

})

router.post("/signup",async (req,res)=>{

    const {success}=zodSchema.safeParse(req.body)
    if(!success){
        res.json({
            message:"Inavlid Input"
        })
        return
    }
    const UserExist=await User.findOne({
        username: req.body.username
    })
    if(UserExist){
        res.json({
            message:"User already exists."
        })
        return
    }
    const newUser=await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    }
    )

    const userId=newUser._id

    await Account.create({
        userId:userId,
        balance:1+Math.random()*10000
    })

    res.json({
        msg:"User created Successfully",
    })

})

const UserSchema=zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)

})

router.post("/signin",async(req,res)=>{
    const {success}=UserSchema.safeParse(req.body)
    if(!success){
        res.json({
            msgs:"Invalid Inputs"
        })
        return
    }
    const ValidUser=await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if(ValidUser){
        const userId=ValidUser._id
        const token=jwt.sign({userId},JWT_SECRET)
        res.status(200).json({
            msg:token,
            user:ValidUser
        })
        return
    }
    res.json({
        msgs:"Invalid Credentials"
    })

})
const UpdateValue=zod.object({
    password:zod.string().min(6),
    firstName:zod.string(),
    lastName:zod.string()
})
router.put("/",AuthMware,async(req,res)=>{
    const {success}=UpdateValue.safeParse(req.body)
    if(!success){
        res.json({
            msg:"Invalid Inputs"
        })
    }
    await User.updateOne({_id:req.userId},req.body)
    res.json({
        msg:"Updated sucessfully"
    })
})
router.get("/bulk",AuthMware,async (req,res)=>{
    const filter=req.query.filter||""
    const users=await User.find({
        $or:[
            {
                firstName:{"$regex":filter}
            },
            {
                lastName:{"$regex":filter}
            }
        ]
    })
    const balance=await Account.findOne
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

module.exports=router