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