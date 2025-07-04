import React from 'react'
import {Link} from 'react-router-dom'
function Text({content,page,to}) {
  return (<div className='flex justify-center'>
    <div className='text-sm font-light text-slate-600 flex justify-between'>{content}<div className='text-sm font-light text-slate-700 underline underline-offset-1 hover:text-slate-900 '><Link to={to}>{page}</Link></div>
    </div>
    </div>
  )
}

export default Text