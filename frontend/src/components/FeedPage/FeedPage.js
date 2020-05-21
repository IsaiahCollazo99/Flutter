import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import Post from '../General/Post';

const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    const API = apiURL();
    
    const getAllPost = async () => {
        try {
            let res = await axios({
                method: "GET",
                url: API + "/api/posts"
            });
            let dbPosts = res.data.posts;
            setPosts(dbPosts.map((post) => {
                return (
                    <Post post={post} key={post.id}/>
                )
            }))
        } catch(error) {
            console.log(error);
        }
        
    }
    useEffect(() => {
        getAllPost();
    })

    return (
        <div className="feedPageContainer">
            {posts}
        </div>
    )
}

export default FeedPage;