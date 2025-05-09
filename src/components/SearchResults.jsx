import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchResults = () => {
    const searchResults = useSelector((store) => store.search.results);

    if (!searchResults || searchResults.length === 0) {
        return <div className="text-center mt-10">No search results found.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
            {searchResults.map((video) => (
                <Link key={video.id.videoId} to={`/watch?v=${video.id.videoId}`}>
                    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg">
                        <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-3">
                            <h3 className="font-semibold text-sm truncate">{video.snippet.title}</h3>
                            <p className="text-xs text-gray-600">{video.snippet.channelTitle}</p>
                            <p className="text-xs text-gray-500">{video.snippet.publishedAt}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SearchResults;