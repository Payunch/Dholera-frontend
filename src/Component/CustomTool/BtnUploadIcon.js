import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

const BtnUploadIcon = ({ handleOnFileSelection }) => {
    const classes = useStyles();
    const handleChange = (event) => {
        // console.log(event.target.files[0].webkitRelativePath);
        //handleOnFileSelection(event.target.files[0])
    }
    return (
        <div className={classes.root}>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(e) => { handleChange(e) }} />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
        </div>
    );
}
export default BtnUploadIcon