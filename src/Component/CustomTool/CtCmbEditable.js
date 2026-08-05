import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import { AddBox } from "@mui/icons-material";
import { getRowDataList } from "../../SystemUtility/SystemUtility";
class CtCmbEditable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      previousItems: [],
    };
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onTagsInputChange = this.onTagsInputChange.bind(this);
  }

  onTagsChange = (event, values) => {
    const value =
      values && values[this.props.colID] ? values[this.props.colID] : values;
    this.setState(
      {
        tags: value,
      },
      () => {
        let curValue = value == null ? "" : value;
        this.props.handleOnChange({
          target: { name: this.props.id, value: curValue },
        });
      },
    );
  };

  onTagsInputChange = (e, value) => {
    let curValue = value == null ? "" : value;
    this.props.handleOnChange({
      target: { name: this.props.id, value: curValue },
    });
  };

  render() {
    let {
      id,
      label,
      items,
      value,
      width,
      handleOnChange,
      handleOnCmbInputChange,
      disabled,
      maxLength,
      freeSolo,
      colID,
      onAddClick,
      dataFilter,
      onKeyDown,
      defaultAction,
      validateInput,
      nextCtrlID,
      bolVisibleOnAddClickIcon,
    } = this.props;

    items = items || [];

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

    let itemList = [];
    if (dataFilter === undefined) {
      itemList = items;
    } else {
      items.map((item) => {
        if (item[colID] && item[colID].length > 0) {
          let filterValueCount = 0;
          if (dataFilter && dataFilter.length > 0) {
            let isFilterTrue = false,
              filterTrueCount = 0;
            dataFilter.filter((curFilter, filterIndex) => {
              // if (curFilter.value.length > 0) {
              // filterValueCount++
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
              // } else {
              //     isFilterTrue = false
              // }
            });
            if (
              isFilterTrue === true &&
              dataFilter.length === filterTrueCount
            ) {
              itemList.push(item);
            }
          }
          // if (Number(filterValueCount) === 0) {
          //     itemList.push(item)
          // }
        } else {
          itemList.push(item);
        }
      });
      if (
        JSON.stringify(this.state.previousItems) != JSON.stringify(itemList)
      ) {
        value = "";
        this.setState({ previousItems: itemList });
      }
    }

    //# Apply Distinct On ItemList And Return Whole RowList
    itemList = getRowDataList(itemList, colID);

    const valueFreeSolo = freeSolo && freeSolo === true ? true : false;
    let inc = 3;
    if (valueFreeSolo) {
      inc = 2;
    }
    const useWidthStyle = { width: width + "px" };
    const valueMaxLength =
      maxLength && Number(maxLength) > 0 ? Number(maxLength) : 1;
    const handleOnKeyDown = onKeyDown
      ? (event) => {
        onKeyDown(event, inc, defaultAction, validateInput, nextCtrlID);
      }
      : null;
    const defaultProps = {
      options: itemList,
      getOptionLabel: (option) =>
        option[colID] !== undefined &&
          (typeof option[colID] === "string" || option[colID] instanceof String)
          ? option[colID]
          : option,
    };
    return (
      <div style={{ display: "flex", flex: "center", alignItems: "flex-end" }}>
        <Autocomplete
          isOptionEqualToValue={(option, value) => {
            if (option[colID] !== undefined) {
              return option[colID] === value.value;
            } else {
              return option.value === value.value;
            }
          }}
          freeSolo={valueFreeSolo}
          {...defaultProps}
          autoHighlight
          id={id}
          name={id}
          value={value}
          disabled={disabled ? true : false}
          onChange={this.onTagsChange}
          onInputChange={this.onTagsInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              margin="normal"
              onKeyDown={handleOnKeyDown}
              inputProps={{
                ...params.inputProps,
                maxLength: valueMaxLength,
                form: { autocomplete: "off" },
              }}
              style={{ marginTop: "0px", marginBottom: "0px" }}
              // variant="standard"
              variant={this.props.variant || "standard"}
            />
          )}
          style={width > 0 ? useWidthStyle : {}}
        />
        {onAddClick !== undefined ? (
          <AddBox
            style={{
              paddingBottom: "4px",
              paddingLeft: "8px",
              paddingRight: "8px",
              color: "#3487D7",
              cursor: "pointer",
              display:
                bolVisibleOnAddClickIcon !== undefined &&
                  bolVisibleOnAddClickIcon == false
                  ? "none"
                  : "block",
            }}
            onClick={onAddClick}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default CtCmbEditable;
