import React, { useEffect, useState } from 'react';
import axios from 'axios';

import MovieCard from '../../components/MovieCard/MovieCard';

import styles from './Trending.module.css';

const Trending = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const source = axios.CancelToken.source();


    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`, {
                    cancelToken: source.token,
                });
                setTrendingMovies(data.results);
            } catch (e) {
                console.error(e);
            }
        }

        fetchTrending();

        return () => source.cancel();
    }, []);
    

    return (
        <main>
            <h2 className={styles['page-name']}>Trending</h2>

            <ul className={styles['trending-list']}>
                {
                    trendingMovies &&
                        trendingMovies.map((movie) => {
                            return (
                                <MovieCard 
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title || movie.name}
                                    desc={movie.overview}
                                    poster={movie.poster_path}
                                    release={movie.release_date || movie.first_air_date}
                                    type={movie.media_type}
                                    vote={movie.vote_count}
                                    vote_average={movie.vote_average}
                                />
                                );
                            })
                }
            </ul>
        </main>
    );
}

export default Trending;