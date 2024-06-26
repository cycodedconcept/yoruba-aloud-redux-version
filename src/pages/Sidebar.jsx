import React from 'react'
import './pages.css'

const Sidebar = ({ onButtonClick, activeContent }) => {
    const buttonItems = [
        {
            id: 0,
            name: 'Dashboard',
            las: 'lar la-chart-bar px-3',
            bname: 'dashboard'
        },
        {
            id: 1,
            name: 'Categories',
            las: 'las la-layer-group px-3',
            bname: 'categories'
        },
        {
            id: 2,
            name: 'Learning Materials',
            las: 'las la-file-upload px-3',
            bname: 'learning'
        },
        {
            id: 3,
            name: 'Quiz',
            las: 'las la-file-upload px-3',
            bname: 'quiz'
        },
        {
            id: 4,
            name: 'Admin',
            las: 'las la-user px-3',
            bname: 'admin'
        },
    ]


    const showMenu = buttonItems.map((item) => { 
        return <button key={item.id} className={activeContent === item.bname ? 'sidebar-menu button active': 'sidebar-menu button'} onClick={() => {
            console.log(item.bname)
            onButtonClick(item.bname)
        }}>
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
