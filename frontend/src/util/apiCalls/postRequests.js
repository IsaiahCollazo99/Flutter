import axios from 'axios';
import { apiURL } from '../../util/apiURL';

const API = apiURL();

export const createPost = async ( post, currentUser ) => {
    try {
        const { postBody: body, tags, image } = post;
        return await axios.post(API + "/api/posts", {
            poster_id: currentUser.id, 
            body,
            tags, 
            image,
            is_retweet: false,
            created_at: new Date().toString()
        })
    } catch (error) {
        console.log(error)
    }
}

export const likePost = async ( data ) => {
    try {
        return await axios.post(API + "/api/likes", data);
    } catch (error) {
        console.log(error);
    }
}

export const createRepost = async ( post, username, retweeted_id ) => {
    try {
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
    } catch (error) {
        console.log(error);
    }
}

export const createUser = async ( user, email, full_name, username ) => {
    try {
        const userObj = {
            id: user.id,
            email,
            full_name,
            username,
            profile_pic: user.url
        }
        
        await axios.post(API + "/api/users", userObj)
    } catch (error) {
        console.log(error);
    }
}