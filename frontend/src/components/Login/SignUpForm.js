import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { apiURL } from '../../util/apiURL';
import { signUp, uploadPicture } from '../../util/firebaseFunctions'
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

    const postUser = async ( firebaseUser ) => {
        try {
            const userObj = {
                id: firebaseUser.id,
                email: email.value,
                full_name: name.value,
                username: username.value,
                profile_pic: firebaseUser.url
            }
            
            await axios.post(API + "/api/users", userObj)
    
            setError(null);
            history.push("/")
            setLoading(false);
        } catch(error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Check to see if a user by the entered username exists
            await axios.get(API + "/api/users/username/" + username.value);

            const { user: firebaseUser } = await signUp(email.value, password.value);

            if(profilePicture) {
                uploadPicture('profile_pictures/', {id: firebaseUser.uid, image: profilePicture}, postUser);
            } else {
                postUser({id: firebaseUser.uid, url: null});
            }

        } catch(error) {
            console.log(error);
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
                
                <label htmlFor="email" className="formLabel">Email: </label>
                <input type="email" {...email} name="email" autoComplete="on" className={emailClass} required/>

                <label htmlFor="password" className="formLabel">Password: </label>
                <input type="password" {...password} name="password" autoComplete="on"  required/>

                <label htmlFor="name" className="formLabel">Name: </label>
                <input type="text" {...name} name="name" autoComplete="on" required/>

                <label htmlFor="username" className="formLabel">Username: </label>
                <input type="text" {...username} name="username" className={usernameClass} autoComplete="on" required/>

                <label htmlFor="profilePic" className="formLabel">Profile Picture: (Optional)</label>
                <input type="file" name="profilePic" accept=".png, .jpg, .jpeg" onChange={handlePicUpload}/>

                { loading ? <FaSpinner size="100px"/> : null}
                <input type="submit" value="Sign Up"/>
            </form>
        </>
    )
}

export default SignUpForm;