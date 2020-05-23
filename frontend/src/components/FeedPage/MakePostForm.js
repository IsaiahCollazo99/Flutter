import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import '../../css/feedPage/MakePostForm.css';

const MakePostForm = ({ makePostSubmit }) => {
    const { currentUser } = useContext(AuthContext);
    
    const [ wordCount, setWordCount ] = useState(280);
    const [ wordCountStyle, setWordCountStyle ] = useState({ color: "Green" });
    const [ postBody, setPostBody ] = useState("");
    const [ tagFound, setTagFound ] = useState(false);
    const [ tags, setTags ] = useState([]);
    const [ currTag, setCurrTag ] = useState("");

    useEffect(() => {
        if(wordCount < 0) {
            setWordCountStyle({ color: "Red" });
        } else if(wordCount < 21) {
            setWordCountStyle({ color: "Yellow" });
        } else {
            setWordCountStyle({ color: "Green" });
        }
    }, [wordCount])

    const onSubmit = (e) => {
        e.preventDefault();

        if(wordCount >= 0 && wordCount < 280) {
            makePostSubmit(postBody, tags);
            setWordCount(280);
            setPostBody("");
        }
    }

    const onTextAreaType = (e) => {
        let post = e.target.value
        let lastChar = post[post.length - 1]

        if(tagFound) {
            if(lastChar === " ") {
                setTagFound(false);
                setTags([...tags, currTag]);
                setCurrTag("");
            } else {
                setCurrTag(currTag + lastChar);
            }
        }
        
        if(lastChar === "#") {
            setTagFound(true);
        }

        if(post.length < postBody.length) {
            setWordCount(wordCount + (postBody.length - post.length));
        } else if (post.length > postBody.length) {
            setWordCount(wordCount - (post.length - postBody.length));
        }
        setPostBody(post);
    }


    const postTextArea = {
        value: postBody,
        onChange: onTextAreaType,
        placeholder: "Hows life?",
        cols: 50,
        rows: 5,
        form: "makePost"
    }

    const displayForm = () => {
        if(currentUser) {
            return (
                <form onSubmit={onSubmit} className="makePostForm" id="makePost">
                    <textarea {...postTextArea} className="postFormBody" />
                    <div className="formBottom">
                        <p style={ wordCountStyle } className="wordCount">{wordCount}</p>
                        <input type="submit" value="Post" className="postFormSubmit"/>
                    </div>
                </form>
            )
        } else {
            return null;
        }
    }

    return (
        <>
            {displayForm()}
        </>
    )
}

export default MakePostForm;