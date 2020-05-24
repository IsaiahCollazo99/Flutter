import React, { useContext } from 'react';
import axios from 'axios';
import '../../css/general/Post.css';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthContext';
import { apiURL } from '../../util/apiURL';


const Post = ({ post, onDelete }) => {
    const { currentUser } = useContext(AuthContext);
    const history = useHistory();
    const API = apiURL();

    const displayPost = (e) => {
        if(e.target.className !== "deletePost" && e.target.className !== "postFullName") {
            history.push(`/${post.username}/status/${post.id}`);
        }
    }

    const deletePost = async () => {
        let res = await axios.delete(API + "/api/posts/" + post.id);
        onDelete();
    }

    const displayDelete = () => {
        if(currentUser) {
            if(currentUser.id === post.poster_id) {
                return (
                    <p onClick={deletePost} className="deletePost">Delete</p>
                )
            } else {
                return (
                    null
                )
            }
        }
    }
    
    return (
        <div className="postContainer" onClick={displayPost}>
            {/* <div className="postLeft">
                Profile Picture
            </div> */}

            {/* <div className="postRight">
                When Pfp is implemented
            </div> */}

            <div className="postInfo">
                <div className="postInfoLeft">
                    <Link to={`/${post.username}`} className="postFullName">
                        <p className="postFullName">{post.full_name}</p>
                    </Link>
                    <p className="postUsername">@{post.username}</p>
                </div>

                <div className="postInfoRight">
                    {displayDelete()}
                </div>
            </div>

            <div className="post">
                <p className="postBody">
                    {post.body}
                </p>
                    
                {/* <div className="postActivity">
                    Likes, Comments, Retweets & Bookmarks Here
                </div> */}
            </div>
        </div>
    )
}

export default Post;