import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { apiURL } from '../../util/apiURL';

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const history = useHistory();
    const API = apiURL();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // sign up with firebase and send results to our backend
            history.push("/")
        } catch (error) {
            setError(error.message);
        }
        
    }
    
    return (
        <>
            {error ? <div>{error}</div> : null}
            <form className="signUpForm" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />

                <input type="password" placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    autoComplete="on"
                />

                <input type="submit" value="Sign Up"/>
            </form>
        </>
    )
}

export default SignUpForm;