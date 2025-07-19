import React, { useState } from 'react'
import Title from '../components/title'
import Input from '../components/input'
import Button from '../components/button'
import Text from '../components/Text'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signin() {
  const [username,setUsername]=useState("")
  const [password, setPassword]=useState("")
  const[res,setResponse]=useState("")
  function Message(){
    if (res){
      return <div className='pt-3 pl-20 text-red-600'>{res?res:""}</div>
    }
  }
  const navigate=useNavigate()
  return (
    <div className='bg-slate-200 h-screen flex justify-center'>
  <div className='flex flex-col justify-center '>
    <div className='rounded-xl shadow-lg bg-slate-50 p-10 w-100'>
        <Title title="Signin"/> 
        <Input onChange={(e)=> setUsername(e.target.value)}label="Username" placeholder="johndoe@mail.com"/>
        <Input onChange={(e)=>setPassword(e.target.value)} label="password" placeholder="password@123"/>
        <Message/>
        <Button onClick={async()=>{
          const response=await axios.post("https://paywallet-backend-7kxw.onrender.com/api/v1/user/signin",{
            username,
            password
          })
          setResponse(response.data.msgs)
          if (response.data.msg){
            localStorage.setItem("token",response.data.msg)
            navigate("/dashboard?name="+response.data.user.firstName)
          }
        }} text="Signin"/>
        <Text content="Not Registed?" page="SignUp" to="/signup"/>
    </div>
    </div>
    </div>

  )
}

export default Signin