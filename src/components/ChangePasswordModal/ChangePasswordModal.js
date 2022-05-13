import React from 'react';
import { useForm } from "react-hook-form";
import {theme} from "../../config/theme";
import {Box, Button, TextField, ThemeProvider} from "@mui/material";
import {toast} from "react-toastify";

const ChangePasswordModal = ({ updatePassword }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onFormSubmit = ({ currentPassword, newPassword, confirmNewPassword }) => {
        if (newPassword !== confirmNewPassword) {
            toast.error('Passwords do no match')
        } else {
            updatePassword(currentPassword, newPassword);
        }
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
                        label='Enter current password'
                        fullWidth
                        placeholder={errors.currentPassword && errors.currentPassword.message}
                        {...register('currentPassword', {
                            required: 'Current password is required'
                        })}
                    />

                    <TextField
                        sx={{ input: { color: '#F6F6F6' }}}
                        variant='outlined'
                        type='password'
                        label='Enter new password'
                        fullWidth
                        placeholder={errors.newPassword && errors.newPassword.message}
                        {...register('newPassword', {
                            required: 'New password is required'
                        })}
                    />

                    <TextField
                        sx={{ input: { color: '#F6F6F6' }}}
                        variant='outlined'
                        type='password'
                        label='Confirm new password'
                        fullWidth
                        placeholder={errors.confirmNewPassword && errors.confirmNewPassword.message}
                        {...register('confirmNewPassword', {
                            required: 'Confirm password is required'
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

export default ChangePasswordModal;