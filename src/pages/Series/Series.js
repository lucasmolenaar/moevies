import React, {useEffect, useState} from 'react';
import axios from "axios";

import PageNavigation from "../../components/PageNavigation/PageNavigation";
import MovieCard from "../../components/MovieCard/MovieCard";

import styles from './Series.module.css';

const Series = () => {
    const [series, setSeries] = useState([]);
    const [page, setPage] = useState(1);
    const source = axios.CancelToken.source();

    const fetchSeries = async () => {
        try {
            const { data: { results } } = await axios.get(`https://api.themoviedb.org/3/discover/tv?page=${page}&api_key=${process.env.REACT_APP_API_KEY}`, {
                cancelToken: source.token,
            });
            setSeries(results);
        } catch (e) {
            console.error(e.response);
        }
    }

    useEffect(() => {
        fetchSeries();
        return () => source.cancel();
    }, [page])

    return (
        <main>
            <h2 className={styles['page-name']}>Series</h2>

            <PageNavigation page={page} setPage={setPage}/>

            <ul className={styles['movies-list']}>
                {
                    series &&
                    series.map((serie) => {
                        return (
                            <MovieCard
                                key={serie.id}
                                id={serie.id}
                                title={serie.title || serie.name}
                                desc={serie.overview}
                                poster={serie.poster_path}
                                release={serie.release_date || serie.first_air_date}
                                type={'serie'}
                                vote={serie.vote_count}
                                vote_average={serie.vote_average}
                            />
                        );
                    })
                }
            </ul>
        </main>
    );
}

export default Series;