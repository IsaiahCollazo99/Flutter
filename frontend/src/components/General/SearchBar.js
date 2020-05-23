import React from 'react';
import '../../css/general/SearchBar.css';

const SearchBar = () => {
    return (
        <div className="searchBarContainer">
            <input type="search" className="searchBar" placeholder="Search"/>
        </div>
    )
}

export default SearchBar;