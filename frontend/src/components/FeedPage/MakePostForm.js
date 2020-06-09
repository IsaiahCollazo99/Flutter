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

    const findTags = () => {
        let tags = [];
        let currentTag = "";
        let tagFound = false;

        for(let i = 0; i < postBody.length; i++) {
            let char = postBody[i];

            if(tagFound) {
                currentTag += char;
            }

            if(tagFound && (char === " " || i === postBody.length - 1)) { 
                tags.push(currentTag);
                currentTag = "";
            }

            if(char === "#") {
                tagFound = true;
            }
        }

        return tags;
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if((wordCount >= 0 && wordCount < 280) || image) {
            let tags = findTags();

            await makePostSubmit(postBody, tags, image);

            // Resetting states
            setWordCount(280); 
            setPostBody("");
            setImage(null);
        }
    }

    const onTextAreaType = (e) => {
        let post = e.target.value
        let deletedLength = postBody.length - post.length;
        let addedLength = post.length - postBody.length;

        if(post.length < postBody.length) {
            setWordCount(wordCount + deletedLength);

        } else if (post.length > postBody.length) {
            setWordCount(wordCount - addedLength);
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