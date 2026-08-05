// import React from "react";
// import IconButton from "@mui/material/IconButton";
// import Input from "@mui/material/Input";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
// import FormControl from "@mui/material/FormControl";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// const CtTextFieldPWD = ({
//   id,
//   label,
//   value,
//   width,
//   handleOnChange,
//   maxLength,
//   autoFillPassword,
//   onKeyDown,
//   defaultAction,
//   validateInput,
//   disabled,
//   nextCtrlID,
//   formcontrolStyle,
//   fullWidth,
//   variant,
// }) => {
//   const [values, setValues] = React.useState({
//     showPassword: false,
//   });

//   const handleClickShowPassword = () => {
//     setValues({ ...values, showPassword: !values.showPassword });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const useWidthStyle = { width: width + "px" };
//   const applyMaxLength = { maxLength: maxLength };
//   const applyMaxLengthMissing = { maxLength: 1 };
//   const handleOnKeyDown = onKeyDown
//     ? (event) => {
//         onKeyDown(event, 2, defaultAction, validateInput, nextCtrlID);
//       }
//     : null;
//   return (
//     <FormControl
//       fullWidth={fullWidth ? fullWidth : false}
//       style={formcontrolStyle}
//       variant={variant ? variant : "standard"}
//     >
//       <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
//       <Input
//         id={id}
//         name={id}
//         type={values.showPassword ? "text" : "password"}
//         value={value}
//         onChange={handleOnChange}
//         onKeyDown={handleOnKeyDown}
//         disabled={disabled}
//         endAdornment={
//           <InputAdornment position="end">
//             <IconButton
//               aria-label="toggle password visibility"
//               onClick={handleClickShowPassword}
//               onMouseDown={handleMouseDownPassword}
//             >
//               {values.showPassword ? <Visibility /> : <VisibilityOff />}
//             </IconButton>
//           </InputAdornment>
//         }
//         inputProps={maxLength > 0 ? applyMaxLength : applyMaxLengthMissing}
//         style={width > 0 ? useWidthStyle : {}}
//         autoComplete={
//           autoFillPassword !== undefined && autoFillPassword === false
//             ? "new-password"
//             : null
//         }
//       />
//     </FormControl>
//   );
// };

// export default CtTextFieldPWD;

import React from "react";
import {
  IconButton,
  Input,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CtTextFieldPWD = ({
  id,
  label,
  value,
  width,
  handleOnChange,
  maxLength,
  onKeyDown,
  defaultAction,
  validateInput,
  nextCtrlID,
  disabled,
  variant,
  fullWidth,
  formcontrolStyle,
  autoFillPassword,
}) => {
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  // console.log("id", id);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let inputStyle = {};
  if (width && Number(width) > 0) {
    inputStyle.width = width + "px";
  }

  const applyMaxLength = { maxLength: maxLength };
  const applyMaxLengthMissing = { maxLength: 1 };

  const curVariant = variant ? variant : "standard";
  const inc = curVariant === "standard" ? 2 : 3;

  const handleOnKeyDown = onKeyDown
    ? (event) => {
        onKeyDown(event, inc, defaultAction, validateInput, nextCtrlID);
      }
    : null;

  return (
    <FormControl
      fullWidth={fullWidth ? fullWidth : false}
      style={formcontrolStyle}
      variant={curVariant}
    >
      <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
      {variant && variant === "outlined" ? (
        <OutlinedInput
          id={id}
          name={id}
          label={label}
          type={values.showPassword ? "text" : "password"}
          value={value}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          disabled={disabled}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          inputProps={maxLength > 0 ? applyMaxLength : applyMaxLengthMissing}
          style={inputStyle}
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={values.showPassword ? "text" : "password"}
          value={value}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          disabled={disabled}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          inputProps={maxLength > 0 ? applyMaxLength : applyMaxLengthMissing}
          style={inputStyle}
          autoComplete={
            autoFillPassword !== undefined && autoFillPassword === false
              ? "new-password"
              : null
          }
        />
      )}
    </FormControl>
  );
};

export default CtTextFieldPWD;
