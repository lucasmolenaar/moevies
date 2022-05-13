import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import AccountMenuItem from "../AccountMenuItem/AccountMenuItem";
import { AuthContext } from "../../context/AuthContext";

import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import styles from './AccountMenu.module.css';

const AccountMenu = () => {
    const { logout } = useContext(AuthContext);

    return (
        <section className={styles['menu-section']}>
            <ul className={styles['menu-items']}>
                <Link style={{textDecoration: 'none'}} to='/account/watchlist'><AccountMenuItem text='Watchlist' icon={<LocalMoviesIcon />} color='#424D67'/></Link>
                <Link style={{textDecoration: 'none'}} to='/account/settings'><AccountMenuItem text='Account settings' icon={<SettingsIcon />} color='#424D67'/></Link>
                <AccountMenuItem text='Log out' icon={<LogoutIcon />} color='#EEBC1E' onClickHandler={logout}/>
            </ul>
        </section>
    );
};

export default AccountMenu;