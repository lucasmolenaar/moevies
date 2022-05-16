import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import SimilarSection from "../../components/SimilarSection/SimilarSection";
import ReviewSection from "../../components/ReviewSection/ReviewSection";
import MovieDescriptionSection from "../../components/MovieDescriptionSection/MovieDescriptionSection";
import CastSection from "../../components/CastSection/CastSection";

const MovieDescription = () => {
    const [movieData, setMovieData] = useState({});
    const [trailerLink, setTrailerLink] = useState('');
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [reviews, setReviews] = useState([]);

    console.log(trailerLink);

    const { movieId } = useParams();
    const source = axios.CancelToken.source();

    const fetchMovieData = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`, {
                cancelToken: source.token,
            });
            setMovieData(data);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchTrailer = async () => {
        try {
            const { data: { results }} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
            const trailerLink = results.find((video) => {
                return video.type === 'Trailer';
            })
            setTrailerLink(`https://www.youtube.com/watch?v=${trailerLink.key}`);
            console.log('trailer fetch:', results);
        } catch (e) {
            console.error(e.response);
        }
    }

    const fetchCast = async () => {
        try {
            const { data: { cast }} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`, {
                cancelToken: source.token,
            })
            setCast(cast);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchSimilarMovies = async () => {
        try {
            const { data: { results } } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}`, {
                cancelToken: source.token,
            })
            setSimilarMovies(results);
        } catch (e) {
            console.error(e.response);
        }
    }

    const fetchReviews = async () => {
        try {
            const { data: { results} } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.REACT_APP_API_KEY}`, {
                cancelToken: source.token,
            })
            setReviews(results);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchMovieData();
        fetchTrailer();
        fetchCast();
        fetchSimilarMovies();
        fetchReviews();

        return () => source.cancel();
    }, [movieId]);


    return (
            Object.keys(movieData).length > 0 &&
                <main>
                    <MovieDescriptionSection movieData={movieData} trailerLink={trailerLink}/>

                    <CastSection cast={cast}/>

                    <SimilarSection
                        similarItems={similarMovies}
                        type='MOVIES'
                    />

                    <ReviewSection reviews={reviews} />
                </main>
    );
}

export default MovieDescription;