import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import NewsCard from './NewsCard';
import '../../css/general/Discover.css';

const Discover = ({ handleSearch }) => {
    const location = useLocation();
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
                "headers": {
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
        getNews();
    }, [])
    
    return (
        <div className="discover">
            {displaySearch()}
            {stories}
        </div>
    )
}

export default Discover;