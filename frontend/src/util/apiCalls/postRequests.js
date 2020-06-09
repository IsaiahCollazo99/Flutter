import axios from 'axios';
import { apiURL } from '../../util/apiURL';

const API = apiURL();

export const createPost = async ( post, currentUser ) => {
    const { postBody: body, tags, image } = post;
    return await axios.post(API + "/api/posts", {
        poster_id: currentUser.id, 
        body,
        tags, 
        image,
        is_retweet: false,
        created_at: new Date().toString()
    })
}

export const likePost = async ( data ) => {
   return await axios.post(API + "/api/likes", data);
}

export const createRepost = async ( post, username, retweeted_id ) => {
    const { poster_id, body, tags, image } = post;

    const repostObj = {
        poster_id,
        body,
        tags,
        created_at: new Date().toString(),
        is_retweet: true,
        retweeter_user: username,
        retweeted_id,
        image
    }
    
   return await axios.post(API + "/api/posts", repostObj);
}