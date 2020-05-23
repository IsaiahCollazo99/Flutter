import React from 'react';
import { useInput } from '../../util/customHooks';
import '../../css/general/SearchBar.css';

const SearchBar = ({ handleSearch }) => {
    const search = useInput("");
    
    const searchSubmit = (e) => {
        e.preventDefault();
        if(search.value) {
            handleSearch(search.value);
        }

    } 
    
    return (
        <form className="searchBarContainer" onSubmit={searchSubmit}>
            <input type="search" className="searchBar" placeholder="Search" {...search}/>
        </form>
    )
}

export default SearchBar;