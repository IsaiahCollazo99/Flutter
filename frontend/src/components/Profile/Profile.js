import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import Post from '../General/Post';
import blankProfile from '../../assets/images/blankProfile.png';
import '../../css/profile/Profile.css';

const Profile = () => {
    const { userName: username } = useParams();
    const [ error, setError ] = useState(null);
    const [ posts, setPosts ] = useState([]);
    const [ user, setUser ] = useState({});
    const [ loading, setLoading ] = useState(true);

    const API = apiURL();

    const getUserPosts = async () => {
        try {
            let res = await axios.get(API + "/api/users/" + username + "/posts");
            let user = await axios.get(API + "/api/users/" + res.data.userPosts[0].poster_id);
            setUser(user.data.user);
            setTimeout(() => {
                setPosts(res.data.userPosts.map(post => {
                    return (
                        <Post post={post} key={post.id} />
                    )
                }));
                setLoading(false);
            }, 1000);
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

    const profilePic = user.profile_pic ? user.profile_pic : blankProfile;
    
    return (
        <div className="profileContainer appCenter">
            <header>{user ? user.full_name : "Profile"}</header>
            <div className="profileUserInfo">
                <img src={profilePic} alt={user.full_name} />
                <div>
                    <p className="profileFullName">{user.full_name}</p>
                    <p className="profileUsername">@{user.username}</p>
                </div>
            </div>
            <section>Posts</section>
            {loading ? <div className="loading">Loading</div> : null}
            <div className="profilePostContainer">
                {error ? <div className="error">{error}</div> : null}
                {posts}
            </div>
        </div>
    )
}

export default Profile;