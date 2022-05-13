import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MovieCard from '../../components/MovieCard/MovieCard';
import PageNavigation from "../../components/PageNavigation/PageNavigation";

import styles from './Movies.module.css';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const source = axios.CancelToken.source();

    const fetchMovies = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=${process.env.REACT_APP_API_KEY}`, {
                cancelToken: source.token,
            })
            setMovies(data.results);
        } catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        fetchMovies();
        return () => source.cancel();
    }, [page])
    

    return (
        <main>
            <h2 className={styles['page-name']}>Movies</h2>

            <PageNavigation page={page} setPage={setPage}/>

            <ul className={styles['movies-list']}>
                {
                    movies &&
                        movies.map((movie) => {
                            return (
                                <MovieCard
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title || movie.name}
                                    desc={movie.overview}
                                    poster={movie.poster_path}
                                    release={movie.release_date || movie.first_air_date}
                                    type={'movie'}
                                    vote={movie.vote_count}
                                />
                                );
                            })
                }
            </ul>
        </main>
    );
}

export default Movies;