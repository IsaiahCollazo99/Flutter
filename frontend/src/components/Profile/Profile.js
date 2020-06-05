import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import Post from '../General/Post';
import blankProfile from '../../assets/images/blankProfile.png';
import '../../css/profile/Profile.css';
import { AuthContext } from '../../providers/AuthContext';
import { useInput } from '../../util/customHooks';

const Profile = () => {
    const { userName: username } = useParams();
    const [ error, setError ] = useState(null);
    const [ posts, setPosts ] = useState([]);
    const [ user, setUser ] = useState({});
    const [ editing, setEditing ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const { currentUser } = useContext(AuthContext);
    const nameInput = useInput("");
    const usernameInput = useInput("");
    const [ fileInput, setFileInput ] = useState(null);
    const history = useHistory();

    const API = apiURL();

    const getUser = async () => {
        try {
            let user = await axios.get(API + "/api/users/username/" + username + "?userProfile=true");
            setUser(user.data.user);
            getUserPosts();
        } catch (error) {
            if(error.response) {
                setError(error.response.data.error);
            }
            console.log(error);
        }
    }

    const getUserPosts = async () => {
        try {
            let res = await axios.get(API + "/api/users/" + username + "/posts");
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
            setLoading(false);
            if(error.response) {
                setError(error.response.data.error);
            }
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    const editProfile = () => {
        setEditing(true);
    }

    const submitUpdate = async () => {
        try {
            if(nameInput.value || usernameInput.value) {
                const patchObj = { full_name: nameInput.value, username: usernameInput.value }
                let res = await axios.patch(API + "/api/users/" + user.id, patchObj);
                if(usernameInput.value) {
                    history.push("/" + res.data.user.username);
                }
                getUser();
            }
            setEditing(false);
        } catch(error) {
            console.log(error);
        }
    }

    const displayEditButton = () => {
        if(currentUser) {
            if(currentUser.username === username && !editing) {
                return (
                    <button onClick={editProfile}>Edit Profile</button>
                )
            } else {
                if(editing) {
                    return (
                        <button onClick={submitUpdate}>Confirm</button>
                    )
                } else {
                    return null
                }
            }
        } else {
            return null
        }
    }

    let profilePic = blankProfile;
    if(user) {
        profilePic = user.profile_pic ? user.profile_pic : blankProfile;
    }
    
    return (
        <div className="profileContainer appCenter">
            <header>{user ? user.full_name : "Profile"}</header>
            {user ? 
            <div className="profileUserInfo">
                <div className="profileInfoLeft">
                    <img src={profilePic} alt={user.full_name} />
                    <div>
                        {!editing ? <p className="profileFullName">{user.full_name}</p> :
                        <label for="profileNameInput">Full Name:
                            <input type="text" className="profileNameInput" {...nameInput} maxlength={20}/>
                        </label>}
                        {!editing ? <p className="profileUsername">@{user.username}</p> :
                        <label for="profileUserInput">
                            Username:
                            <input type="text" className="profileUserInput" {...usernameInput} maxlength={20}/>
                        </label>}
                    </div>
                </div>
                {displayEditButton()}
            </div> : <p className="error">User doesn't exist</p>
            }
            
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