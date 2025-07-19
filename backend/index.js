const express=require("express")
const app=express()
const port=process.env.PORT || 8080

const MainRoute=require("./routes/index")

const cors=require("cors")
const jwt=require("jsonwebtoken")
app.use(cors())
app.use(express.json())
app.use("/api/v1",MainRoute)



app.listen(port)