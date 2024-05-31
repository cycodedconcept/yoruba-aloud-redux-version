import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './pages/Dashboard';

const Display = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='dashboard' element={<Dashboard />} />
            </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default Display
