import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import Post from '../General/Post';
import UserCard from '../General/UserCard';
import { useInput } from '../../util/customHooks';
import '../../css/searchPage/SearchPage.css';

const SearchPage = ({ handleSearch }) => {
    let location = useLocation();
    let parsed = queryString.parse(location.search);;
    const API = apiURL();
    const [results, setResults] = useState([]);
    const searchBar = useInput("")

    const getResults = async (searchValue) => {
        try {
            let res;
            if(searchValue[0] === "#") {
                let slicedSearch = searchValue.slice(1);
                res = await axios.get(API + "/api/search/tags?search=" + slicedSearch);
                setResults(res.data.posts.map((post) => {
                    return (
                        <Post post={post} key={post.id} onDelete={getResults} />
                    )
                }))
            } else if(searchValue[0] === "@") {
                let slicedSearch = searchValue.slice(1);
                res = await axios.get(API + "/api/search/users?search=" + slicedSearch);
                setResults(res.data.users.map((user) => {
                    return (
                        <UserCard user={user} key={user.id}/>
                    )
                }))
            } else {
                let encodedSearch = encodeURIComponent(searchValue)
                res = await axios.get(API + "/api/search/all?search=" + encodedSearch);
                const { posts, users } = res.data;
                let postComponents = [null];
                let usersComponents = [null];

                if(posts.length) {
                    postComponents = posts.map((post) => {
                        return (
                            <Post post={post} key={post.id} onDelete={getResults} />
                        )
                    })
                }

                if(users.length) {
                    usersComponents = users.map(user => {
                        return (
                            <UserCard user={user} key={user.id} />
                        )
                    })
                }

                setResults([...postComponents, ...usersComponents]);
            }
        } catch (error) {
            setResults([]);
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(searchBar.value) {
            handleSearch(searchBar.value);
            getResults(searchBar.value);
        }
    }

    useEffect(() => {
        getResults(parsed.search);
    }, [])

    return (
        <div className="searchPageContainer appCenter">
            <form onSubmit={handleSubmit}>
                <input type="search" placeholder="Search" {...searchBar}/>
            </form>

            <div className="searchPageResults">
                {results.length ? results : <p className="error">No results found</p>}
            </div>
        </div>
    )

}

export default SearchPage;