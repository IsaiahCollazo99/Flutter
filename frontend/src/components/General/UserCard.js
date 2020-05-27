import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/general/UserCard.css';

const UserCard = ({ user }) => {
    return (
        <div className="userCardContainer">
            <Link to={"/" + user.username} className="userCardName">{user.full_name}</Link>
            <p className="userCardUsername">@{user.username}</p>
        </div>
    )
}

export default UserCard