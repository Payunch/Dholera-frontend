import React, { Component } from "react";
import { makeStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // marginTop: theme.spacing(1),
    minWidth: 120,
  },
}));

const CtCmb = ({
  id,
  label,
  items,
  value,
  width,
  handleOnChange,
  disabled,
  variant,
  colID,
  dataFilter,
  onKeyDown,
  defaultAction,
  validateInput,
  nextCtrlID,
}) => {
  const classes = useStyles();
  const [cmbText, setCmbText] = React.useState("");

  const handleChange = (event) => {
    setCmbText(event.target.value);
  };
  const disabledStyle = { disabled: true };

  let itemList = [];

  if (items.length > 0) {
    if (items[0][colID] !== undefined) {
      if (typeof items[0][colID] != "string") {
        let stringItems = items.map((citem) => {
          return { ...citem, [colID]: citem[colID].toString() };
        });
        items = stringItems;
      }
    } else if (items[0] !== undefined) {
      if (typeof items[0] != "string") {
        let stringItems = items.map((citem) => {
          return citem.toString();
        });
        items = stringItems;
      }
    }
  }

  items.map((item) => {
    const itemDisabled =
      item.disabled && (item.disabled === true || item.disabled === "true")
        ? true
        : false;
    if (item[colID] && item[colID].length > 0) {
      let filterValueCount = 0;
      if (dataFilter && dataFilter.length > 0) {
        let isFilterTrue = false,
          filterTrueCount = 0;
        dataFilter.filter((curFilter, filterIndex) => {
          if (curFilter.value.length > 0) {
            filterValueCount++;
            if (curFilter.value === item[curFilter.filterColID]) {
              if (filterIndex > 0 && curFilter.logOp) {
                if (curFilter.logOp === "and") {
                  if (isFilterTrue === true) {
                    isFilterTrue = true;
                    filterTrueCount++;
                  } else {
                    isFilterTrue = false;
                  }
                } else {
                  isFilterTrue = true;
                  filterTrueCount++;
                }
              } else {
                isFilterTrue = true;
                filterTrueCount++;
              }
            } else {
              isFilterTrue = false;
            }
          } else {
            isFilterTrue = false;
          }
        });
        if (isFilterTrue === true && dataFilter.length === filterTrueCount) {
          itemList.push(
            <MenuItem
              value={item[colID]}
              disabled={itemDisabled}
              key={item[colID]}
            >
              {item[colID]}
            </MenuItem>,
          );
        }
      }
      if (Number(filterValueCount) === 0) {
        itemList.push(
          <MenuItem
            value={item[colID]}
            disabled={itemDisabled}
            key={item[colID]}
          >
            {item[colID]}
          </MenuItem>,
        );
      }
    } else {
      itemList.push(
        <MenuItem value={item} disabled={itemDisabled} key={item}>
          {item}
        </MenuItem>,
      );
    }
  });

  const handleOnKeyDown = onKeyDown
    ? (event) => {
        onKeyDown(event, 1, defaultAction, validateInput, nextCtrlID);
      }
    : null;

  const useWidthStyle = { width: width + "px" };

  let curVariant = variant ? variant : "standard";

  return (
    // <FormControl className={classes.formControl}>
    //   <InputLabel id="demo-simple-select-label" style={{ marginLeft: "-13px" }}>
    //     {label}
    //   </InputLabel>
    //   <Select
    //     labelId={`${id}-label`}
    //     id={id}
    //     name={id}
    //     value={value}
    //     // onChange={handleChange}
    //     onChange={handleOnChange}
    //     onKeyDown={handleOnKeyDown}
    //     style={width > 0 ? useWidthStyle : {}}
    //     // disabled={disabled}
    //     readOnly={disabled}
    //     variant={curVariant}
    //   >
    //     {itemList}
    //   </Select>
    // </FormControl>

    <FormControl
      className={classes.formControl}
      style={width > 0 ? useWidthStyle : {}}
    >
      <InputLabel id={`${id}-label`}>{label}</InputLabel>

      <Select
        labelId={`${id}-label`}
        id={id}
        name={id}
        value={value}
        label={label}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        readOnly={disabled}
        variant={curVariant}
      >
        {itemList}
      </Select>
    </FormControl>
  );
};

export default CtCmb;
