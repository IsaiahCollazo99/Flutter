import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { apiURL } from '../../util/apiURL';
import { signUp } from '../../util/firebaseFunctions'
import { useInput } from '../../util/customHooks';

const SignUpForm = () => {
    const email = useInput("");
    const password = useInput("");
    const name = useInput("");
    const username = useInput("");

    const [error, setError] = useState(null);
    const history = useHistory();
    const API = apiURL();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let user = await axios.get(API + "/api/users/username/" + username.value);
            let res = await signUp(email.value, password.value);
            await axios.post(API + "/api/users", {
                id: res.user.uid, 
                email: email.value, 
                full_name: name.value, 
                username: username.value
            })
            setError(null);
            history.push("/")
            
        } catch (error) {
            if(error.response.data.error) {
                setError("User with that username already exists")
            } else {
                setError(error.message);
            }
        } 
    }
    
    return (
        <>
            {error ? <div className="error">{error}</div> : null}
            <form className="signUpForm" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" {...email} autoComplete="on"/>
                <input type="password" placeholder="Password" {...password} autoComplete="on" />
                <input type="text" placeholder="Name" {...name} autoComplete="on"/>
                <input type="text" placeholder="Username" {...username} autoComplete="on"/>

                <input type="submit" value="Sign Up"/>
            </form>
        </>
    )
}

export default SignUpForm;