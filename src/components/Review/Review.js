import React, { useState } from 'react';
import substring from "../../helpers/substring";
import styles from './Review.module.css';

const Review = ({ author, content, created }) => {
    const [readMore, toggleReadMore] = useState(false);

    return (
        <div className={styles.review}>
            <h3 className={styles.author}>{author}</h3>
            <small className={styles.date}>{created}</small>

            {
                readMore ?
                <p className={styles.content}>
                    {content} <br/><br/>
                    <span onClick={() => toggleReadMore(!readMore)} className={styles['read-more']}>Read less</span>
                </p>
                :
                <p className={styles.content}>
                    {substring(content)} <br/><br/>
                    <span onClick={() => toggleReadMore(!readMore)} className={styles['read-more']}>Read more</span>
                </p>
            }
        </div>
    );
};

export default Review;