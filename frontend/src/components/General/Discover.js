import React from 'react';
import SearchBar from './SearchBar';
import '../../css/general/Discover.css';

const Discover = ({ handleSearch }) => {
    return (
        <div className="discover">
            <SearchBar handleSearch={handleSearch}/>
        </div>
    )
}

export default Discover;