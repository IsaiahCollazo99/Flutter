import React from 'react';
import '../../css/general/NewsCard.css';

const NewsCard = ({ article }) => {
    return (
        <div className="newsCardContainer">
            <a href={article.url} target="_blank">
                {article.title}
                {article.urlToImage ? <img src={article.urlToImage} alt="article thumbnail"/> : null}
            </a>
        </div>
    )
}

export default NewsCard;