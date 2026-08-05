import React from "react";
import TextField from "@mui/material/TextField";

const CtMultiLineText = ({
  id,
  label,
  disabled,
  value,
  width,
  handleOnChange,
  rows,
  maxLength,
  foreColor,
  onKeyDown,
  defaultAction,
  validateInput,
  variant,
  nextCtrlID,
  AmountOnly,
  NumberOnly,
}) => {
  const curVariant = variant ? variant : "standard";

  const style = {
    width:
      typeof width === "string" &&
      (width.includes("%") || width.includes("px"))
        ? width
        : `${width}px`,
  };

  const inputPropsStyle =
    maxLength > 0
      ? { maxLength, readOnly: disabled, style: { color: foreColor } }
      : { maxLength: 1, readOnly: disabled, style: { color: foreColor } };

  const inc = curVariant === "standard" ? 1 : 2;

  const handleOnKeyDown = onKeyDown
    ? (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode === 13) {
          if (event.ctrlKey) {
            onKeyDown(event, inc, defaultAction, validateInput, nextCtrlID);
          }
        }
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
      multiline
      rows={rows}
      variant={curVariant}
      style={style}
      inputProps={inputPropsStyle}
    />
  );
};

export default CtMultiLineText;
