import React from 'react';

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
                {/* Poster Name */}
                {post.username}
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