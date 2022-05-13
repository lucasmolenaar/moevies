import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import AuthModal from '../Authentication/AuthModal/AuthModal';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { AuthContext } from "../../context/AuthContext";
import styles from './Header.module.css';

const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <header className={styles.header}>
           <Link style={{textDecoration: 'none'}} to='/'><h1 className={styles.logo}>MOEVIES</h1></Link>

            {
                user ?

                    <div className={styles['menu-icons']}>
                        <Link
                            to='/account'
                            style={{textDecoration: 'none', color:'#f6f6f6'}}
                        >
                            <PersonIcon className={styles['user-icon']} />
                        </Link>

                        <Link
                            to='/account/watchlist'
                            style={{textDecoration: 'none', color:'#f6f6f6'}}
                        >
                            <VisibilityIcon className={styles['watch-icon']} />
                        </Link>


                    </div>
                    :
                    <AuthModal />
            }
        </header>
    );
}

export default Header;