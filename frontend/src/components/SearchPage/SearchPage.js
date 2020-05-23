import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

const SearchPage = () => {
    const location = useLocation();
    const search = queryString.parse(location.search);

    const getResults = async () => {
        let res = await axios.get("/search");
    }

    useEffect(() => {
        getResults();
    }, [])

    return (
        <div>
            Search Page
        </div>
    )

}

export default SearchPage;