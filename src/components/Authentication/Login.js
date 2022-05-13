import React, {useContext} from 'react';
import {theme} from "../../config/theme";
import {Box, Button, TextField, ThemeProvider} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from 'react-hook-form';
import {toast} from "react-toastify";

const Login = () => {
    const { login } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onHandleSubmit = async ({ email, password }) => {
        try {
            await login(email, password);
        } catch (e) {
            toast.error('Wrong credentials');
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
                            required: 'Email is required',
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
                        })}
                    />

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

export default Login;