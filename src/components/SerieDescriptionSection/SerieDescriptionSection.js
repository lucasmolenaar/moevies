import React, {useContext, useEffect, useState} from 'react';
import GradeIcon from "@mui/icons-material/Grade";

import styles from './DescriptionSection.module.css';
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import {addDoc, collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";

const SerieDescriptionSection = ({ serieData }) => {
    const [inWatchlist, toggleInWatchlist] = useState(false);
    const seriesCollectionRef = collection(db, 'Series');
    const { user } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {checkIfInWatchlist()}, [])

    const checkIfInWatchlist = async () => {
        try {
            //Fetch all movies from collection /Movies (firestore)
            const data = await getDocs(seriesCollectionRef);
            let fetchedSeries = [];

            //Push movies in empty array (fetchedMovies)
            data.docs.forEach((doc) => {
                fetchedSeries.push({ ...doc.data(), id: doc.id })
            })

            //Filter movies on UID and make new array (userFilteredMovies)
            const userFilteredSeries = fetchedSeries.filter((serie) => {
                return serie.uid === user.uid;
            })

            //Check if specific movie is already in watchlist
            const alreadyInDb = userFilteredSeries.find((serie) => {
                return serie.tmdb_id === serieData.id;
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
            const data = await getDocs(seriesCollectionRef);
            let fetchedSeries = [];

            data.docs.forEach((doc) => {
                fetchedSeries.push({ ...doc.data(), id: doc.id })
            })

            const userFilteredSeries = fetchedSeries.filter((serie) => {
                return serie.uid === user.uid;
            })

            const alreadyInDb = userFilteredSeries.find((serie) => {
                return serie.tmdb_id === serieData.id;
            })

            if (alreadyInDb) {
                toast.error('Already added to watchlist')
            } else {
                await addDoc(seriesCollectionRef, {
                    tmdb_id: serieData.id,
                    img_path: `https://image.tmdb.org/t/p/w300${serieData.poster_path}`,
                    release_date: serieData.first_air_date,
                    title: serieData.name,
                    vote: serieData.vote_count,
                    vote_average: serieData.vote_average,
                    uid: user.uid,
                })

                toggleInWatchlist(true);
                toast.success('Successfully added to watchlist')
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    const deleteFromWatchlist = async () => {
        try {
            const data = await getDocs(seriesCollectionRef);
            let fetchedSeries = [];

            data.docs.forEach((doc) => {
                fetchedSeries.push({ ...doc.data(), id: doc.id })
            })

            const userFilteredSeries = fetchedSeries.filter((serie) => {
                return serie.uid === user.uid;
            })

            const serieToDelete = userFilteredSeries.find((serie) => {
                return serie.tmdb_id === serieData.id;
            })

            const serieDoc = doc(db, "/Series", serieToDelete.id);
            await deleteDoc(serieDoc);

            toggleInWatchlist(false);
            toast.success('Movie deleted from watchlist');
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <section className={styles.container}>
            <img className={styles.poster} src={`https://image.tmdb.org/t/p/w300${serieData.poster_path}`} alt=""/>

            <div className={styles['info-container']}>
                <h1 className={styles['movie-title']}>{serieData.name}</h1>

                <h3 className={styles.tagline}>{serieData.tagline}</h3>
                <small>{serieData.first_air_date} - {serieData.last_air_date}</small>

                <p>Seasons: {serieData.number_of_seasons}, Episodes: {serieData.number_of_episodes}</p>

                <p className={styles.genres}> | &nbsp;
                    {serieData.genres.map((genre) => {
                        return `${genre.name} | `;
                    })}
                </p>

                <p className={styles.overview}>{serieData.overview}</p>

                <div className={styles.rating}>
                    <GradeIcon fontSize={'small'}/>
                    <span>Average vote out of {serieData.vote_count} votes: {serieData.vote_average}</span>
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

export default SerieDescriptionSection;