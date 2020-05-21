import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/general/NavBar.css';

const NavBar = () => {
    return (
        <nav>
            <NavLink exact to={"/"}>Home</NavLink>
            <NavLink exact to={"/profile"}>Profile</NavLink>
            <NavLink exact to={"/login"}>Login</NavLink>
            <NavLink exact to={"/signup"}>Sign Up</NavLink>
        </nav>
    )
}

export default NavBar;