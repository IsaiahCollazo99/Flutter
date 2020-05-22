import React from 'react';
import '../../css/general/Post.css';

const Post = ({ post }) => {
    
    return (
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
    )
}

export default Post;