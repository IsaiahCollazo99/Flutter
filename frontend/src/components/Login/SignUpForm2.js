import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { signUp, uploadPicture } from '../../util/firebaseFunctions'
import { useInput } from '../../util/customHooks';
import { createUser } from '../../util/apiCalls/postRequests';
import { usernameCheck } from '../../util/apiCalls/getRequests';
import '../../css/logInSignUp/SignUpForm.css';

const SignUpFormTwo = ( props ) => {
    const {
        onPageSwitch,
        email,
        password,
        username,
        setEmailClass,
        setUsernameClass,
        error,
        setError
    } = props;

    const name = useInput("");
    const [ profilePicture, setProfilePicture ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ textArea, setTextArea ] = useState("");

    const history = useHistory();

    const postUser = async ( firebaseUser ) => {
        try {
            await createUser(firebaseUser, email.value, name.value, username.value, textArea);
            setError(null);
            history.push("/")
            setLoading(false);
        } catch(error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        debugger;
        setLoading(true);

        try {
            await usernameCheck(username.value);

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
            onPageSwitch();
            setLoading(false);
        }
    }

    const handlePicUpload = (e) => {
        setProfilePicture(e.target.files[0]);
    } 

    const onTextAreaType = (e) => {
        setTextArea(e.target.value);
    }

    const bioTextArea = {
        value: textArea,
        onChange: onTextAreaType,
        placeholder: "Tell us about yourself",
        cols: 50,
        rows: 5
    }
    
    return (
        <>
            <form className="signUpForm" onSubmit={handleSubmit}>

                <h1 className="signUpHeading">Create your account</h1>

                {error ? <div className="error">{error}</div> : null}
            
                <label htmlFor="name" className="formLabel">Name: </label>
                <input type="text" {...name} name="name" autoComplete="on" required/>

                <label htmlFor="bio" className="formLabel">Bio: </label>
                <textarea maxLength={280} {...bioTextArea}/>

                <label htmlFor="profilePic" className="formLabel">Profile Picture: (Optional)</label>
                <input type="file" name="profilePic" accept=".png, .jpg, .jpeg" onChange={handlePicUpload}/>

                { loading ? <FaSpinner size="100px"/> : null}
                <input type="submit" value="Sign Up"/>
            </form>

            <button onClick={onPageSwitch}> Back </button>
        </>
    )
}

export default SignUpFormTwo;