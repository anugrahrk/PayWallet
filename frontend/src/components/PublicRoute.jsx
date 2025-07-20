import React from 'react'
import { Navigate } from 'react-router-dom'


function PublicRoute({children}) {
    const token=localStorage.getItem('token')
  return token ? <Navigate to={`/dashboard?name=${response.data.user.firstName} `}replace/>: children
}

export default PublicRoute