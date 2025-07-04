import React, { useState } from 'react'
import Title from '../components/title'
import Input from '../components/input'
import Button from '../components/button'
import Text from '../components/Text'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [firstName,setFN]=useState("")
  const [lastName,setLN]=useState("")
  const [username,setUN]=useState("")
  const [password,setPW]=useState("")
  const [res,setresponse]=useState("")
  const navigate=useNavigate()

  return (<div className='bg-slate-200 h-screen flex justify-center'>
  <div className='flex flex-col justify-center '>
    <div className='rounded-xl shadow-lg bg-slate-50 p-10 w-100'>
        <Title title="SignUp"/>
        <Input onChange={(e)=> setFN(e.target.value)} label="First Name" placeholder="john"/>
        <Input onChange={(e)=> setLN(e.target.value)} label="Last Name" placeholder="doe"/>
        <Input onChange={(e)=> setUN(e.target.value)} label="Username" placeholder="johndoe@mail.com"/>
        <Input onChange={(e)=> setPW(e.target.value)} label="password" placeholder="password@123"/>
        <div className='pt-3 pl-20 text-red-600'>{res?res:""}</div>
        <Button onClick={async()=>{
          const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
            lastName,
            firstName,
            username,
            password
          })
          setresponse(response.data.message)
          if(response.data.msg){
            navigate("/signin")
          }
        }} text="SignUp"/>
        <Text content="Already User?" page="Signin" to="/signin"/>
    </div>
    </div>
    </div>
  )
}

export default Signup