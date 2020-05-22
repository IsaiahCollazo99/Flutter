import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { userName } = useParams();
    return (
        <p>{userName}</p>
    )
}

export default Profile;