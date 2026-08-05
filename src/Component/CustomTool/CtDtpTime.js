import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function MaterialUIPickers({
  id,
  label,
  disabled,
  readOnly,
  value,
  showToolbar,
  views,
  handleOnChange,
  dateTimeFormat,
  variant,
  width,
  onKeyDown,
  defaultAction,
  validateInput,
}) {
  let curVariant = variant ? variant : "standard";
  let inputStyle = {};
  const handleChange = (newValue) => {
    handleOnChange({
      target: { name: id, value: dayjs(newValue ? newValue.$d : "").format() },
    });
  };
  let curDateTimeFormat = dateTimeFormat
    ? dateTimeFormat
    : "DD/MM/YYYY hh:mm A";
  let viewsList = views ? views : ["year", "month", "day", "hours", "minutes"];
  const handleOnKeyDown = onKeyDown
    ? (event) => {
        onKeyDown(event, 1, defaultAction, validateInput);
      }
    : null;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        id={id}
        name={id}
        label={label}
        value={dayjs(value)}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readOnly}
        onKeyDown={handleOnKeyDown}
      />
    </LocalizationProvider>
  );
}
