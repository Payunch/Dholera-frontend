import * from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const ControlledCheckbox = ({
  id,
  label,
  checked,
  handleCheckChange,
  disabled,
  checkboxColor,
  onKeyDown,
  defaultAction,
  validateInput,
}) => {
  /* const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }; */

  const handleOnKeyDown = onKeyDown
    ? (event) => {
        onKeyDown(event, 1, defaultAction, validateInput);
      }
    : null;
  let disableStatus = false;
  // let color = "#42AA46"; //'#8556A6'
  let color = "#3487D7"; //'#8556A6'
  if (checkboxColor) {
    color = checkboxColor;
  }
  if (disabled && disabled === true) {
    disableStatus = true;
    color = null;
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          id={id}
          name={id}
          checked={checked}
          disabled={disableStatus}
          onKeyDown={handleOnKeyDown}
          // onChange={handleChange}
          onChange={handleCheckChange}
          inputProps={{ "aria-label": "controlled" }}
          style={{ color: color }}
        />
      }
      label={label}
    />
  );
};
export default ControlledCheckbox;

/* import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CtCheckBox = ({
  id, label, checked, handleCheckChange, disabled,
  onKeyDown, defaultAction, validateInput
}) => {

  const [stateChecked, setStateChecked] = React.useState(checked ? true : false);

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  const handleCheckedChange = () => {
    handleCheckChange(!stateChecked)
    setStateChecked(!stateChecked)
  }

  const handleOnKeyDown = (onKeyDown) ? ((event) => { onKeyDown(event, 1, defaultAction, validateInput) }) : (null)
  let disableStatus = false
  let color = '#8556A6'
  if (disabled && disabled === true) {
    disableStatus = true
    color = null
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          id={id}
          checked={stateChecked}
          onChange={handleCheckChange}
          onKeyDown={handleOnKeyDown}
          name={id}
          disabled={disableStatus}
          // color="primary"
          style={{ color: color }}
        />
      }
      label={label}
    />
  )
}

export default CtCheckBox */
