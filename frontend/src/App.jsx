import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/Signin'
import Dashboard from './pages/dashboard'
import Sendmoney from './pages/sendmoney'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" name="Signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/send" element={<Sendmoney/>}/>
        <Route path="/" element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App 