import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Body = () => {
  return (
    <div className="app-container">
      {/* Header is inside the router tree so useNavigate works */}
      <Header />

      <div className="app-body">
        <Sidebar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Body
