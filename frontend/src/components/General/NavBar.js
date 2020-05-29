import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../../css/general/NavBar.css';
import { logOut } from '../../util/firebaseFunctions';
import { AuthContext } from '../../providers/AuthContext';

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
                </>
            )
        }
    }
    return (
        <nav>
            <NavLink exact to={"/"}>Home</NavLink>
            <NavLink className="searchLink" to={"/search"}>Search</NavLink>
            {displayButtons()}
        </nav>
    )
}

export default NavBar;