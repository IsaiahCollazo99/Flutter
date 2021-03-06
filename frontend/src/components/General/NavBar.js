import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { logOut, logIn } from '../../util/firebaseFunctions';
import { AuthContext } from '../../providers/AuthContext';
import logo from '../../assets/images/logo.png';
import logoButterfly from '../../assets/images/logo_butterfly.png';
import '../../css/general/NavBar.css';

const NavBar = () => {
    const { currentUser } = useContext(AuthContext);

    const displayButtons = () => {
        if(currentUser) {
            return (
                <>
                    <NavLink exact to={`/${currentUser.username}`}>Profile</NavLink>
                    <Link to={"/"} onClick={logOut}>Log Out</Link>
                </>
            )
        } else {
            return (
                <>
                    <NavLink to={"/login"}>Login</NavLink>
                    <button className="demoLogin" onClick={demoLogin}>Demo Login</button>
                </>
            )
        }
    }

    const demoLogin = async () => {
        if(window.location.pathname === "localhost:3000") {
            await logIn('test@test.com', 'testtest');
        } else {
            await logIn('demologin@test.com', 'demologin');
        }
    }
    return (
        <div className="navContainer">
            <header>
                <Link to="/">
                    <img src={logo} alt="Flutter" className="full"/>
                    <img src={logoButterfly} alt="Flutter" className="butterfly" />
                </Link>
            </header>
            <nav>
                <NavLink exact to={"/"}>Home</NavLink>
                <NavLink className="searchLink" to={"/search"}>Search</NavLink>
                {displayButtons()}
            </nav>
        </div>
    )
}

export default NavBar;