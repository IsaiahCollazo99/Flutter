import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthContext';

const MakePostForm = ({ makePostSubmit }) => {
    const { currentUser } = useContext(AuthContext);
    
    const [ wordCount, setWordCount ] = useState(280);
    const [ wordCountStyle, setWordCountStyle ] = useState({ color: "Green" });
    const [ postBody, setPostBody ] = useState("");

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
        if(wordCount >= 0) {
            makePostSubmit(postBody);
        }
    }

    const onTextAreaType = (e) => {
        if(e.target.value.length < postBody.length) {
            setWordCount(wordCount + 1);
        } else if (e.target.value.length > postBody.length) {
            setWordCount(wordCount - 1);
        }
        setPostBody(e.target.value);
    }


    const postTextArea = {
        value: postBody,
        onChange: onTextAreaType,
        placeholder: "Hows life?",
        resize: "none",
        cols: 70,
        rows: 5,
        form: "makePost"
    }

    const displayForm = () => {
        if(currentUser) {
            return (
                <form onSubmit={onSubmit} className="makePostForm" id="makePost">
                    <textarea {...postTextArea} />
                    <p style={ wordCountStyle }>{wordCount}</p>
                    <input type="submit" value="Post" />
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