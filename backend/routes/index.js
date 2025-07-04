const express=require("express")
const router=express.Router()
const userRouter=require("./user")
const Accountroute=require("./account")

router.use("/user",userRouter)
router.use("/account",Accountroute)
module.exports=router