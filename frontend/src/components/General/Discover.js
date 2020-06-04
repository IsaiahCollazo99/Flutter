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
            let res = await axios.get(`http://newsapi.org/v2/top-headlines?country=us&apiKey=263713b0d1bb4d38b07c99e631bfbdee`);
            const { articles } = res.data;
            setStories(articles.map((article, i) => {
                return (
                    <NewsCard article={article} key={i}/>
                )
            }))
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getNews();
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