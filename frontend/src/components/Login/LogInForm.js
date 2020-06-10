import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logIn } from '../../util/firebaseFunctions';
import { getUser } from '../../util/apiCalls/getRequests';
import '../../css/logInSignUp/LogInForm.css';

const LogInForm = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState(null);
    const history = useHistory();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await logIn(email, password);
            await getUser(res.user.uid);
            history.push("/")
        } catch (error) {
            if(error.response) {
                setError("There was a problem with your login");
            } else {
                setError(error.message);
            }
        }      
    }
        
    return (
        <>
            
            <form className="logInForm" onSubmit={handleSubmit}>
                <h1 className="logInHeading">Welcome back</h1>

                {error ? <div className="error">{error}</div> : null}

                <label htmlFor="email">Email: </label>
                <input type="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    name="email"
                />
    
                <label htmlFor="password">Password: </label>
                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    name="password"
                    autoComplete="on"
                />
    
                <input type="submit" value="Log In"/>
            </form>
        </>
    )
}

export default LogInForm;