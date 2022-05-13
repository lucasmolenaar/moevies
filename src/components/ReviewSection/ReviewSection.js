import React from 'react';
import Review from "../Review/Review";

import styles from './ReviewSection.module.css';

const ReviewSection = ({ reviews }) => {
    return (
        <section className={styles['reviews-section']}>
            <h1>REVIEWS</h1>

            {
                Object.keys(reviews).length > 0 ?
                    reviews.map(({ author, content, created_at, id }) => {
                        return <Review
                            key={id}
                            author={author}
                            content={content}
                            created={created_at}
                        />
                    })
                    :
                    <p>No reviews yet.</p>
            }

            <Review />
        </section>
    );
};

export default ReviewSection;