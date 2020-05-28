import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import '../../css/general/DisplayPost.css';
import { AuthContext } from '../../providers/AuthContext';
import blankProfile from '../../assets/images/blankProfile.png';

const DisplayPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true); // For comments
    const API = apiURL();
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);

    const fetchPost = async () => {
        let res = await axios.get(API + "/api/posts/" + postId);

        setTimeout(() => {
            setPost(res.data.post);
            setLoading(false);
        }, 500);

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

    const profilePic = post.profile_pic ? post.profile_pic : blankProfile;
    
    return (
        <div className="displayPost appCenter">
            <header>Post</header>
             <div className="displayPostContainer">
                <div className="displayPostLeft">
                    <img src={profilePic} alt={post.full_name} />
                </div>

                <div className="displayPostRight">
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
        </div>
    )
}

export default DisplayPost;