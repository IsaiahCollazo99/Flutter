import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import Post from '../General/Post';

const SearchPage = () => {
    const location = useLocation();
    const parsed = queryString.parse(location.search);;
    const API = apiURL();
    const [results, setResults] = useState([]);

    const getResults = async () => {
        try {
            let res;
            if(parsed.search[0] === "#") {
                let slicedSearch = parsed.search.slice(1);
                res = await axios.get(API + "/api/search/tags?search=" + slicedSearch);
                setResults(res.data.posts.map((post) => {
                    return (
                        <Post post={post} key={post.id}/>
                    )
                }))
            } else if(parsed.search[0] === "@") {
                let slicedSearch = parsed.search.slice(1);
                res = await axios.get(API + "/api/search/users?search=" + slicedSearch);
                debugger;
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getResults();
    }, [])

    return (
        <div className="searchPageContainer">
            <form className="searchBarSearchForm">
                <input type="search" className="searchPageSearchBar" placeholder="Search" />
            </form>

            <div className="searchPageResults">
                {results}
            </div>
        </div>
    )

}

export default SearchPage;