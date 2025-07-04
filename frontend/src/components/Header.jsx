import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header({user}) {
  const navigate=useNavigate()
  return (
    <div className='w-full h-15  border-b-slate-400 shadow-md flex justify-between pt-3 pl-10 pr-10'>
        <div className='text-2xl font-bold'>PayWallet</div>
        <div className='flex'><div className='pr-5'><div className='bg-emerald-300 rounded-full w-7 h-7 pl-2'>{user.toUpperCase()}</div></div>
        <div className=''><button className='border border-slate-500 rounded-2xl bg-gray-800 hover:bg-gray-600 text-white' onClick={()=>{
          localStorage.removeItem("token")
          localStorage.removeItem("id")
          localStorage.removeItem("name")

          navigate("/signin")
        }}>Logout</button></div>
</div>
        </div>
  )
}

export default Header