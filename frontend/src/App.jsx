import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/Signin'
import Dashboard from './pages/dashboard'
import Sendmoney from './pages/sendmoney'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" name="Signup" element={<Signup/>}/>
        <Route path="/signin" element={
          <PublicRoute>
          <Signin/>
          </PublicRoute>
          }/>
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
            </PrivateRoute>
          
          
          }/>
        <Route path="/send" element={
          <PrivateRoute>
            <Sendmoney/>
          </PrivateRoute>
          
          
          
          }/>
        <Route path="/" element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App 