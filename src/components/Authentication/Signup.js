import React, { useContext } from 'react';
import {Box, TextField, ThemeProvider, Button} from "@mui/material";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import {theme} from "../../config/theme";

import { AuthContext } from "../../context/AuthContext";

const errorText = {
    color: '#C95D3B',
    fontStyle: 'italic',
    textAlign: 'center',
}

const Signup = ({ handleClose }) => {
    const { createUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
    });


    const onHandleSubmit = async ({ email, password, confirmPassword }) => {
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return;
        }

        try {
            createUser(email, password);
            handleClose();
        } catch (e) {
           toast.error('Email already in use');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <Box
                    p={3}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >

                    <TextField
                        sx={{ input: { color: '#F6F6F6' }}}
                        variant='outlined'
                        type='email'
                        label='Enter email'
                        fullWidth
                        placeholder={errors.email && errors.email.message}
                        {...register('email', {
                            required: 'Email is required'
                        })}
                    />

                    <TextField
                        sx={{ input: { color: '#F6F6F6' }}}
                        variant='outlined'
                        type='password'
                        label='Enter password'
                        fullWidth
                        placeholder={errors.password && errors.password.message}
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password should be at least 6 characters'
                            }
                        })}
                    />

                    <TextField
                        sx={{ input: { color: '#F6F6F6' }}}
                        variant='outlined'
                        type='password'
                        label='Confirm password'
                        fullWidth
                        placeholder={errors.confirmPassword && errors.confirmPassword.message}
                        {...register('confirmPassword', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password should be at least 6 characters'
                            }
                        })}
                    />

                    {errors.password?.type === 'minLength' && <span style={errorText}>Password should be at least 6 characters</span>}

                    <Button
                        variant='contained'
                        size='large'
                        style={{ backgroundColor: '#EEBC1D' }}
                        type='submit'
                    >
                        Sign Up
                    </Button>
                </Box>
            </form>

        </ThemeProvider>
    );
};

export default Signup;