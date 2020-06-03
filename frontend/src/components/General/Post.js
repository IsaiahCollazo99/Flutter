import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/general/Post.css';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthContext';
import { apiURL } from '../../util/apiURL';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as unlikedHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as likedHeart, 
         faSync as repostIcon } from '@fortawesome/free-solid-svg-icons';
import blankProfile from '../../assets/images/blankProfile.png';

const Post = ({ post, onDelete }) => {
    const { currentUser } = useContext(AuthContext);
    const [ likers, setLikers ] = useState({});
    const history = useHistory();
    const API = apiURL();

    const getLikers = async () => {
        let res = await axios.get(API + "/api/posts/" + post.id + "/likes");
        
        let likersObj = {};
        
        res.data.likers.forEach(liker => {
            if(!likersObj[liker.liker_id]) {
                likersObj[liker.liker_id] = liker.liker_id;
            }
        })

        setLikers(likersObj);
    }

    useEffect(() => {
        getLikers();
    })

    const displayPost = (e) => {
        if(e.target.className === "postContainer") {
            history.push(`/${post.username}/status/${post.id}`);
        }
    }

    const deletePost = async () => {
        await axios.delete(API + "/api/posts/" + post.id);
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

    const displayRepost = () => {
        if(post.is_retweet && post.retweeter_user === currentUser.username) {
            return (
                <FontAwesomeIcon className="currentUserRepost" icon={repostIcon}/>
            )
        } else {
            return (
                <FontAwesomeIcon className="repost" icon={repostIcon} onClick={repost}/>
            )
        }
    }

    const unlikePost = async (e) => {
        const post_id = e.target.parentNode.parentNode.title;
        await axios.delete(API + `/api/likes?liker_id=${currentUser.id}&post_id=${post_id}`);
        onDelete();
    }

    const likePost = async (e) => {
        const post_id = e.target.parentNode.title;
        await axios.post(API + "/api/likes", {liker_id: currentUser.id, post_id});
        onDelete();
    }

    const repost = async (e) => {
        try {
            const pathParent = e.target.parentNode.parentNode.title;
            const svgParent = e.target.parentNode.title;
            const retweeted_id = pathParent ? pathParent : svgParent;
            const { poster_id, body, tags } = post;
            const repostObj = {
                poster_id,
                body,
                tags,
                created_at: new Date().toString(),
                is_retweet: true,
                retweeter_user: currentUser.username,
                retweeted_id
            }
            await axios.post(API + "/api/posts", repostObj);
        } catch(error) {
            console.log(error);
        }

    }

    const displayLike = () => {
        if(likers[currentUser.id]) {
            return (
                <FontAwesomeIcon 
                    className="liked heart" 
                    icon={likedHeart} 
                    onClick={unlikePost}
                />
            )
        } else {
            return (
                <FontAwesomeIcon 
                    className="unliked heart" 
                    icon={unlikedHeart} 
                    onClick={likePost}
                />
            )
        }
    }

    const displayRepostUser = () => {
        if(post.is_retweet) {
            return (
                <p className="isRepost">
                    <Link to={`/${post.retweeter_user}`}>{post.retweeter_user}</Link> reposted:
                </p>
            )
        } else {
            return null;
        }
    }

    const profilePic = post.profile_pic ? post.profile_pic : blankProfile;
    
    return (
        <div className="postContainer" onClick={displayPost}>
            {displayRepostUser()}
            <div className="postLeft">
                <img src={profilePic} alt={post.name}/>
            </div>

            <div className="postRight">
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
                        
                    <div className="postActivity" title={post.id}>
                        {displayLike()}
                        {post.like_count}

                        {displayRepost()}
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Post;