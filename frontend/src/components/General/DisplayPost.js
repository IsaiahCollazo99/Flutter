import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as unlikedHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as likedHeart, faSync as repostIcon } from '@fortawesome/free-solid-svg-icons';
import { likePost as postLike, createRepost } from '../../util/apiCalls/postRequests';
import { getPostLikers, getPostById } from '../../util/apiCalls/getRequests';
import { deleteLike, deletePost } from '../../util/apiCalls/miscRequests';
import blankProfile from '../../assets/images/blankProfile.png';
import '../../css/general/DisplayPost.css';

const DisplayPost = () => {
    const { currentUser } = useContext(AuthContext);
    const { postId } = useParams();
    const [ post, setPost ] = useState({});
    const [ likers, setLikers ] = useState({});
    
    const history = useHistory();

    const setupPost = async () => {
        try {
            const postById = await getPostById(postId);
            const postLikers = await getPostLikers(postId);

            setTimeout(() => {
                setPost(postById);
                setLikers(postLikers);
            }, 1000)

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setupPost();
    }, [])

    const handleDelete = async () => {
        await deletePost(postId);
        history.push("/");
    }

    const displayDelete = () => {
        const { poster_id: posterId } = post;
        const { id: userId } = currentUser;
        const adminId = "2uSTOBiWepWyjyoadawGF0Jvtyh2"

        if(currentUser) {
            if(userId === posterId || userId === adminId) {
                return (
                    <p onClick={handleDelete} className="deleteDisplay">Delete</p>
                )
            } else {
                return (
                    null
                )
            }
        }
    }

    const displayRepost = () => {
        const { is_retweet, retweeter_user: retweeter } = post;
        if(currentUser) {
            if(is_retweet && retweeter === currentUser.username) {
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

    const unlikePost = async () => {
        await deleteLike(currentUser.id, postId);
        setupPost();
    }

    const likePost = async () => {
        await postLike({liker_id: currentUser.id, post_id: postId});
        setupPost();
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

    const repost = async () => {
        try {
            await createRepost(post, currentUser.username, postId);

            setupPost();
        } catch(error) {
            console.log(error);
        }

    }

    const displayRepostUser = () => {
        const { is_retweet, retweeter_user: retweeter } = post;
        if(is_retweet) {
            return (
                <p className="isDisplayRepost">
                    <Link to={`/${retweeter}`}>{retweeter}</Link> reposted:
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
                        
                        <div className="displayPostActivity">
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