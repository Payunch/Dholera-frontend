import * from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { WhatsApp } from '@mui/icons-material';
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

const CtTxtAdornNum = ({
    id, label, adornment, value, width, disabled, handleOnChange, readOnly,
    onKeyDown, defaultAction, validateInput
}) => {
    if (adornment === undefined) {
        adornment = <WhatsApp />
    }
    const useWidthStyle = { width: width + 'px' }
    const handleOnKeyDown = (onKeyDown) ? ((event) => { onKeyDown(event, 1, defaultAction, validateInput) }) : (null)
    let inputPropsStyle = {}
    if (readOnly !== undefined) {
        inputPropsStyle.readOnly = readOnly
    }
    return (
        <TextField
            label={label}
            id={id}
            name={id}
            disabled={disabled}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {adornment}
                    </InputAdornment>
                ),
                inputComponent: TextMaskCustom
            }}
            inputProps={inputPropsStyle}
            value={value}
            style={width > 0 ? useWidthStyle : {}}
            variant="standard"
        />
    );
}
export default CtTxtAdornNum
