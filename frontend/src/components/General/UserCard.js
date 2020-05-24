import React from 'react';

const UserCard = ({ user }) => {
    return (
        <div className="userCardContainer">
            <p>{user.full_name}</p>
            <p>{user.username}</p>
        </div>
    )
}

export default UserCard