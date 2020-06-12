import React from 'react';
import '../../css/logInSignUp/SignUpForm.css';

const SignUpForm = ( props ) => {
    const {
        onPageSwitch,
        email,
        password,
        username,
        emailClass,
        usernameClass,
        error
    } = props;
    
    return (
        <>
            <form className="signUpForm" onSubmit={onPageSwitch}>

                <h1 className="signUpHeading">Create your account</h1>

                {error ? <div className="error">{error}</div> : null}
                
                <label htmlFor="email" className="formLabel">Email: </label>
                <input type="email" {...email} name="email" autoComplete="on" className={emailClass} required/>

                <label htmlFor="password" className="formLabel">Password: </label>
                <input type="password" {...password} name="password" autoComplete="on"  required/>

                <label htmlFor="username" className="formLabel">Username: </label>
                <input type="text" {...username} name="username" className={usernameClass} autoComplete="on" required/>

                <input type="submit" value="Next Page"/>
            </form>
        </>
    )
}

export default SignUpForm;