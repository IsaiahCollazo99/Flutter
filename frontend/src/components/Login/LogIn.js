import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import { AuthRoute } from '../../util/routesUtil';
import '../../css/logInSignUp/Login.css';

const LogIn = () => {
    const location = useLocation();
    
    return (
        <div className="logInContainer">
            <AuthRoute exact path={"/login"}>
                <LogInForm />
            </AuthRoute>

            <AuthRoute exact path={"/login/createAccount"}>
                <SignUpForm />
            </AuthRoute>

            {location.pathname === "/login" ? 
                <Link to={"/login/createAccount"}>Sign Up</Link> :
                <Link to={"/login"}>Log In</Link>
            }
        </div>
    )
}

export default LogIn;