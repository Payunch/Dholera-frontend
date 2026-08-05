import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { makeStyles } from '@mui/styles';
import {InputAdornment,TextField} from '@mui/material';
import clsx from 'clsx';

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

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const CtTxtAdornNum = ({
  id, label, adornment, value, width, disabled, handleOnChange,
  onKeyDown, defaultAction, validateInput
}) => {
  const classes = useStyles();
  const useWidthStyle = { width: width + 'px' }
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
      InputProps={{
        startAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
        inputComponent: TextMaskCustom
      }}
      value={value}
      style={width > 0 ? useWidthStyle : {}}
    />
  );
}

export default CtTxtAdornNum