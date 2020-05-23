import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/general/NavBar.css';
import { logOut } from '../../util/firebaseFunctions';
import { AuthContext } from '../../providers/AuthContext';
import { apiURL } from '../../util/apiURL';

const NavBar = () => {
    const { currentUser } = useContext(AuthContext);
    const API = apiURL();
    const [ currentUsername, setCurrentUsername ] = useState("");

    const getUsername = async () => {
        let res = await axios.get(API + "/api/users/" + currentUser.id);
        setCurrentUsername(res.data.user.username);
    }

    useEffect(() => {
        getUsername();
    }, [])

    const displayButtons = () => {
        if(currentUser) {
            return (
                <>
                    <NavLink exact to={`/${currentUsername}`}>Profile</NavLink>
                    <Link onClick={logOut}>Log Out</Link>
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