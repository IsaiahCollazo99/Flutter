import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import Post from '../General/Post';
import MakePostForm from './MakePostForm';
import { AuthContext } from '../../providers/AuthContext';

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

    const makePostSubmit = (postBody) => {
        debugger;
    }

    return (
        <div className="feedPageContainer">
            <MakePostForm makePostSubmit={makePostSubmit}/>
            {posts}
        </div>
    )
}

export default FeedPage;