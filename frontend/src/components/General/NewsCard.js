import React from 'react';
import '../../css/general/NewsCard.css';

const NewsCard = ({ article }) => {
    return (
        <div className="newsCardContainer">
            <a href={article.url} target="_blank">
                {article.name}
                {article.image ? <img src={article.image.thumbnail.contentUrl} alt="article thumbnail"/> : null}
            </a>
        </div>
    )
}

export default NewsCard;