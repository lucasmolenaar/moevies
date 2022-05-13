import React from 'react';
import styles from './SimilarSection.module.css';
import { unavailable } from "../../config/config";
import { useHistory } from "react-router-dom";

const SimilarSection = ( { similarItems, type } ) => {
    const history = useHistory();

    const pushToPage = (id) => {
        window.scrollTo({top: 0, behavior: 'smooth'});

        if (type === 'MOVIES') {
            history.push(`/movies/${id}`);
        } else {
            history.push(`/series/${id}`)
        }

    }

    return (
        <section className={styles['similar-section']}>
            <h1>SIMILAR {type}</h1>

            <div className={styles['poster-row']}>
                {
                    similarItems.map(({ poster_path, id }) => {
                        return (
                            <img
                                key={id}
                                onClick={() => pushToPage(id)}
                                className={styles['similar-poster']}
                                src={poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}`: unavailable}
                                alt="tvshow"
                            />
                        );
                    })
                }
            </div>
        </section>
    );
};

export default SimilarSection;