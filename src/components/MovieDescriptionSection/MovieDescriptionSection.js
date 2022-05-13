import React, {useContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import GradeIcon from "@mui/icons-material/Grade";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { db } from '../../firebase';
import { collection, doc, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

import styles from './MovieDescriptionSection.module.css';

const MovieDescriptionSection = ({ movieData }) => {
    const [inWatchlist, toggleInWatchlist] = useState(false);
    const moviesCollectionRef = collection(db, 'Movies');
    const { user } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {checkIfInWatchlist()}, [])

    const checkIfInWatchlist = async () => {
        try {
            //Fetch all movies from collection /Movies (firestore)
            const data = await getDocs(moviesCollectionRef);
            let fetchedMovies = [];

            //Push movies in empty array (fetchedMovies)
            data.docs.forEach((doc) => {
                fetchedMovies.push({ ...doc.data(), id: doc.id })
            })

            //Filter movies on UID and make new array (userFilteredMovies)
            const userFilteredMovies = fetchedMovies.filter((movie) => {
                return movie.uid === user.uid;
            })

            //Check if specific movie is already in watchlist
            const alreadyInDb = userFilteredMovies.find((movie) => {
                return movie.tmdb_id === movieData.id;
            })

            if (alreadyInDb) {
                toggleInWatchlist(true);
            }

        } catch (e) {
            console.log(e.message);
        }
    }

    const addToWatchlist = async () => {
        try {
            const data = await getDocs(moviesCollectionRef);
            let fetchedMovies = [];

            data.docs.forEach((doc) => {
                fetchedMovies.push({ ...doc.data(), id: doc.id })
            })

            const userFilteredMovies = fetchedMovies.filter((movie) => {
                return movie.uid === user.uid;
            })

            const alreadyInDb = userFilteredMovies.find((movie) => {
                return movie.tmdb_id === movieData.id;
            })

            if (alreadyInDb) {
                toast.error('Already added to watchlist')
            } else {
                await addDoc(moviesCollectionRef, {
                    tmdb_id: movieData.id,
                    img_path: `https://image.tmdb.org/t/p/w300${movieData.poster_path}`,
                    release_date: movieData.release_date,
                    title: movieData.title,
                    vote: movieData.vote_count,
                    vote_average: movieData.vote_average,
                    uid: user.uid,
                })

                toggleInWatchlist(true);
                toast.success('Movie added to watchlist')
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    const deleteFromWatchlist = async () => {
        try {
            const data = await getDocs(moviesCollectionRef);
            let fetchedMovies = [];

            data.docs.forEach((doc) => {
                fetchedMovies.push({ ...doc.data(), id: doc.id })
            })

            const userFilteredMovies = fetchedMovies.filter((movie) => {
                return movie.uid === user.uid;
            })

            const movieToDelete = userFilteredMovies.find((movie) => {
                return movie.tmdb_id === movieData.id;
            })

            const movieDoc = doc(db, "/Movies", movieToDelete.id);
            await deleteDoc(movieDoc);

            toggleInWatchlist(false);
            toast.success('Movie deleted from watchlist');
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <section className={styles.container}>
            <img className={styles.poster} src={`https://image.tmdb.org/t/p/w300${movieData.poster_path}`} alt=""/>

            <div className={styles['info-container']}>
                <h1 className={styles['movie-title']}>{movieData.title}</h1>

                <h3 className={styles.tagline}>{movieData.tagline}</h3>

                <p className={styles.genres}> | &nbsp;
                    {movieData.genres.map((genre) => {
                        return `${genre.name} | `;
                    })}
                </p>

                <p className={styles.overview}>{movieData.overview}</p>

                <div className={styles.rating}>
                    <GradeIcon fontSize={'small'}/>
                    <span>Average vote out of {movieData.vote_count} votes: {movieData.vote_average}</span>
                    &nbsp;
                    <GradeIcon fontSize={'small'}/>
                </div>

                <Button
                    className={styles['add-to-watchlist']}
                    variant='contained'
                    endIcon={inWatchlist ? <DeleteIcon /> : <VisibilityIcon />}
                    onClick={inWatchlist ? deleteFromWatchlist : addToWatchlist}
                    sx={{
                        mt: 4,
                        bgcolor: inWatchlist ? '#C95D3B' : '#EEBC1E',
                        transition: 'all 450ms',
                        '&:hover': {
                            bgcolor: inWatchlist ? '#C95D3B' : '#EEBC1E',

                        }
                    }}
                >
                    {inWatchlist ? `Delete from watchlist` : `Add to watchlist`}
                </Button>
            </div>
        </section>
    );
};

export default MovieDescriptionSection;