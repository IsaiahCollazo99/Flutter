import React from 'react';

const UserCard = ({ user }) => {
    return (
        <div className="userCardContainer">
            {user.full_name}
            {user.username}
        </div>
    )
}

export default UserCard