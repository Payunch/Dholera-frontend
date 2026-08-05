// /*** Version 2.0 */

import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Search, Close, Add, Rowing } from "@mui/icons-material";
import {
  Tooltip,
  IconButton,
  Checkbox,
  Grid,
  Typography,
  Card,
} from "@mui/material";
import CtCheckBox from "./CtCheckBox";
// import CtTxtAdornNum from './CtTxtAdornNum'
import CtCmb from "./CtCmb";
import CtCmbEditable from "./CtCmbEditable";
import CtTxt from "./CtTxt";
import CtTxtNum from "./CtTxtNum";
import CtTxtAmt from "./CtTxtAmt";
import CtTxtSave from "./CtTxtSave";
import CtDtp from "./CtDtp";
import CtPhoneNumber from "./CtPhoneNumber";
import CtMultiLineText from "./CtMultiLineText";
import HoCtToastContainer from "../../HOC/HoCtToastContainer";

class TableList extends Component {
  state = {
    page: 0,
    rows: [
      {
        ID: "",
        Scheme: "",
        ReferenceCode: "",
        SponsorId: "",
        Name: "",
        MobileNo: "",
      },
    ],
    rowsCount: 0,
    columns: [],
    searchColumns: [],
    searchOpen: false,
    searchData: {},
    provideSearch: this.props.provideSearch,
    autoEnableDisalbe_Col_Info: [],
    inputColsInfo: {
      firstColIndex: undefined,
      firstColID: undefined,
      lastColIndex: undefined,
      lastColID: undefined,
    },
    theme: {
      tableborder: { border: "0.5px solid rgb(23,124,221)" },
      cellborder: { border: "0.5px solid rgb(185,215,244)" },
    },
    noMobileLayout: this.props.noMobileLayout ? true : false,
    searchColumnData: {},
  };

  listResult = "Processing the List";

  componentDidMount() {
    this.handleChangeColumnsRows();
  }

  handleChangeColumnsRows = () => {
    const columns = this.props.columns;
    const rows = this.props.rows;
    const rowsCount = this.props.rowsCount;
    const inputColsInfo = this.getInputColsInfo(columns);
    const searchColumnData = {};
    columns.filter((col) => {
      if (col.hide !== true) {
        searchColumnData[col.id] = "";
      }
    });
    this.setState({
      columns,
      rows,
      rowsCount,
      inputColsInfo,
      searchColumnData,
    });
  };

  getInputColsInfo = (columns) => {
    const rows = this.props.rows;
    let inputColsInfo = {};
    // let userows = true;
    // if (userows == this.props.useInputbyRow) {
    //   rows.map((col, index) => {
    //     if (
    //       col.type &&
    //       (col.type === "CtTxtAmt" ||
    //         col.type === "CtTxtNum" ||
    //         col.type === "CtTxtNum" ||
    //         col.type === "CtDtp" ||
    //         col.type === "CtMultiLineText")
    //     ) {
    //       if (
    //         inputColsInfo.firstColID === undefined &&
    //         inputColsInfo.firstColIndex === undefined
    //       ) {
    //         //#To Set first col info
    //         inputColsInfo["firstColIndex"] = index;
    //         inputColsInfo["firstColID"] = col.id;
    //       } else {
    //         //#To Set last col info
    //         inputColsInfo["lastColIndex"] = index;
    //         inputColsInfo["lastColID"] = col.id;
    //       }
    //     }
    //   });
    // } else {
    columns.map((col, index) => {
      if (
        col.type &&
        (col.type === "CtTxtAmt" ||
          col.type === "CtTxtNum" ||
          col.type === "CtTxtNum" ||
          col.type === "CtDtp" ||
          col.type === "CtMultiLineText")
      ) {
        if (
          inputColsInfo.firstColID === undefined &&
          inputColsInfo.firstColIndex === undefined
        ) {
          //#To Set first col info
          inputColsInfo["firstColIndex"] = index;
          inputColsInfo["firstColID"] = col.id;
        } else {
          //#To Set last col info
          inputColsInfo["lastColIndex"] = index;
          inputColsInfo["lastColID"] = col.id;
        }
      }
    });
    // }
    if (
      inputColsInfo.lastColID === undefined &&
      inputColsInfo.lastColIndex === undefined
    ) {
      inputColsInfo.lastColID = inputColsInfo.firstColID;
      inputColsInfo.lastColIndex = inputColsInfo.lastColIndex;
    }
    return inputColsInfo;
  };

  getNextCtrlID = (rowIndex, colIndex) => {
    let nextCtrlID = undefined;
    if (
      this.state.inputColsInfo.firstColID !== undefined &&
      this.state.inputColsInfo.firstColIndex !== undefined &&
      this.state.inputColsInfo.lastColID !== undefined &&
      this.state.inputColsInfo.lastColIndex !== undefined &&
      rowIndex < this.state.rows.length - 1 &&
      Number(colIndex) === Number(this.state.inputColsInfo.lastColIndex)
    ) {
      nextCtrlID =
        this.state.inputColsInfo.firstColID +
        "#" +
        (Number(rowIndex) + 1) +
        "#" +
        this.state.inputColsInfo.firstColIndex;
    }
    return nextCtrlID;
  };

  getNextCtrlIDNew = (rowIndex, colIndex, column_id) => {
    const data = this.props.columns;
    const rowsdata = this.props.rows;
    const index = data.findIndex((item) => item.id === column_id);
    if (index === -1) return;

    if (colIndex === data.length - 1) {
      rowIndex += 1;
      colIndex = -1;
    }

    const isLastRow = rowIndex === this.props.rows.length - 1;
    const isLastCol = colIndex === this.props.columns.length - 1;

    

    let nextVisible = null;
    let ifDisabledThenPlus = 0;
    const len = data.length;
    const currentRow = rowsdata[rowIndex] || {};

    for (let offset = 1; offset <= len; offset++) {
      const newIndex = (index + offset) % len;
      const item = data[newIndex];
      const fieldName = item.id;
    // console.log("isLastRow", isLastRow);
    // console.log("isLastCol", isLastCol);
      if (
        item.id === "Action" ||
        item.hide ||
        (item.CtrlProps && item.CtrlProps.disabled === true) ||
        // (currentRow.focus && currentRow.focus[fieldName] === true)
        (item.CtrlProps && item.CtrlProps.focus === false) ||
        (isLastRow && isLastCol)
      ) {
        ifDisabledThenPlus++;
        continue;
      }

      nextVisible = item;
      break;
    }

    return nextVisible
      ? `${nextVisible.id}#${rowIndex}#${colIndex + 1 + ifDisabledThenPlus}`
      : undefined;
  };

  setPage = (pageNumber) => {
    this.setState({ page: pageNumber });
  };

  setRowsPerPage = (rowsPerPage) => {
    this.setState({ rowsPerPage });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleChangeRowsPerPage = (event, tblIndex) => {
    this.setRowsPerPage(+event.target.value);
    this.setPage(0);
    if (this.props.handleChangeRowsPerPage) {
      this.props.handleChangeRowsPerPage(event.target.value, tblIndex);
    }
  };

  componentWillReceiveProps(newProps) {
    this.setState(
      {
        rows: newProps.rows,
        rowsCount: newProps.rowsCount,
        searchColumns: newProps.searchColumns,
        searchData: newProps.searchData,
        provideSearch: newProps.provideSearch,
        columns: newProps.columns,
      },
      () => {
        // console.log('columns in TableList @ ', this.state.columns)
      },
    );
  }

  handleOnChangeRowCtrlChk = (e, behaviour) => {
    if (this.props.handleOnRowDataChange) {
      const nameParts = e.target.name.split("#"),
        colID = nameParts[0],
        rowIndex = Number(nameParts[1]);
      let rows = this.state.rows.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [colID]:
              behaviour && behaviour.toLowerCase() === "radio"
                ? true
                : e.target.checked,
          };
        } else {
          if (
            e.target.checked === true &&
            behaviour &&
            behaviour.toLowerCase() === "radio" /*  && index !== rowIndex */
          ) {
            return { ...row, [colID]: false };
          } else {
            return row;
          }
        }
      });
      this.props.handleOnRowDataChange(rows, rowIndex, colID);
    } else {
      alert("Missing props handleOnRowDataChange for TableList");
    }
  };

  handleOnChangeRowCtrl = (e) => {
    if (this.props.handleOnRowDataChange) {
      const nameParts = e.target.name.split("#"),
        colID = nameParts[0],
        rowIndex = Number(nameParts[1]);
      let rows = this.state.rows.map((row, index) => {
        if (index === rowIndex) {
          return { ...row, [colID]: e.target.value };
        } else {
          return row;
        }
      });
      this.props.handleOnRowDataChange(rows, rowIndex, colID);
    } else {
      alert("Missing props handleOnRowDataChange for TableList");
    }
  };

  handleOnChangeColHeaderCtrl = (e) => {
    if (this.props.handleOnColumnChange) {
      const nameParts = e.target.name.split("#"),
        colID = nameParts[0],
        colIndex = Number(nameParts[1]);
      let columns = this.state.columns.map((column, index) => {
        if (column.id === colID) {
          return {
            ...column,
            headerCtrlProps: {
              ...column.headerCtrlProps,
              value: e.target.value,
            },
          };
        } else {
          return column;
        }
      });
      this.props.handleOnColumnChange(columns);
    } else {
      alert("Missing props handleOnColumnChange for TableList");
    }
  };

  handleOnSaveClick = (id) => {
    this.props.toastMsg("success", `${id} Save`);
  };

  CtrlChk = ({
    column_id,
    rowIndex,
    colIndex,
    actionIndex,
    label,
    checked,
    behaviour,
    disabled,
  }) => {
    let ctrlID = this.getCtrlID(rowIndex, colIndex, actionIndex, column_id);
    return (
      <CtCheckBox
        checkboxColor={"#177CDD"}
        label={label}
        checked={checked}
        id={ctrlID}
        handleCheckChange={(e) => this.handleOnChangeRowCtrlChk(e, behaviour)}
        disabled={disabled}
      />
    );
  };

  CtrlTxt = ({
    column_id,
    rowIndex,
    colIndex,
    label,
    value,
    width,
    maxLength,
    disabled,
  }) => {
    let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
    return (
      <CtTxt
        id={ctrlID}
        label={label}
        value={value}
        handleOnChange={this.handleOnChangeRowCtrl}
        width={width}
        maxLength={maxLength}
        disabled={disabled}
        onKeyDown={this.props.onKeyDown}
        // nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
        nextCtrlID={this.getNextCtrlIDNew(rowIndex, colIndex, column_id)}
      />
    );
  };

  CtrlDtp = ({
    column_id,
    rowIndex,
    colIndex,
    label,
    value,
    width,
    disabled,
  }) => {
    let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
    return (
      <CtDtp
        id={ctrlID}
        label={label}
        value={value}
        handleOnChange={this.handleOnChangeRowCtrl}
        width={width}
        disabled={disabled}
        onKeyDown={this.props.onKeyDown}
        // nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
        nextCtrlID={this.getNextCtrlIDNew(rowIndex, colIndex, column_id)}
      />
    );
  };

  CtrlTxtNum = ({
    column_id,
    rowIndex,
    colIndex,
    label,
    value,
    width,
    maxLength,
    disabled,
  }) => {
    let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
    return (
      <CtTxtNum
        id={ctrlID}
        label={label}
        value={value}
        handleOnChange={this.handleOnChangeRowCtrl}
        width={width}
        maxLength={maxLength}
        disabled={disabled}
        onKeyDown={this.props.onKeyDown}
        // nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
        nextCtrlID={this.getNextCtrlIDNew(rowIndex, colIndex, column_id)}
      />
    );
  };

  CtrlTxtAmt = ({
    column_id,
    rowIndex,
    colIndex,
    label,
    value,
    width,
    maxLength,
    disabled,
  }) => {
    let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
    return (
      <CtTxtAmt
        id={ctrlID}
        label={label}
        value={value}
        handleOnChange={this.handleOnChangeRowCtrl}
        width={width}
        maxLength={maxLength}
        disabled={disabled}
        onKeyDown={this.props.onKeyDown}
        // nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}.
        nextCtrlID={this.getNextCtrlIDNew(rowIndex, colIndex, column_id)}
      />
    );
  };

  CtrlTxtSave = ({
    column_id,
    rowIndex,
    colIndex,
    label,
    value,
    width,
    maxLength,
    disabled,
    icon,
    type,
  }) => {
    let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
    return (
      <CtTxtSave
        id={ctrlID}
        label={label}
        value={value}
        handleOnChange={this.handleOnChangeRowCtrl}
        width={width}
        type={type}
        maxLength={maxLength}
        handleOnSaveClick={() => {
          this.handleOnSaveClick(ctrlID);
        }}
        disabled={disabled}
        icon={icon}
        onKeyDown={this.props.onKeyDown}
        // nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
        nextCtrlID={this.getNextCtrlIDNew(rowIndex, colIndex, column_id)}
      />
    );
  };

  CtrlMultiLineText = ({
    column_id,
    rowIndex,
    colIndex,
    label,
    value,
    width,
    maxLength,
    disabled,
  }) => {
    let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
    // console.log(`ctrlID: ${ctrlID}, rowIndex: ${rowIndex}, colIndex: ${colIndex}, firstColIndex: ${this.state.inputColsInfo.firstColIndex}, firstColID: ${this.state.inputColsInfo.firstColID}, lastColIndex: ${this.state.inputColsInfo.lastColIndex}, lastColID: ${this.state.inputColsInfo.lastColID}`)
    return (
      <CtMultiLineText
        id={ctrlID}
        label={label}
        value={value}
        handleOnChange={this.handleOnChangeRowCtrl}
        width={width}
        maxLength={maxLength}
        disabled={disabled}
        onKeyDown={this.props.onKeyDown}
        // nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
        nextCtrlID={this.getNextCtrlIDNew(rowIndex, colIndex, column_id)}
      />
    );
  };

  CtrlCmb = ({
    column_id,
    rowIndex,
    colIndex,
    label,
    items,
    colID,
    value,
    width,
    maxLength,
    disabled,
  }) => {
    // console.log("disabled", disabled);
    let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
    return (
      <CtCmb
        id={ctrlID}
        label={label}
        items={items}
        value={value}
        handleOnChange={
          rowIndex === -1
            ? this.handleOnChangeColHeaderCtrl
            : this.handleOnChangeRowCtrl
        }
        width={width}
        maxLength={maxLength}
        disabled={disabled}
        colID={colID}
        onKeyDown={this.props.onKeyDown}
        // nextCtrlID={
        //   rowIndex === -1 ? undefined : this.getNextCtrlID(rowIndex, colIndex)
        // }
        // nextCtrlID={this.getNextCtrlIDNew(rowIndex, colIndex, column_id)}
      />
    );
  };

  CtrlCmbEditable = ({
    column_id,
    rowIndex,
    colIndex,
    label,
    items,
    colID,
    value,
    width,
    maxLength,
    disabled,
  }) => {
    // console.log("disabled", disabled);
    let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
    return (
      <CtCmbEditable
        id={ctrlID}
        label={label}
        items={items}
        value={value}
        handleOnChange={
          rowIndex === -1
            ? this.handleOnChangeColHeaderCtrl
            : this.handleOnChangeRowCtrl
        }
        width={width}
        maxLength={maxLength}
        disabled={disabled}
        colID={colID}
        onKeyDown={this.props.onKeyDown}
        // nextCtrlID={
        //   rowIndex === -1 ? undefined : this.getNextCtrlID(rowIndex, colIndex)
        // }
        nextCtrlID={this.getNextCtrlIDNew(rowIndex, colIndex, column_id)}
      />
    );
  };

  checkConditionOnRow = (conditions, row) => {
    let conditionFinalResult = false,
      iterationResults = [];

    conditions.forEach((curcondition) => {
      let conditionResult = false;
      if (
        curcondition.relationalOperator === undefined ||
        curcondition.relationalOperator == "=="
      ) {
        if (row[curcondition.colID] == curcondition.value)
          conditionResult = true;
      } else if (
        curcondition.relationalOperator &&
        curcondition.relationalOperator == "==="
      ) {
        if (row[curcondition.colID] === curcondition.value)
          conditionResult = true;
      } else if (
        curcondition.relationalOperator &&
        curcondition.relationalOperator == "!="
      ) {
        if (row[curcondition.colID] != curcondition.value)
          conditionResult = true;
      } else if (
        curcondition.relationalOperator &&
        curcondition.relationalOperator == "!=="
      ) {
        if (row[curcondition.colID] !== curcondition.value)
          conditionResult = true;
      } else if (
        curcondition.relationalOperator &&
        curcondition.relationalOperator == "<="
      ) {
        if (row[curcondition.colID] <= curcondition.value)
          conditionResult = true;
      } else if (
        curcondition.relationalOperator &&
        curcondition.relationalOperator == "<"
      ) {
        if (row[curcondition.colID] < curcondition.value)
          conditionResult = true;
      } else if (
        curcondition.relationalOperator &&
        curcondition.relationalOperator == ">="
      ) {
        if (row[curcondition.colID] >= curcondition.value)
          conditionResult = true;
      } else if (
        curcondition.relationalOperator &&
        curcondition.relationalOperator == ">"
      ) {
        if (row[curcondition.colID] > curcondition.value)
          conditionResult = true;
      }
      iterationResults.push({
        conditionResult,
        logicalOperator:
          curcondition.logicalOperator &&
          curcondition.logicalOperator.length > 0
            ? curcondition.logicalOperator
            : null,
      });
    });

    if (iterationResults.length === 1) {
      conditionFinalResult = iterationResults[0].conditionResult;
    } else {
      iterationResults.forEach((curResult) => {
        if (curResult.logicalOperator === null) {
          conditionFinalResult = curResult.conditionResult;
        } else {
          if (curResult.logicalOperator === "&&") {
            conditionFinalResult =
              conditionFinalResult && curResult.conditionResult;
          } else {
            conditionFinalResult =
              conditionFinalResult || curResult.conditionResult;
          }
        }
      });
    }
    return conditionFinalResult;
  };

  displayCurrentHeader = (colIndex, column, value) => {
    let cellValue = "",
      rowIndex = -1;
    if (column.headertype && column.headertype === "CtCmb") {
      let items = [],
        visible = true,
        disabled =
          column.headerCtrlProps &&
          column.headerCtrlProps.disabled !== undefined
            ? column.headerCtrlProps.disabled
            : false;
      if (column.headerCtrlProps.items) {
        items = column.headerCtrlProps.items;
      }
      cellValue =
        visible === true
          ? this.CtrlCmb({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.headerCtrlProps &&
                column.headerCtrlProps.label !== undefined
                  ? column.headerCtrlProps.label
                  : "",
              items,
              colID: column.headerCtrlProps.colID,
              value:
                column.headerCtrlProps &&
                column.headerCtrlProps.value !== undefined
                  ? column.headerCtrlProps.value
                  : "",
              width:
                column.headerCtrlProps &&
                column.headerCtrlProps.width !== undefined
                  ? column.headerCtrlProps.width
                  : 50,
              maxLength:
                column.headerCtrlProps &&
                column.headerCtrlProps.maxLength !== undefined
                  ? column.headerCtrlProps.maxLength
                  : 1,
              disabled,
            })
          : "";
    }
    if (column.headertype && column.headertype === "CtCmbEditable") {
      let items = [],
        visible = true,
        disabled =
          column.headerCtrlProps &&
          column.headerCtrlProps.disabled !== undefined
            ? column.headerCtrlProps.disabled
            : false;
      if (column.headerCtrlProps.items) {
        items = column.headerCtrlProps.items;
      }
      cellValue =
        visible === true
          ? this.CtrlCmbEditable({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.headerCtrlProps &&
                column.headerCtrlProps.label !== undefined
                  ? column.headerCtrlProps.label
                  : "",
              items,
              colID: column.headerCtrlProps.colID,
              value:
                column.headerCtrlProps &&
                column.headerCtrlProps.value !== undefined
                  ? column.headerCtrlProps.value
                  : "",
              width:
                column.headerCtrlProps &&
                column.headerCtrlProps.width !== undefined
                  ? column.headerCtrlProps.width
                  : 50,
              maxLength:
                column.headerCtrlProps &&
                column.headerCtrlProps.maxLength !== undefined
                  ? column.headerCtrlProps.maxLength
                  : 1,
              disabled,
            })
          : "";
    } else {
      cellValue = value;
    }
    return cellValue;
  };

  displayCurrentCell = (colIndex, column, value, row, rowIndex) => {
    let cellValue = "";
    if (
      colIndex === 0 &&
      this.props.actionList &&
      this.props.actionList.length > 0
    ) {
      cellValue = this.props.actionList.map((action, actionIndex) => {
        let result = null;
        if (
          (action.actionType &&
            action.actionType === "Conditional" &&
            action.visiblecondition &&
            action.visiblecondition.length > 0) ||
          (action.visiblecondition && action.visiblecondition.length > 0)
        ) {
          if (this.checkConditionOnRow(action.visiblecondition, row) === true) {
            result = this.getActionIcon(action, row);
          }
        } else if (action.hide !== undefined) {
          if (!(action.hide === true || action.hide === "true")) {
            result = this.getActionIcon(action, row);
          }
        } else if (action.actionType && action.actionType === "Chk") {
          result = this.CtrlChk({
            column_id: column.id,
            rowIndex,
            colIndex,
            actionIndex,
            label:
              action.CtrlProps && action.CtrlProps.label !== undefined
                ? action.CtrlProps.label
                : "",
            checked: row[column.id] !== undefined ? row[column.id] : false,
            behaviour:
              action.CtrlProps && action.CtrlProps.behaviour
                ? action.CtrlProps.behaviour
                : undefined,
            disabled:
              column.CtrlProps &&
              column.CtrlProps.disablecondition &&
              this.checkConditionOnRow(
                column.CtrlProps.disablecondition,
                row,
              ) === true
                ? true
                : false,
          });
        } else {
          result = this.getActionIcon(action, row);
        }
        // console.log("result", result);

        return result;
      });
      if (cellValue.length > 0) {
        cellValue = <div style={{ display: "flex" }}>{cellValue}</div>;
      }
    } else if (
      row.vac_fecontroltype &&
      row.vac_fecontroltype === "CtTxt" &&
      column.id == row.inputColumnName
    ) {
      let visible =
          column.CtrlProps &&
          column.CtrlProps.visiblecondition &&
          this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
            true
            ? false
            : true,
        disabled =
          column.CtrlProps && column.CtrlProps.disabled !== undefined
            ? column.CtrlProps.disabled
            : column.CtrlProps &&
                column.CtrlProps.disablecondition &&
                this.checkConditionOnRow(
                  column.CtrlProps.disablecondition,
                  row,
                ) === true
              ? true
              : false;
      cellValue =
        visible === true
          ? this.CtrlTxt({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.CtrlProps && column.CtrlProps.label !== undefined
                  ? column.CtrlProps.label
                  : "",
              value:
                row[column.id] !== undefined
                  ? row[column.id]
                  : column.CtrlProps && column.CtrlProps.defValue !== undefined
                    ? column.CtrlProps.defValue
                    : "",
              width:
                column.CtrlProps && column.CtrlProps.width !== undefined
                  ? column.CtrlProps.width
                  : 50,
              maxLength:
                column.CtrlProps && column.CtrlProps.maxLength !== undefined
                  ? column.CtrlProps.maxLength
                  : 1,
              disabled,
            })
          : "";
    } else if (
      row.vac_fecontroltype &&
      row.vac_fecontroltype === "CtTxtAmt" &&
      column.id == row.inputColumnName
    ) {
      let visible =
          column.CtrlProps &&
          column.CtrlProps.visiblecondition &&
          this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
            true
            ? false
            : true,
        disabled =
          column.CtrlProps && column.CtrlProps.disabled !== undefined
            ? column.CtrlProps.disabled
            : column.CtrlProps &&
                column.CtrlProps.disablecondition &&
                this.checkConditionOnRow(
                  column.CtrlProps.disablecondition,
                  row,
                ) === true
              ? true
              : false;
      cellValue =
        visible === true
          ? this.CtrlTxtAmt({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.CtrlProps && column.CtrlProps.label !== undefined
                  ? column.CtrlProps.label
                  : "",
              value:
                row[column.id] !== undefined
                  ? row[column.id]
                  : column.CtrlProps && column.CtrlProps.defValue !== undefined
                    ? column.CtrlProps.defValue
                    : "",
              width:
                column.CtrlProps && column.CtrlProps.width !== undefined
                  ? column.CtrlProps.width
                  : 50,
              maxLength:
                column.CtrlProps && column.CtrlProps.maxLength !== undefined
                  ? column.CtrlProps.maxLength
                  : 1,
              disabled,
            })
          : "";
    } else if (
      row.vac_fecontroltype &&
      row.vac_fecontroltype === "CtCmbEditable" &&
      column.id == row.inputColumnName
    ) {
      let items = row.ListData,
        visible =
          column.CtrlProps &&
          column.CtrlProps.visiblecondition &&
          this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
            true
            ? false
            : true,
        disabled =
          column.CtrlProps && column.CtrlProps.disabled !== undefined
            ? column.CtrlProps.disabled
            : column.CtrlProps &&
                column.CtrlProps.disablecondition &&
                this.checkConditionOnRow(
                  column.CtrlProps.disablecondition,
                  row,
                ) === true
              ? true
              : false;

      console.log("items", items);

      cellValue =
        visible === true
          ? this.CtrlCmbEditable({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.CtrlProps && column.CtrlProps.label !== undefined
                  ? column.CtrlProps.label
                  : "",
              items,
              colID: column.id,
              value:
                row[column.id] !== undefined
                  ? row[column.id]
                  : column.CtrlProps && column.CtrlProps.defValue !== undefined
                    ? column.CtrlProps.defValue
                    : "",
              width:
                column.CtrlProps && column.CtrlProps.width !== undefined
                  ? column.CtrlProps.width
                  : 50,
              maxLength:
                column.CtrlProps && column.CtrlProps.maxLength !== undefined
                  ? column.CtrlProps.maxLength
                  : 1,
              disabled,
            })
          : "";
    } else if (column.format && value) {
      // alert("before format cellValue : " + cellValue);
      cellValue = column.format(value);
      // alert('after format cellValue : ' + cellValue)
    } else if (column.type && column.type === "Chk") {
      let visible =
        column.CtrlProps &&
        column.CtrlProps.visiblecondition &&
        this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
          true
          ? false
          : true;
      cellValue =
        visible === true
          ? this.CtrlChk({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.CtrlProps && column.CtrlProps.label !== undefined
                  ? column.CtrlProps.label
                  : "",
              checked: row[column.id] !== undefined ? row[column.id] : false,
              behaviour:
                column.CtrlProps && column.CtrlProps.behaviour
                  ? column.CtrlProps.behaviour
                  : undefined,
              disabled:
                column.CtrlProps && column.CtrlProps.disabled !== undefined
                  ? column.CtrlProps.disabled
                  : column.CtrlProps &&
                      column.CtrlProps.disablecondition &&
                      this.checkConditionOnRow(
                        column.CtrlProps.disablecondition,
                        row,
                      ) === true
                    ? true
                    : false,
            })
          : "";
    } else if (column.type && column.type === "CtDtp") {
      let visible =
          column.CtrlProps &&
          column.CtrlProps.visiblecondition &&
          this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
            true
            ? false
            : true,
        disabled =
          column.CtrlProps && column.CtrlProps.disabled !== undefined
            ? column.CtrlProps.disabled
            : column.CtrlProps &&
                column.CtrlProps.disablecondition &&
                this.checkConditionOnRow(
                  column.CtrlProps.disablecondition,
                  row,
                ) === true
              ? true
              : false;
      cellValue =
        visible === true
          ? this.CtrlDtp({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.CtrlProps && column.CtrlProps.label !== undefined
                  ? column.CtrlProps.label
                  : "",
              value:
                row[column.id] !== undefined
                  ? row[column.id]
                  : column.CtrlProps && column.CtrlProps.defValue !== undefined
                    ? column.CtrlProps.defValue
                    : "",
              width:
                column.CtrlProps && column.CtrlProps.width !== undefined
                  ? column.CtrlProps.width
                  : 120,
              disabled,
            })
          : "";
    } else if (column.type && column.type === "CtTxt") {
      let visible =
          column.CtrlProps &&
          column.CtrlProps.visiblecondition &&
          this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
            true
            ? false
            : true,
        disabled =
          column.CtrlProps && column.CtrlProps.disabled !== undefined
            ? column.CtrlProps.disabled
            : column.CtrlProps &&
                column.CtrlProps.disablecondition &&
                this.checkConditionOnRow(
                  column.CtrlProps.disablecondition,
                  row,
                ) === true
              ? true
              : false;
      cellValue =
        visible === true
          ? this.CtrlTxt({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.CtrlProps && column.CtrlProps.label !== undefined
                  ? column.CtrlProps.label
                  : "",
              value:
                row[column.id] !== undefined
                  ? row[column.id]
                  : column.CtrlProps && column.CtrlProps.defValue !== undefined
                    ? column.CtrlProps.defValue
                    : "",
              width:
                column.CtrlProps && column.CtrlProps.width !== undefined
                  ? column.CtrlProps.width
                  : 50,
              maxLength:
                column.CtrlProps && column.CtrlProps.maxLength !== undefined
                  ? column.CtrlProps.maxLength
                  : 1,
              disabled,
            })
          : "";
    } else if (column.type && column.type === "CtTxtAmt") {
      let visible =
          column.CtrlProps &&
          column.CtrlProps.visiblecondition &&
          this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
            true
            ? false
            : true,
        disabled =
          column.CtrlProps && column.CtrlProps.disabled !== undefined
            ? column.CtrlProps.disabled
            : column.CtrlProps &&
                column.CtrlProps.disablecondition &&
                this.checkConditionOnRow(
                  column.CtrlProps.disablecondition,
                  row,
                ) === true
              ? true
              : false;
      cellValue =
        visible === true
          ? this.CtrlTxtAmt({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.CtrlProps && column.CtrlProps.label !== undefined
                  ? column.CtrlProps.label
                  : "",
              value:
                row[column.id] !== undefined
                  ? row[column.id]
                  : column.CtrlProps && column.CtrlProps.defValue !== undefined
                    ? column.CtrlProps.defValue
                    : "",
              width:
                column.CtrlProps && column.CtrlProps.width !== undefined
                  ? column.CtrlProps.width
                  : 50,
              maxLength:
                column.CtrlProps && column.CtrlProps.maxLength !== undefined
                  ? column.CtrlProps.maxLength
                  : 1,
              disabled,
            })
          : "";
    } else if (column.type && column.type === "CtTxtSave") {
      let visible =
          column.CtrlProps &&
          column.CtrlProps.visiblecondition &&
          this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
            true
            ? false
            : true,
        disabled =
          column.CtrlProps && column.CtrlProps.disabled !== undefined
            ? column.CtrlProps.disabled
            : column.CtrlProps &&
                column.CtrlProps.disablecondition &&
                this.checkConditionOnRow(
                  column.CtrlProps.disablecondition,
                  row,
                ) === true
              ? true
              : false;
      cellValue =
        visible === true
          ? this.CtrlTxtSave({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.CtrlProps && column.CtrlProps.label !== undefined
                  ? column.CtrlProps.label
                  : "",
              value:
                row[column.id] !== undefined
                  ? row[column.id]
                  : column.CtrlProps && column.CtrlProps.defValue !== undefined
                    ? column.CtrlProps.defValue
                    : "",
              width:
                column.CtrlProps && column.CtrlProps.width !== undefined
                  ? column.CtrlProps.width
                  : 50,
              maxLength:
                column.CtrlProps && column.CtrlProps.maxLength !== undefined
                  ? column.CtrlProps.maxLength
                  : 1,
              disabled,
              icon:
                column.CtrlProps && column.CtrlProps.icon !== undefined
                  ? column.CtrlProps.icon
                  : "",
              type:
                column.CtrlProps && column.CtrlProps.type !== undefined
                  ? column.CtrlProps.type
                  : "",
            })
          : "";
    } else if (column.type && column.type === "CtTxtNum") {
      let visible =
          column.CtrlProps &&
          column.CtrlProps.visiblecondition &&
          this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
            true
            ? false
            : true,
        disabled =
          column.CtrlProps && column.CtrlProps.disabled !== undefined
            ? column.CtrlProps.disabled
            : column.CtrlProps &&
                column.CtrlProps.disablecondition &&
                this.checkConditionOnRow(
                  column.CtrlProps.disablecondition,
                  row,
                ) === true
              ? true
              : false;
      cellValue =
        visible === true
          ? this.CtrlTxtNum({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.CtrlProps && column.CtrlProps.label !== undefined
                  ? column.CtrlProps.label
                  : "",
              value:
                row[column.id] !== undefined
                  ? row[column.id]
                  : column.CtrlProps && column.CtrlProps.defValue !== undefined
                    ? column.CtrlProps.defValue
                    : "",
              width:
                column.CtrlProps && column.CtrlProps.width !== undefined
                  ? column.CtrlProps.width
                  : 50,
              maxLength:
                column.CtrlProps && column.CtrlProps.maxLength !== undefined
                  ? column.CtrlProps.maxLength
                  : 1,
              disabled,
            })
          : "";
    } else if (column.type && column.type === "CtMultiLineText") {
      let visible =
          column.CtrlProps &&
          column.CtrlProps.visiblecondition &&
          this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
            true
            ? false
            : true,
        disabled =
          column.CtrlProps && column.CtrlProps.disabled !== undefined
            ? column.CtrlProps.disabled
            : column.CtrlProps &&
                column.CtrlProps.disablecondition &&
                this.checkConditionOnRow(
                  column.CtrlProps.disablecondition,
                  row,
                ) === true
              ? true
              : false;
      cellValue =
        visible === true
          ? this.CtrlMultiLineText({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.CtrlProps && column.CtrlProps.label !== undefined
                  ? column.CtrlProps.label
                  : "",
              value:
                row[column.id] !== undefined
                  ? row[column.id]
                  : column.CtrlProps && column.CtrlProps.defValue !== undefined
                    ? column.CtrlProps.defValue
                    : "",
              width:
                column.CtrlProps && column.CtrlProps.width !== undefined
                  ? column.CtrlProps.width
                  : 100,
              maxLength:
                column.CtrlProps && column.CtrlProps.maxLength !== undefined
                  ? column.CtrlProps.maxLength
                  : 1,
              disabled,
            })
          : "";
    } else if (column.type && column.type === "CtCmb") {
      let items = [],
        visible =
          column.CtrlProps &&
          column.CtrlProps.visiblecondition &&
          this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
            true
            ? false
            : true,
        disabled =
          column.CtrlProps && column.CtrlProps.disabled !== undefined
            ? column.CtrlProps.disabled
            : column.CtrlProps &&
                column.CtrlProps.disablecondition &&
                this.checkConditionOnRow(
                  column.CtrlProps.disablecondition,
                  row,
                ) === true
              ? true
              : false;
      if (
        column.CtrlProps.rowItemsColID &&
        row[column.CtrlProps.rowItemsColID]
      ) {
        items = row[column.CtrlProps.rowItemsColID];
      } else if (column.CtrlProps.items) {
        items = column.CtrlProps.items;
      }
      cellValue =
        visible === true
          ? this.CtrlCmb({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.CtrlProps && column.CtrlProps.label !== undefined
                  ? column.CtrlProps.label
                  : "",
              items,
              colID: column.CtrlProps.colID,
              value:
                row[column.id] !== undefined
                  ? row[column.id]
                  : column.CtrlProps && column.CtrlProps.defValue !== undefined
                    ? column.CtrlProps.defValue
                    : "",
              width:
                column.CtrlProps && column.CtrlProps.width !== undefined
                  ? column.CtrlProps.width
                  : 50,
              maxLength:
                column.CtrlProps && column.CtrlProps.maxLength !== undefined
                  ? column.CtrlProps.maxLength
                  : 1,
              disabled,
            })
          : "";
    } else if (column.type && column.type === "CtCmbEditable") {
      let items = [],
        visible =
          column.CtrlProps &&
          column.CtrlProps.visiblecondition &&
          this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
            true
            ? false
            : true,
        disabled =
          column.CtrlProps && column.CtrlProps.disabled !== undefined
            ? column.CtrlProps.disabled
            : column.CtrlProps &&
                column.CtrlProps.disablecondition &&
                this.checkConditionOnRow(
                  column.CtrlProps.disablecondition,
                  row,
                ) === true
              ? true
              : false;
      if (
        column.CtrlProps.rowItemsColID &&
        row[column.CtrlProps.rowItemsColID]
      ) {
        items = row[column.CtrlProps.rowItemsColID];
      } else if (column.CtrlProps.items) {
        items = column.CtrlProps.items;
      }
      cellValue =
        visible === true
          ? this.CtrlCmbEditable({
              column_id: column.id,
              rowIndex,
              colIndex,
              label:
                column.CtrlProps && column.CtrlProps.label !== undefined
                  ? column.CtrlProps.label
                  : "",
              items,
              colID: column.CtrlProps.colID,
              value:
                row[column.id] !== undefined
                  ? row[column.id]
                  : column.CtrlProps && column.CtrlProps.defValue !== undefined
                    ? column.CtrlProps.defValue
                    : "",
              width:
                column.CtrlProps && column.CtrlProps.width !== undefined
                  ? column.CtrlProps.width
                  : 50,
              maxLength:
                column.CtrlProps && column.CtrlProps.maxLength !== undefined
                  ? column.CtrlProps.maxLength
                  : 1,
              disabled,
            })
          : "";
    } else {
      // cellValue = value;
      cellValue = (
        <div
          dangerouslySetInnerHTML={{
            __html: value,
          }}
          style={{ margin: "0", padding: "0" }}
        />
      );

      // console.log("cellValue", cellValue);
    }
    return cellValue;
  };

  add_autoEnableDisalbe_ColIdxs = (CtrlProps, colIndex) => {
    if (
      CtrlProps &&
      CtrlProps.autoEnableDisable &&
      !(
        this.state.autoEnableDisalbe_Col_Info.length > 0 &&
        this.state.autoEnableDisalbe_Col_Info.find(
          (col) => col.index === colIndex,
        )
      )
    ) {
      if (this.props.handleOnChangeAutoEnableDisalbe_ColIdxs) {
        const autoEnableDisalbe_Col_Info =
          this.state.autoEnableDisalbe_Col_Info;
        const blankIfDisabled = CtrlProps.blankIfDisabled;
        autoEnableDisalbe_Col_Info.push({ index: colIndex, blankIfDisabled });
        this.setState({ autoEnableDisalbe_Col_Info }, () => {
          this.props.handleOnChangeAutoEnableDisalbe_ColIdxs(
            this.state.autoEnableDisalbe_Col_Info,
          );
        });
      } else {
        alert(
          "Remain to set handleOnChangeAutoEnableDisalbe_ColIdxs for TableList",
        );
      }
    }
  };

  getCtrlID = (rowIndex, colIndex, actionIndex, colID) => {
    return (
      (colID !== undefined && colID.length > 0 ? colID + "#" : "") +
      rowIndex.toString() +
      "#" +
      colIndex.toString() +
      (actionIndex !== undefined ? "#" + actionIndex.toString() : "")
    );
  };

  checkCondition = (action, row) => {
    let result = false;
    if (
      (action.actionType && action.actionType === "Conditional") ||
      (action.condition && action.condition.length > 0)
    ) {
      let conditionFinalResult = false,
        iterationResults = [];

      action.condition.forEach((curcondition) => {
        let conditionResult = false;
        if (
          curcondition.relationalOperator === undefined ||
          curcondition.relationalOperator == "=="
        ) {
          if (row[curcondition.colID] == curcondition.value)
            conditionResult = true;
        } else if (
          curcondition.relationalOperator &&
          curcondition.relationalOperator == "==="
        ) {
          if (row[curcondition.colID] === curcondition.value)
            conditionResult = true;
        } else if (
          curcondition.relationalOperator &&
          curcondition.relationalOperator == "!="
        ) {
          if (row[curcondition.colID] != curcondition.value)
            conditionResult = true;
        } else if (
          curcondition.relationalOperator &&
          curcondition.relationalOperator == "!=="
        ) {
          if (row[curcondition.colID] !== curcondition.value)
            conditionResult = true;
        } else if (
          curcondition.relationalOperator &&
          curcondition.relationalOperator == "<="
        ) {
          if (row[curcondition.colID] <= curcondition.value)
            conditionResult = true;
        } else if (
          curcondition.relationalOperator &&
          curcondition.relationalOperator == "<"
        ) {
          if (row[curcondition.colID] < curcondition.value)
            conditionResult = true;
        } else if (
          curcondition.relationalOperator &&
          curcondition.relationalOperator == ">="
        ) {
          if (row[curcondition.colID] >= curcondition.value)
            conditionResult = true;
        } else if (
          curcondition.relationalOperator &&
          curcondition.relationalOperator == ">"
        ) {
          if (row[curcondition.colID] > curcondition.value)
            conditionResult = true;
        }
        iterationResults.push({
          conditionResult,
          logicalOperator:
            curcondition.logicalOperator &&
            curcondition.logicalOperator.length > 0
              ? curcondition.logicalOperator
              : null,
        });
      });

      if (iterationResults.length === 1) {
        conditionFinalResult = iterationResults[0].conditionResult;
      } else {
        iterationResults.forEach((curResult) => {
          if (curResult.logicalOperator === null) {
            conditionFinalResult = curResult.conditionResult;
          } else {
            if (curResult.logicalOperator === "&&") {
              conditionFinalResult =
                conditionFinalResult && curResult.conditionResult;
            } else {
              conditionFinalResult =
                conditionFinalResult || curResult.conditionResult;
            }
          }
        });
      }

      if (conditionFinalResult === true) {
        result = true;
      } else {
        result = false;
      }
    } else {
      result = true;
    }
    return result;
  };

  getActionIcon = (action, row) => {
    const actionIcon = (
      <Tooltip title={action.name}>
        <IconButton
          style={{ padding: "0px", margin: "0px 5px" }}
          onClick={() => {
            this.props.handleOnActionClick({
              ...row,
              actionName: action.name,
              action,
            });
          }}
        >
          {action.icon}
        </IconButton>
      </Tooltip>
    );
    return actionIcon;
  };

  // onSearchClick = () => {
  //   this.setState(
  //     {
  //       searchOpen: !this.state.searchOpen,
  //     },
  //     () => {
  //       this.props.handleOnSearchChange(
  //         this.state.searchOpen,
  //         this.state.searchData
  //       );
  //     }
  //   );
  // };

  onSearchClick = () => {
    console.log("this.state.searchOpen", this.state.searchOpen);
    this.setState({
      searchOpen: !this.state.searchOpen,
      rows: this.state.searchOpen ? this.props.rows : this.state.rows,
      rowsCount: this.state.searchOpen
        ? this.props.rowsCount
        : this.state.rowsCount,
    });
  };

  handleOnSearchDataChange = (e) => {
    // console.log(object);
    this.setState(
      {
        searchColumnData: {
          ...this.state.searchColumnData,
          [e.target.name]: e.target.value,
        },
      },
      () => {
        let searchRows = this.props.rows.filter((row) => {
          return Object.entries(this.state.searchColumnData)
            .filter(([_, value]) => value.trim() !== "")
            .every(([key, value]) => {
              const searchValue = value.toLowerCase();
              const columnValue = row[key]?.toString().toLowerCase() || "";
              return columnValue.includes(searchValue);
            });
        });
        this.setState({
          rows: searchRows,
          rowsCount: searchRows.length,
        });
      },
    );
  };

  render() {
    const {
      classes,
      width,
      height,
      maxHeight,
      minHeight,
      rowsPerPage,
      dataRowBgColor,
      dataRowBgColorCondition,
      cellPadding,
    } = this.props;
    const fullWidth = { width: "100%" };
    const fixWidthHeight = { width: width + "px", height: height + "px" };
    const defaultMaxMinHeight = { maxHeight: "440px", minHeight: "440px" };
    const maxMinHeight = {
      maxHeight: maxHeight + "px",
      minHeight: minHeight + "px",
    };

    let rowStyle = {};
    let cellPaddingValue = cellPadding !== undefined ? cellPadding : "4px";

    const tableheadingBgColor = "A2CAF1"; // '#bfc7dc'// '#b3bcd5'//'#a6b1ce'
    return (
      <>
        <Paper
          style={
            width && width > 0 && height && height > 0
              ? { fixWidthHeight }
              : { fullWidth }
          }
          // className="DesktopTable"
          className={this.state.noMobileLayout != true ? "DesktopTable" : ""}
        >
          <TableContainer
            style={
              minHeight && maxHeight && minHeight > 0 && maxHeight > 0
                ? { maxMinHeight }
                : { defaultMaxMinHeight }
            }
          >
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={this.state.theme.tableborder}
            >
              <TableHead>
                <TableRow>
                  {this.props.columns.map((column, index) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      //Red Shade ED1C24, f44336, ef9a9a, ff8a80
                      //Violage Shade 8556A6
                      style={
                        column.hide == true || column.hide == "true"
                          ? {
                              display: "none",
                              minWidth: column.minWidth,
                              width: column.width,
                              backgroundColor: tableheadingBgColor,
                              padding: cellPaddingValue,
                              fontWeight: "bold",
                            }
                          : {
                              minWidth: column.minWidth,
                              width: column.width,
                              backgroundColor: tableheadingBgColor,
                              padding: cellPaddingValue,
                              fontWeight: "bold",
                            }
                      }
                      sx={this.state.theme.cellborder}
                      // { minWidth: column.minWidth, backgroundColor: '#ff8a80' },
                    >
                      {index === 0 && this.props.handleOnNewEntryClick ? (
                        <Tooltip title={this.props.toolTipNewEntry}>
                          <IconButton
                            onClick={this.props.handleOnNewEntryClick}
                            style={{ padding: "0px", margin: "0px 5px" }}
                          >
                            <Add />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        ""
                      )}
                      {index === 0 &&
                      this.state.provideSearch &&
                      this.state.provideSearch === true ? (
                        this.state.searchOpen === true ? (
                          <Tooltip title={"Close Search"}>
                            <IconButton
                              onClick={this.onSearchClick}
                              style={{ padding: "0px", margin: "0px 5px" }}
                            >
                              <Close />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title={"Search"}>
                            <IconButton
                              onClick={this.onSearchClick}
                              style={{ padding: "0px", margin: "0px 5px" }}
                            >
                              <Search />
                            </IconButton>
                          </Tooltip>
                        )
                      ) : index > 0 &&
                        this.state.searchOpen === true &&
                        this.state.provideSearch &&
                        this.state.provideSearch === true ? (
                        this.state.searchColumns.map((col, scIndex) => {
                          if (col.cType === "CtCmb" && index === scIndex + 1) {
                          }
                          return col.cType === "CtTxtAdornNum" &&
                            index === scIndex + 1 ? (
                            <span />
                          ) : col.cType === "CtCmb" && index === scIndex + 1 ? (
                            <CtCmb
                              id={col.id}
                              label={col.label}
                              items={col.items}
                              value={this.state.searchData[col.id]}
                              handleOnChange={col.handleOnChange}
                              width={col.width}
                              colID={col.colID}
                            />
                          ) : col.cType === "CtCmbEditable" &&
                            index === scIndex + 1 ? (
                            <CtCmbEditable
                              id={col.id}
                              label={col.label}
                              items={col.items}
                              value={this.state.searchData[col.id]}
                              handleOnChange={col.handleOnChange}
                              width={col.width}
                              colID={col.colID}
                            />
                          ) : col.cType === "CtTxt" && index === scIndex + 1 ? (
                            <CtTxt
                              id={col.id}
                              label={col.label}
                              value={this.state.searchData[col.id]}
                              handleOnChange={col.handleOnChange}
                              width={col.width}
                              maxLength={col.maxLength}
                            />
                          ) : col.cType === "CtPhoneNumber" &&
                            index === scIndex + 1 ? (
                            <span />
                          ) : col.cType === "Lbl" && index === scIndex + 1 ? (
                            col.label
                          ) : (
                            ""
                          );
                        })
                      ) : (
                        this.displayCurrentHeader(index, column, column.label)
                      )}
                      {column.CtrlProps &&
                      column.CtrlProps.autoEnableDisable &&
                      !(
                        this.state.autoEnableDisalbe_Col_Info.length > 0 &&
                        this.state.autoEnableDisalbe_Col_Info.find(
                          (col) => col.index === index,
                        )
                      )
                        ? this.add_autoEnableDisalbe_ColIdxs(
                            column.CtrlProps,
                            index,
                          )
                        : ""}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows
                  ? this.state.rows
                      .slice(
                        this.state.page * rowsPerPage,
                        this.state.page * rowsPerPage + rowsPerPage,
                      )
                      .map((row, index) => {
                        let rowIndex = this.state.page * rowsPerPage + index;
                        if (dataRowBgColor && dataRowBgColor.length > 0) {
                          let applyBgColor = false;
                          rowStyle = {};

                          if (
                            dataRowBgColorCondition
                            //&& dataRowBgColorCondition.length > 0
                          ) {
                            if (
                              this.checkCondition(dataRowBgColorCondition, row)
                            ) {
                              applyBgColor = true;
                            } else {
                              applyBgColor = false;
                            }
                          } else {
                            applyBgColor = true;
                          }

                          if (applyBgColor === true) {
                            rowStyle.backgroundColor = dataRowBgColor;
                          }
                        }

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.ID}
                            style={rowStyle}
                          >
                            {this.props.columns.map((column, index) => {
                              let value = row[column.id],
                                dynamicRowDataID;

                              if (
                                column.dynamicRowDataID &&
                                column.dynamicRowDataID.length > 0
                              ) {
                                if (row.dynamicRowDataID) {
                                  value =
                                    row.dynamicRowDataID[
                                      column.dynamicRowDataID
                                    ];
                                } else {
                                  value = "";
                                }
                              }

                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  sx={this.state.theme.cellborder}
                                  style={
                                    column.hide == true || column.hide == "true"
                                      ? {
                                          display: "none",
                                          padding: cellPaddingValue,
                                          backgroundColor: "",
                                        }
                                      : {
                                          padding: cellPaddingValue,
                                          backgroundColor: "",
                                        }
                                  }
                                >
                                  {this.displayCurrentCell(
                                    index,
                                    column,
                                    value,
                                    row,
                                    rowIndex,
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={this.state.rowsCount}
            rowsPerPage={rowsPerPage}
            page={this.state.page}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={(e, tblIndex) => {
              this.handleChangeRowsPerPage(e, tblIndex);
            }}
          />
        </Paper>
        {this.state.noMobileLayout != true ? (
          <Grid item className="MobileTable">
            {this.props.handleOnNewEntryClick ? (
              <Grid
                container
                justifyContent="flex-start"
                style={{ marginBottom: "10px" }}
              >
                <Tooltip title={this.props.toolTipNewEntry || "Add New"}>
                  <IconButton
                    onClick={this.props.handleOnNewEntryClick}
                    style={{ backgroundColor: "#177CDD", color: "white" }}
                  >
                    <Add />
                  </IconButton>
                </Tooltip>
              </Grid>
            ) : null}

            {this.state.rows.length > 0 ? (
              <Typography
                justifyContent={"center"}
                textAlign={"center"}
                fontWeight={"bold"}
                fontSize={25}
              >
                {this.props.tableheading}
              </Typography>
            ) : (
              ""
            )}
            {this.state.rows.length > 0 ? (
              <Typography
                justifyContent={"center"}
                textAlign={"center"}
                fontWeight={"bold"}
                fontSize={25}
              >
                {this.props.tableheading}
              </Typography>
            ) : (
              ""
            )}
            {this.state.rows
              ? this.state.rows
                  .slice(
                    this.state.page * rowsPerPage,
                    this.state.page * rowsPerPage + rowsPerPage,
                  )
                  .map((row, index) => {
                    let rowIndex = this.state.page * rowsPerPage + index;
                    if (dataRowBgColor && dataRowBgColor.length > 0) {
                      let applyBgColor = false;
                      rowStyle = {};

                      if (dataRowBgColorCondition) {
                        if (this.checkCondition(dataRowBgColorCondition, row)) {
                          applyBgColor = true;
                        } else {
                          applyBgColor = false;
                        }
                      } else {
                        applyBgColor = true;
                      }

                      if (applyBgColor === true) {
                        rowStyle.backgroundColor = dataRowBgColor;
                      }
                    }

                    return (
                      <Card
                        key={row.ID}
                        variant="outlined"
                        style={{
                          padding: "10px",
                          // width: "70vw",
                          width: "auto",
                          backgroundColor: "#F1F2FF",
                          marginTop: "10px",
                        }}
                      >
                        <Grid container>
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <table>
                              {this.props.columns
                                .filter(
                                  (column) =>
                                    column.hide !== true &&
                                    column.hide !== "true",
                                )
                                .map((column, index) => {
                                  let value = row[column.id];
                                  if (
                                    column.dynamicRowDataID &&
                                    column.dynamicRowDataID.length > 0
                                  ) {
                                    if (row.dynamicRowDataID) {
                                      value =
                                        row.dynamicRowDataID[
                                          column.dynamicRowDataID
                                        ];
                                    } else {
                                      value = "";
                                    }
                                  }

                                  return (
                                    <tr style={{ backgroundColor: "white" }}>
                                      <td
                                        style={{
                                          padding: "10px",
                                          border: "1px solid #6e6e6e",
                                        }}
                                      >
                                        <b> {column.label}</b>
                                      </td>
                                      <td
                                        style={{
                                          padding: "8px",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          border: "1px solid #6e6e6e",
                                          width: "100%",
                                        }}
                                        colSpan={2}
                                      >
                                        {this.displayCurrentCell(
                                          index,
                                          column,
                                          value,
                                          row,
                                          rowIndex,
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </table>
                          </Grid>
                        </Grid>
                      </Card>
                    );
                  })
              : ""}
          </Grid>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default HoCtToastContainer(TableList);

// /*
// Library Notes:

// CtrlProps in ActionList:
// While action contains inputs, so, don't forget to set CtrlProps with default value of input control.
// If you don't provide default value in CtrlProps, then all row will not contains key='RowIndex'+'ColumnIndex' with default value

// *** column.type === "CtCmb" ***
//  label=<CtrlProps.label>,
//  items=<{CtrlProps.rowItemsColID}||{CtrlProps.items}>,
//  colID=<CtrlProps.colID>,
//  value={if row[column.id] then row[column.id] else if <CtrlProps.defValue> then CtrlProps.defValue else ""},
//  width={if <CtrlProps.width> then CtrlProps.width else 50},
//  maxLength={if <CtrlProps.maxLength> then CtrlProps.maxLength else 1},
//  disabled={if CtrlProps.disabled!== undefined then CtrlProps.disabled else false}
// */

// import React, { Component } from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { Search, Close, Add, Rowing } from "@mui/icons-material";
// import { Tooltip, IconButton, Checkbox } from "@mui/material";
// import CtCheckBox from "./CtCheckBox";
// // import CtTxtAdornNum from './CtTxtAdornNum'
// import CtCmb from "./CtCmb";
// import CtCmbEditable from "./CtCmbEditable";
// import CtTxt from "./CtTxt";
// import CtTxtNum from "./CtTxtNum";
// import CtTxtAmt from "./CtTxtAmt";
// import CtDtp from "./CtDtp";
// import CtPhoneNumber from "./CtPhoneNumber";
// import CtMultiLineText from "./CtMultiLineText";
// import { isNumeric } from "../../SystemUtility/SystemUtility";
// import HoCtToastContainer from "../../HOC/HoCtToastContainer";

// class TableList extends Component {
//   state = {
//     page: 0,
//     rows: [
//       {
//         ID: "",
//         Scheme: "",
//         ReferenceCode: "",
//         SponsorId: "",
//         Name: "",
//         MobileNo: "",
//       },
//     ],
//     rowsCount: 0,
//     columns: [],
//     searchColumns: [],
//     searchOpen: false,
//     searchData: {},
//     provideSearch: this.props.provideSearch,
//     autoEnableDisalbe_Col_Info: [],
//     inputColsInfo: {
//       firstColIndex: undefined,
//       firstColID: undefined,
//       lastColIndex: undefined,
//       lastColID: undefined,
//     },
//     theme: {
//       tableborder: { border: "0.5px solid rgb(23,124,221)" },
//       cellborder: { border: "0.5px solid rgb(185,215,244)" },
//     },
//     searchColumnData: {},
//   };

//   listResult = "Processing the List";

//   handleChangeColumnsRows = () => {
//     const columns = this.props.columns;
//     const rows = this.props.rows;
//     const rowsCount = this.props.rowsCount;
//     const inputColsInfo = this.getInputColsInfo(columns);
//     const searchColumnData = {};
//     columns.filter((col) => {
//       if (col.hide !== true) {
//         searchColumnData[col.id] = "";
//       }
//     });
//     console.log("searchColumnData", searchColumnData);
//     this.setState({
//       columns,
//       rows,
//       rowsCount,
//       inputColsInfo,
//       searchColumnData,
//     });
//   };

//   getInputColsInfo = (columns) => {
//     let inputColsInfo = {};
//     columns.map((col, index) => {
//       if (
//         col.type &&
//         (col.type === "CtTxtAmt" ||
//           col.type === "CtTxtNum" ||
//           col.type === "CtTxtNum" ||
//           col.type === "CtDtp" ||
//           col.type === "CtMultiLineText")
//       ) {
//         if (
//           inputColsInfo.firstColID === undefined &&
//           inputColsInfo.firstColIndex === undefined
//         ) {
//           //#To Set first col info
//           inputColsInfo["firstColIndex"] = index;
//           inputColsInfo["firstColID"] = col.id;
//         } else {
//           //#To Set last col info
//           inputColsInfo["lastColIndex"] = index;
//           inputColsInfo["lastColID"] = col.id;
//         }
//       }
//     });
//     if (
//       inputColsInfo.lastColID === undefined &&
//       inputColsInfo.lastColIndex === undefined
//     ) {
//       inputColsInfo.lastColID = inputColsInfo.firstColID;
//       inputColsInfo.lastColIndex = inputColsInfo.lastColIndex;
//     }
//     return inputColsInfo;
//   };

//   getNextCtrlID = (rowIndex, colIndex) => {
//     let nextCtrlID = undefined;
//     if (
//       this.state.inputColsInfo.firstColID !== undefined &&
//       this.state.inputColsInfo.firstColIndex !== undefined &&
//       this.state.inputColsInfo.lastColID !== undefined &&
//       this.state.inputColsInfo.lastColIndex !== undefined &&
//       rowIndex < this.state.rows.length - 1 &&
//       Number(colIndex) === Number(this.state.inputColsInfo.lastColIndex)
//     ) {
//       nextCtrlID =
//         this.state.inputColsInfo.firstColID +
//         "#" +
//         (Number(rowIndex) + 1) +
//         "#" +
//         this.state.inputColsInfo.firstColIndex;
//     }
//     return nextCtrlID;
//   };

//   setPage = (pageNumber) => {
//     this.setState({ page: pageNumber });
//   };

//   setRowsPerPage = (rowsPerPage) => {
//     this.setState({ rowsPerPage });
//   };

//   handleChangePage = (event, newPage) => {
//     this.setPage(newPage);
//   };

//   handleChangeRowsPerPage = (event, tblIndex) => {
//     this.setRowsPerPage(+event.target.value);
//     this.setPage(0);
//     if (this.props.handleChangeRowsPerPage) {
//       this.props.handleChangeRowsPerPage(event.target.value, tblIndex);
//     }
//   };

//   componentDidMount() {
//     this.handleChangeColumnsRows();
//   }

//   componentWillReceiveProps(newProps) {
//     this.setState(
//       {
//         rows: newProps.rows,
//         rowsCount: newProps.rowsCount,
//         searchColumns: newProps.searchColumns,
//         searchData: newProps.searchData,
//         provideSearch: newProps.provideSearch,
//         columns: newProps.columns,
//       },
//       () => {
//         // console.log('columns in TableList @ ', this.state.columns)
//       }
//     );
//   }

//   handleOnChangeRowCtrlChk = (e, behaviour) => {
//     if (this.props.handleOnRowDataChange) {
//       const nameParts = e.target.name.split("#"),
//         colID = nameParts[0],
//         rowIndex = Number(nameParts[1]);
//       let rows = this.state.rows.map((row, index) => {
//         if (index === rowIndex) {
//           return {
//             ...row,
//             [colID]:
//               behaviour && behaviour.toLowerCase() === "radio"
//                 ? true
//                 : e.target.checked,
//           };
//         } else {
//           if (
//             e.target.checked === true &&
//             behaviour &&
//             behaviour.toLowerCase() === "radio" /*  && index !== rowIndex */
//           ) {
//             return { ...row, [colID]: false };
//           } else {
//             return row;
//           }
//         }
//       });
//       this.props.handleOnRowDataChange(rows, rowIndex, colID);
//     } else {
//       alert("Missing props handleOnRowDataChange for TableList");
//     }
//   };

//   handleOnChangeRowCtrl = (e) => {
//     if (this.props.handleOnRowDataChange) {
//       const nameParts = e.target.name.split("#"),
//         colID = nameParts[0],
//         rowIndex = Number(nameParts[1]);
//       let rows = this.state.rows.map((row, index) => {
//         if (index === rowIndex) {
//           return { ...row, [colID]: e.target.value };
//         } else {
//           return row;
//         }
//       });
//       this.props.handleOnRowDataChange(rows, rowIndex, colID);
//     } else {
//       alert("Missing props handleOnRowDataChange for TableList");
//     }
//   };

//   CtrlChk = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     actionIndex,
//     label,
//     checked,
//     behaviour,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, actionIndex, column_id);
//     return (
//       <CtCheckBox
//         label={label}
//         checked={checked}
//         id={ctrlID}
//         handleCheckChange={(e) => this.handleOnChangeRowCtrlChk(e, behaviour)}
//         disabled={disabled}
//       />
//     );
//   };

//   CtrlTxt = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     value,
//     width,
//     maxLength,
//     disabled,
//     AmountOnly,
//     NumberOnly,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
//     // console.log('onKeyDown', this.props.onKeyDown)
//     return (
//       <CtTxt
//         id={ctrlID}
//         label={label}
//         value={value}
//         AmountOnly={AmountOnly}
//         NumberOnly={NumberOnly}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         maxLength={maxLength}
//         disabled={disabled}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   CtrlDtp = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     value,
//     width,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
//     return (
//       <CtDtp
//         id={ctrlID}
//         label={label}
//         value={value}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         disabled={disabled}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   CtrlTxtNum = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     value,
//     width,
//     maxLength,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
//     return (
//       <CtTxtNum
//         id={ctrlID}
//         label={label}
//         value={value}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         maxLength={maxLength}
//         disabled={disabled}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   CtrlTxtAmt = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     value,
//     width,
//     maxLength,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
//     return (
//       <CtTxtAmt
//         id={ctrlID}
//         label={label}
//         value={value}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         maxLength={maxLength}
//         disabled={disabled}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   CtrlMultiLineText = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     value,
//     width,
//     maxLength,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
//     // console.log(`ctrlID: ${ctrlID}, rowIndex: ${rowIndex}, colIndex: ${colIndex}, firstColIndex: ${this.state.inputColsInfo.firstColIndex}, firstColID: ${this.state.inputColsInfo.firstColID}, lastColIndex: ${this.state.inputColsInfo.lastColIndex}, lastColID: ${this.state.inputColsInfo.lastColID}`)
//     return (
//       <CtMultiLineText
//         id={ctrlID}
//         label={label}
//         value={value}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         maxLength={maxLength}
//         disabled={disabled}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   CtrlCmb = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     items,
//     colID,
//     value,
//     width,
//     maxLength,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);

//     return (
//       <CtCmb
//         id={ctrlID}
//         label={label}
//         items={items}
//         value={value}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         maxLength={maxLength}
//         disabled={disabled}
//         colID={colID}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   CtrlCmbEditable = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     items,
//     colID,
//     value,
//     width,
//     maxLength,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);

//     return (
//       <CtCmbEditable
//         id={ctrlID}
//         label={label}
//         items={items}
//         value={value}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         maxLength={maxLength}
//         disabled={disabled}
//         colID={colID}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   checkConditionOnRow = (conditions, row) => {
//     let conditionFinalResult = false,
//       iterationResults = [];

//     conditions.forEach((curcondition) => {
//       let conditionResult = false;
//       if (
//         curcondition.relationalOperator === undefined ||
//         curcondition.relationalOperator == "=="
//       ) {
//         if (row[curcondition.colID] == curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == "==="
//       ) {
//         if (row[curcondition.colID] === curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == "!="
//       ) {
//         if (row[curcondition.colID] != curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == "!=="
//       ) {
//         if (row[curcondition.colID] !== curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == "<="
//       ) {
//         if (row[curcondition.colID] <= curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == "<"
//       ) {
//         if (row[curcondition.colID] < curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == ">="
//       ) {
//         if (row[curcondition.colID] >= curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == ">"
//       ) {
//         if (row[curcondition.colID] > curcondition.value)
//           conditionResult = true;
//       }
//       iterationResults.push({
//         conditionResult,
//         logicalOperator:
//           curcondition.logicalOperator &&
//           curcondition.logicalOperator.length > 0
//             ? curcondition.logicalOperator
//             : null,
//       });
//     });

//     if (iterationResults.length === 1) {
//       conditionFinalResult = iterationResults[0].conditionResult;
//     } else {
//       iterationResults.forEach((curResult) => {
//         if (curResult.logicalOperator === null) {
//           conditionFinalResult = curResult.conditionResult;
//         } else {
//           if (curResult.logicalOperator === "&&") {
//             conditionFinalResult =
//               conditionFinalResult && curResult.conditionResult;
//           } else {
//             conditionFinalResult =
//               conditionFinalResult || curResult.conditionResult;
//           }
//         }
//       });
//     }
//     return conditionFinalResult;
//   };

//   displayCurrentCell = (colIndex, column, value, row, rowIndex) => {
//     let cellValue = "";
//     if (
//       colIndex === 0 &&
//       this.props.actionList &&
//       this.props.actionList.length > 0
//     ) {
//       cellValue = this.props.actionList.map((action, actionIndex) => {
//         let result = null;
//         if (
//           (action.actionType &&
//             action.actionType === "Conditional" &&
//             action.visiblecondition &&
//             action.visiblecondition.length > 0) ||
//           (action.visiblecondition && action.visiblecondition.length > 0)
//         ) {
//           if (this.checkConditionOnRow(action.visiblecondition, row) === true) {
//             result = this.getActionIcon(action, row);
//           }
//         } else if (action.hide !== undefined) {
//           if (!(action.hide === true || action.hide === "true")) {
//             result = this.getActionIcon(action, row);
//           }
//         } else if (action.actionType && action.actionType === "Chk") {
//           result = this.CtrlChk({
//             column_id: column.id,
//             rowIndex,
//             colIndex,
//             actionIndex,
//             label:
//               action.CtrlProps && action.CtrlProps.label !== undefined
//                 ? action.CtrlProps.label
//                 : "",
//             checked: row[column.id] !== undefined ? row[column.id] : false,
//             behaviour:
//               action.CtrlProps && action.CtrlProps.behaviour
//                 ? action.CtrlProps.behaviour
//                 : undefined,
//             disabled:
//               column.CtrlProps &&
//               column.CtrlProps.disablecondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disablecondition,
//                 row
//               ) === true
//                 ? true
//                 : false,
//           });
//         } else {
//           result = this.getActionIcon(action, row);
//         }
//         return result;
//       });
//       if (cellValue.length > 0) {
//         cellValue = <div style={{ display: "flex" }}>{cellValue}</div>;
//       }
//     } else if (column.format && value) {
//       // alert("before format cellValue : " + cellValue);
//       cellValue = column.format(value);
//       // alert('after format cellValue : ' + cellValue)
//     } else if (column.type && column.type === "Chk") {
//       let visible =
//         column.CtrlProps &&
//         column.CtrlProps.visiblecondition &&
//         this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//           true
//           ? false
//           : true;
//       cellValue =
//         visible === true
//           ? this.CtrlChk({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               checked: row[column.id] !== undefined ? row[column.id] : false,
//               behaviour:
//                 column.CtrlProps && column.CtrlProps.behaviour
//                   ? column.CtrlProps.behaviour
//                   : undefined,
//               disabled:
//                 column.CtrlProps &&
//                 column.CtrlProps.disablecondition &&
//                 this.checkConditionOnRow(
//                   column.CtrlProps.disablecondition,
//                   row
//                 ) === true
//                   ? true
//                   : false,
//             })
//           : "";
//     } else if (column.type && column.type === "CtDtp") {
//       let visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disablecondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disablecondition,
//                 row
//               ) === true
//             ? true
//             : false;
//       cellValue =
//         visible === true
//           ? this.CtrlDtp({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 120,
//               disabled,
//             })
//           : "";
//     } else if (column.type && column.type === "CtTxt") {
//       let visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disableCondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disableCondition,
//                 row
//               ) === true
//             ? true
//             : false,
//         AmountOnly =
//           column.CtrlProps &&
//           column.CtrlProps.amountOnlyCondition &&
//           this.checkConditionOnRow(
//             column.CtrlProps.amountOnlyCondition,
//             row
//           ) === true
//             ? true
//             : false,
//         NumberOnly =
//           column.CtrlProps &&
//           column.CtrlProps.numberOnlyCondition &&
//           this.checkConditionOnRow(
//             column.CtrlProps.numberOnlyCondition,
//             row
//           ) === true
//             ? true
//             : false;
//       cellValue =
//         visible === true
//           ? this.CtrlTxt({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 50,
//               maxLength:
//                 column.CtrlProps && column.CtrlProps.maxLength !== undefined
//                   ? column.CtrlProps.maxLength
//                   : 1,
//               disabled,
//               AmountOnly,
//               NumberOnly,
//             })
//           : "";
//     } else if (column.type && column.type === "CtTxtAmt") {
//       let visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disableCondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disableCondition,
//                 row
//               ) === true
//             ? true
//             : false;
//       cellValue =
//         visible === true
//           ? this.CtrlTxtAmt({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 50,
//               maxLength:
//                 column.CtrlProps && column.CtrlProps.maxLength !== undefined
//                   ? column.CtrlProps.maxLength
//                   : 1,
//               disabled,
//             })
//           : "";
//     } else if (column.type && column.type === "CtTxtNum") {
//       let visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disableCondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disableCondition,
//                 row
//               ) === true
//             ? true
//             : false;
//       cellValue =
//         visible === true
//           ? this.CtrlTxtNum({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 50,
//               maxLength:
//                 column.CtrlProps && column.CtrlProps.maxLength !== undefined
//                   ? column.CtrlProps.maxLength
//                   : 1,
//               disabled,
//             })
//           : "";
//     } else if (column.type && column.type === "CtMultiLineText") {
//       let visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disableCondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disableCondition,
//                 row
//               ) === true
//             ? true
//             : false;
//       cellValue =
//         visible === true
//           ? this.CtrlMultiLineText({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 100,
//               maxLength:
//                 column.CtrlProps && column.CtrlProps.maxLength !== undefined
//                   ? column.CtrlProps.maxLength
//                   : 1,
//               disabled,
//             })
//           : "";
//     } else if (column.type && column.type === "CtCmb") {
//       let items = [],
//         visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disableCondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disableCondition,
//                 row
//               ) === true
//             ? true
//             : false;
//       if (
//         column.CtrlProps.rowItemsColID &&
//         row[column.CtrlProps.rowItemsColID]
//       ) {
//         items = row[column.CtrlProps.rowItemsColID];
//       } else if (column.CtrlProps.items) {
//         items = column.CtrlProps.items;
//       }
//       cellValue =
//         visible === true
//           ? this.CtrlCmb({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               items,
//               colID: column.CtrlProps.colID,
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 50,
//               maxLength:
//                 column.CtrlProps && column.CtrlProps.maxLength !== undefined
//                   ? column.CtrlProps.maxLength
//                   : 1,
//               disabled,
//             })
//           : "";
//     } else if (column.type && column.type === "CtCmbEditable") {
//       let items = [],
//         visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disableCondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disableCondition,
//                 row
//               ) === true
//             ? true
//             : false;
//       if (
//         column.CtrlProps.rowItemsColID &&
//         row[column.CtrlProps.rowItemsColID]
//       ) {
//         items = row[column.CtrlProps.rowItemsColID];
//       } else if (column.CtrlProps.items) {
//         items = column.CtrlProps.items;
//       }
//       cellValue =
//         visible === true
//           ? this.CtrlCmbEditable({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               items,
//               colID: column.CtrlProps.colID,
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 50,
//               maxLength:
//                 column.CtrlProps && column.CtrlProps.maxLength !== undefined
//                   ? column.CtrlProps.maxLength
//                   : 1,
//               disabled,
//             })
//           : "";
//     } else {
//       // cellValue = value;
//       cellValue = (
//         <div
//           dangerouslySetInnerHTML={{
//             __html: value,
//           }}
//           style={{ margin: "0", padding: "0" }}
//         />
//       );
//     }
//     return cellValue;
//   };

//   add_autoEnableDisalbe_ColIdxs = (CtrlProps, colIndex) => {
//     if (
//       CtrlProps &&
//       CtrlProps.autoEnableDisable &&
//       !(
//         this.state.autoEnableDisalbe_Col_Info.length > 0 &&
//         this.state.autoEnableDisalbe_Col_Info.find(
//           (col) => col.index === colIndex
//         )
//       )
//     ) {
//       if (this.props.handleOnChangeAutoEnableDisalbe_ColIdxs) {
//         const autoEnableDisalbe_Col_Info =
//           this.state.autoEnableDisalbe_Col_Info;
//         const blankIfDisabled = CtrlProps.blankIfDisabled;
//         autoEnableDisalbe_Col_Info.push({ index: colIndex, blankIfDisabled });
//         this.setState({ autoEnableDisalbe_Col_Info }, () => {
//           this.props.handleOnChangeAutoEnableDisalbe_ColIdxs(
//             this.state.autoEnableDisalbe_Col_Info
//           );
//         });
//       } else {
//         alert(
//           "Remain to set handleOnChangeAutoEnableDisalbe_ColIdxs for TableList"
//         );
//       }
//     }
//   };

//   getCtrlID = (rowIndex, colIndex, actionIndex, colID) => {
//     return (
//       (colID !== undefined && colID.length > 0 ? colID + "#" : "") +
//       rowIndex.toString() +
//       "#" +
//       colIndex.toString() +
//       (actionIndex !== undefined ? "#" + actionIndex.toString() : "")
//     );
//   };

//   checkCondition = (action, row) => {
//     let result = false;
//     if (
//       (action.actionType && action.actionType === "Conditional") ||
//       (action.condition && action.condition.length > 0)
//     ) {
//       let conditionFinalResult = false,
//         iterationResults = [];

//       action.condition.forEach((curcondition) => {
//         let conditionResult = false;
//         if (
//           curcondition.relationalOperator === undefined ||
//           curcondition.relationalOperator == "=="
//         ) {
//           if (row[curcondition.colID] == curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == "==="
//         ) {
//           if (row[curcondition.colID] === curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == "!="
//         ) {
//           if (row[curcondition.colID] != curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == "!=="
//         ) {
//           if (row[curcondition.colID] !== curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == "<="
//         ) {
//           if (row[curcondition.colID] <= curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == "<"
//         ) {
//           if (row[curcondition.colID] < curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == ">="
//         ) {
//           if (row[curcondition.colID] >= curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == ">"
//         ) {
//           if (row[curcondition.colID] > curcondition.value)
//             conditionResult = true;
//         }
//         iterationResults.push({
//           conditionResult,
//           logicalOperator:
//             curcondition.logicalOperator &&
//             curcondition.logicalOperator.length > 0
//               ? curcondition.logicalOperator
//               : null,
//         });
//       });

//       if (iterationResults.length === 1) {
//         conditionFinalResult = iterationResults[0].conditionResult;
//       } else {
//         iterationResults.forEach((curResult) => {
//           if (curResult.logicalOperator === null) {
//             conditionFinalResult = curResult.conditionResult;
//           } else {
//             if (curResult.logicalOperator === "&&") {
//               conditionFinalResult =
//                 conditionFinalResult && curResult.conditionResult;
//             } else {
//               conditionFinalResult =
//                 conditionFinalResult || curResult.conditionResult;
//             }
//           }
//         });
//       }

//       if (conditionFinalResult === true) {
//         result = true;
//       } else {
//         result = false;
//       }
//     } else {
//       result = true;
//     }
//     return result;
//   };

//   // getActionIcon = (action, row) => {
//   //   const actionIcon = (
//   //     <Tooltip title={action.name}>
//   //       <IconButton
//   //         style={{ padding: "0px", margin: "0px 5px" }}
//   //         onClick={() => {
//   //           if (this.props.keyColumn && this.props.keyColumn.length > 0) {
//   //             if (
//   //               action.actionType &&
//   //               action.actionType === "AlertResponsive"
//   //             ) {
//   //               let values = [];
//   //               this.props.keyColumn.map((keyCol) => {
//   //                 let value = row[keyCol];
//   //                 values.push({ value: value, actionName: action.name });
//   //               });
//   //               this.props.handleOnActionClick(values);
//   //             } else {
//   //               let keyValue = row[this.props.keyColumn[0]];
//   //               this.props.handleOnActionClick(action.link + keyValue);
//   //             }
//   //           } else {
//   //             this.props.toastErrorMsg("Technical info loss to apply action");
//   //           }
//   //         }}
//   //       >
//   //         {action.icon}
//   //       </IconButton>
//   //     </Tooltip>
//   //   );
//   //   return actionIcon;
//   // };

//   getActionIcon = (action, row) => {
//     const actionIcon = (
//       <Tooltip title={action.name}>
//         <IconButton
//           style={{ padding: "0px", margin: "0px 5px" }}
//           onClick={() => {
//             this.props.handleOnActionClick({
//               ...row,
//               actionName: action.name,
//               action,
//             });
//           }}
//         >
//           {action.icon}
//         </IconButton>
//       </Tooltip>
//     );
//     return actionIcon;
//   };

//   onSearchClick = () => {
//     console.log("this.state.searchOpen", this.state.searchOpen);
//     this.setState({
//       searchOpen: !this.state.searchOpen,
//       rows: this.state.searchOpen ? this.props.rows : this.state.rows,
//       rowsCount: this.state.searchOpen
//         ? this.props.rowsCount
//         : this.state.rowsCount,
//     });
//   };

//   handleOnSearchDataChange = (e) => {
//     // console.log(object);
//     this.setState(
//       {
//         searchColumnData: {
//           ...this.state.searchColumnData,
//           [e.target.name]: e.target.value,
//         },
//       },
//       () => {
//         let searchRows = this.props.rows.filter((row) => {
//           return Object.entries(this.state.searchColumnData)
//             .filter(([_, value]) => value.trim() !== "")
//             .every(([key, value]) => {
//               const searchValue = value.toLowerCase();
//               const columnValue = row[key]?.toString().toLowerCase() || "";
//               return columnValue.includes(searchValue);
//             });
//         });
//         this.setState({
//           rows: searchRows,
//           rowsCount: searchRows.length,
//         });
//       }
//     );
//   };

//   render() {
//     const {
//       classes,
//       keyColumn,
//       width,
//       height,
//       maxHeight,
//       minHeight,
//       rowsPerPage,
//       dataRowBgColor,
//       dataRowBgColorCondition,
//       cellPadding,
//     } = this.props;
//     const fullWidth = { width: "100%" };
//     const fixWidthHeight = { width: width + "px", height: height + "px" };
//     const defaultMaxMinHeight = { maxHeight: "440px", minHeight: "440px" };
//     const maxMinHeight = {
//       maxHeight: maxHeight + "px",
//       minHeight: minHeight + "px",
//     };

//     let rowStyle = {};
//     let cellPaddingValue = cellPadding !== undefined ? cellPadding : "4px";

//     const tableHeadingBgColor = "#ffffff"; // '#bfc7dc'// '#b3bcd5'//'#a6b1ce'
//     return (
//       <Paper
//         style={
//           width && width > 0 && height && height > 0
//             ? { fixWidthHeight }
//             : { fullWidth }
//         }
//       >
//         <TableContainer
//           style={
//             minHeight && maxHeight && minHeight > 0 && maxHeight > 0
//               ? { maxMinHeight }
//               : { defaultMaxMinHeight }
//           }
//         >
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {this.props.columns.map((column, index) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     //Red Shade ED1C24, f44336, ef9a9a, ff8a80
//                     //Violage Shade 8556A6
//                     style={
//                       column.hide == true || column.hide == "true"
//                         ? {
//                             display: "none",
//                             minWidth: column.minWidth,
//                             width: column.width,
//                             backgroundColor: tableHeadingBgColor,
//                             padding: cellPaddingValue,
//                           }
//                         : {
//                             minWidth: column.minWidth,
//                             width: column.width,
//                             backgroundColor: tableHeadingBgColor,
//                             padding: cellPaddingValue,
//                           }
//                     }
//                     sx={this.state.theme.cellborder}

//                     // { minWidth: column.minWidth, backgroundColor: '#ff8a80' },
//                   >
//                     {index === 0 && this.props.handleOnNewEntryClick ? (
//                       <Tooltip title={this.props.toolTipNewEntry}>
//                         <IconButton
//                           onClick={this.props.handleOnNewEntryClick}
//                           style={{ padding: "0px", margin: "0px 5px" }}
//                         >
//                           <Add />
//                         </IconButton>
//                       </Tooltip>
//                     ) : (
//                       ""
//                     )}
//                     {index === 0 &&
//                     this.state.provideSearch &&
//                     this.state.provideSearch === true ? (
//                       this.state.searchOpen === true ? (
//                         <Tooltip title={"Close Search"}>
//                           <IconButton
//                             onClick={this.onSearchClick}
//                             style={{ padding: "0px", margin: "0px 5px" }}
//                           >
//                             <Close />
//                           </IconButton>
//                         </Tooltip>
//                       ) : (
//                         <Tooltip title={"Search"}>
//                           <IconButton
//                             onClick={this.onSearchClick}
//                             style={{ padding: "0px", margin: "0px 5px" }}
//                           >
//                             <Search />
//                           </IconButton>
//                         </Tooltip>
//                       )
//                     ) : index === 0 ? (
//                       ""
//                     ) : (
//                       column.label
//                     )}

//                     {column.CtrlProps &&
//                     column.CtrlProps.autoEnableDisable &&
//                     !(
//                       this.state.autoEnableDisalbe_Col_Info.length > 0 &&
//                       this.state.autoEnableDisalbe_Col_Info.find(
//                         (col) => col.index === index
//                       )
//                     )
//                       ? this.add_autoEnableDisalbe_ColIdxs(
//                           column.CtrlProps,
//                           index
//                         )
//                       : ""}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             {this.state.searchOpen === true &&
//               this.state.provideSearch &&
//               this.state.provideSearch === true && (
//                 <TableRow style={{ backgroundColor: "#f6faffff" }}>
//                   {this.props.columns.map((column, index) => (
//                     <TableCell
//                       key={column.id}
//                       align={column.align}
//                       sx={this.state.theme.cellborder}
//                       style={
//                         column.hide == true || column.hide == "true"
//                           ? {
//                               display: "none",
//                               minWidth: column.minWidth,
//                               width: column.width,
//                               // backgroundColor: tableHeadingBgColor,
//                               padding: cellPaddingValue,
//                             }
//                           : {
//                               minWidth: column.minWidth,
//                               width: column.width,
//                               // backgroundColor: tableHeadingBgColor,
//                               padding: cellPaddingValue,
//                             }
//                       }
//                     >
//                       {index === 0 &&
//                       this.state.provideSearch &&
//                       this.state.provideSearch === true
//                         ? ""
//                         : index > 0 &&
//                           this.state.searchOpen === true &&
//                           this.state.provideSearch &&
//                           this.state.provideSearch === true && (
//                             <CtTxt
//                               id={column.id}
//                               // label={column.label}
//                               // value={this.state.searchData[column.id]}
//                               handleOnChange={this.handleOnSearchDataChange}
//                               width={column.width}
//                               maxLength={100}
//                             />
//                           )}

//                       {column.CtrlProps &&
//                       column.CtrlProps.autoEnableDisable &&
//                       !(
//                         this.state.autoEnableDisalbe_Col_Info.length > 0 &&
//                         this.state.autoEnableDisalbe_Col_Info.find(
//                           (col) => col.index === index
//                         )
//                       )
//                         ? this.add_autoEnableDisalbe_ColIdxs(
//                             column.CtrlProps,
//                             index
//                           )
//                         : ""}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               )}
//             <TableBody>
//               {this.state.rows
//                 ? this.state.rows
//                     .slice(
//                       this.state.page * rowsPerPage,
//                       this.state.page * rowsPerPage + rowsPerPage
//                     )
//                     .map((row, rowIndex) => {
//                       if (dataRowBgColor && dataRowBgColor.length > 0) {
//                         let applyBgColor = false;
//                         rowStyle = {};

//                         if (
//                           dataRowBgColorCondition
//                           //&& dataRowBgColorCondition.length > 0
//                         ) {
//                           if (
//                             this.checkCondition(dataRowBgColorCondition, row)
//                           ) {
//                             applyBgColor = true;
//                           } else {
//                             applyBgColor = false;
//                           }
//                         } else {
//                           applyBgColor = true;
//                         }

//                         if (applyBgColor === true) {
//                           rowStyle.backgroundColor = dataRowBgColor;
//                         }
//                       }

//                       return (
//                         <TableRow
//                           hover
//                           role="checkbox"
//                           tabIndex={-1}
//                           key={row.ID}
//                           style={rowStyle}
//                         >
//                           {this.props.columns.map((column, index) => {
//                             let value = row[column.id],
//                               dynamicRowDataID;
//                             const keyValue = row[keyColumn];

//                             if (
//                               column.dynamicRowDataID &&
//                               column.dynamicRowDataID.length > 0
//                             ) {
//                               if (row.dynamicRowDataID) {
//                                 value =
//                                   row.dynamicRowDataID[column.dynamicRowDataID];
//                               } else {
//                                 value = "";
//                               }
//                             }

//                             return (
//                               <TableCell
//                                 key={column.id}
//                                 align={column.align}
//                                 sx={this.state.theme.cellborder}
//                                 style={
//                                   column.hide == true || column.hide == "true"
//                                     ? {
//                                         display: "none",
//                                         padding: cellPaddingValue,
//                                         backgroundColor: "",
//                                       }
//                                     : {
//                                         padding: cellPaddingValue,
//                                         backgroundColor: "",
//                                       }
//                                 }
//                               >
//                                 {this.displayCurrentCell(
//                                   index,
//                                   column,
//                                   value,
//                                   row,
//                                   rowIndex
//                                 )}
//                               </TableCell>
//                             );
//                           })}
//                         </TableRow>
//                       );
//                     })
//                 : ""}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25, 50, 100]}
//           component="div"
//           count={this.state.rowsCount}
//           rowsPerPage={rowsPerPage}
//           page={this.state.page}
//           onPageChange={this.handleChangePage}
//           onRowsPerPageChange={(e, tblIndex) => {
//             this.handleChangeRowsPerPage(e, tblIndex);
//           }}
//         />
//       </Paper>
//     );
//   }
// }

// export default HoCtToastContainer(TableList);

/*
Library Notes:

CtrlProps in ActionList:
While action contains inputs, so, don't forget to set CtrlProps with default value of input control.
If you don't provide default value in CtrlProps, then all row will not contains key='RowIndex'+'ColumnIndex' with default value

*** column.type === "CtCmb" ***
 label=<CtrlProps.label>,
 items=<{CtrlProps.rowItemsColID}||{CtrlProps.items}>,
 colID=<CtrlProps.colID>,
 value={if row[column.id] then row[column.id] else if <CtrlProps.defValue> then CtrlProps.defValue else ""},
 width={if <CtrlProps.width> then CtrlProps.width else 50},
 maxLength={if <CtrlProps.maxLength> then CtrlProps.maxLength else 1},
 disabled={if CtrlProps.disabled!== undefined then CtrlProps.disabled else false}
*/

// import React, { Component } from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { Search, Close, Add, Rowing } from "@mui/icons-material";
// import { Tooltip, IconButton, Checkbox } from "@mui/material";
// import CtCheckBox from "./CtCheckBox";
// // import CtTxtAdornNum from './CtTxtAdornNum'
// import CtCmb from "./CtCmb";
// import CtCmbEditable from "./CtCmbEditable";
// import CtTxt from "./CtTxt";
// import CtTxtNum from "./CtTxtNum";
// import CtTxtAmt from "./CtTxtAmt";
// import CtDtp from "./CtDtp";
// import CtPhoneNumber from "./CtPhoneNumber";
// import CtMultiLineText from "./CtMultiLineText";
// import { isNumeric } from "../../SystemUtility/SystemUtility";
// import HoCtToastContainer from "../../HOC/HoCtToastContainer";

// class TableList extends Component {
//   state = {
//     page: 0,
//     rows: [
//       {
//         ID: "",
//         Scheme: "",
//         ReferenceCode: "",
//         SponsorId: "",
//         Name: "",
//         MobileNo: "",
//       },
//     ],
//     rowsCount: 0,
//     columns: [],
//     searchColumns: [],
//     searchOpen: false,
//     searchData: {},
//     provideSearch: this.props.provideSearch,
//     autoEnableDisalbe_Col_Info: [],
//     inputColsInfo: {
//       firstColIndex: undefined,
//       firstColID: undefined,
//       lastColIndex: undefined,
//       lastColID: undefined,
//     },
//     theme: {
//       tableborder: { border: "0.5px solid rgb(23,124,221)" },
//       cellborder: { border: "0.5px solid rgb(185,215,244)" },
//     },
//     searchColumnData: {},
//   };

//   listResult = "Processing the List";

//   handleChangeColumnsRows = () => {
//     const columns = this.props.columns;
//     const rows = this.props.rows;
//     const rowsCount = this.props.rowsCount;
//     const inputColsInfo = this.getInputColsInfo(columns);
//     const searchColumnData = {};
//     columns.filter((col) => {
//       if (col.hide !== true) {
//         searchColumnData[col.id] = "";
//       }
//     });
//     console.log("searchColumnData", searchColumnData);
//     this.setState({
//       columns,
//       rows,
//       rowsCount,
//       inputColsInfo,
//       searchColumnData,
//     });
//   };

//   getInputColsInfo = (columns) => {
//     let inputColsInfo = {};
//     columns.map((col, index) => {
//       if (
//         col.type &&
//         (col.type === "CtTxtAmt" ||
//           col.type === "CtTxtNum" ||
//           col.type === "CtTxtNum" ||
//           col.type === "CtDtp" ||
//           col.type === "CtMultiLineText")
//       ) {
//         if (
//           inputColsInfo.firstColID === undefined &&
//           inputColsInfo.firstColIndex === undefined
//         ) {
//           //#To Set first col info
//           inputColsInfo["firstColIndex"] = index;
//           inputColsInfo["firstColID"] = col.id;
//         } else {
//           //#To Set last col info
//           inputColsInfo["lastColIndex"] = index;
//           inputColsInfo["lastColID"] = col.id;
//         }
//       }
//     });
//     if (
//       inputColsInfo.lastColID === undefined &&
//       inputColsInfo.lastColIndex === undefined
//     ) {
//       inputColsInfo.lastColID = inputColsInfo.firstColID;
//       inputColsInfo.lastColIndex = inputColsInfo.lastColIndex;
//     }
//     return inputColsInfo;
//   };

//   getNextCtrlID = (rowIndex, colIndex) => {
//     let nextCtrlID = undefined;
//     if (
//       this.state.inputColsInfo.firstColID !== undefined &&
//       this.state.inputColsInfo.firstColIndex !== undefined &&
//       this.state.inputColsInfo.lastColID !== undefined &&
//       this.state.inputColsInfo.lastColIndex !== undefined &&
//       rowIndex < this.state.rows.length - 1 &&
//       Number(colIndex) === Number(this.state.inputColsInfo.lastColIndex)
//     ) {
//       nextCtrlID =
//         this.state.inputColsInfo.firstColID +
//         "#" +
//         (Number(rowIndex) + 1) +
//         "#" +
//         this.state.inputColsInfo.firstColIndex;
//     }
//     return nextCtrlID;
//   };

//   setPage = (pageNumber) => {
//     this.setState({ page: pageNumber });
//   };

//   setRowsPerPage = (rowsPerPage) => {
//     this.setState({ rowsPerPage });
//   };

//   handleChangePage = (event, newPage) => {
//     this.setPage(newPage);
//   };

//   handleChangeRowsPerPage = (event, tblIndex) => {
//     this.setRowsPerPage(+event.target.value);
//     this.setPage(0);
//     if (this.props.handleChangeRowsPerPage) {
//       this.props.handleChangeRowsPerPage(event.target.value, tblIndex);
//     }
//   };

//   componentDidMount() {
//     this.handleChangeColumnsRows();
//   }

//   componentWillReceiveProps(newProps) {
//     this.setState(
//       {
//         rows: newProps.rows,
//         rowsCount: newProps.rowsCount,
//         searchColumns: newProps.searchColumns,
//         searchData: newProps.searchData,
//         provideSearch: newProps.provideSearch,
//         columns: newProps.columns,
//       },
//       () => {
//         // console.log('columns in TableList @ ', this.state.columns)
//       }
//     );
//   }

//   handleOnChangeRowCtrlChk = (e, behaviour) => {
//     if (this.props.handleOnRowDataChange) {
//       const nameParts = e.target.name.split("#"),
//         colID = nameParts[0],
//         rowIndex = Number(nameParts[1]);
//       let rows = this.state.rows.map((row, index) => {
//         if (index === rowIndex) {
//           return {
//             ...row,
//             [colID]:
//               behaviour && behaviour.toLowerCase() === "radio"
//                 ? true
//                 : e.target.checked,
//           };
//         } else {
//           if (
//             e.target.checked === true &&
//             behaviour &&
//             behaviour.toLowerCase() === "radio" /*  && index !== rowIndex */
//           ) {
//             return { ...row, [colID]: false };
//           } else {
//             return row;
//           }
//         }
//       });
//       this.props.handleOnRowDataChange(rows, rowIndex, colID);
//     } else {
//       alert("Missing props handleOnRowDataChange for TableList");
//     }
//   };

//   handleOnChangeRowCtrl = (e) => {
//     if (this.props.handleOnRowDataChange) {
//       const nameParts = e.target.name.split("#"),
//         colID = nameParts[0],
//         rowIndex = Number(nameParts[1]);
//       let rows = this.state.rows.map((row, index) => {
//         if (index === rowIndex) {
//           return { ...row, [colID]: e.target.value };
//         } else {
//           return row;
//         }
//       });
//       this.props.handleOnRowDataChange(rows, rowIndex, colID);
//     } else {
//       alert("Missing props handleOnRowDataChange for TableList");
//     }
//   };

//   CtrlChk = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     actionIndex,
//     label,
//     checked,
//     behaviour,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, actionIndex, column_id);
//     return (
//       <CtCheckBox
//         label={label}
//         checked={checked}
//         id={ctrlID}
//         handleCheckChange={(e) => this.handleOnChangeRowCtrlChk(e, behaviour)}
//         disabled={disabled}
//       />
//     );
//   };

//   CtrlTxt = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     value,
//     width,
//     maxLength,
//     disabled,
//     AmountOnly,
//     NumberOnly,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
//     // console.log('onKeyDown', this.props.onKeyDown)
//     return (
//       <CtTxt
//         id={ctrlID}
//         label={label}
//         value={value}
//         AmountOnly={AmountOnly}
//         NumberOnly={NumberOnly}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         maxLength={maxLength}
//         disabled={disabled}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   CtrlDtp = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     value,
//     width,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
//     return (
//       <CtDtp
//         id={ctrlID}
//         label={label}
//         value={value}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         disabled={disabled}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   CtrlTxtNum = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     value,
//     width,
//     maxLength,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
//     return (
//       <CtTxtNum
//         id={ctrlID}
//         label={label}
//         value={value}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         maxLength={maxLength}
//         disabled={disabled}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   CtrlTxtAmt = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     value,
//     width,
//     maxLength,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
//     return (
//       <CtTxtAmt
//         id={ctrlID}
//         label={label}
//         value={value}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         maxLength={maxLength}
//         disabled={disabled}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   CtrlMultiLineText = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     value,
//     width,
//     maxLength,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);
//     // console.log(`ctrlID: ${ctrlID}, rowIndex: ${rowIndex}, colIndex: ${colIndex}, firstColIndex: ${this.state.inputColsInfo.firstColIndex}, firstColID: ${this.state.inputColsInfo.firstColID}, lastColIndex: ${this.state.inputColsInfo.lastColIndex}, lastColID: ${this.state.inputColsInfo.lastColID}`)
//     return (
//       <CtMultiLineText
//         id={ctrlID}
//         label={label}
//         value={value}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         maxLength={maxLength}
//         disabled={disabled}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   CtrlCmb = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     items,
//     colID,
//     value,
//     width,
//     maxLength,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);

//     return (
//       <CtCmb
//         id={ctrlID}
//         label={label}
//         items={items}
//         value={value}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         maxLength={maxLength}
//         disabled={disabled}
//         colID={colID}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   CtrlCmbEditable = ({
//     column_id,
//     rowIndex,
//     colIndex,
//     label,
//     items,
//     colID,
//     value,
//     width,
//     maxLength,
//     disabled,
//   }) => {
//     let ctrlID = this.getCtrlID(rowIndex, colIndex, undefined, column_id);

//     return (
//       <CtCmbEditable
//         id={ctrlID}
//         label={label}
//         items={items}
//         value={value}
//         handleOnChange={this.handleOnChangeRowCtrl}
//         width={width}
//         maxLength={maxLength}
//         disabled={disabled}
//         colID={colID}
//         onKeyDown={this.props.onKeyDown}
//         nextCtrlID={this.getNextCtrlID(rowIndex, colIndex)}
//       />
//     );
//   };

//   checkConditionOnRow = (conditions, row) => {
//     let conditionFinalResult = false,
//       iterationResults = [];

//     conditions.forEach((curcondition) => {
//       let conditionResult = false;
//       if (
//         curcondition.relationalOperator === undefined ||
//         curcondition.relationalOperator == "=="
//       ) {
//         if (row[curcondition.colID] == curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == "==="
//       ) {
//         if (row[curcondition.colID] === curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == "!="
//       ) {
//         if (row[curcondition.colID] != curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == "!=="
//       ) {
//         if (row[curcondition.colID] !== curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == "<="
//       ) {
//         if (row[curcondition.colID] <= curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == "<"
//       ) {
//         if (row[curcondition.colID] < curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == ">="
//       ) {
//         if (row[curcondition.colID] >= curcondition.value)
//           conditionResult = true;
//       } else if (
//         curcondition.relationalOperator &&
//         curcondition.relationalOperator == ">"
//       ) {
//         if (row[curcondition.colID] > curcondition.value)
//           conditionResult = true;
//       }
//       iterationResults.push({
//         conditionResult,
//         logicalOperator:
//           curcondition.logicalOperator &&
//           curcondition.logicalOperator.length > 0
//             ? curcondition.logicalOperator
//             : null,
//       });
//     });

//     if (iterationResults.length === 1) {
//       conditionFinalResult = iterationResults[0].conditionResult;
//     } else {
//       iterationResults.forEach((curResult) => {
//         if (curResult.logicalOperator === null) {
//           conditionFinalResult = curResult.conditionResult;
//         } else {
//           if (curResult.logicalOperator === "&&") {
//             conditionFinalResult =
//               conditionFinalResult && curResult.conditionResult;
//           } else {
//             conditionFinalResult =
//               conditionFinalResult || curResult.conditionResult;
//           }
//         }
//       });
//     }
//     return conditionFinalResult;
//   };

//   displayCurrentCell = (colIndex, column, value, row, rowIndex) => {
//     let cellValue = "";
//     if (
//       colIndex === 0 &&
//       this.props.actionList &&
//       this.props.actionList.length > 0
//     ) {
//       cellValue = this.props.actionList.map((action, actionIndex) => {
//         let result = null;
//         if (
//           (action.actionType &&
//             action.actionType === "Conditional" &&
//             action.visiblecondition &&
//             action.visiblecondition.length > 0) ||
//           (action.visiblecondition && action.visiblecondition.length > 0)
//         ) {
//           if (this.checkConditionOnRow(action.visiblecondition, row) === true) {
//             result = this.getActionIcon(action, row);
//           }
//         } else if (action.hide !== undefined) {
//           if (!(action.hide === true || action.hide === "true")) {
//             result = this.getActionIcon(action, row);
//           }
//         } else if (action.actionType && action.actionType === "Chk") {
//           result = this.CtrlChk({
//             column_id: column.id,
//             rowIndex,
//             colIndex,
//             actionIndex,
//             label:
//               action.CtrlProps && action.CtrlProps.label !== undefined
//                 ? action.CtrlProps.label
//                 : "",
//             checked: row[column.id] !== undefined ? row[column.id] : false,
//             behaviour:
//               action.CtrlProps && action.CtrlProps.behaviour
//                 ? action.CtrlProps.behaviour
//                 : undefined,
//             disabled:
//               column.CtrlProps &&
//               column.CtrlProps.disablecondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disablecondition,
//                 row
//               ) === true
//                 ? true
//                 : false,
//           });
//         } else {
//           result = this.getActionIcon(action, row);
//         }
//         return result;
//       });
//       if (cellValue.length > 0) {
//         cellValue = <div style={{ display: "flex" }}>{cellValue}</div>;
//       }
//     } else if (column.format && value) {
//       // alert("before format cellValue : " + cellValue);
//       cellValue = column.format(value);
//       // alert('after format cellValue : ' + cellValue)
//     } else if (column.type && column.type === "Chk") {
//       let visible =
//         column.CtrlProps &&
//         column.CtrlProps.visiblecondition &&
//         this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//           true
//           ? false
//           : true;
//       cellValue =
//         visible === true
//           ? this.CtrlChk({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               checked: row[column.id] !== undefined ? row[column.id] : false,
//               behaviour:
//                 column.CtrlProps && column.CtrlProps.behaviour
//                   ? column.CtrlProps.behaviour
//                   : undefined,
//               disabled:
//                 column.CtrlProps &&
//                 column.CtrlProps.disablecondition &&
//                 this.checkConditionOnRow(
//                   column.CtrlProps.disablecondition,
//                   row
//                 ) === true
//                   ? true
//                   : false,
//             })
//           : "";
//     } else if (column.type && column.type === "CtDtp") {
//       let visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disablecondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disablecondition,
//                 row
//               ) === true
//             ? true
//             : false;
//       cellValue =
//         visible === true
//           ? this.CtrlDtp({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 120,
//               disabled,
//             })
//           : "";
//     } else if (column.type && column.type === "CtTxt") {
//       let visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disableCondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disableCondition,
//                 row
//               ) === true
//             ? true
//             : false,
//         AmountOnly =
//           column.CtrlProps &&
//           column.CtrlProps.amountOnlyCondition &&
//           this.checkConditionOnRow(
//             column.CtrlProps.amountOnlyCondition,
//             row
//           ) === true
//             ? true
//             : false,
//         NumberOnly =
//           column.CtrlProps &&
//           column.CtrlProps.numberOnlyCondition &&
//           this.checkConditionOnRow(
//             column.CtrlProps.numberOnlyCondition,
//             row
//           ) === true
//             ? true
//             : false;
//       cellValue =
//         visible === true
//           ? this.CtrlTxt({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 50,
//               maxLength:
//                 column.CtrlProps && column.CtrlProps.maxLength !== undefined
//                   ? column.CtrlProps.maxLength
//                   : 1,
//               disabled,
//               AmountOnly,
//               NumberOnly,
//             })
//           : "";
//     } else if (column.type && column.type === "CtTxtAmt") {
//       let visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disableCondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disableCondition,
//                 row
//               ) === true
//             ? true
//             : false;
//       cellValue =
//         visible === true
//           ? this.CtrlTxtAmt({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 50,
//               maxLength:
//                 column.CtrlProps && column.CtrlProps.maxLength !== undefined
//                   ? column.CtrlProps.maxLength
//                   : 1,
//               disabled,
//             })
//           : "";
//     } else if (column.type && column.type === "CtTxtNum") {
//       let visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disableCondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disableCondition,
//                 row
//               ) === true
//             ? true
//             : false;
//       cellValue =
//         visible === true
//           ? this.CtrlTxtNum({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 50,
//               maxLength:
//                 column.CtrlProps && column.CtrlProps.maxLength !== undefined
//                   ? column.CtrlProps.maxLength
//                   : 1,
//               disabled,
//             })
//           : "";
//     } else if (column.type && column.type === "CtMultiLineText") {
//       let visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disableCondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disableCondition,
//                 row
//               ) === true
//             ? true
//             : false;
//       cellValue =
//         visible === true
//           ? this.CtrlMultiLineText({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 100,
//               maxLength:
//                 column.CtrlProps && column.CtrlProps.maxLength !== undefined
//                   ? column.CtrlProps.maxLength
//                   : 1,
//               disabled,
//             })
//           : "";
//     } else if (column.type && column.type === "CtCmb") {
//       let items = [],
//         visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disableCondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disableCondition,
//                 row
//               ) === true
//             ? true
//             : false;
//       if (
//         column.CtrlProps.rowItemsColID &&
//         row[column.CtrlProps.rowItemsColID]
//       ) {
//         items = row[column.CtrlProps.rowItemsColID];
//       } else if (column.CtrlProps.items) {
//         items = column.CtrlProps.items;
//       }
//       cellValue =
//         visible === true
//           ? this.CtrlCmb({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               items,
//               colID: column.CtrlProps.colID,
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 50,
//               maxLength:
//                 column.CtrlProps && column.CtrlProps.maxLength !== undefined
//                   ? column.CtrlProps.maxLength
//                   : 1,
//               disabled,
//             })
//           : "";
//     } else if (column.type && column.type === "CtCmbEditable") {
//       let items = [],
//         visible =
//           column.CtrlProps &&
//           column.CtrlProps.visiblecondition &&
//           this.checkConditionOnRow(column.CtrlProps.visiblecondition, row) !==
//             true
//             ? false
//             : true,
//         disabled =
//           column.CtrlProps && column.CtrlProps.disabled !== undefined
//             ? column.CtrlProps.disabled
//             : column.CtrlProps &&
//               column.CtrlProps.disableCondition &&
//               this.checkConditionOnRow(
//                 column.CtrlProps.disableCondition,
//                 row
//               ) === true
//             ? true
//             : false;
//       if (
//         column.CtrlProps.rowItemsColID &&
//         row[column.CtrlProps.rowItemsColID]
//       ) {
//         items = row[column.CtrlProps.rowItemsColID];
//       } else if (column.CtrlProps.items) {
//         items = column.CtrlProps.items;
//       }
//       cellValue =
//         visible === true
//           ? this.CtrlCmbEditable({
//               column_id: column.id,
//               rowIndex,
//               colIndex,
//               label:
//                 column.CtrlProps && column.CtrlProps.label !== undefined
//                   ? column.CtrlProps.label
//                   : "",
//               items,
//               colID: column.CtrlProps.colID,
//               value:
//                 row[column.id] !== undefined
//                   ? row[column.id]
//                   : column.CtrlProps && column.CtrlProps.defValue !== undefined
//                   ? column.CtrlProps.defValue
//                   : "",
//               width:
//                 column.CtrlProps && column.CtrlProps.width !== undefined
//                   ? column.CtrlProps.width
//                   : 50,
//               maxLength:
//                 column.CtrlProps && column.CtrlProps.maxLength !== undefined
//                   ? column.CtrlProps.maxLength
//                   : 1,
//               disabled,
//             })
//           : "";
//     } else {
//       // cellValue = value;
//       cellValue = (
//         <div
//           dangerouslySetInnerHTML={{
//             __html: value,
//           }}
//           style={{ margin: "0", padding: "0" }}
//         />
//       );
//     }
//     return cellValue;
//   };

//   add_autoEnableDisalbe_ColIdxs = (CtrlProps, colIndex) => {
//     if (
//       CtrlProps &&
//       CtrlProps.autoEnableDisable &&
//       !(
//         this.state.autoEnableDisalbe_Col_Info.length > 0 &&
//         this.state.autoEnableDisalbe_Col_Info.find(
//           (col) => col.index === colIndex
//         )
//       )
//     ) {
//       if (this.props.handleOnChangeAutoEnableDisalbe_ColIdxs) {
//         const autoEnableDisalbe_Col_Info =
//           this.state.autoEnableDisalbe_Col_Info;
//         const blankIfDisabled = CtrlProps.blankIfDisabled;
//         autoEnableDisalbe_Col_Info.push({ index: colIndex, blankIfDisabled });
//         this.setState({ autoEnableDisalbe_Col_Info }, () => {
//           this.props.handleOnChangeAutoEnableDisalbe_ColIdxs(
//             this.state.autoEnableDisalbe_Col_Info
//           );
//         });
//       } else {
//         alert(
//           "Remain to set handleOnChangeAutoEnableDisalbe_ColIdxs for TableList"
//         );
//       }
//     }
//   };

//   getCtrlID = (rowIndex, colIndex, actionIndex, colID) => {
//     return (
//       (colID !== undefined && colID.length > 0 ? colID + "#" : "") +
//       rowIndex.toString() +
//       "#" +
//       colIndex.toString() +
//       (actionIndex !== undefined ? "#" + actionIndex.toString() : "")
//     );
//   };

//   checkCondition = (action, row) => {
//     let result = false;
//     if (
//       (action.actionType && action.actionType === "Conditional") ||
//       (action.condition && action.condition.length > 0)
//     ) {
//       let conditionFinalResult = false,
//         iterationResults = [];

//       action.condition.forEach((curcondition) => {
//         let conditionResult = false;
//         if (
//           curcondition.relationalOperator === undefined ||
//           curcondition.relationalOperator == "=="
//         ) {
//           if (row[curcondition.colID] == curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == "==="
//         ) {
//           if (row[curcondition.colID] === curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == "!="
//         ) {
//           if (row[curcondition.colID] != curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == "!=="
//         ) {
//           if (row[curcondition.colID] !== curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == "<="
//         ) {
//           if (row[curcondition.colID] <= curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == "<"
//         ) {
//           if (row[curcondition.colID] < curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == ">="
//         ) {
//           if (row[curcondition.colID] >= curcondition.value)
//             conditionResult = true;
//         } else if (
//           curcondition.relationalOperator &&
//           curcondition.relationalOperator == ">"
//         ) {
//           if (row[curcondition.colID] > curcondition.value)
//             conditionResult = true;
//         }
//         iterationResults.push({
//           conditionResult,
//           logicalOperator:
//             curcondition.logicalOperator &&
//             curcondition.logicalOperator.length > 0
//               ? curcondition.logicalOperator
//               : null,
//         });
//       });

//       if (iterationResults.length === 1) {
//         conditionFinalResult = iterationResults[0].conditionResult;
//       } else {
//         iterationResults.forEach((curResult) => {
//           if (curResult.logicalOperator === null) {
//             conditionFinalResult = curResult.conditionResult;
//           } else {
//             if (curResult.logicalOperator === "&&") {
//               conditionFinalResult =
//                 conditionFinalResult && curResult.conditionResult;
//             } else {
//               conditionFinalResult =
//                 conditionFinalResult || curResult.conditionResult;
//             }
//           }
//         });
//       }

//       if (conditionFinalResult === true) {
//         result = true;
//       } else {
//         result = false;
//       }
//     } else {
//       result = true;
//     }
//     return result;
//   };

//   // getActionIcon = (action, row) => {
//   //   const actionIcon = (
//   //     <Tooltip title={action.name}>
//   //       <IconButton
//   //         style={{ padding: "0px", margin: "0px 5px" }}
//   //         onClick={() => {
//   //           if (this.props.keyColumn && this.props.keyColumn.length > 0) {
//   //             if (
//   //               action.actionType &&
//   //               action.actionType === "AlertResponsive"
//   //             ) {
//   //               let values = [];
//   //               this.props.keyColumn.map((keyCol) => {
//   //                 let value = row[keyCol];
//   //                 values.push({ value: value, actionName: action.name });
//   //               });
//   //               this.props.handleOnActionClick(values);
//   //             } else {
//   //               let keyValue = row[this.props.keyColumn[0]];
//   //               this.props.handleOnActionClick(action.link + keyValue);
//   //             }
//   //           } else {
//   //             this.props.toastErrorMsg("Technical info loss to apply action");
//   //           }
//   //         }}
//   //       >
//   //         {action.icon}
//   //       </IconButton>
//   //     </Tooltip>
//   //   );
//   //   return actionIcon;
//   // };

//   getActionIcon = (action, row) => {
//     const actionIcon = (
//       <Tooltip title={action.name}>
//         <IconButton
//           style={{ padding: "0px", margin: "0px 5px" }}
//           onClick={() => {
//             this.props.handleOnActionClick({
//               ...row,
//               actionName: action.name,
//               action,
//             });
//           }}
//         >
//           {action.icon}
//         </IconButton>
//       </Tooltip>
//     );
//     return actionIcon;
//   };

//   onSearchClick = () => {
//     console.log("this.state.searchOpen", this.state.searchOpen);
//     this.setState({
//       searchOpen: !this.state.searchOpen,
//       rows: this.state.searchOpen ? this.props.rows : this.state.rows,
//       rowsCount: this.state.searchOpen
//         ? this.props.rowsCount
//         : this.state.rowsCount,
//     });
//   };

//   handleOnSearchDataChange = (e) => {
//     // console.log(object);
//     this.setState(
//       {
//         searchColumnData: {
//           ...this.state.searchColumnData,
//           [e.target.name]: e.target.value,
//         },
//       },
//       () => {
//         let searchRows = this.props.rows.filter((row) => {
//           return Object.entries(this.state.searchColumnData)
//             .filter(([_, value]) => value.trim() !== "")
//             .every(([key, value]) => {
//               const searchValue = value.toLowerCase();
//               const columnValue = row[key]?.toString().toLowerCase() || "";
//               return columnValue.includes(searchValue);
//             });
//         });
//         this.setState({
//           rows: searchRows,
//           rowsCount: searchRows.length,
//         });
//       }
//     );
//   };

//   render() {
//     const {
//       classes,
//       keyColumn,
//       width,
//       height,
//       maxHeight,
//       minHeight,
//       rowsPerPage,
//       dataRowBgColor,
//       dataRowBgColorCondition,
//       cellPadding,
//     } = this.props;
//     const fullWidth = { width: "100%" };
//     const fixWidthHeight = { width: width + "px", height: height + "px" };
//     const defaultMaxMinHeight = { maxHeight: "440px", minHeight: "440px" };
//     const maxMinHeight = {
//       maxHeight: maxHeight + "px",
//       minHeight: minHeight + "px",
//     };

//     let rowStyle = {};
//     let cellPaddingValue = cellPadding !== undefined ? cellPadding : "4px";

//     const tableHeadingBgColor = "#ffffff"; // '#bfc7dc'// '#b3bcd5'//'#a6b1ce'
//     return (
//       <Paper
//         style={
//           width && width > 0 && height && height > 0
//             ? { fixWidthHeight }
//             : { fullWidth }
//         }
//       >
//         <TableContainer
//           style={
//             minHeight && maxHeight && minHeight > 0 && maxHeight > 0
//               ? { maxMinHeight }
//               : { defaultMaxMinHeight }
//           }
//         >
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {this.props.columns.map((column, index) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     //Red Shade ED1C24, f44336, ef9a9a, ff8a80
//                     //Violage Shade 8556A6

//                     style={
//                       column.hide == true || column.hide == "true"
//                         ? {
//                             display: "none",
//                             minWidth: column.minWidth,
//                             width: column.width,
//                             backgroundColor: tableHeadingBgColor,
//                             padding: cellPaddingValue,
//                             fontWeight: "bold",
//                           }
//                         : {
//                             minWidth: column.minWidth,
//                             width: column.width,
//                             backgroundColor: tableHeadingBgColor,
//                             padding: cellPaddingValue,
//                           }
//                     }
//                     sx={[this.state.theme.cellborder, { fontWeight: "bold" }]}

//                     // { minWidth: column.minWidth, backgroundColor: '#ff8a80' },
//                   >
//                     {index === 0 && this.props.handleOnNewEntryClick ? (
//                       <Tooltip title={this.props.toolTipNewEntry}>
//                         <IconButton
//                           onClick={this.props.handleOnNewEntryClick}
//                           style={{ padding: "0px", margin: "0px 5px" }}
//                         >
//                           <Add />
//                         </IconButton>
//                       </Tooltip>
//                     ) : (
//                       ""
//                     )}
//                     {index === 0 &&
//                     this.state.provideSearch &&
//                     this.state.provideSearch === true ? (
//                       this.state.searchOpen === true ? (
//                         <Tooltip title={"Close Search"}>
//                           <IconButton
//                             onClick={this.onSearchClick}
//                             style={{ padding: "0px", margin: "0px 5px" }}
//                           >
//                             <Close />
//                           </IconButton>
//                         </Tooltip>
//                       ) : (
//                         <Tooltip title={"Search"}>
//                           <IconButton
//                             onClick={this.onSearchClick}
//                             style={{ padding: "0px", margin: "0px 5px" }}
//                           >
//                             <Search />
//                           </IconButton>
//                         </Tooltip>
//                       )
//                     ) : index === 0 ? (
//                       ""
//                     ) : (
//                       column.label
//                     )}

//                     {column.CtrlProps &&
//                     column.CtrlProps.autoEnableDisable &&
//                     !(
//                       this.state.autoEnableDisalbe_Col_Info.length > 0 &&
//                       this.state.autoEnableDisalbe_Col_Info.find(
//                         (col) => col.index === index
//                       )
//                     )
//                       ? this.add_autoEnableDisalbe_ColIdxs(
//                           column.CtrlProps,
//                           index
//                         )
//                       : ""}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             {this.state.searchOpen === true &&
//               this.state.provideSearch &&
//               this.state.provideSearch === true && (
//                 <TableRow style={{ backgroundColor: "#f6faffff" }}>
//                   {this.props.columns.map((column, index) => (
//                     <TableCell
//                       key={column.id}
//                       align={column.align}
//                       sx={this.state.theme.cellborder}
//                       style={
//                         column.hide == true || column.hide == "true"
//                           ? {
//                               display: "none",
//                               minWidth: column.minWidth,
//                               width: column.width,
//                               // backgroundColor: tableHeadingBgColor,
//                               padding: cellPaddingValue,
//                             }
//                           : {
//                               minWidth: column.minWidth,
//                               width: column.width,
//                               // backgroundColor: tableHeadingBgColor,
//                               padding: cellPaddingValue,
//                             }
//                       }
//                     >
//                       {index === 0 &&
//                       this.state.provideSearch &&
//                       this.state.provideSearch === true
//                         ? ""
//                         : index > 0 &&
//                           this.state.searchOpen === true &&
//                           this.state.provideSearch &&
//                           this.state.provideSearch === true && (
//                             <CtTxt
//                               id={column.id}
//                               // label={column.label}
//                               // value={this.state.searchData[column.id]}
//                               handleOnChange={this.handleOnSearchDataChange}
//                               width={column.width}
//                               maxLength={100}
//                             />
//                           )}

//                       {column.CtrlProps &&
//                       column.CtrlProps.autoEnableDisable &&
//                       !(
//                         this.state.autoEnableDisalbe_Col_Info.length > 0 &&
//                         this.state.autoEnableDisalbe_Col_Info.find(
//                           (col) => col.index === index
//                         )
//                       )
//                         ? this.add_autoEnableDisalbe_ColIdxs(
//                             column.CtrlProps,
//                             index
//                           )
//                         : ""}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               )}
//             <TableBody>
//               {this.state.rows
//                 ? this.state.rows
//                     .slice(
//                       this.state.page * rowsPerPage,
//                       this.state.page * rowsPerPage + rowsPerPage
//                     )
//                     .map((row, rowIndex) => {
//                       if (dataRowBgColor && dataRowBgColor.length > 0) {
//                         let applyBgColor = false;
//                         rowStyle = {};

//                         if (
//                           dataRowBgColorCondition
//                           //&& dataRowBgColorCondition.length > 0
//                         ) {
//                           if (
//                             this.checkCondition(dataRowBgColorCondition, row)
//                           ) {
//                             applyBgColor = true;
//                           } else {
//                             applyBgColor = false;
//                           }
//                         } else {
//                           applyBgColor = true;
//                         }

//                         if (applyBgColor === true) {
//                           rowStyle.backgroundColor = dataRowBgColor;
//                         }
//                       }

//                       return (
//                         <TableRow
//                           hover
//                           role="checkbox"
//                           tabIndex={-1}
//                           key={row.ID}
//                           style={rowStyle}
//                         >
//                           {this.props.columns.map((column, index) => {
//                             let value = row[column.id],
//                               dynamicRowDataID;
//                             const keyValue = row[keyColumn];

//                             if (
//                               column.dynamicRowDataID &&
//                               column.dynamicRowDataID.length > 0
//                             ) {
//                               if (row.dynamicRowDataID) {
//                                 value =
//                                   row.dynamicRowDataID[column.dynamicRowDataID];
//                               } else {
//                                 value = "";
//                               }
//                             }

//                             return (
//                               <TableCell
//                                 key={column.id}
//                                 align={column.align}
//                                 sx={this.state.theme.cellborder}
//                                 style={
//                                   column.hide == true || column.hide == "true"
//                                     ? {
//                                         display: "none",
//                                         padding: cellPaddingValue,
//                                         backgroundColor: "",
//                                       }
//                                     : {
//                                         padding: cellPaddingValue,
//                                         backgroundColor: "",
//                                       }
//                                 }
//                               >
//                                 {this.displayCurrentCell(
//                                   index,
//                                   column,
//                                   value,
//                                   row,
//                                   rowIndex
//                                 )}
//                               </TableCell>
//                             );
//                           })}
//                         </TableRow>
//                       );
//                     })
//                 : ""}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25, 50, 100]}
//           component="div"
//           count={this.state.rowsCount}
//           rowsPerPage={rowsPerPage}
//           page={this.state.page}
//           onPageChange={this.handleChangePage}
//           onRowsPerPageChange={(e, tblIndex) => {
//             this.handleChangeRowsPerPage(e, tblIndex);
//           }}
//         />
//       </Paper>
//     );
//   }
// }

// export default HoCtToastContainer(TableList);

// /*
// Library Notes:

// CtrlProps in ActionList:
// While action contains inputs, so, don't forget to set CtrlProps with default value of input control.
// If you don't provide default value in CtrlProps, then all row will not contains key='RowIndex'+'ColumnIndex' with default value

// *** column.type === "CtCmb" ***
//  label=<CtrlProps.label>,
//  items=<{CtrlProps.rowItemsColID}||{CtrlProps.items}>,
//  colID=<CtrlProps.colID>,
//  value={if row[column.id] then row[column.id] else if <CtrlProps.defValue> then CtrlProps.defValue else ""},
//  width={if <CtrlProps.width> then CtrlProps.width else 50},
//  maxLength={if <CtrlProps.maxLength> then CtrlProps.maxLength else 1},
//  disabled={if CtrlProps.disabled!== undefined then CtrlProps.disabled else false}
// */
