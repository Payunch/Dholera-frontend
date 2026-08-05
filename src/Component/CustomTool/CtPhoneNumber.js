import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { makeStyles } from '@mui/styles';
import {Input,InputLabel,FormControl}from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                // inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

const CtPhoneNumber = ({
    id, label, value, width, disabled, handleOnChange,
    onKeyDown, defaultAction, validateInput
}) => {
    const classes = useStyles();
    const useWidthStyle = { width: width + 'px' }
    const handleOnKeyDown = (onKeyDown) ? ((event) => { onKeyDown(event, 1, defaultAction, validateInput) }) : (null)

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel htmlFor="formatted-text-mask-input">{label}</InputLabel>
                <Input
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    name={id}
                    id={id}
                    // disabled={disabled}
                    readOnly={disabled}
                    value={value}
                    inputComponent={TextMaskCustom}
                    style={width > 0 ? useWidthStyle : {}}
                />
            </FormControl>
        </div>
    );
}

export default CtPhoneNumber