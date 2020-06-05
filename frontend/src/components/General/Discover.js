import React, { useContext, useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import '../../css/general/Discover.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthContext';
import LogInForm from '../Login/LogInForm';
import NewsCard from './NewsCard';

const Discover = ({ handleSearch }) => {
    const location = useLocation();
    let { currentUser } = useContext(AuthContext);
    const [ stories, setStories ] = useState([]);

    const displaySearch = () => {
        if(!location.pathname.includes("search")) {
            return (
                <SearchBar handleSearch={handleSearch}/>
            )
        } else {
            return null;
        }
    }

    const getNews = async () => {
        try {
            let res = await axios({
                "url":"https://microsoft-azure-bing-news-search-v1.p.rapidapi.com",
                "headers":{
                    "content-type":"application/octet-stream",
                    "x-rapidapi-host":"microsoft-azure-bing-news-search-v1.p.rapidapi.com",
                    "x-rapidapi-key":"141c23a7d4msh5ef06f55c75a949p136086jsnd07e585c2813",
                    "useQueryString":true
                }
            })
            
            const { value } = res.data;
            setStories(value.map((article, i) => {
                return (
                    <NewsCard article={article} key={i}/>
                )
            }))
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // getNews();
    }, [])
    
    // const displayLogIn = () => {
    //     if(location.pathname !== "/login/createAccount" || currentUser) {
    //         return (
    //             <LogInForm />
    //         )
    //     }
    // }
    
    return (
        <div className="discover">
            {displaySearch()}
            {/* {displayLogIn()} */}
            {stories}
        </div>
    )
}

export default Discover;