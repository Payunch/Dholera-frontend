import React from "react";
import TextField from "@mui/material/TextField";

const CtTextField = ({
  id,
  label,
  disabled,
  readOnly,
  value = "",
  width,
  handleOnChange,
  AmountOnly,
  NumberOnly,
  maxLength,
  isUpperCase,
  variant = "standard",
  textAlign,
  display,
  onKeyDown,
  defaultAction,
  validateInput,
  nextCtrlID,
  fullWidth = false,
}) => {
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
  }
  if (readOnly) {
    inputPropsStyle.readOnly = true;
  }
  if (isUpperCase) {
    inputPropsStyle.style = { textTransform: "uppercase" };
  }
  if (textAlign) {
    inputPropsStyle.style = { ...inputPropsStyle.style, textAlign };
  }

  const inc = variant === "standard" ? 1 : 2;

  const handleOnKeyDown = onKeyDown
    ? (event) => {
        onKeyDown(event, inc, defaultAction, validateInput, nextCtrlID);
      }
    : null;

  const onChange = (e) => {
    if (!handleOnChange) return;
    const val = e.target.value;
    if (!AmountOnly && !NumberOnly) {
      handleOnChange({
        target: { name: e.target.name || id, value: val },
      });
    } else if (AmountOnly) {
      const regEx = /^-?[0-9]{0,20}([.][0-9]{0,5})?$/g;
      if (regEx.test(val) || val === "") {
        handleOnChange({
          target: { name: e.target.name || id, value: val },
        });
      }
    } else if (NumberOnly) {
      const regEx = /^[0-9]*$/g;
      if (regEx.test(val)) {
        handleOnChange({
          target: { name: e.target.name || id, value: val },
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
      variant={variant}
      fullWidth={fullWidth}
    />
  );
};

export default CtTextField;
