import axios from 'axios';
import { apiURL } from '../../util/apiURL';
const API = apiURL();

export const deletePost = async ( postId ) => {
    return await axios.delete(API + '/api/posts/' + postId);
}

export const deleteLike = async (userId, postId) => {
    return await axios.delete(API + `/api/likes?liker_id=${userId}&post_id=${postId}`)
}