import React, { useEffect, useState, useContext } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import Post from '../General/Post';
import MakePostForm from './MakePostForm';
import { AuthContext } from '../../providers/AuthContext';
import '../../css/feedPage/FeedPage.css';

const FeedPage = () => {
    const { currentUser, updateUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const API = apiURL();
    
    const getAllPost = async () => {
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
            
            let dbPosts = res.data.posts;

            setTimeout(() => {
                setPosts(dbPosts.map((post) => {
                    return (
                        <Post post={post} onDelete={getAllPost} key={post.id}/>
                    )
                }));
                setLoading(false);
            }, 1000)

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllPost();
    }, [])

    const postRequest = async (post) => {
        const { postBody: body, tags, image } = post;
        await axios.post(API + "/api/posts", {
            poster_id: currentUser.id, 
            body,
            tags, 
            image,
            is_retweet: false,
            created_at: new Date().toString()
        })
       
        getAllPost();
    }

    const uploadPicture = async (post) => {
        let storageRef = firebase.storage().ref('post_pictures/' + post.image.name);
        let upload = storageRef.put(post.image);

        upload.on('state_changed', snapshot => {

        }, error => {
            console.log(error);
            throw error;
        },async  () => {
            let image = await upload.snapshot.ref.getDownloadURL();
            postRequest({body: post.postBody, tags: post.tags, image});
        })
    }

    const makePostSubmit = (postBody, tags, image) => {
        if(image) {
            uploadPicture({postBody, tags, image});
        } else {
            postRequest({postBody, tags, image});
        }
    }

    return (
        <div className="feedPageContainer appCenter">
            <header>Home</header>
            <MakePostForm makePostSubmit={makePostSubmit}/>
            {loading ? <div className="loading">Loading</div> : null}
            {posts}
        </div>
    )
}

export default FeedPage;