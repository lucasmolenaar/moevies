import * as React from 'react';
import {useContext} from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {AppBar, Tabs, Tab, ThemeProvider} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

import Login from "../Login";
import Signup from "../Signup";

import styles from './AuthModal.module.css';
import {theme} from "../../../config/theme";
import { AuthContext } from "../../../context/AuthContext";

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

export default function TransitionsModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = React.useState(0);
    const { signInWithGoogle } = useContext(AuthContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={styles['auth-modal']}>
            <ThemeProvider theme={theme}>
            <Button
                onClick={handleOpen}
                variant='contained'
                style={{
                    width: 85,
                    height: 40,
                    backgroundColor: '#EEBC1D',
                    color: '#424D67'
                }}
            >
                Login
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <AppBar
                            position='static'
                            style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                            }}
                        >
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant='fullWidth'
                            >
                                <Tab label="Login" />
                                <Tab label="Sign Up" />
                            </Tabs>
                        </AppBar>
                        {value === 0 && <Login />}
                        {value === 1 && <Signup handleClose={handleClose}/>}

                        <Button
                            variant='text'
                            fullWidth
                            startIcon={<GoogleIcon />}
                            className={styles['google-btn']}
                            style={{
                                height: 40,
                                backgroundColor: 'transparent',
                                color: '#f6f6f6',
                                marginBottom: '1rem'
                            }}
                            onClick={() => signInWithGoogle()}
                        >
                            Sign in with Google
                        </Button>
                    </Box>
                </Fade>
            </Modal>
            </ThemeProvider>
        </div>
    );
}
