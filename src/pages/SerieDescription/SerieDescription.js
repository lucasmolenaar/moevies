import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

import SimilarSection from "../../components/SimilarSection/SimilarSection";
import ReviewSection from "../../components/ReviewSection/ReviewSection";
import SerieDescriptionSection from "../../components/SerieDescriptionSection/SerieDescriptionSection";
import CastSection from "../../components/CastSection/CastSection";

const SerieDescription = () => {
    const [serieData, setSerieData] = useState({});
    const [cast, setCast] = useState([]);
    const [similarShows, setSimilarShows] = useState([]);
    const [reviews, setReviews] = useState([]);

    const { serieId } = useParams();
    const source = axios.CancelToken.source();

    const fetchSerieData = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${process.env.REACT_APP_API_KEY}`, {
                cancelToken: source.token,
            });
            setSerieData(data);
        } catch (e) {
            console.error(e.response);
        }
    }

    const fetchCast = async () => {
        try {
            const { data: { cast }} = await axios.get(`https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`, {
                cancelToken: source.token,
            })
            setCast(cast);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchSimilarShows = async () => {
        try {
            const { data: { results } } = await axios.get(`https://api.themoviedb.org/3/tv/${serieId}/similar?api_key=${process.env.REACT_APP_API_KEY}`, {
                cancelToken: source.token,
            })
            setSimilarShows(results);
        } catch (e) {
            console.error(e.response);
        }
    }

    const fetchReviews = async () => {
        try {
            const { data: { results} } = await axios.get(`https://api.themoviedb.org/3/tv/${serieId}/reviews?api_key=${process.env.REACT_APP_API_KEY}`, {
                cancelToken: source.token,
            })
            setReviews(results);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchSerieData();
        fetchCast();
        fetchSimilarShows();
        fetchReviews();

        return () => source.cancel();
    }, [serieId])

    return (
        Object.keys(serieData).length > 0 &&
        <main>
            <SerieDescriptionSection serieData={serieData}/>

            <CastSection cast={cast}/>

            <SimilarSection
                similarItems={similarShows}
                type='SHOWS'
            />

            <ReviewSection reviews={reviews}/>

        </main>
    );
};

export default SerieDescription;