import React, { useState } from 'react'
import './pages.css'

const Sidebar = () => {
    const buttonItems = [
        {
            id: 0,
            name: 'Dashboard',
            las: 'lar la-chart-bar px-3'
        },
        {
            id: 1,
            name: 'Categories',
            las: 'las la-layer-group px-3'
        },
        {
            id: 2,
            name: 'Learning Materials',
            las: 'las la-file-upload px-3'
        },
        {
            id: 3,
            name: 'Quiz',
            las: 'las la-file-upload px-3'
        },
        {
            id: 4,
            name: 'Admin',
            las: 'las la-user px-3'
        },
    ]
    const [active, setActive] = useState(buttonItems[0].id);
    

    const handleClick = (id) => {
        setActive(id);
    };
    

    const showMenu = buttonItems.map((item) => { 
        return <button key={item.id} className={active === item.id ? 'sidebar-menu button active': 'sidebar-menu button'} onClick={() => handleClick(item.id)}>
        <i className={item.las} style={{color: '#b6cc00'}} ></i>
        {item.name}
        </button>
    })

    
  return (
    <React.Fragment>
        <div className="sidebar">
            <div className="sidebar-menu">
                { showMenu }
            </div>
        </div>
        
    </React.Fragment>
  )
}

export default Sidebar
