import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    
    const getAllPost = async () => {
        try {
            let res = await axios.get("/api/posts");
            let dbPosts = res.data.posts;
            setPosts(dbPosts.map((post) => {
                return (
                    <div className="postContainer" key={post.id}>
                        {post.body}
                    </div>
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