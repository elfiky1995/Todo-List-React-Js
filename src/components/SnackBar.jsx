/* eslint-disable react/prop-types */
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} {...props} />;
});

export default function SnackBar({ snackState, message, severity }) {
    const { open, vertical = "top", horizontal = "right" } = snackState;

    return (
        <div>
            <Snackbar open={open} anchorOrigin={{ vertical, horizontal }}            >
                <Alert severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}