import React, { useEffect, useState, useContext } from 'react';
import firebase from 'firebase';
import MakePostForm from './MakePostForm';
import Post from '../../components/General/Post';
import { AuthContext } from '../../providers/AuthContext';
import { getAllPosts } from '../../util/apiCalls/getRequests';
import { createPost } from '../../util/apiCalls/postRequests';
import '../../css/feedPage/FeedPage.css';

const FeedPage = () => {
    const { currentUser, updateUser } = useContext(AuthContext);
    const [ posts, setPosts ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const getPostsCall = () => {
        getAllPosts(currentUser, updateUser).then(posts => {
            setTimeout(() => {
                setPosts(posts.map(post => {
                    return (
                        <Post post={post} onDelete={getPostsCall} key={post.id}/>
                    )
                }));
                setLoading(false);
            }, 1000)
        });
    }

    useEffect(() => {
        getPostsCall();
    }, [])

    const uploadPicture = async (post) => {
        let storageRef = firebase.storage().ref('post_pictures/' + post.image.name);
        let upload = storageRef.put(post.image);

        upload.on('state_changed', snapshot => {
        }, error => {
            console.log(error);
            throw error;
        },async  () => {
            let image = await upload.snapshot.ref.getDownloadURL();
            await createPost({postBody: post.postBody, tags: post.tags, image}, currentUser);
        })
    }

    const makePostSubmit = async (postBody, tags, image) => {
        if(image) {
            await uploadPicture({postBody, tags, image});
        } else {
            await createPost({postBody, tags, image}, currentUser);
        }
        getPostsCall();
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