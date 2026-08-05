import React from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CtBtn from "./CtBtn";
import { AddBox, FileDownload, PlusOne } from "@mui/icons-material";
import { mkConfig, generateCsv, download } from "export-to-csv";

// import "../theam.css";

const MobileTable = ({
  rowsData,
  columnData,
  rowIconAction,
  hideColIdList,
  tableButtonAction,
  csvFileName,
}) => {
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    filename: csvFileName,
    showColumnHeaders: true,
    columnHeaders: columnData.map((column) => ({
      key: column.accessorKey,
      displayLabel: column.header,
    })),
  });

  const handleExportData = (rows) => {
    const visibleColumnIds = columnData.map((column) => column.id);
    const rowData = rows.map((row) => {
      const visibleData = {};
      for (const columnId of visibleColumnIds) {
        visibleData[columnId] = row[columnId];
      }
      return visibleData;
    });
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  // console.log("tableButtonAction", tableButtonAction);

  // console.log("rowIconAction", rowIconAction);
  // console.log("rowIconAction", rowIconAction);

  // rowIconAction(row).map((btn) => {
  //   console.log("btn", btn);
  // });

  return (
    <>
      {rowsData.length > 0 ? (
        <Grid container direction={"row"} spacing={2}>
          {tableButtonAction &&
            tableButtonAction.map((btn, index) => {
              if (Object.keys(btn).length > 0) {
                return (
                  <Grid item key={index}>
                    <CtBtn
                      label={btn.label}
                      iconName={btn.addPluseIcon == true ? "new" : ""}
                      firstletterBig={false}
                      onClick={() => {
                        btn.onClick();
                      }}
                    />
                  </Grid>
                );
              }
            })}

          <Grid item>
            <CtBtn
              label="Generate Excel"
              onClick={() => handleExportData(rowsData)}
              iconName={"excel"}
              firstletterBig={"false"}
              className="excel-button"
            />
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid container direction="row" spacing={2}>
            {tableButtonAction &&
              tableButtonAction.map((btn, index) => {
                if (Object.keys(btn).length > 0) {
                  return (
                    <Grid item key={index}>
                      <CtBtn
                        label={btn.label}
                        iconName={btn.addPluseIcon == true ? "new" : ""}
                        firstletterBig={false}
                        onClick={btn.onClick}
                      />
                    </Grid>
                  );
                }
              })}
            <Grid item>
              <CtBtn
                label="Generate Excel"
                onClick={() => handleExportData(rowsData)}
                iconName="excel"
                firstletterBig={false}
                className="excel-button"
                disabled={rowsData.length === 0} // ✅ disable if no data
              />
            </Grid>
          </Grid>
        </>
      )}

      {rowsData.length > 0 ? (
        rowsData.map((row, index) => (
          <Card
            key={index}
            variant="outlined"
            style={{
              padding: "10px",
              width: "80vw",
              backgroundColor: "#F1F2FF",
              marginTop: "10px",
            }}
          >
            <Grid container justifyContent="flex-start" direction="column">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <table>
                  {columnData.map((col) => {
                    if (hideColIdList.includes(col.accessorKey)) return null;
                    return (
                      <tr>
                        <td>{col.header}</td>
                        <td>
                          : <b>{row[col.accessorKey]}</b>
                        </td>
                        {/* <Typography marginTop={1} marginBottom={1}> */}
                        {/* {col.header} : <b>{row[col.accessorKey]}</b> */}
                        {/* </Typography> */}
                        {/* <Divider /> */}
                      </tr>
                    );
                  })}
                </table>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction={"row"}
                  justifyContent={"center"}
                  spacing={2}
                  marginTop={1}
                >
                  {/* {rowIconAction &&
                      rowIconAction.map((btn, index) => {
                        if (Object.keys(btn).length > 0) {
                          return (
                            <Grid item key={index}>
                              <CtBtn
                                label={btn.label}
                                className={btn.className}
                                iconName={btn.icon}
                                firstletterBig={false}
                                onClick={() => {
                                  btn.onClick(row);
                                }}
                              />
                            </Grid>
                          );
                        }
                      })} */}

                  {/* {typeof rowIconAction === "function"
                    ? rowIconAction(row).map((btn, index) => {
                        if (Object.keys(btn).length > 0) {
                          return (
                            <Grid item key={index}>
                              <CtBtn
                                label={btn.label}
                                className={btn.className}
                                iconName={btn.icon}
                                firstletterBig={false}
                                onClick={() => {
                                  btn.onClick(row);
                                }}
                              />
                            </Grid>
                          );
                        }
                      })
                    : Array.isArray(rowIconAction) &&
                      rowIconAction.map((btn, index) => {
                        if (Object.keys(btn).length > 0) {
                          return (
                            <Grid item key={index}>
                              <CtBtn
                                label={btn.label}
                                className={btn.className}
                                iconName={btn.icon}
                                firstletterBig={false}
                                onClick={() => {
                                  btn.onClick(row);
                                }}
                              />
                            </Grid>
                          );
                        }
                      })} */}
                </Grid>
              </Grid>
            </Grid>

            {/* </Grid> */}
          </Card>
        ))
      ) : (
        <Box mt={4} display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h6" color="text.secondary">
            No Record Found
          </Typography>
        </Box>
      )}
    </>
  );
};

export default MobileTable;
