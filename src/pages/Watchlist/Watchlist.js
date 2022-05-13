import React, {useContext, useEffect, useState} from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { AuthContext } from "../../context/AuthContext";

import MovieCard from "../../components/MovieCard/MovieCard";

import styles from './Watchlist.module.css';

const Watchlist = () => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);

    const moviesCollectionRef = collection(db, 'Movies');
    const seriesCollectionRef = collection(db, 'Series');

    const { user } = useContext(AuthContext);

    const getMovies = async () => {
        try {
            const data = await getDocs(moviesCollectionRef);
            let fetchedMovies = [];

            data.docs.forEach((doc) => {
                fetchedMovies.push({ ...doc.data(), id: doc.id })
            })

            const userFilteredMovies = fetchedMovies.filter((movie) => {
                return movie.uid === user.uid;
            })

            setMovies(userFilteredMovies);
        } catch (e) {
            console.log('Caught error!: ', e.message);
        }

    }

    const getSeries = async () => {
        try {
            const data = await getDocs(seriesCollectionRef);
            let fetchedSeries = [];

            data.docs.forEach((doc) => {
                fetchedSeries.push({ ...doc.data(), id: doc.id })
            })

            const userFilteredSeries = fetchedSeries.filter((movie) => {
                return movie.uid === user.uid;
            })

            setSeries(userFilteredSeries);
        } catch (e) {
            console.log('Caught error!: ', e.message);
        }

    }

    useEffect(() => {
        getMovies();
        getSeries();
    }, [])

    return (
        <div>
            <h2 className={styles['page-name']}>Watchlist</h2>

            <section>
                <h3 className={styles['movies-section-title']}>Movies</h3>

                {
                    Object.keys(movies).length > 0 ?
                        <ul className={styles.watchlist}>
                            {
                                movies.map((movie) => {
                                    return (
                                        <MovieCard
                                            key={movie.tmdb_id}
                                            id={movie.tmdb_id}
                                            title={movie.title || movie.name}
                                            desc={movie.overview}
                                            poster={movie.img_path}
                                            release={movie.release_date || movie.first_air_date}
                                            type='movie'
                                            vote={movie.vote_count}
                                            vote_average={movie.vote_average}
                                        />
                                    );
                                })
                            }
                        </ul>
                        :
                        <p className={styles['no-results']}>No movies added to your watchlist yet. Find movies and add them.</p>
                }
            </section>

            <section className={styles['series-section']}>
                <h3 className={styles['series-section-title']}>TV Series</h3>

                {
                    Object.keys(series).length > 0 ?
                        <ul className={styles.watchlist}>
                            {
                                series.map((serie) => {
                                    return (
                                        <MovieCard
                                            key={serie.tmdb_id}
                                            id={serie.tmdb_id}
                                            title={serie.title || serie.name}
                                            desc={serie.overview}
                                            poster={serie.img_path}
                                            release={serie.release_date || serie.first_air_date}
                                            type='serie'
                                            vote={serie.vote_count}
                                            vote_average={serie.vote_average}
                                        />
                                    );
                                })
                            }
                        </ul>
                        :
                        <p className={styles['no-results']}>No series added to your watchlist yet. Find series and add them.</p>
                }
            </section>
        </div>
    );
};

export default Watchlist;