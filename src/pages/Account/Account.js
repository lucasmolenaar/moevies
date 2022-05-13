import React, {useContext} from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import AccountHeader from "../../components/AccountHeader/AccountHeader";
import AccountMenu from "../../components/AccountMenu/AccountMenu";

import styles from './Account.module.css';

const Account = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className={styles['account-page']}>
            <AccountHeader user={user}/>

            <AccountMenu />
        </div>
    );
};

export default Account;