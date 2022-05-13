import React from 'react';
import { useForm } from "react-hook-form";
import {theme} from "../../config/theme";
import {Box, Button, TextField, ThemeProvider} from "@mui/material";

const ChangeUsernameModal = ({ onSubmitHandler }) => {
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onFormSubmit = ({ username }) => {
        onSubmitHandler(username);
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
                        type='text'
                        label='Enter username'
                        fullWidth
                        placeholder={errors.username && errors.username.message}
                        {...register('username', {
                            required: 'Username is required'
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

export default ChangeUsernameModal;