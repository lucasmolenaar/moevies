import React, { useState } from 'react';
import axios from 'axios';
import styles from './Search.module.css';
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieCard from "../../components/MovieCard/MovieCard";

const Search = () => {
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [type, setType] = useState('movies');
    const [mediaType, setMediaType] = useState('');
    const source = axios.CancelToken.source();

    const fetchMoviesByName = async (e) => {
        e.preventDefault();

        try {
            const { data: results } = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.REACT_APP_API_KEY}`, {
                cancelToken: source.token,
            });

            setMediaType('movie');
            setSearchedMovies(results.results);
        } catch (e) {
            console.error(e.response);
        }

        setQuery('');
    }

    const fetchSeriesByName = async (e) => {
        e.preventDefault();

        try {
            const { data: results } = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${process.env.REACT_APP_API_KEY}`, {
                cancelToken: source.token,
            });

            setMediaType('serie');
            setSearchedMovies(results.results);
        } catch (e) {
            console.error(e.response);
        }

        setQuery('');
    }

    return (
        <div>
            <h2 className={styles['page-name']}>Search</h2>

            <SearchForm
                query={query}
                setQuery={setQuery}
                type={type}
                setType={setType}
                fetchMovies={fetchMoviesByName}
                fetchSeries={fetchSeriesByName}
            />

            {
                Object.keys(searchedMovies).length > 1 ?
                    <ul className={styles['movie-list']}>
                        {
                            searchedMovies &&
                            searchedMovies.map((movie) => {
                                return (
                                    <MovieCard
                                        key={movie.id}
                                        id={movie.id}
                                        title={movie.title || movie.name}
                                        desc={movie.overview}
                                        poster={movie.poster_path}
                                        release={movie.release_date || movie.first_air_date}
                                        type={mediaType}
                                        vote={movie.vote_count}
                                    />
                                );
                            })
                        }
                    </ul>
                    :
                    <h4 className={styles['no-results']}>No results</h4>
            }


        </div>  
    );
}

export default Search;