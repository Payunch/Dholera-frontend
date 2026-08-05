import React from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            // margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const TextAreaAutoSize = ({
    id, label, disabled, value, width, handleOnChange, maxLength, placeholder, inputRef, variant,
    onKeyDown, defaultAction, validateInput
}) => {
    const classes = useStyles();

    const useWidthStyle = { width: width + 'px' }
    const applyMaxLength = { maxLength: maxLength, readOnly: disabled }
    const applyMaxLengthMissing = { maxLength: 1, readOnly: disabled }
    const handleOnKeyDown = (onKeyDown) ? ((event) => { onKeyDown(event, 1, defaultAction, validateInput) }) : (null)

    let curVariant = variant ? variant : 'standard'

    return (
        // <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.root} noValidate autoComplete="off">
            <TextField
                id={id}
                name={id}
                inputRef={inputRef}
                label={label}
                // disabled={disabled}
                placeholder={placeholder}
                multiline
                value={value}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                style={width > 0 ? useWidthStyle : {}}
                inputProps={maxLength > 0 ? applyMaxLength : applyMaxLengthMissing}
                variant={curVariant}
            />
        </div>
        // </form>
    )
}
export default TextAreaAutoSize