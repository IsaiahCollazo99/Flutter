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

    useEffect(() => {
        setTagFound(false);
        setCurrTag(""); 
    }, [tags])

    const onSubmit = (e) => {
        e.preventDefault();

        // Only allow a post to be sent if it's between 0 and 280 characters
        if(wordCount >= 0 && wordCount < 280) {
            let allTags = [...tags];

            if(tagFound) {
                allTags.push(currTag);
            }
            makePostSubmit(postBody, allTags); // Sending back to parent to send POST req

            // Resetting states
            setWordCount(280); 
            setPostBody("");
            setTags([]);
        }
    }

    const onTextAreaType = (e) => {
        // Assigning helper variables
        let post = e.target.value
        let lastChar = post[post.length - 1]

        // If currently typing a tag
        if(tagFound) {
            // If the last character is a space then the tag is done
            if(lastChar === " ") {
                setTags([...tags, currTag]); // Add the tag to the tags arr
            } else {
                // Check if the last character was deleted
                if(post.length < postBody.length) {
                    // Remove the last character of the currTag
                    setCurrTag(currTag.slice(0, currTag[currTag.length -1]))
                } else {
                    // Add the last character to the current Tag
                    setCurrTag(currTag + lastChar);
                }

            }
        }
        
        // Check if the last character was a #
        if(lastChar === "#") {
            // Set tagFound to true, and start creating the current tag
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