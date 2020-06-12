import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthRoute } from '../../util/routesUtil';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import SignUpFormTwo from './SignUpForm2';
import '../../css/logInSignUp/Login.css';
import { useInput } from '../../util/customHooks';
import { usernameCheck } from '../../util/apiCalls/getRequests';

const LogIn = () => {
    const email = useInput("");
    const password = useInput("");
    const username = useInput("");
    const location = useLocation();
    const [ signUpPage, setSignUpPage ] = useState(1);
    const [ emailClass, setEmailClass ] = useState(null);
    const [ usernameClass, setUsernameClass ] = useState(null)
    const [ error, setError ] = useState(null);

    const switchSignUpPage = () => {
        if(signUpPage === 1) setSignUpPage(2);
        else setSignUpPage(1);
    }
    
    return (
        <div className="logInContainer appCenter">
            <AuthRoute exact path={"/login"}>
                <LogInForm />
            </AuthRoute>

            <AuthRoute exact path={"/login/createAccount"}>
                {signUpPage === 1 ?
                    <SignUpForm onPageSwitch={switchSignUpPage} email={email} password={password} username={username} emailClass={emailClass} usernameClass={usernameClass} error={error}/> :
                    <SignUpFormTwo onPageSwitch={switchSignUpPage} email={email} password={password} username={username} setEmailClass={setEmailClass} setUsernameClass={setUsernameClass} error={error} setError={setError}/>
                }
            </AuthRoute>

            {location.pathname === "/login" ? 
                <Link className="logInSwitch" to={"/login/createAccount"}>Don't have an account? Sign Up</Link> :
                <Link className="logInSwitch" to={"/login"}>Already have an account? Log In</Link>
            }
        </div>
    )
}

export default LogIn;