import React from 'react'
import Sidebar from './Sidebar'
import MainContainer from './MainContainer'
import { Outlet } from 'react-router-dom'

const Body = () => {
    return (
        <div className='grid grid-flow-col'>
            <Sidebar></Sidebar>
            <Outlet></Outlet>
        </div>
    )
}

export default Body