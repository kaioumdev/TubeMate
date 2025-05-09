/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/redux/appSlice';
import { YOUTUBE_SEARCH_API, YOUTUBE_SEARCH_API_VIDEOS } from '../utils/contants';
import { cacheResults } from '../utils/redux/searchSlice';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // console.log(searchQuery);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const dispatch = useDispatch();

    const searchCache = useSelector((store) => store.search);
    console.log(searchCache);

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
        try {
            const proxyUrl = "https://corsproxy.io/?"  // Use a public proxy
            const targetUrl = YOUTUBE_SEARCH_API + searchQuery;
            const data = await fetch(proxyUrl + encodeURIComponent(targetUrl));
            const json = await data.json();
            setSearchSuggestions(json[1]);
            dispatch(cacheResults({ [searchQuery]: json[1] }));
        } catch (error) {
            console.error("Failed to fetch search suggestions:", error);
        }
    }

    const getSearchResults = async () => {
        try {
            const proxyUrl = "https://corsproxy.io/?";
            const targetUrl = `${YOUTUBE_SEARCH_API_VIDEOS}&q=${encodeURIComponent(searchQuery)}`;
            const response = await fetch(proxyUrl + targetUrl);
            const data = await response.json();
            // console.log(data.items); // Check the response
            setSearchResults(data.items); // Save to state
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };


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
                    {searchResults.length > 0 && (
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold mb-2">Search Results:</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {searchResults.map((video) => (
                                    <div key={video.id.videoId} className="border p-4 rounded shadow">
                                        <img
                                            src={video.snippet.thumbnails.medium.url}
                                            alt={video.snippet.title}
                                            className="w-full rounded"
                                        />
                                        <h3 className="font-bold mt-2">{video.snippet.title}</h3>
                                        <p className="text-sm text-gray-600">{video.snippet.channelTitle}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        className='border border-gray-400 px-5 py-2 bg-gray-100 rounded-r-full'
                        onClick={getSearchResults}
                    >🔍</button>
                </div>
                {
                    showSuggestions && <div className='fixed bg-white py-2 px-2 w-[43rem] shadow-lg rounded-lg border border-gray-100'>
                        <ul>
                            {
                                searchSuggestions.map((suggestion) =>
                                    <li key={suggestion} className='p-2 px-3 shadow-sm hover:bg-gray-100 cursor-pointer'>🔍 {suggestion}</li>

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