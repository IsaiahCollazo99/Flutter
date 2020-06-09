import axios from 'axios';
import { apiURL } from '../../util/apiURL';

const API = apiURL();

export const createPost = async (post, currentUser) => {
    const { postBody: body, tags, image } = post;
    await axios.post(API + "/api/posts", {
        poster_id: currentUser.id, 
        body,
        tags, 
        image,
        is_retweet: false,
        created_at: new Date().toString()
    })
}