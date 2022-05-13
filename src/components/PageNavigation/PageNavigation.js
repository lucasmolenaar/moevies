import React from 'react';
import styles from './PageNavigation.module.css';

const PageNavigation = ({ page, setPage }) => {
    return (
        <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className={styles.previous}>Previous</button>
            <button disabled={page === 500} onClick={() => setPage(page + 1)} className={styles.next}>Next</button>
        </div>
    );
};

export default PageNavigation;