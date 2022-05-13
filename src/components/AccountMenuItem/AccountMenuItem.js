import React from 'react';
import styles from './AccountMenuItem.module.css';

const AccountMenuItem = ({ text, icon, color, onClickHandler }) => {
    return (
        <li
            style={{backgroundColor: color}}
            className={styles['menu-item']}
            onClick={onClickHandler}
        >
            <h3>{text}</h3>
            <div>{icon}</div>
        </li>
    );
};

export default AccountMenuItem;