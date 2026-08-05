// import React from "react";
// import clsx from "clsx";
// import { makeStyles, useTheme } from "@mui/styles";
// import Input from "@mui/material/Input";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
// import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";
// import Chip from "@mui/material/Chip";

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//     maxWidth: 300,
//   },
//   chips: {
//     display: "flex",
//     flexWrap: "wrap",
//   },
//   chip: {
//     margin: 2,
//   },
//   noLabel: {
//     marginTop: theme.spacing(3),
//   },
// }));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(curItem, selectedItems, theme) {
//   return {
//     fontWeight:
//       selectedItems == undefined || selectedItems.indexOf(curItem) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// const MultipleSelect = ({
//   id,
//   label,
//   items,
//   width,
//   handleOnChange,
//   selectedItems,
//   disabled,
//   onKeyDown,
//   defaultAction,
//   validateInput,
// }) => {
//   const classes = useStyles();
//   const theme = useTheme();
//   const useWidthStyle = { width: width + "px" };
//   const handleOnKeyDown = onKeyDown
//     ? (event) => {
//         onKeyDown(event, 1, defaultAction, validateInput);
//       }
//     : null;

//   return (
//     <div>
//       <FormControl className={classes.formControl}>
//         <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
//         <Select
//           labelId="demo-mutiple-chip-label"
//           id={id}
//           name={id}
//           multiple
//           value={selectedItems}
//           onChange={handleOnChange}
//           input={<Input id="select-multiple-chip" />}
//           renderValue={(selected) => (
//             <div className={classes.chips}>
//               {selected.map((value) => (
//                 <Chip key={value} label={value} className={classes.chip} />
//               ))}
//             </div>
//           )}
//           MenuProps={MenuProps}
//           style={width > 0 ? useWidthStyle : {}}
//           readOnly={disabled}
//           onKeyDown={handleOnKeyDown}
//         >
//           {items.map((item) => (
//             <MenuItem
//               key={item}
//               value={item}
//               style={getStyles(item, selectedItems, theme)}
//             >
//               {item}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default MultipleSelect;

import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@mui/styles";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    // marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// function getStyles(curItem, selectedItems, theme) {
//     return {
//         fontWeight:
//             selectedItems == undefined || selectedItems.indexOf(curItem) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     };
// }

const MultipleSelect = ({
  id,
  label,
  items,
  width,
  handleOnChange,
  selectedItems,
  disabled,
  onKeyDown,
  defaultAction,
  validateInput,
  colID,
  dataFilter,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const useWidthStyle = { width: width + "px" };

  let itemList = [];
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
            </MenuItem>
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
          </MenuItem>
        );
      }
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
        onKeyDown(event, 1, defaultAction, validateInput);
      }
    : null;

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id={id}
          name={id}
          multiple
          value={selectedItems}
          onChange={handleOnChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
          style={width > 0 ? useWidthStyle : {}}
          readOnly={disabled}
          onKeyDown={handleOnKeyDown}
        >
          {/* {items.map((item) => (
                        <MenuItem key={item} value={item}> 
                            {item}
                        </MenuItem>
                    ))} */}
          {itemList}
        </Select>
      </FormControl>
      {/* //style={getStyles(item, selectedItems, theme)} */}
    </div>
  );
};

export default MultipleSelect;
