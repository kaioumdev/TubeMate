import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../utils/redux/appSlice';

const Header = () => {
    const dispatch = useDispatch();
    const toggleMenuHandler = () => {
        dispatch(toggleMenu())
    }
    return (
        <div className='grid grid-flow-col p-5 m-2 shadow-lg'>
            <div className='flex col-span-1'>
                <img className='h-8 cursor-pointer' onClick={() => toggleMenuHandler()} src="https://static.vecteezy.com/system/resources/previews/021/190/402/non_2x/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg" alt="menu" />
                <a href="/">
                    <img className='h-8 mx-5' src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo.png" alt="youtube-logo" />
                </a>
            </div>
            <div className='col-span-10 px-10 text-center'>
                <input className='w-1/2 border border-gray-400 p-2 rounded-l-full' type="text" placeholder="Search" />
                <button className='border border-gray-400 px-5 py-2 bg-gray-100 rounded-r-full'>🔍</button>
            </div>
            <div className='col-span-1'>
                <img className='h-8' src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" alt="User" />
            </div>
        </div>
    )
}

export default Header