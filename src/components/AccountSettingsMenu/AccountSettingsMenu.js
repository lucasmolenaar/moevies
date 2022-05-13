import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import { toast } from 'react-toastify';
import { AuthContext } from "../../context/AuthContext";
import {theme} from "../../config/theme";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {AppBar, Tab, Tabs, ThemeProvider} from "@mui/material";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import DeleteIcon from '@mui/icons-material/Delete';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AccountMenuItem from "../AccountMenuItem/AccountMenuItem";
import ChangeUsernameModal from "../ChangeUsernameModal/ChangeUsernameModal";
import ChangeEmailModal from "../ChangeEmailModal/ChangeEmailModal";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import DeleteAccountModal from "../DeleteAccountModal/DeleteAccountModal";

import styles from './AccountSettingsMenu.module.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#424D67',
    border: '1px solid #F6F6F6',
    borderRadius: 3,
    boxShadow: 24,
};

const AccountSettingsMenu = () => {
    //** USERNAME MODAL STATE **
    const [openUsernameModal, setOpenUsernameModal] = React.useState(false);
    const handleOpenUsernameModal = () => setOpenUsernameModal(true);
    const handleCloseUsernameModal = () => setOpenUsernameModal(false);

    //** EMAIL MODAL STATE **
    const [openEmailModal, setOpenEmailModal] = React.useState(false);
    const handleOpenEmailModal = () => setOpenEmailModal(true);
    const handleCloseEmailModal = () => setOpenEmailModal(false);

    //** PASSWORD MODAL STATE **
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const handleOpenPasswordModal = () => setOpenPasswordModal(true);
    const handleClosePasswordModal = () => setOpenPasswordModal(false);

    //** DELETE ACCOUNT MODAL STATE **
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const history = useHistory();

    const {
        user,
        deleteUserAccount,
        updateUserAccount,
        updateUserEmail,
        reauthenticateUser,
        updateUserPassword
        } = useContext(AuthContext);

    //** ACCOUNT CRUD METHODS  **
    const updateUsername = async (username) => {
        try {
            await updateUserAccount(username);
            history.push('/account')
            toast.success('Username changed successfully')
        } catch (e) {
            console.error(e.message);
        }
    }

    const updateEmail = async (password, email) => {
        reauthenticateUser(password).then(() => {
            try {
                updateUserEmail(email);
                toast.success('Email changed successfully')
                history.push('/account');
            } catch (e) {
                console.error(e.message);
                toast.error('Something went wrong')
            }
        }).catch((e) => {
            console.error(e.message);
            toast.error('Enter your password')
        });
    }

    const updatePassword = async (password, newPassword) => {
        reauthenticateUser(password).then(() => {
            try {
                updateUserPassword(newPassword);
                toast.success('Password changed successfully');
                history.push('/account');
            } catch (e) {
                console.error(e.message);
                toast.error('Something went wrong');
            }
        }).catch((e) => {
            console.error(e.message);
            toast.error('Enter your current password')
        })
    }

    const deleteAccount = async (password) => {
        reauthenticateUser(password).then(() => {
            try {
                deleteUserAccount();
                history.push('/');
            } catch (e) {
                console.error(e.message)
                toast.error(e.message);
            }
        }).catch((e) => {
            console.error(e.message);
            toast.error(e.message);
        })
    }

    return (
        <div className={styles['settings-page']}>
            <section className={styles['settings-section']}>
                <AccountMenuItem onClickHandler={handleOpenUsernameModal} text={user.displayName ? 'Change username' : 'Set username'} icon={<PersonPinIcon />} color='#424D67'/>
                <AccountMenuItem onClickHandler={handleOpenEmailModal} text='Change email' icon={<AlternateEmailIcon />} color='#424D67'/>
                <AccountMenuItem onClickHandler={handleOpenPasswordModal} text='Change password' icon={<KeyIcon />} color='#424D67'/>
                <AccountMenuItem onClickHandler={handleOpenDeleteModal} text='Delete account' icon={<DeleteIcon />} color='#C95D3B'/>

                <ThemeProvider theme={theme}>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openUsernameModal}
                        onClose={handleCloseUsernameModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openUsernameModal}>
                            <Box sx={style}>
                                <AppBar
                                    position='static'
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                    }}
                                >
                                    <Tabs
                                        value={0}
                                        variant='fullWidth'
                                    >
                                        <Tab label="Change username" />
                                    </Tabs>
                                </AppBar>

                                <ChangeUsernameModal onSubmitHandler={updateUsername}/>
                            </Box>
                        </Fade>
                    </Modal>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openEmailModal}
                        onClose={handleCloseEmailModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openEmailModal}>
                            <Box sx={style}>
                                <AppBar
                                    position='static'
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                    }}
                                >
                                    <Tabs
                                        value={0}
                                        variant='fullWidth'
                                    >
                                        <Tab label="Change email" />
                                    </Tabs>
                                </AppBar>

                                <ChangeEmailModal updateEmail={updateEmail} />
                            </Box>
                        </Fade>
                    </Modal>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openPasswordModal}
                        onClose={handleClosePasswordModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openPasswordModal}>
                            <Box sx={style}>
                                <AppBar
                                    position='static'
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                    }}
                                >
                                    <Tabs
                                        value={0}
                                        variant='fullWidth'
                                    >
                                        <Tab label="Change password" />
                                    </Tabs>
                                </AppBar>

                                <ChangePasswordModal updatePassword={updatePassword}/>
                            </Box>
                        </Fade>
                    </Modal>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openDeleteModal}
                        onClose={handleCloseDeleteModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openDeleteModal}>
                            <Box sx={style}>
                                <AppBar
                                    position='static'
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                    }}
                                >
                                    <Tabs
                                        value={0}
                                        variant='fullWidth'
                                    >
                                        <Tab label="Delete account" />
                                    </Tabs>
                                </AppBar>

                                <DeleteAccountModal deleteAccount={deleteAccount}/>
                            </Box>
                        </Fade>
                    </Modal>
                </ThemeProvider>
            </section>

            <section className={styles['overview-section']}>
                <TableContainer className={styles.table} component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Username</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Account created</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{user.displayName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.metadata.creationTime}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
        </div>

    );
};

export default AccountSettingsMenu;