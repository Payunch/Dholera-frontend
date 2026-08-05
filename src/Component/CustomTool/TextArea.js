import React from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const TextArea = ({
    id, label, disabled, value, width, handleOnChange, maxLength, rowsMax,
    onKeyDown, defaultAction, validateInput
}) => {
    const classes = useStyles();
    const useWidthStyle = { width: width + 'px' }
    const applyMaxLength = { maxLength: maxLength }
    const applyMaxLengthMissing = { maxLength: 1 }
    const handleOnKeyDown = (onKeyDown) ? ((event) => { onKeyDown(event, 1, defaultAction, validateInput) }) : (null)
    
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id={id}
                    name={id}
                    label={label}
                    disabled={disabled}
                    multiline
                    rowsMax={rowsMax}
                    value={value}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    style={width > 0 ? useWidthStyle : {}}
                    inputProps={maxLength > 0 ? applyMaxLength : applyMaxLengthMissing}
                />
            </div>
        </form>
    )
}
export default TextArea