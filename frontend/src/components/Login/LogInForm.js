import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logIn } from '../../util/firebaseFunctions';

const LogInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const history = useHistory();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logIn(email, password);
            history.push("/")
        } catch (error) {
            setError(error.message);
        }
            
    }
        
    return (
        <>
            {error ? <div>{error}</div> : null}
            <form className="logInForm" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
    
                <input type="password" placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    autoComplete="on"
                />
    
                <input type="submit" value="Log In"/>
            </form>
        </>
    )
}

export default LogInForm;