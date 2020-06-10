import axios from 'axios';
import { apiURL } from '../../util/apiURL';
const API = apiURL();

export const getAllPosts = async (currentUser, updateUser) => {
    try {
        if(currentUser) {
            if(currentUser.id && !currentUser.username) {
                while(!currentUser.username) {
                    updateUser(currentUser);
                }
            }
        }
        
        let res = await axios({
            method: "GET",
            url: API + "/api/posts"
        });
        
        return res.data.posts;

    } catch(error) {
        console.log(error);
    }
}

export const getPostLikers = async (postId) => {
    try {
        let res = await axios.get(API + "/api/posts/" + postId + "/likes");
    
        let likersObj = {};
        
        res.data.likers.forEach(liker => {
            if(!likersObj[liker.liker_id]) {
                likersObj[liker.liker_id] = liker.liker_id;
            }
        })

        return likersObj;
    } catch (error) {
        console.log(error)
    }
}

export const getPostById = async ( id ) => {
    try {
        let res = await axios.get(API + "/api/posts/" + id);
    
        return res.data.post;

    } catch(error) {
        console.log(error);
    }
}

export const getUser = async ( id ) => {
    try {
        let res = await axios.get(API + "/api/users/" + id);

        return res.data.user;
    } catch (error) {
        console.log(error);
    }
}

export const usernameCheck = async ( username ) => {
    try {
        await axios.get(API + "/api/users/username/" + username);
    } catch (error) {
        throw error;
    }
}