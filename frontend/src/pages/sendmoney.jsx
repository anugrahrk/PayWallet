import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Payment from './Payment'

function Sendmoney() {
  const navigate=useNavigate()
  const [searchparams]=useSearchParams()
  const id=searchparams.get("id")
  const fname=searchparams.get("fname")
  const lname=searchparams.get("lname")
  const [amount,setAmount]=useState("")
  const[res,setRes]=useState("")

  return (
    <div className='bg-slate-200 h-screen flex justify-center z-10'>
  <div className='flex flex-col justify-center '>
    <div className='rounded-xl shadow-lg bg-slate-50 p-10 w-100 z-10 '>
        <div className='font-bold text-2xl font-sans  flex pt-5 pb-5 pl-20 '>Send Money</div> 
        <div className='flex pl-5 pt-5'> 
            <div className='bg-emerald-200 rounded-full w-10 h-10 pl-3.5 pt-1.5 text-lg text-cyan-600'>{fname[0].toUpperCase()}</div>
            <div className='font-semibold text-xl font-sans pl-4 flex justify-center pt-1'>{fname}</div>
            <div className='font-semibold text-xl font-sans pl-2 flex justify-center pt-1'>{lname}</div> 
        </div>
        <div className='grid grid-cols-1'>
        <div className='pt-5 pb-5 pl-13 '><input onChange={(e)=> setAmount(e.target.value)} value={amount} placeholder='amount' type='number' className='w-50 h-10 shadow-lg rounded-lg p-2 border border-slate-300'></input></div>
        <div className='pl-25'><button onClick={()=>{
          axios.post("https://paywallet-backend-7kxw.onrender.com/api/v1/account/transfer",{
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

         {
          res==="Transfer Successfull" &&
                   <Payment svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-20 text-green-500">
          <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
        </svg>} text={"Payment Sucessfull"}/>
          }

          {
          res==="Insufficient Balance" &&
                   <Payment svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-20 text-red-500">
          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
        </svg>
        } text={"Payment Failed"}/>
          }
        
        
        </div>
        </div>
  )
}

export default Sendmoney