import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Cards from './Cards'
import Category from './Category'
import './pages.css'

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState('dashboard');

  const handleButtonClick = (content) => {
    setActiveContent(content);
  };

  return (
    <React.Fragment>
      <Sidebar onButtonClick={handleButtonClick} activeContent={activeContent}/>
      <div className="main-content mt-5 p-3">
          <header>
              <i className="las la-bars"></i>
          </header>
          {activeContent === 'dashboard' && <Cards />}
          {activeContent === 'categories' && <Category />}
          
      </div>
    </React.Fragment>
  )
}

export default Dashboard
