import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { Button, Tooltip, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import {
  Edit,
  Delete,
  Print,
  Label,
  Upgrade,
  PriceChangeOutlined,
  CurrencyRupee,
  FileCopy,
  ContentCopy,
  CopyAll,
} from "@mui/icons-material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Revision from "../../images/revision.png";
import FileView from "../../images/file.png";

const CtMRT = ({
  id,
  columnsdata,
  rowsdata,
  rowsPerPage,
  tblmaxHeight,
  csvFileName,
  tableButtonAction,
  rowIconAction,
  showColumnFilters,
  hideColIdList,
  actionColSize,
  density,
  cust_filters,
  enableRowSelection,
  rowSelectionAction,
  rowSelectionActionBtnColor,
  hideBottomToolbar,
}) => {
  // const isNumeric = (value) => {
  //   if (value === null || value === undefined) return false;
  //   return !isNaN(parseFloat(value)) && isFinite(value);
  // };

  // const formatIndianNumber = (value) => {
  //   if (!isNumeric(value)) return value;
  //   return new Intl.NumberFormat("en-IN", {
  //     maximumFractionDigits: 2,
  //     minimumFractionDigits: 2,
  //   }).format(Number(value));
  // };

  // const formattedColumns = useMemo(() => {
  //   return columnsdata.map((column) => {
  //     return {
  //       ...column,
  //       Cell: ({ cell, column }) => {
  //         const value = cell.getValue();
  //         const formattedValue = formatIndianNumber(value);
  //         return (
  //           <Box
  //             sx={{
  //               textAlign:
  //                 column?.columnDef?.align === "right" ? "right" : "left",
  //             }}
  //           >
  //             {formattedValue}
  //           </Box>
  //         );
  //       },
  //     };
  //   });
  // }, [columnsdata]);

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    filename: csvFileName,
    showColumnHeaders: true,
    columnHeaders: columnsdata.map((column) => ({
      key: column.accessorKey,
      displayLabel: column.header,
    })),
  });

  if (density === undefined || density === "") {
    density = "comfortable";
  }

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => {
      const visibleData = {};

      columnsdata.forEach((column) => {
        const key = column.accessorKey;

        visibleData[key] = row.original?.[key] ?? "";
      });

      return visibleData;
    });

    console.log("Export row data:", rowData);

    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = (rows) => {
    const rowData = rows.map((row) => {
      const visibleData = {};

      columnsdata.forEach((column) => {
        const key = column.accessorKey;

        visibleData[key] = row?.[key] ?? "";
      });

      return visibleData;
    });

    console.log("Export full data:", rowData);

    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  let columnVisibility = {};
  hideColIdList &&
    hideColIdList.map((col) => {
      columnVisibility[col] = false;
    });

  const totalRow = useMemo(() => {
    const totals = {};

    const numericColumnKeys = columnsdata
      .filter((col) => col.isNumeric === true)
      .map((col) => col.accessorKey);

    numericColumnKeys.forEach((key) => {
      totals[key] = rowsdata.reduce(
        (sum, row) => sum + (Number(row[key]) || 0),
        0,
      );
    });
    return totals;
  }, [rowsdata, columnsdata]);

  const columnsWithFooter = useMemo(
    () =>
      columnsdata.map((column, index) => {
        if (index === 0) {
          return {
            ...column,
            Footer: () => <Box sx={{ paddingLeft: "5px" }}>Total</Box>,
          };
        }
        if (totalRow[column.accessorKey] !== undefined) {
          return {
            ...column,
            Footer: () => (
              <Box sx={{ textAlign: "right", fontWeight: "bold" }}>
                {totalRow[column.accessorKey].toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                })}
              </Box>
            ),
          };
        }
        return column;
      }),
    [columnsdata, totalRow],
  );
  return (
    <MaterialReactTable
      columns={columnsWithFooter}
      data={rowsdata}
      enableStickyFooter
      displayColumnDefOptions={{
        "mrt-row-actions": {
          muiTableHeadCellProps: {
            align: "center",
          },
          size: actionColSize,
          maxSize: actionColSize,
          muiTableBodyCellProps: {
            align: "left",
          },
        },
      }}
      renderRowActions={({ row }) => {
        const actions =
          typeof rowIconAction === "function"
            ? rowIconAction(row.original)
            : rowIconAction || [];

        return (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            {actions &&
              actions.map((action, index) => {
                return action ? (
                  <Tooltip
                    arrow
                    placement="left"
                    title={action.label}
                    key={index}
                  >
                    <IconButton
                      color={action.label === "Delete" ? "error" : ""}
                      onClick={() => action.onClick(row)}
                      style={{ padding: "0px" }}
                    >
                      {action.label === "Edit" ? <Edit /> : null}
                      {action.label === "Revise" ? (
                        <img
                          src={Revision}
                          alt="Revision"
                          height={"25px"}
                          width={"25px"}
                        />
                      ) : null}
                      {action.label === "Delete" ? <Delete /> : null}
                      {action.label === "Print" ? <Print /> : null}
                      {action.label === "Update Status" ? <Upgrade /> : null}
                      {action.label === "Price Summary" ? (
                        <CurrencyRupee />
                      ) : null}
                      {action.label === "Copy" ? <FileCopy /> : null}
                      {action.label === "View Entry" ? (
                        <img
                          src={FileView}
                          alt="FileView"
                          height={"25px"}
                          width={"25px"}
                        />
                      ) : null}
                    </IconButton>
                  </Tooltip>
                ) : (
                  ""
                );
              })}
          </Box>
        );
      }}
      renderTopToolbarCustomActions={({ table }) => {
        return (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div>
              <Box>
                {tableButtonAction &&
                  tableButtonAction.map((action, index) => {
                    return action ? (
                      <Button
                        key={index}
                        bgcolor="#177CDD"
                        variant="contained"
                        onClick={() => {
                          action.onClick(table);
                        }}
                        style={{
                          marginRight: "5px",
                          marginLeft: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        <label style={{ display: "flex" }}>
                          {action.addPluseIcon ? (
                            <AddBoxIcon style={{ marginRight: "5px" }} />
                          ) : null}
                          {action.label}
                        </label>
                      </Button>
                    ) : (
                      ""
                    );
                  })}

                {rowSelectionAction &&
                  rowSelectionAction.map((action, index) => {
                    return (
                      <Button
                        key={index}
                        color={
                          rowSelectionActionBtnColor
                            ? rowSelectionActionBtnColor
                            : "success"
                        }
                        variant="contained"
                        disabled={
                          !table.getIsSomeRowsSelected() &&
                          !table.getIsAllRowsSelected()
                        }
                        onClick={() => {
                          action.onClick(table);
                          // console.log(
                          //   "table.getIsSomeRowsSelected",
                          //   table.getIsSomeRowsSelected
                          // );
                        }}
                        style={{
                          marginRight: "5px",
                          marginLeft: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        {action.label}
                      </Button>
                    );
                  })}
              </Box>
            </div>
          </div>
        );
      }}
      enableRowSelection={enableRowSelection}
      enableEditing
      enableHiding
      enableColumnOrdering
      enableColumnResizing
      enableClickToCopy
      enableColumnFilterModes
      enableColumnDragging
      enableGrouping
      muiTablePaginationProps={{
        showFirstButton: true,
        showLastButton: true,
      }}
      initialState={{
        density,
        columnVisibility,
        showColumnFilters,
        pagination: { pageSize: rowsPerPage },
        filters: { cust_filters },
        // rowSelection: { rowSelection },
      }}
      muiTableHeadCellFilterTextFieldProps={{
        sx: { m: "0.2rem 0", width: "100%" },
        // variant: "outlined",
      }}
      enableFacetedValues
      enablePinning
      enableStickyHeader
      muiTableContainerProps={{
        sx: { maxHeight: tblmaxHeight },
      }}
      muiTableProps={{
        sx: {
          border: "0.5px solid rgb(23,124,221)",
          // maxWidth: "200vw",
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          border: "0.5px solid rgb(185,215,244)",
          padding: "4px 10px 0px 6px",
        },
      }}
      muiTableBodyCellProps={({ column }) => ({
        sx: {
          border: "0.5px solid rgb(185,215,244)",
          textAlign: column.columnDef?.align === "right" ? "right" : "left",
        },
      })}
      renderBottomToolbarCustomActions={({ table }) =>
        !hideBottomToolbar && (
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              padding: "20px",
              flexWrap: "wrap",
            }}
          >
            <Button
              bgcolor="#177CDD"
              //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
              onClick={() => handleExportData(rowsdata)}
              startIcon={<FileDownloadIcon />}
            >
              All Data
            </Button>
            <Button
              bgcolor="#177CDD"
              disabled={table.getPrePaginationRowModel().rows.length === 0}
              //export all rows, including from the next page, (still respects filtering and sorting)
              onClick={() =>
                handleExportRows(table.getPrePaginationRowModel().rows)
              }
              startIcon={<FileDownloadIcon />}
            >
              All Rows
            </Button>
            <Button
              bgcolor="#177CDD"
              disabled={table.getRowModel().rows.length === 0}
              //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
              onClick={() => handleExportRows(table.getRowModel().rows)}
              startIcon={<FileDownloadIcon />}
            >
              Page Rows
            </Button>
            <Button
              bgcolor="#177CDD"
              disabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              //only export selected rows
              onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
              startIcon={<FileDownloadIcon />}
            >
              Selected Rows
            </Button>
          </Box>
        )
      }
    />
  );
};

export default CtMRT;
