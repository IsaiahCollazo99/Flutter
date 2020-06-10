import axios from 'axios';
import { apiURL } from '../../util/apiURL';

const API = apiURL();

export const deletePost = async ( postId ) => {
    try {
        return await axios.delete(API + '/api/posts/' + postId);
    } catch (error) {
        console.log(error);
    }
}

export const deleteLike = async ( userId, postId ) => {
    try {
        return await axios.delete(API + `/api/likes?liker_id=${userId}&post_id=${postId}`)
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async ( userId, data ) => {
    try {
        let res = await axios.patch(API + "/api/users/" + userId, data);
        return res.data.user;
    } catch (error) {
        console.log(error);
    }
}