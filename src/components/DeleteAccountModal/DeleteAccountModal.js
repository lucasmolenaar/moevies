import React from 'react';
import {useForm} from "react-hook-form";
import {theme} from "../../config/theme";
import {Box, Button, TextField, ThemeProvider} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {toast} from "react-toastify";

const DeleteAccountModal = ({ deleteAccount }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onFormSubmit = ({ password }) => {
        try {
            deleteAccount(password);
            toast.success('Account successfully deleted')
        } catch (e) {
            toast.error('Wrong password')
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
                        label='Enter password'
                        fullWidth
                        placeholder={errors.password && errors.password.message}
                        {...register('password', {
                            required: 'Password is required'
                        })}
                    />

                    <Button
                        variant='contained'
                        size='large'
                        style={{ backgroundColor: '#C95D3B', color: '#F6F6F6' }}
                        type='submit'
                    >
                        Delete &nbsp; <DeleteIcon />
                    </Button>
                </Box>
            </form>
        </ThemeProvider>
    );
};

export default DeleteAccountModal;