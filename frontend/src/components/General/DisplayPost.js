import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import '../../css/general/DisplayPost.css';
import { AuthContext } from '../../providers/AuthContext';

const DisplayPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const API = apiURL();
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);

    const fetchPost = async () => {
        let res = await axios.get(API + "/api/posts/" + postId);
        setPost(res.data.post);
    }

    useEffect(() => {
        fetchPost();
    })

    const deletePost = async () => {
        await axios.delete(API + "/api/posts/" + post.id);
        history.push("/");
    }

    const displayDelete = () => {
        if(currentUser) {
            if(currentUser.id === post.poster_id) {
                return (
                    <p onClick={deletePost} className="deleteDisplay">Delete</p>
                )
            } else {
                return (
                    null
                )
            }
        }
    }
    
    return (
        <div className="displayPost appCenter">
             <div className="displayPostContainer">
                {/* <div className="displayPostLeft">
                    Profile Picture
                </div> */}

                {/* <div className="displayPostRight">
                    When Pfp is implemented
                </div> */}

                <div className="displayPostInfo">
                    <div className="displayPostInfoLeft">
                        <Link to={"/" + post.username} 
                        className="displayPostName">
                            {post.full_name}
                        </Link>
                        <p className="displayPostUsername">@{post.username}</p>
                    </div>

                    <div className="displayPostInfoRight">
                        {displayDelete()}
                    </div>

                </div>

                <div className="displayPostPost">
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