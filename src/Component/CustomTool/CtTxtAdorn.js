import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const CtTxtAdorn = ({
  id, label, adornment, value, width, disabled, handleOnChange, maxLength,
  onKeyDown, defaultAction, validateInput
}) => {

  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const useWidthStyle = { width: width + 'px' }
  const applyMaxLength = { maxLength: maxLength }
  const applyMaxLengthMissing = { maxLength: 1 }
  const handleOnKeyDown = (onKeyDown) ? ((event) => { onKeyDown(event, 1, defaultAction, validateInput) }) : (null)

  return (
    <TextField
      label={label}
      id={id}
      name={id}
      disabled={disabled}
      className={clsx(classes.textField)}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      inputProps={maxLength > 0 ? applyMaxLength : applyMaxLengthMissing}
      InputProps={{
        startAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
      }}
      value={value}
      style={width > 0 ? useWidthStyle : {}}
    />
  )
}

export default CtTxtAdorn