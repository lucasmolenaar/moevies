import React from 'react';
import styles from './AccountHeader.module.css';

const AccountHeader = ({ user }) => {
    return (
        <header className={styles.header}>
            <h1>{user.displayName ? `Hey ${user.displayName},` : `Hey ${user.email},`}</h1>
            <h2>Welcome to your account page</h2>
        </header>
    );
}

export default AccountHeader;