const express=require("express")
const router=express.Router()
const { Account}=require("../db")
const {AuthMware}=require("../Middleware")
const { default: mongoose } = require("mongoose")

router.put("/balance",AuthMware,async (req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    })
    if(!account){
        res.json({
            msg:"Invalid User"
        })
    }
    const balance=account.balance
    res.status(200).json({
        balance:balance
    })
})
router.post("/transfer",AuthMware,async (req,res)=>{
    const session=await mongoose.startSession()
    session.startTransaction()
    const {to,amount}=req.body
    const account=await Account.findOne({
        userId:req.userId
    }).session(session)
    if (!account||account.balance<amount){
        await session.abortTransaction()
        session.endSession();
        return res.json({
            msg:"Insufficient Balance"
        })
        return
    }
    const ToAccount=await Account.findOne({
        userId:to
    }).session(session)
    if (!ToAccount){
        await session.abortTransaction()
        session.endSession();
        res.json({
            msg:"Inavlid User"
        })
        return
    }
    await Account.updateOne({
        userId:req.userId
    },{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({
        userId:to
    },{$inc:{balance:amount}}).session(session)

await session.commitTransaction();
session.endSession();
res.status(200).json({
    msg:"Transfer Successfull"
})
})

module.exports=router