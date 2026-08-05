import React from 'react';
import { makeStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            // marginTop: theme.spacing(2),
        },
    },
}));

const Progress = ({ color, display }) => {
    const classes = useStyles();
    const curProgress = (display == true) ? (
        color && color != '' ?
            <LinearProgress color={color} /> : <LinearProgress />
    ) : ''
    return (
        <div className={classes.root}>
            {curProgress}
        </div>
    );
}
export default Progress