import React, { useContext } from 'react';
import axios from 'axios';
import '../../css/general/Post.css';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthContext';
import { apiURL } from '../../util/apiURL';


const Post = ({ post }) => {
    const { currentUser } = useContext(AuthContext);
    const history = useHistory();
    const API = apiURL();

    const displayPost = (e) => {
        if(e.target.nodeName !== "BUTTON") {
            history.push(`/${post.username}/status/${post.id}`);
        }
    }

    const deletePost = async (e) => {
        let postId = e.target.parentNode.id;
        let res = await axios.delete(API + "/api/posts/" + postId);
    }

    const displayDelete = () => {
        if(currentUser) {
            if(currentUser.id === post.poster_id) {
                return (
                    <button onClick={deletePost}>Delete</button>
                )
            } else {
                return (
                    null
                )
            }
        }
    }
    
    return (
        <div className="postContainer" id={post.id} onClick={displayPost}>
            {displayDelete()}
            {/* <div className="postLeft">
                Profile Picture
            </div> */}

            {/* <div className="postRight">
                When Pfp is implemented
            </div> */}

            <div className="postInfo">
                <p className="postFullName">{post.full_name}</p>
                <p className="postUsername">@{post.username}</p>
            </div>

            <div className="post">
                <div className="postBody">
                    {post.body}
                </div>
                    
                {/* <div className="postActivity">
                    Likes, Comments, Retweets & Bookmarks Here
                </div> */}
            </div>
        </div>
    )
}

export default Post;