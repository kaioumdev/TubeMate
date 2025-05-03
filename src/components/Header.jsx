/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/redux/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/contants';
import { cacheResults } from '../utils/redux/searchSlice';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const dispatch = useDispatch();

    const searchCache = useSelector((store) => store.search)

    useEffect(() => {

        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSearchSuggestions(searchCache[searchQuery]);
            } else {
                getSearchSuggestions()
            }
        }, 200)
        return () => {
            clearTimeout(timer)
        }
    }, [searchQuery])

    const getSearchSuggestions = async () => {
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery)
        const json = await data.json()
        // console.log(json)
        setSearchSuggestions(json[1])
        dispatch(cacheResults({ [searchQuery]: json[1] }));
    }

    const showSearchResults = () => {
        // setShowSuggestions(false)
        // setSearchQuery('')
        // dispatch(cacheResults({ [searchQuery]: searchSuggestions }));
        // // Navigate to search results page
        // window.location.href = '/search?query=' + searchQuery;
    }
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
            <div className='col-span-10 px-10'>
                <div>
                    <input value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                        className='w-1/2 border border-gray-400 p-2 rounded-l-full' type="text" placeholder="Search" />
                    <button className='border border-gray-400 px-5 py-2 bg-gray-100 rounded-r-full'>🔍</button>
                </div>
                {
                    showSuggestions && <div className='fixed bg-white py-2 px-2 w-[43rem] shadow-lg rounded-lg border border-gray-100'>
                        <ul>
                            {
                                searchSuggestions.map((suggestion) =>
                                    <li onClick={showSearchResults} key={suggestion} className='p-2 px-3 shadow-sm hover:bg-gray-100 cursor-pointer'>🔍 {suggestion}</li>

                                )
                            }
                        </ul>
                    </div>
                }
            </div>
            <div className='col-span-1'>
                <img className='h-8' src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" alt="User" />
            </div>
        </div>
    )
}

export default Header