import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as unlikedHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as likedHeart, faSync as repostIcon } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../providers/AuthContext';
import { getPostLikers } from '../../util/apiCalls/getRequests';
import { likePost as postLike, createRepost } from '../../util/apiCalls/postRequests';
import { deletePost as deletePostCall, deleteLike } from '../../util/apiCalls/miscRequests';
import blankProfile from '../../assets/images/blankProfile.png';
import '../../css/general/Post.css';

const Post = ({ post, onDelete }) => {
    const { currentUser } = useContext(AuthContext);
    const [ likers, setLikers ] = useState({});
    const [ newPost, setNewPost ] = useState([])
    const history = useHistory();

    const getLikers = async () => {
        let likersIds = await getPostLikers(post.id);

        setLikers(likersIds);
    }

    const getNewPost = () => {
        const { body } = post;
        const splitBody = body.split(" ");
        splitBody.forEach((subString, i) => {
            subString += " ";
            if(subString[0] === "#") {
                let encodedStr = encodeURIComponent(subString);
                splitBody[i] = <Link to={`/search?search=${encodedStr}`}><span className="postTag">{subString}</span></Link>
            } else if(subString[0] === "@") {
                let userTag = subString.slice(1);
                splitBody[i] = <Link to={`/${userTag}`} className="postUserTag">{subString}</Link>
            } else {
                splitBody[i] = <span>{subString}</span>
            }
        })

        setNewPost(splitBody);
    }
    
    useEffect(() => {
        getLikers();
        if(post.body) getNewPost();
    }, [])

    const pushDisplayPost = (e) => {
        if (e.target.nodeName === "DIV") {
            history.push(`/${post.username}/status/${post.id}`);
        }
    }

    const deletePost = async () => {
        await deletePostCall(post.id);
        onDelete();
    }

    const displayDelete = () => {
        if (currentUser) {
            const { poster_id, retweeter_user: retweeter } = post;
            const { username: currentUsername, id: userId } = currentUser
            const adminId = "2uSTOBiWepWyjyoadawGF0Jvtyh2";
            if(userId === poster_id || userId === adminId || currentUsername === retweeter) {
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
        if(currentUser) {
            const { retweeter_user: retweeter, is_retweet } = post;
            const { username: currentUsername } = currentUser;
            
            if(currentUser) {
                if(is_retweet && (retweeter === currentUsername)) {
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
                    <FontAwesomeIcon className="repost" icon={repostIcon}/>
                )
            }
        }
    }

    const unlikePost = async () => {
        if(currentUser) {
            await deleteLike(currentUser.id, post.id);
            onDelete();
            getLikers();
        }
    }

    const likePost = async () => {
        if(currentUser) {
            await postLike({liker_id: currentUser.id, post_id: post.id});
            onDelete();
            getLikers();
        }
    }

    const repost = async () => {
        try {
            if(currentUser) {
                const { id: retweeted_id } = post;
                await createRepost(post, currentUser.username, retweeted_id)
                onDelete();
            }
        } catch(error) {
            console.log(error);
        }

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

    const displayRepostUser = () => {
        const { is_retweet, retweeter_user: retweeter } = post;
        if(is_retweet) {
            return (
                <p className="isRepost">
                    <Link to={`/${retweeter}`}>{retweeter}</Link> reposted:
                </p>
            )
        } else {
            return null;
        }
    }

    const profilePic = post.profile_pic ? post.profile_pic : blankProfile;
    
    return (
        <div className="postContainer" onClick={pushDisplayPost}>
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
                        {newPost}
                    </p>

                    {post.image ? <img src={post.image} alt={post.username} /> : null}
                        
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