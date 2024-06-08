import React from 'react'
import Sidebar from './Sidebar'
import Cards from './Cards'
import './pages.css'

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div className="main-content mt-5 p-3">
          <header>
              <i className="las la-bars"></i>
          </header>
          <Cards />
      </div>
    </div>
  )
}

export default Dashboard
