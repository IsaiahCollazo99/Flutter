import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { parse as parseQuery } from 'query-string';
import { useInput } from '../../util/customHooks';
import { searchTags, searchUsers, searchAll } from '../../util/apiCalls/getRequests';
import Post from '../General/Post';
import UserCard from '../General/UserCard';
import '../../css/searchPage/SearchPage.css';

const SearchPage = ({ handleSearch }) => {
    let location = useLocation();
    let parsed = parseQuery(location.search);;
    const [ results, setResults ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const searchBar = useInput("")

    const getResults = async ( searchValue ) => {
        try {
            if(searchValue[0] === "#") {
                let slicedSearch = searchValue.slice(1);
                let posts = await searchTags(slicedSearch);

                setResults(posts.map((post) => {
                    return (
                        <Post post={post} key={post.id} onDelete={getResults} />
                    )
                }))

            } else if(searchValue[0] === "@") {
                let slicedSearch = searchValue.slice(1);
                let users = await searchUsers(slicedSearch);

                setResults(users.map((user) => {
                    return (
                        <UserCard user={user} key={user.id}/>
                    )
                }))

            } else {
                let data = await searchAll(searchValue);
                const { posts, users } = data;
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
                    usersComponents.unshift(
                        <h2 key={"h2"}>People</h2>
                    )
                }
                
                setTimeout(() => {
                    setResults([...postComponents, ...usersComponents]);
                    setLoading(false);
                }, 1000);
            }
        } catch (error) {
            setTimeout(() => {
                setResults(<p className="error">No results found</p>);
                setLoading(false);
            }, 1000);
            
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if(searchBar.value) {
            handleSearch(searchBar.value);
            getResults(searchBar.value);
        }
    }

    useEffect(() => {
        getResults(searchBar.value ? searchBar.value : parsed.search);
    }, [])

    return (
        <div className="searchPageContainer appCenter">
            <form onSubmit={handleSubmit}>
                <input type="search" placeholder="Search" {...searchBar}/>
            </form>

            {loading ? <div className="loading">Loading</div> : null}

            <div className="searchPageResults">
                {results}
            </div>
        </div>
    )

}

export default SearchPage;