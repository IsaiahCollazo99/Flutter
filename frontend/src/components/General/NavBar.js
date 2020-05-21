import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/general/NavBar.css';
import { logOut } from '../../util/firebaseFunctions';
import { AuthContext } from '../../providers/AuthContext';

const NavBar = () => {
    const { currentUser } = useContext(AuthContext);

    const displayButtons = () => {
        if(currentUser) {
            return (
                <>
                    <NavLink exact to={"/profile"}>Profile</NavLink>
                    <button onClick={logOut}>Log Out</button>
                </>
            )
        } else {
            return (
                <>
                    <NavLink exact to={"/login"}>Login</NavLink>
                </>
            )
        }
    }
    return (
        <nav>
            <NavLink exact to={"/"}>Home</NavLink>
            {displayButtons()}
        </nav>
    )
}

export default NavBar;