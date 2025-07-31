const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://anugrahrk6:VTsSdSad9mNALQC@cluster0.ojaoz3b.mongodb.net/paytm")

const PaytmSchema=new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        lowercase:true
    },
    lastName:{
        type: String,
        required: true,
        lowercase:true


    },
    username:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
        minLength:6
    }
   } 
)
const AccountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const User=mongoose.model("User",PaytmSchema)
const Account=mongoose.model("Account",AccountSchema)
module.exports={
    User,
    Account
}