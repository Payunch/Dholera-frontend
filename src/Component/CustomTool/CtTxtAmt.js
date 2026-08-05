// import React from "react";
// import TextField from "@mui/material/TextField";
// import { convertGujaratiToEnglishNumber } from "../../SystemUtility/SystemUtility";

// const CtTextField = ({
//   id,
//   label,
//   disabled,
//   readOnly,
//   value,
//   width,
//   handleOnChange,
//   maxLength,
//   isUpperCase,
//   variant,
//   textAlign,
//   display,
//   onKeyDown,
//   defaultAction,
//   validateInput,
//   nextCtrlID,
//   fullWidth,
// }) => {
//   const curVariant = variant ? variant : "standard";

//   // const useWidthStyle = { width: width + 'px' }
//   let style = {};
//   if (Number(width) > 0) {
//     style.width = width + "px";
//   }
//   if (display !== undefined && (display === false || display === "false")) {
//     style.display = "none";
//   }
//   let inputPropsStyle = {};
//   if (maxLength > 0) {
//     inputPropsStyle.maxLength = maxLength;
//   } else {
//     inputPropsStyle.maxLength = 1;
//   }
//   if (readOnly !== undefined && readOnly === true) {
//     inputPropsStyle.readOnly = readOnly;
//   }
//   if (textAlign !== undefined) {
//     inputPropsStyle.style = { textAlign };
//   }

//   const inc = curVariant === "standard" ? 1 : 2;

//   const onChange = (e) => {
//     const regEx = /^-?[0-9]{0,20}([.][0-9]{0,5})?$/g;
//     value = convertGujaratiToEnglishNumber(e.target.value);
//     if (regEx.test(value) || e.target.value === "") {
//       handleOnChange({
//         target: { name: e.target.name, value: value },
//       });
//     }
//   };

//   const handleOnKeyDown = onKeyDown
//     ? (event) => {
//         onKeyDown(event, inc, defaultAction, validateInput, nextCtrlID);
//       }
//     : null;
//   return (
//     <TextField
//       id={id}
//       name={id}
//       label={label}
//       disabled={disabled}
//       value={value}
//       onChange={onChange}
//       onKeyDown={handleOnKeyDown}
//       style={style}
//       inputProps={inputPropsStyle}
//       variant={curVariant}
//       fullWidth={fullWidth ? fullWidth : false}
//     />
//   );
// };

// export default CtTextField;

import React from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
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
  RupeeSymbol = false,
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
  let inputPropsStyle = {};
  if (maxLength > 0) {
    inputPropsStyle.maxLength = maxLength;
  } else {
    inputPropsStyle.maxLength = 1;
  }
  if (readOnly !== undefined && readOnly === true) {
    inputPropsStyle.readOnly = readOnly;
  }
  if (textAlign !== undefined) {
    inputPropsStyle.style = { textAlign };
  }

  let InputProps = {};
  if (RupeeSymbol == true) {
    InputProps = {
      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
    };
  }

  const inc = curVariant === "standard" ? 1 : 2;

  // const onChange = (e) => {
  //   const regEx = /^-?[0-9]{0,20}([.][0-9]{0,5})?$/g;
  //   if (regEx.test(e.target.value) || e.target.value === "") {
  //     handleOnChange({
  //       target: { name: e.target.name, value: e.target.value },
  //     });
  //   }
  // };

  /* If 0 is by default and then type so remove 0 automaticaly */
  const onChange = (e) => {
    const regEx = /^-?[0-9]{0,20}([.][0-9]{0,5})?$/g;
    let value = e.target.value;
    value = convertGujaratiToEnglishNumber(e.target.value);

    // Remove leading zero unless it's the only character
    if (value.length > 1 && value.startsWith("0") && !value.startsWith("0.")) {
      value = value.replace(/^0+/, "");
    }

    if (regEx.test(value)) {
      handleOnChange({ target: { name: e.target.name, value } });
    }
  };

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
      InputProps={InputProps}
    />
  );
};

export default CtTextField;
