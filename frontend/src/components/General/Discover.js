import React from 'react';
import SearchBar from './SearchBar';
import '../../css/general/Discover.css';
import { useLocation } from 'react-router-dom';

const Discover = ({ handleSearch }) => {
    const location = useLocation();

    const displaySearch = () => {
        if(!location.pathname.includes("search")) {
            return (
                <SearchBar handleSearch={handleSearch}/>
            )
        }
    }
    
    return (
        <div className="discover">
            {displaySearch()}
        </div>
    )
}

export default Discover;