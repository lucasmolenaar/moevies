import React from 'react';
import { useHistory } from "react-router-dom";
import GradeIcon from '@mui/icons-material/Grade';
import styles from './MovieCard.module.css';

const MovieCard = ({ id, title, poster, release, type, vote, vote_average }) => {
    const history = useHistory();

    const pushToPage = () => {
        if (type === 'movie') {
            history.push(`/movies/${id}`);
        } else {
            history.push(`/series/${id}`)
        }
    }

  return (
    <li onClick={pushToPage} className={styles['movie-card']}>
      {/*<div className={styles.rating}>*/}
      {/*    {vote_average.toString().length === 1 ? `${vote_average}.0` : vote_average}*/}
      {/*</div>*/}

     <div className={styles.rating}>
         {vote_average}
     </div>

      <img className={styles.poster} src={`https://image.tmdb.org/t/p/w300${poster}`} alt="poster" />

      <strong className={styles.title}>{title}</strong>

      <em className={styles.type}>{type === 'movie' ? 'Movie' : 'TV Serie'}</em>

      <p className={styles.release}>{release}</p>

      <span className={styles.vote}><GradeIcon /> &nbsp; {vote}</span>

    </li>
  )
}

export default MovieCard