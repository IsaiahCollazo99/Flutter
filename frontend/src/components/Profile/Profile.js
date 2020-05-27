import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import { AuthContext } from '../../providers/AuthContext';
import Post from '../General/Post';
import MakePostForm from '../FeedPage/MakePostForm';
import blankProfile from '../../assets/images/blankProfile.png';
import '../../css/profile/Profile.css';

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const { userName: username } = useParams();
    const [ error, setError ] = useState(null);
    const [ posts, setPosts ] = useState([]);
    const [ user, setUser ] = useState({});

    const API = apiURL();

    const getUserPosts = async () => {
        try {
            let res = await axios.get(API + "/api/users/" + username + "/posts");
            setPosts(res.data.userPosts.map(post => {
                return (
                        <Post post={post} key={post.id} />
                    )
                }));
            let user = await axios.get(API + "/api/users/" + res.data.userPosts[0].poster_id);
            setUser(user.data.user);
            setError(null);

        } catch(error) {
            if(error.response) {
                setError(error.response.data.error);
            }
            console.log(error);
        }
    }

    useEffect(() => {
        getUserPosts();
    }, [])

    // const makePostSubmit = async (postBody, tags) => {
    //     await axios.post(API + "/api/posts", {
    //         poster_id: currentUser.id, 
    //         body: postBody,
    //         tags,
    //         is_retweet: false, 
    //         created_at: new Date().toString()
    //     })
       
    //     getUserPosts();
    // }

    // const displayMakePostForm = () => {
    //     if(posts[0]) {
    //         if(currentUser.id === posts[0].props.post.poster_id) {
    //             return (
    //                 <MakePostForm makePostSubmit={makePostSubmit}/>
    //             )
    //         } else {
    //             return (
    //                 null
    //             )
    //         }
    //     } else {
    //         return (
    //             null
    //         )
    //     }
    // }

    const profilePic = user.profile_pic ? user.profile_pic : blankProfile;
    
    return (
        <div className="profileContainer appCenter">
            <header>{user ? user.full_name : "Profile"}</header>
            {/* {displayMakePostForm()} */}
            <div className="profileUserInfo">
                <img src={profilePic} alt={user.full_name} />
                <div>
                    <p className="profileFullName">{user.full_name}</p>
                    <p className="profileUsername">@{user.username}</p>
                </div>
            </div>
            <section>Posts</section>
            <div className="profilePostContainer">
                {error ? <div className="error">{error}</div> : null}
                {posts}
            </div>
        </div>
    )
}

export default Profile;