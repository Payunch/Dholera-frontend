import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CtCmb = ({
  id,
  label,
  items = [],
  value = "",
  width,
  handleOnChange,
  disabled = false,
  variant = "standard",
  colID,
  dataFilter,
  onKeyDown,
  defaultAction,
  validateInput,
  nextCtrlID,
}) => {
  let itemList = [];
  let processedItems = items;

  if (processedItems.length > 0) {
    if (colID && processedItems[0][colID] !== undefined) {
      if (typeof processedItems[0][colID] !== "string") {
        processedItems = processedItems.map((citem) => ({
          ...citem,
          [colID]: citem[colID].toString(),
        }));
      }
    }
  }

  processedItems.forEach((item) => {
    const itemDisabled = Boolean(item.disabled);
    if (colID && item[colID] !== undefined) {
      itemList.push(
        <MenuItem value={item[colID]} disabled={itemDisabled} key={item[colID]}>
          {item[colID]}
        </MenuItem>
      );
    } else {
      itemList.push(
        <MenuItem value={item} disabled={itemDisabled} key={item}>
          {item}
        </MenuItem>
      );
    }
  });

  const handleOnKeyDown = onKeyDown
    ? (event) => {
        onKeyDown(event, 1, defaultAction, validateInput, nextCtrlID);
      }
    : null;

  const useWidthStyle = width > 0 ? { width: width + "px" } : {};

  return (
    <FormControl style={useWidthStyle} variant={variant} fullWidth={!width}>
      {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}
      <Select
        labelId={`${id}-label`}
        id={id}
        name={id}
        value={value}
        label={label}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        readOnly={disabled}
        variant={variant}
      >
        {itemList}
      </Select>
    </FormControl>
  );
};

export default CtCmb;
