
import Header from '../components/Header'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

function Dashboard() {
  const [filter,setFilter]=useState("")
  const [user,setUser]=useState([])
  const [balance,setBalance]=useState("")
  const [searchparams]=useSearchParams()
  const name=searchparams.get("name")
  const token=localStorage.getItem("token")
  useEffect( ()=>{
    axios.get("https://paywallet-backend-7kxw.onrender.com/api/v1/user/bulk?filter="+filter.toLowerCase(),{
      headers:{
        authorization:`Bearer ${token}`
      }}
    )
    .then(response=>{
        setUser(response.data.user)
    })
    
  },[filter])
  useEffect(()=>{
    axios.put("https://paywallet-backend-7kxw.onrender.com/api/v1/account/balance",{},{
      headers:{
        authorization:`Bearer ${token}`
      }
    }).then(response=>{
      setBalance(response.data.balance)
    })
    
  },[])

  return (
     <div >
        <Header user={name[0]}/>
        <div className='pl-10 pt-5 pb-10'>
        <div className='rounded-xl shadow-lg bg-slate-50 p-10 w-100'>
            <div className='flex justify-between'><div className='text-slate-500 text-lg font-medium font-sans'>Balance</div></div>
            <div className='text-slate-800 text-4xl font-bold font-sans p-4'>{"₹ "+parseInt(balance)}</div>
            

        </div>
        </div>
        <div className='pl-15 pr-15  border border-t-slate-200 border-b-0 pb-10'>
        <div className='font-bold text-2xl font-sans  flex pt-5 pb-5 '>Users</div> 
        <input onChange={(e)=> setFilter(e.target.value) } class="shadow-lg  border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:text-black focus:shadow-lg " type="text" placeholder="Search User"/>
        </div>
        {user.filter(user=> user.firstName!=name).map(u => <User user={u}/>)}
        </div>


  )
}
function User({user}) {
  const navigate=useNavigate()

 
  return (
    <div className='pl-20 pr-20 flex justify-between'>
        <div className='flex'>
            <div className='bg-emerald-200 rounded-full w-8 h-8 pl-2.5 pt-0.5 text-blue-700 text-lg'>{user.firstName[0].toUpperCase()}</div>
            <div className='font-medium text-lg font-sans pl-4 flex justify-center'>{user.firstName}</div>
            <div className='font-medium text-lg font-sans pl-2 flex justify-center'>{user.lastName}</div> 


        </div>
        <button onClick={(e)=>{
          navigate("/send?id="+user._id+"&fname="+user.firstName+"&lname="+user.lastName)
        }} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Send Money</button>       

    </div>
  )
}

export default Dashboard