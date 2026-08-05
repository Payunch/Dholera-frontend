import React, { Component } from 'react'
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';

const forColor = 'white'

const useStyles = makeStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: forColor
    },
    "& label": {
      color: forColor
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: forColor
    }
  },
  inputColor: {
    color: forColor
  },
}));


const CtTextField = ({
  id, label, disabled, value, width, handleOnChange, maxLength,
  onKeyDown, defaultAction, validateInput, variant, fontColor
}) => {

  const classes = useStyles();
  const useWidthStyle = { width: width + 'px' }
  const applyMaxLength = { maxLength: maxLength, readOnly: disabled }
  const applyMaxLengthMissing = { maxLength: 1, readOnly: disabled }
  const handleOnKeyDown = (onKeyDown) ? ((event) => { onKeyDown(event, 1, defaultAction, validateInput) }) : (null)
  const fontColorValue = fontColor ? fontColor : 'white'
  return (
    <TextField
      id={id}
      name={id}
      label={label}
      value={value}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      style={width > 0 ? useWidthStyle : {}}
      inputProps={maxLength > 0 ? applyMaxLength : applyMaxLengthMissing}
      classes={classes}
      InputProps={{
        className: classes.inputColor
      }}
      variant={variant ? variant : 'standard'}
      sx={{ input: { color: fontColorValue } }}
    />
  )
}

export default CtTextField