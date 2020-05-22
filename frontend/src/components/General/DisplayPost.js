import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import '../../css/general/DisplayPost.css';

const DisplayPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const API = apiURL();

    const fetchPost = async () => {
        let res = await axios.get(API + "/api/posts/" + postId);
        setPost(res.data.post);
    }

    useEffect(() => {
        fetchPost();
    })
    
    return (
        <div className="displayPost">
             <div className="displayPostContainer">
                {/* <div className="displayPostLeft">
                    Profile Picture
                </div> */}

                {/* <div className="displayPostRight">
                    When Pfp is implemented
                </div> */}

                <div className="displayPostInfo">
                    <p className="displayPostName">{post.full_name}</p>
                    <p className="displayPostUsername">@{post.username}</p>
                </div>

                <div className="displayPost">
                    <div className="displayPostBody">
                        {post.body}
                    </div>
                    
                    {/* <div className="displayPostActivity">
                        Likes, Comments, Retweets & Bookmarks Here
                    </div> */}
                </div>

                {/* <div className="displayPostComments">
                    Comments here
                </div> */}
            </div>
        </div>
    )
}

export default DisplayPost;