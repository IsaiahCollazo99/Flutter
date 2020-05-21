import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import { AuthRoute } from '../../util/routesUtil';

const LogIn = () => {
    const location = useLocation();
    
    return (
        <div className="logInContainer">
            {location.pathname === "/login" ? 
                <Link to={"/login/createAccount"}>Sign Up</Link> :
                <Link to={"/login"}>Log In</Link>
            }
            <AuthRoute exact path={"/login"}>
                <LogInForm />
            </AuthRoute>

            <AuthRoute exact path={"/login/createAccount"}>
                <SignUpForm />
            </AuthRoute>
        </div>
    )
}

export default LogIn;