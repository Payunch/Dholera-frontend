import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { validatedate_min_max } from '../../SystemUtility/SystemUtility'

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default function CtDtp({
  id,
  label,
  disabled,
  defaultValue,
  value,
  width,
  handleOnChange,
  variant,
  onKeyDown,
  defaultAction,
  validateInput,
  minDateYMD,
  maxDateYMD,
  accountYear,
  nextCtrlID
}) {
  const classes = useStyles();
  let style = {};
  if (Number(width) > 0) {
    style.width = width + "px";
  }
  const handleOnKeyDown = onKeyDown
    ? (event) => {
      onKeyDown(event, 1, defaultAction, validateInput, nextCtrlID);
    }
    : null;
  let curVariant = variant ? variant : "standard";
  let minDateYMD_pr =
    Number(accountYear) > 0 ? accountYear + "-04-01" : minDateYMD;
  let maxDateYMD_pr =
    Number(accountYear) > 0 ? ((Number(accountYear) + 1) + "-03-31") : maxDateYMD;

  const isDateInRange = (dateString) => {
    const date = new Date(dateString);
    return date >= new Date(minDateYMD_pr) && date <= new Date(maxDateYMD_pr);
  };

  const getSystemDateFormat = () => {
    const [dateSample] = new Intl.DateTimeFormat().formatToParts(new Date());
    return dateSample.type === "literal" ? "MM-dd-yyyy" : "dd-MM-yyyy";
  };

  return (
    <TextField
      id={id}
      name={id}
      label={label}
      type="date"
      // disabled={disabled}
      value={value}
      defaultValue={defaultValue}
      className={classes.textField}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        readOnly: disabled,
        min: minDateYMD_pr,
        max: maxDateYMD_pr,
      }}
      style={style}
      variant={curVariant}
    // onInput={handleInput}
    />
  );
}
