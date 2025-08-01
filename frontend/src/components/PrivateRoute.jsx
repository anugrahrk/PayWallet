import React from 'react'
import { Navigate } from 'react-router-dom'


function PrivateRoute({children}) {
    const token=localStorage.getItem('token')
  return token ?  children:<Navigate to="/signin" replace/>
}

export default PrivateRoute