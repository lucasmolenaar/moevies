import React from 'react';
import {noPicture} from "../../config/config";
import styles from './CastSection.module.css';

const CastSection = ({ cast }) => {
    return (
        <section className={styles['cast-section']}>
            <h1>CAST</h1>

            <div className={styles['cast-row']}>
                {
                    cast.map(({ id, profile_path, name, character }) => {
                        return (
                            <div className={styles['actor-card']} key={id}>
                                <img
                                    className={styles['profile-picture']}
                                    src={profile_path ? `https://image.tmdb.org/t/p/w200/${profile_path}` : noPicture}
                                    alt="profile"/>

                                <div className={styles['actor-names']}>
                                    <h3 className={styles['original-name']}>{name}</h3>
                                    <h5 className={styles['character-name']}>as {character}</h5>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
};

export default CastSection;