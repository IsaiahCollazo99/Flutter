import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage as imageUpload } from '@fortawesome/free-solid-svg-icons';
import '../../css/feedPage/MakePostForm.css';

const MakePostForm = ({ makePostSubmit }) => {
    const { currentUser } = useContext(AuthContext);
    
    const [ wordCount, setWordCount ] = useState(280);
    const [ wordCountStyle, setWordCountStyle ] = useState({ color: "Green" });
    const [ postBody, setPostBody ] = useState("");
    const [ image, setImage ] = useState(null);

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

        // Only allow a post to be sent if it's between 0 and 280 characters
        if((wordCount >= 0 && wordCount < 280) || image) {
            let allTags = [];
            let currentTag = "";
            let tagFound = false;

            for(let i = 0; i < postBody.length; i++) {
                let char = postBody[i];
                if(char === "#") {
                    tagFound = true;
                }

                if(tagFound) {
                    currentTag += char;
                }

                if(tagFound && (char === " " || i === postBody.length - 1)) { 
                    allTags.push(currentTag);
                    currentTag = "";
                }
            }

            makePostSubmit(postBody, allTags, image); // Sending back to parent to send POST req

            // Resetting states
            setWordCount(280); 
            setPostBody("");
            setImage(null);
        }
    }

    const onTextAreaType = (e) => {
        // Assigning helper variables
        let post = e.target.value

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

    const fileChange = (e) => {
        setImage(e.target.files[0]);
    }

    const displayForm = () => {
        if(currentUser) {
            return (
                <form onSubmit={onSubmit} className="makePostForm" id="makePost">
                    <textarea {...postTextArea} className="postFormBody" />
                    {image ? <p className="fileName">File Name: <span>{image.name}</span></p> : null}
                    <div className="formBottom">
                        <div>
                            <p style={ wordCountStyle } className="wordCount">{wordCount}</p>
                            <div className="imageUploadContainer">
                                <input type="file" id="file" accept=".png, .jpg, .jpeg" name="file" onChange={fileChange}/>
                                <label htmlFor="file">
                                    <FontAwesomeIcon icon={imageUpload} className="imageUpload"/>
                                </label>
                            </div>
                        </div>
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