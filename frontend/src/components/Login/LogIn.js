import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthRoute } from '../../util/routesUtil';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import '../../css/logInSignUp/Login.css';

const LogIn = () => {
    const location = useLocation();
    
    return (
        <div className="logInContainer appCenter">
            <AuthRoute exact path={"/login"}>
                <LogInForm />
            </AuthRoute>

            <AuthRoute exact path={"/login/createAccount"}>
                <SignUpForm />
            </AuthRoute>

            {location.pathname === "/login" ? 
                <Link className="logInSwitch" to={"/login/createAccount"}>Don't have an account? Sign Up</Link> :
                <Link className="logInSwitch" to={"/login"}>Already have an account? Log In</Link>
            }
        </div>
    )
}

export default LogIn;