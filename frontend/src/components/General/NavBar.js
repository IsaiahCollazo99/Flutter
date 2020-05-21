import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/general/NavBar.css';
import { logOut } from '../../util/firebaseFunctions';

const NavBar = () => {
    return (
        <nav>
            <NavLink exact to={"/"}>Home</NavLink>
            <NavLink exact to={"/profile"}>Profile</NavLink>
            <NavLink exact to={"/login"}>Login</NavLink>
            <button onClick={logOut}>Log Out</button>
        </nav>
    )
}

export default NavBar;