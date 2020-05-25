import React, { useContext } from 'react';
import SearchBar from './SearchBar';
import '../../css/general/Discover.css';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthContext';
import LogInForm from '../Login/LogInForm';

const Discover = ({ handleSearch }) => {
    const location = useLocation();
    let { currentUser } = useContext(AuthContext);

    const displaySearch = () => {
        if(!location.pathname.includes("search")) {
            return (
                <SearchBar handleSearch={handleSearch}/>
            )
        }
    }

    // const displayLogIn = () => {
    //     if(location.pathname !== "/login/createAccount" || currentUser) {
    //         return (
    //             <LogInForm />
    //         )
    //     }
    // }
    
    return (
        <div className="discover">
            {displaySearch()}
            {/* {displayLogIn()} */}
        </div>
    )
}

export default Discover;