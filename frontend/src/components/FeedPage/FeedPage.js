import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import Post from '../General/Post';
import MakePostForm from './MakePostForm';
import { AuthContext } from '../../providers/AuthContext';
import '../../css/feedPage/FeedPage.css';

const FeedPage = () => {
    const { currentUser } = useContext(AuthContext);
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

    const makePostSubmit = async (postBody, tags) => {
        let res = await axios.post(API + "/api/posts", {
            poster_id: currentUser.id, 
            body: postBody,
            tags, 
            created_at: new Date().toString()
        })
       
        getAllPost();
    }

    return (
        <div className="feedPageContainer appCenter">
            <MakePostForm makePostSubmit={makePostSubmit}/>
            {posts}
        </div>
    )
}

export default FeedPage;