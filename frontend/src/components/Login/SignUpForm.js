import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { apiURL } from '../../util/apiURL';
import { signUp } from '../../util/firebaseFunctions'
import { useInput } from '../../util/customHooks';
import { FaSpinner } from 'react-icons/fa';
import '../../css/logInSignUp/SignUpForm.css';

const SignUpForm = () => {
    const email = useInput("");
    const password = useInput("");
    const name = useInput("");
    const username = useInput("");
    const [profilePicture, setProfilePicture] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const API = apiURL();

    const [emailClass, setEmailClass] = useState(null);
    const [usernameClass, setUsernameClass] = useState(null);

    const handleSignUp = async (url = null) => {
        await axios.get(API + "/api/users/username/" + username.value);
        let res = await signUp(email.value, password.value);
        await axios.post(API + "/api/users", {
            id: res.user.uid, 
            email: email.value, 
            full_name: name.value, 
            username: username.value,
            profile_pic: url
        })
        setError(null);
        history.push("/")
        setLoading(false);
    }

    const profilePictureUpload = async () => {
        let storageRef = firebase.storage().ref('profile_pictures/' + profilePicture.name)
        let upload = storageRef.put(profilePicture);
        let url;

        upload.on('state_changed', snapshot => {

        }, error => {
            console.log(error);
            throw error;
        },async  () => {
            url = await upload.snapshot.ref.getDownloadURL();
            await handleSignUp(url);
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if(profilePicture) {
                await profilePictureUpload();
            } else {
                await handleSignUp();
            }     

        } catch (error) {
            if(error.response) {
                setError("User with that username already exists")
                setEmailClass(null);
                setUsernameClass("error");

            } else {
                setError(error.message);
                setEmailClass("error");
                setUsernameClass(null);
            }
        } 
    }

    const handlePicUpload = (e) => {
        setProfilePicture(e.target.files[0]);
    } 
    
    return (
        <>
            <form className="signUpForm" onSubmit={handleSubmit}>

                <h1 className="signUpHeading">Create your account</h1>

                {error ? <div className="error">{error}</div> : null}
                
                <label for="email" className="formLabel">Email: </label>
                <input type="email" {...email} name="email" autoComplete="on" className={emailClass} required/>

                <label for="password" className="formLabel">Password: </label>
                <input type="password" {...password} name="password" autoComplete="on"  required/>

                <label for="name" className="formLabel">Name: </label>
                <input type="text" {...name} name="name" autoComplete="on" required/>

                <label for="username" className="formLabel">Username: </label>
                <input type="text" {...username} name="username" className={usernameClass} autoComplete="on" required/>

                <label for="profilePic" className="formLabel">Profile Picture: (Optional)</label>
                <input type="file" name="profilePic" accept=".png, .jpg, .jpeg" onChange={handlePicUpload}/>

                { loading ? <FaSpinner size="100px"/> : null}
                <input type="submit" value="Sign Up"/>
            </form>
        </>
    )
}

export default SignUpForm;