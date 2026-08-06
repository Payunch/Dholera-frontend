/**
 * TableList.js - Table Management Frontend Component
 * Converted from general-account-1.1.0/src/components/custom-tool/TableList.js
 * Written in React JS (MUI @mui/material, pure .js extension)
 */

import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import {
  Tooltip,
  IconButton,
  Checkbox,
  Grid,
  Typography,
  Card,
  Box,
} from "@mui/material";

import CtTxt from "./CtTxt";
import CtCmb from "./CtCmb";

class TableList extends Component {
  state = {
    page: 0,
    rowsPerPage: 10,
    rows: [],
    rowsCount: 0,
    columns: [],
    searchOpen: false,
    searchData: {},
    searchColumnData: {},
    theme: {
      tableborder: { border: "1px solid #e0e0e0" },
      cellborder: { border: "1px solid #f0f0f0" },
    },
  };

  componentDidMount() {
    this.handleChangeColumnsRows();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.rows !== this.props.rows ||
      prevProps.columns !== this.props.columns
    ) {
      this.handleChangeColumnsRows();
    }
  }

  handleChangeColumnsRows = () => {
    const columns = this.props.columns || [];
    const rows = this.props.rows || [];
    const rowsCount = this.props.rowsCount || rows.length;

    const searchColumnData = {};
    columns.forEach((col) => {
      if (!col.hide) {
        searchColumnData[col.id] = "";
      }
    });

    this.setState({
      columns,
      rows,
      rowsCount,
      searchColumnData,
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
    if (this.props.onPageChange) {
      this.props.onPageChange(newPage);
    }
  };

  handleChangeRowsPerPage = (event) => {
    const rpp = parseInt(event.target.value, 10);
    this.setState({ rowsPerPage: rpp, page: 0 });
    if (this.props.onRowsPerPageChange) {
      this.props.onRowsPerPageChange(rpp);
    }
  };

  toggleSearch = () => {
    this.setState((prevState) => ({ searchOpen: !prevState.searchOpen }));
  };

  handleSearchChange = (colId, value) => {
    this.setState((prevState) => ({
      searchColumnData: {
        ...prevState.searchColumnData,
        [colId]: value,
      },
    }));
  };

  renderInputControl = (col, row, rowIndex) => {
    const value = row[col.id] !== undefined ? row[col.id] : "";
    const isReadOnly = col.readOnly || this.props.readOnly;

    if (col.type === "select" || col.type === "cmb") {
      return (
        <CtCmb
          id={`${col.id}_${rowIndex}`}
          items={col.options || []}
          value={value}
          colID={col.colID}
          disabled={isReadOnly}
          handleOnChange={(e) =>
            this.props.handleRowChange &&
            this.props.handleRowChange(rowIndex, col.id, e.target.value)
          }
        />
      );
    }

    if (col.type === "checkbox") {
      return (
        <Checkbox
          checked={Boolean(value)}
          disabled={isReadOnly}
          onChange={(e) =>
            this.props.handleRowChange &&
            this.props.handleRowChange(rowIndex, col.id, e.target.checked)
          }
        />
      );
    }

    return (
      <CtTxt
        id={`${col.id}_${rowIndex}`}
        value={value}
        readOnly={isReadOnly}
        AmountOnly={col.type === "amount"}
        NumberOnly={col.type === "number"}
        maxLength={col.maxLength}
        handleOnChange={(e) =>
          this.props.handleRowChange &&
          this.props.handleRowChange(rowIndex, col.id, e.target.value)
        }
      />
    );
  };

  render() {
    const { page, rowsPerPage, rows, columns, searchOpen, searchColumnData } =
      this.state;

    // Filter rows based on search column inputs
    const filteredRows = rows.filter((row) => {
      return Object.keys(searchColumnData).every((colId) => {
        const searchTerm = (searchColumnData[colId] || "").toLowerCase();
        if (!searchTerm) return true;
        const cellValue = String(row[colId] || "").toLowerCase();
        return cellValue.includes(searchTerm);
      });
    });

    const paginatedRows = filteredRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    return (
      <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" component="div">
            {this.props.title || "Table Management (Rite Mng)"}
          </Typography>
          <Box>
            <Tooltip title="Toggle Search">
              <IconButton onClick={this.toggleSearch} color="primary">
                {searchOpen ? <CloseIcon /> : <SearchIcon />}
              </IconButton>
            </Tooltip>
            {this.props.onAddRow && (
              <Tooltip title="Add Row">
                <IconButton onClick={this.props.onAddRow} color="secondary">
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="rite table management">
            <TableHead>
              <TableRow>
                {columns
                  .filter((col) => !col.hide)
                  .map((col) => (
                    <TableCell
                      key={col.id}
                      align={col.align || "left"}
                      style={{ minWidth: col.minWidth || 100, fontWeight: "bold" }}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                {this.props.actions && <TableCell align="center">Actions</TableCell>}
              </TableRow>

              {searchOpen && (
                <TableRow>
                  {columns
                    .filter((col) => !col.hide)
                    .map((col) => (
                      <TableCell key={`search_${col.id}`}>
                        <CtTxt
                          id={`search_${col.id}`}
                          value={searchColumnData[col.id] || ""}
                          handleOnChange={(e) =>
                            this.handleSearchChange(col.id, e.target.value)
                          }
                          variant="standard"
                        />
                      </TableCell>
                    ))}
                  {this.props.actions && <TableCell />}
                </TableRow>
              )}
            </TableHead>

            <TableBody>
              {paginatedRows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={
                      columns.filter((c) => !c.hide).length +
                      (this.props.actions ? 1 : 0)
                    }
                    align="center"
                  >
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((row, rowIndex) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns
                      .filter((col) => !col.hide)
                      .map((col) => (
                        <TableCell key={col.id} align={col.align || "left"}>
                          {col.editable
                            ? this.renderInputControl(col, row, page * rowsPerPage + rowIndex)
                            : row[col.id]}
                        </TableCell>
                      ))}
                    {this.props.actions && (
                      <TableCell align="center">
                        {this.props.renderActions &&
                          this.props.renderActions(row, page * rowsPerPage + rowIndex)}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default TableList;
