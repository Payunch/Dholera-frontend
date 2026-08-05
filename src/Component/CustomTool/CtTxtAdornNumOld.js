import React from 'react';
import { InputAdornment, TextField } from '@mui/material';

const CtTxtAdornNum = ({
  id, label, adornment, value, width, disabled, handleOnChange,
  onKeyDown, defaultAction, validateInput
}) => {
  const useWidthStyle = { width: width + 'px' }
  const handleOnKeyDown = (onKeyDown) ? ((event) => { onKeyDown(event, 1, defaultAction, validateInput) }) : (null)

  return (
    <TextField
      label={label}
      id={id}
      name={id}
      disabled={disabled}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      InputProps={{
        startAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
      }}
      inputProps={{ inputMode: 'numeric', maxLength: 6 }}
      value={value}
      style={width > 0 ? useWidthStyle : {}}
      variant="standard"
    />
  );
}

export default CtTxtAdornNum