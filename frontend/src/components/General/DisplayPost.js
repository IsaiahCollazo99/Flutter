import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import '../../css/general/DisplayPost.css';
import { AuthContext } from '../../providers/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as unlikedHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as likedHeart, 
         faSync as repostIcon } from '@fortawesome/free-solid-svg-icons';
import blankProfile from '../../assets/images/blankProfile.png';

const DisplayPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true); // For comments
    const [ likers, setLikers ] = useState({});
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

    const getLikers = async () => {
        try {
            let res = await axios.get(API + "/api/posts/" + postId + "/likes");
        
            let likersObj = {};
            
            res.data.likers.forEach(liker => {
                if(!likersObj[liker.liker_id]) {
                    likersObj[liker.liker_id] = liker.liker_id;
                }
            })
    
            setLikers(likersObj);
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchPost();
        getLikers();
    }, [])

    const deletePost = async () => {
        await axios.delete(API + "/api/posts/" + post.id);
        history.push("/");
    }

    const displayDelete = () => {
        if(currentUser) {
            if(currentUser.id === post.poster_id || currentUser.id === "2uSTOBiWepWyjyoadawGF0Jvtyh2") {
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

    const displayRepost = () => {
        if(currentUser) {
            if(post.is_retweet && post.retweeter_user === currentUser.username) {
                return (
                    <FontAwesomeIcon className="currentUserRepost" icon={repostIcon}/>
                )
            } else {
                return (
                    <FontAwesomeIcon className="repost" icon={repostIcon} onClick={repost}/>
                )
            }
        } else {
            return (
                <FontAwesomeIcon icon={repostIcon}/>
            )
        }

    }

    const unlikePost = async (e) => {
        const post_id = e.target.parentNode.parentNode.title;
        await axios.delete(API + `/api/likes?liker_id=${currentUser.id}&post_id=${post_id}`);
        fetchPost();
        getLikers();
    }

    const likePost = async (e) => {
        const post_id = e.target.parentNode.title;
        await axios.post(API + "/api/likes", {liker_id: currentUser.id, post_id});
        fetchPost();
        getLikers();
    }

    const displayLike = () => {
        if(currentUser) {
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
        } else {
            return (
                <FontAwesomeIcon 
                    className="unliked heart" 
                    icon={unlikedHeart} 
                />
            )
        }

    }

    const repost = async (e) => {
        try {
            const pathParent = e.target.parentNode.parentNode.title;
            const svgParent = e.target.parentNode.title;
            const retweeted_id = pathParent ? pathParent : svgParent;
            const { poster_id, body, tags, image } = post;
            const repostObj = {
                poster_id,
                body,
                tags,
                created_at: new Date().toString(),
                is_retweet: true,
                retweeter_user: currentUser.username,
                retweeted_id,
                image
            }
            await axios.post(API + "/api/posts", repostObj);
            fetchPost();
        } catch(error) {
            console.log(error);
        }

    }

    const displayRepostUser = () => {
        if(post.is_retweet) {
            return (
                <p className="isDisplayRepost">
                    <Link to={`/${post.retweeter_user}`}>{post.retweeter_user}</Link> reposted:
                </p>
            )
        } else {
            return null;
        }
    }

    const profilePic = post.profile_pic ? post.profile_pic : blankProfile;
    
    return (
        <div className="displayPost appCenter">
            <header>Post</header>
            <div className="displayPostContainer">
                {displayRepostUser()}
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

                        {post.image ? <img src={post.image} alt={post.username} /> : null}
                        
                        <div className="displayPostActivity" title={post.id}>
                            {displayLike()}
                            {post.like_count}

                            {displayRepost()}
                        </div>
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