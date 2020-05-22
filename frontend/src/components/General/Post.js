import React from 'react';
import '../../css/general/Post.css';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    
    return (
        <Link to={`/${post.username}/status/${post.id}`} className="postLink">
            <div className="postContainer">
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
        </Link>
    )
}

export default Post;