import React from "react";
import TextField from "@mui/material/TextField";

const CtTextField = ({
  id,
  label,
  disabled,
  readOnly,
  value,
  width,
  handleOnChange,
  AmountOnly,
  NumberOnly,
  maxLength,
  isUpperCase,
  variant,
  textAlign,
  display,
  onKeyDown,
  defaultAction,
  validateInput,
  nextCtrlID,
  fullWidth,
}) => {
  const curVariant = variant ? variant : "standard";

  let style = {};
  if (Number(width) > 0) {
    style.width = width + "px";
  }
  if (display !== undefined && (display === false || display === "false")) {
    style.display = "none";
  }
  let inputPropsStyle = {};
  if (maxLength > 0) {
    inputPropsStyle.maxLength = maxLength;
  } else {
    inputPropsStyle.maxLength = 1;
  }
  if (readOnly !== undefined && readOnly === true) {
    inputPropsStyle.readOnly = readOnly;
  }
  if (isUpperCase && isUpperCase === true) {
    inputPropsStyle.style = { textTransform: "uppercase" };
  }
  if (textAlign !== undefined) {
    inputPropsStyle.style = { textAlign };
  }

  const inc = curVariant === "standard" ? 1 : 2;

  const handleOnKeyDown = onKeyDown
    ? (event) => {
        onKeyDown(event, inc, defaultAction, validateInput, nextCtrlID);
      }
    : null;

  const onChange = (e) => {
    if (!AmountOnly && !NumberOnly) {
      handleOnChange({
        target: { name: e.target.name, value: e.target.value },
      });
    } else if (AmountOnly) {
      const regEx = /^-?[0-9]{0,20}([.][0-9]{0,5})?$/g;
      if (regEx.test(e.target.value) || e.target.value === "") {
        handleOnChange({
          target: { name: e.target.name, value: e.target.value },
        });
      }
    } else if (NumberOnly) {
      const regEx = /^[0-9]*$/g;
      if (regEx.test(e.target.value)) {
        handleOnChange({
          target: { name: e.target.name, value: e.target.value },
        });
      }
    }
  };

  return (
    <TextField
      id={id}
      name={id}
      label={label}
      disabled={disabled}
      value={value}
      onChange={onChange}
      onKeyDown={handleOnKeyDown}
      style={style}
      inputProps={inputPropsStyle}
      variant={curVariant}
      fullWidth={fullWidth ? fullWidth : false}
    />
  );
};

export default CtTextField;
