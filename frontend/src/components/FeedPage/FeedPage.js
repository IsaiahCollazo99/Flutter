import React, { useEffect, useState, useContext } from 'react';
import MakePostForm from './MakePostForm';
import Post from '../../components/General/Post';
import { uploadPicture } from '../../util/firebaseFunctions';
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

    const makePostSubmit = async (postBody, tags, image) => {
        if(image) {
            uploadPicture('post_pictures/', {postBody, tags, image}, createPost, currentUser);
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