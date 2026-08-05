import React from "react";
import TextField from "@mui/material/TextField";
import { convertGujaratiToEnglishNumber } from "../../SystemUtility/SystemUtility";

const CtTextField = ({
  id,
  label,
  disabled,
  readOnly,
  value,
  width,
  handleOnChange,
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

  // const useWidthStyle = { width: width + 'px' }
  let style = {};
  if (Number(width) > 0) {
    style.width = width + "px";
  }
  if (display !== undefined && (display === false || display === "false")) {
    style.display = "none";
  }
  /* if (isUpperCase && isUpperCase === true) {
        style.textTransform = 'uppercase'
    } */
  // const useStyle = { ext}
  let inputPropsStyle = {};
  if (maxLength > 0) {
    inputPropsStyle.maxLength = maxLength;
  } else {
    inputPropsStyle.maxLength = 1;
  }
  // if (disabled!==undefined && disabled === true) {
  //   inputPropsStyle.disabled = disabled;
  // }
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

  const onChange = (e) => {
    const regEx = /^[0-9]*$/g;
    value = convertGujaratiToEnglishNumber(e.target.value);
    if (regEx.test(value)) {
      handleOnChange({
        target: { name: e.target.name, value: value },
      });
    }
  };
  // const onChange = (e) => {
  //   const regEx = /^[0-9]*$/g;
  //   const value = e.target.value;

  //   // Only update if value is digits only
  //   if (regEx.test(value)) {
  //     handleOnChange({
  //       target: { name: e.target.name, value: value },
  //     });
  //   }
  // };

  const handleOnKeyDown = onKeyDown
    ? (event) => {
        onKeyDown(event, inc, defaultAction, validateInput, nextCtrlID);
      }
    : null;
  const handleFocus = (event) => {
    event.target.select();
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
      onFocus={handleFocus}
      style={style}
      inputProps={inputPropsStyle}
      variant={curVariant}
      fullWidth={fullWidth ? fullWidth : false}
    />
  );
};

export default CtTextField;
