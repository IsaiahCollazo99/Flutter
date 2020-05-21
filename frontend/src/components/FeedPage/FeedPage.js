import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../General/Post';

const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    
    const getAllPost = async () => {
        try {
            let res = await axios.get("/api/posts");
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