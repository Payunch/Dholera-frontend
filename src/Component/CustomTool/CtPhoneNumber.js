import React from 'react';
import { FormControl, Input, InputLabel } from '@mui/material';

const CtPhoneNumber = ({
    id, label, value, width, disabled, handleOnChange,
    onKeyDown, defaultAction, validateInput
}) => {
    const useWidthStyle = { width: width + 'px' }
    const handleOnKeyDown = (onKeyDown) ? ((event) => { onKeyDown(event, 1, defaultAction, validateInput) }) : (null)

    return (
        <FormControl>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Input
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                name={id}
                id={id}
                readOnly={disabled}
                value={value}
                inputProps={{ inputMode: 'numeric', maxLength: 10 }}
                style={width > 0 ? useWidthStyle : {}}
            />
        </FormControl>
    );
}

export default CtPhoneNumber