import React from 'react';
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AccountSettingsMenu from "../../components/AccountSettingsMenu/AccountSettingsMenu";

import styles from './AccountSettings.module.css';

const AccountSettings = () => {
    const history = useHistory();

    return (
        <div>
            <header className={styles.header}>
                <h1>Account settings</h1>

                <Button
                    onClick={() => history.push('/account')}
                    className={styles['back-btn']}
                    variant='contained'
                    style={{
                        backgroundColor: '#EEBC1D',
                    }}
                >
                    <ArrowBackIcon />
                </Button>
            </header>

            <AccountSettingsMenu />
        </div>
    );
};

export default AccountSettings;