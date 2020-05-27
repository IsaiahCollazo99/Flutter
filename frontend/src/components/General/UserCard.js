import React from 'react';
import { Link } from 'react-router-dom';
import blankProfile from '../../assets/images/blankProfile.png';
import '../../css/general/UserCard.css';

const UserCard = ({ user }) => {
    let profilePic = user.profile_pic ? user.profile_pic : blankProfile;
    return (
        <div className="userCardContainer">
            <div className="userCardLeft">
                <img src={profilePic} alt={user.name} />
            </div>

            <div className="userCardRight">
                <Link to={"/" + user.username} className="userCardName">{user.full_name}</Link>
                <p className="userCardUsername">@{user.username}</p>
            </div>

        </div>
    )
}

export default UserCard