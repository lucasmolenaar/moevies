import React from 'react';
import { useForm } from "react-hook-form";
import {theme} from "../../config/theme";
import {Box, Button, TextField, ThemeProvider} from "@mui/material";

const ChangeEmailModal = ({ updateEmail }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onFormSubmit = ({ password, email }) => {
        updateEmail(password, email);
    }

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
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
                        type='password'
                        label='Verify password'
                        fullWidth
                        placeholder={errors.password && errors.password.message}
                        {...register('password', {
                            required: 'Password is required'
                        })}
                    />

                    <TextField
                        sx={{ input: { color: '#F6F6F6' }}}
                        variant='outlined'
                        type='email'
                        label='Enter new email'
                        fullWidth
                        placeholder={errors.email && errors.email.message}
                        {...register('email', {
                            required: 'Email is required'
                        })}
                    />

                    <Button
                        variant='contained'
                        size='large'
                        style={{ backgroundColor: '#EEBC1D' }}
                        type='submit'
                    >
                        Change
                    </Button>
                </Box>
            </form>
        </ThemeProvider>
    );
};

export default ChangeEmailModal;