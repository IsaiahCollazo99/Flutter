import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import Post from '../General/Post';
import UserCard from '../General/UserCard';

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
                        <Post post={post} key={post.id} onDelete={getResults} />
                    )
                }))
            } else if(parsed.search[0] === "@") {
                let slicedSearch = parsed.search.slice(1);
                res = await axios.get(API + "/api/search/users?search=" + slicedSearch);
                setResults(res.data.users.map((user) => {
                    return (
                        <UserCard user={user} key={user.id}/>
                    )
                }))
            } else {
                res = await axios.get(API + "/api/search/all" + location.search);
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