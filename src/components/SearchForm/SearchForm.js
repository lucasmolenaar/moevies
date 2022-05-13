import React from 'react';
import styles from './SearchForm.module.css';

const SearchForm = ({ query, setQuery, type, setType, fetchMovies, fetchSeries }) => {
    return (
        <form className={styles.form}>
            <input
                className={styles.input}
                type="text"
                placeholder='Type here...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <select
                className={styles.select}
                name='type'
                id='type'
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="movies">Movies</option>
                <option value="series">TV Series</option>
            </select>

            <button
                className={styles.btn}
                onClick={type === 'movies' ? fetchMovies : fetchSeries}
                type='submit'
            >
                Search
            </button>
        </form>
    );
};

export default SearchForm;