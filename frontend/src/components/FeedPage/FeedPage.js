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

    const findTags = (postBody) => {
        let tags = []
        let tagFound = false;
        let currTag = "";
        
        for(let char of postBody) {
            if(char === "#") {
                tagFound = true;
            }

            if(tagFound === true) {
                if(char === " ") {
                    tagFound = false;
                    tags.push(currTag);
                    currTag = "";
                } else {
                    currTag += char
                }
            }
        }

        return tags.length ? tags : null
    }

    const makePostSubmit = async (postBody) => {
        let tags = findTags(postBody);
        let res = await axios.post(API + "/api/posts", {
            poster_id: currentUser.id, 
            body: postBody,
            tags, 
            created_at: new Date().toString()
        })
       
        getAllPost();
    }

    return (
        <div className="feedPageContainer">
            <MakePostForm makePostSubmit={makePostSubmit}/>
            {posts}
        </div>
    )
}

export default FeedPage;