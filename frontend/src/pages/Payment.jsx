import React, { useState } from 'react'
import Button from '../components/button'
import { useNavigate } from 'react-router-dom'

function Payment({svg,text}) {
    const navigate=useNavigate()
    const [payment,setPayment]=useState(true)
  return (
    <div>
   { payment && (
    <div className='fixed top-24 z-50 rounded-xl shadow-lg bg-slate-50 p-10 w-100  h-100'>
        <div className='flex justify-end cursor-pointer' onClick={()=>setPayment(false)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
</svg>
</div>
        <div className='p-10 flex justify-center '>{svg}
</div>
<div className='items-center text-xl flex justify-center font-medium text-gray-700'>{text}</div>
<div>

</div>

        </div>)}
        </div>
  )
}

export default Payment