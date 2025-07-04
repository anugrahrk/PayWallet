import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

function Sendmoney() {
  const navigate=useNavigate()
  const [searchparams]=useSearchParams()
  const id=searchparams.get("id")
  const fname=searchparams.get("fname")
  const lname=searchparams.get("lname")
  const [amount,setAmount]=useState("")
  const[res,setRes]=useState("")
  function Sucess(){
    if(res=="Transfer Successfull"){
          return  <div>
            <div className='text-green-400 text-lg font-medium pl-20 pb-10'>Sucess</div>
          </div>
  }
  else if(res=="Insufficient Balance"||res=="Inavlid User"){
        return <div> 
          <div className='text-red-400 text-lg font-medium pl-20 pb-10'>{res}</div>
          </div>
  }
  else{
    return <div></div>
  }
  
}
  return (
    <div className='bg-slate-200 h-screen flex justify-center'>
  <div className='flex flex-col justify-center '>
    <div className='rounded-xl shadow-lg bg-slate-50 p-10 w-100 '>
        <div className='font-bold text-2xl font-sans  flex pt-5 pb-5 pl-20 '>Send Money</div> 
        <div className='flex pl-5 pt-5'> 
            <div className='bg-emerald-200 rounded-full w-10 h-10 pl-3.5 pt-1.5 text-lg text-cyan-600'>{fname[0].toUpperCase()}</div>
            <div className='font-semibold text-xl font-sans pl-4 flex justify-center pt-1'>{fname}</div>
            <div className='font-semibold text-xl font-sans pl-2 flex justify-center pt-1'>{lname}</div> 
        </div>
        <div className='grid grid-cols-1'>
        <div className='pt-5 pb-5 pl-13 '><input onChange={(e)=> setAmount(e.target.value)} placeholder='amount' type='number' className='w-50 h-10 shadow-lg rounded-lg p-2 border border-slate-300'></input></div>
        <div className='pl-3'><Sucess/></div>
        <div className='pl-25'><button onClick={()=>{
          axios.post("http://localhost:3000/api/v1/account/transfer",{
            to:id,
            amount,
          },{
            headers:{
              Authorization:"Bearer "+localStorage.getItem("token")
            }
          })
          .then((response)=>{
            setRes(response.data.msg)
          })
        }} type="button" class="w-30 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Send Money</button>
        </div>
        </div>

         </div>
        </div>
        </div>
  )
}

export default Sendmoney