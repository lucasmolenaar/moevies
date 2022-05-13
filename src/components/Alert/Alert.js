import React, {useState} from 'react';
import {Snackbar} from "@mui/material";

const Alert = () => {

    const [open, setOpen] = useState(false);

    const handleClose = () => {

    }

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
        </Snackbar>
    );
};

export default Alert;