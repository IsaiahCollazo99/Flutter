import React from 'react';
import { Route, Link, useLocation } from 'react-router-dom';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';

const LogIn = () => {
    const location = useLocation();
    
    return (
        <div className="logInContainer">
            {location.pathname === "/login" ? 
                <Link to={"/login/createAccount"}>Sign Up</Link> :
                <Link to={"/login"}>Log In</Link>
            }
            <Route exact path={"/login"}>
                <LogInForm />
            </Route>

            <Route exact path={"/login/createAccount"}>
                <SignUpForm />
            </Route>
        </div>
    )
}

export default LogIn;