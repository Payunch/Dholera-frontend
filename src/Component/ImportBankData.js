import React, { Component } from "react";
import { Grid, Box } from "@mui/material";
import CtCmb from "./CustomTool/CtCmb";
import CtBtn from "./CustomTool/CtBtn";
import { connect } from "react-redux";
import {
  mapStatetoProps,
  mapSetActiveMenu_MenuVisibility_ToProps,
} from "../mapRedux/mapReduxProps";
import { apiURL, fetchGeneralSetting } from "./API";
import { withRouter } from "../HOC/withRouter";
import HOCVerifyIsUser from "../HOC/HOCVerifyIsUser";
import HoCtToastContainer from "../HOC/HoCtToastContainer";
import {
  getRowData,
  getYMDfromMDY,
  getYMDfromDMY,
} from "../SystemUtility/SystemUtility";
import readXlsxFile from "read-excel-file/browser";
import TableList from "../Component/CustomTool/TableList";
import { fetchBillSetting, fetchImportDetails } from "./API";
import Progress from "./CustomTool/Progress";

class ImportBankData extends Component {
  state = {
    rows: [],
    excelFormats: [
      {
        format: "PNB",
        import_index: [
          { index: 3, colHeading: "Txn Date" },
          { index: 5, colHeading: "Description" },
          { index: 8, colHeading: "Cheque No." },
          { index: 9, colHeading: "Dr Amount" },
          { index: 10, colHeading: "Cr Amount" },
        ],
      },
      {
        format: "SBI",
        import_index: [
          { index: 0, colHeading: "Txn Date" },
          { index: 2, colHeading: "Description" },
          { index: 3, colHeading: "Ref No./Cheque No." },
          { index: 5, colHeading: "Debit" },
          { index: 6, colHeading: "Credit" },
        ],
      },
    ],
    rowsCount: 0,
    rowsPerPage: 50,
    columns: [],
  };

  componentDidMount() {
    document.title = "RA : Import Bank Data";
  }

  ReadExcel = () => {
    const input = document.getElementById("input");
    let rows = [],
      columns = [];
    readXlsxFile(input.files[0]).then((c_row) => {
      let format = this.getFormatOfData(c_row);
      let excelData = this.extractExcelData(c_row, format === "SBI" ? 1 : 0);
      rows = excelData.rows;
      columns = excelData.columns;
      this.setState({ rows, columns });
    });
  };

  getFormatOfData = (data) => {
    let format = "";
    let readRow = false;
    let excelFormatPNB = this.state.excelFormats[0];
    let excelFormatSBI = this.state.excelFormats[1];
    let columnInfoPNB = excelFormatPNB.import_index;
    let columnInfoSBI = excelFormatSBI.import_index;
    data.map((rowData) => {
      if (
        rowData[columnInfoPNB[0].index] == columnInfoPNB[0].colHeading &&
        rowData[columnInfoPNB[1].index] == columnInfoPNB[1].colHeading &&
        rowData[columnInfoPNB[2].index] == columnInfoPNB[2].colHeading &&
        rowData[columnInfoPNB[3].index] == columnInfoPNB[3].colHeading &&
        rowData[columnInfoPNB[4].index] == columnInfoPNB[4].colHeading
      ) {
        format = "PNB";
        readRow = true;
      }

      if (
        rowData[columnInfoSBI[0].index] == columnInfoSBI[0].colHeading &&
        rowData[columnInfoSBI[1].index] == columnInfoSBI[1].colHeading &&
        rowData[columnInfoSBI[2].index] == columnInfoSBI[2].colHeading &&
        rowData[columnInfoSBI[3].index] == columnInfoSBI[3].colHeading &&
        rowData[columnInfoSBI[4].index] == columnInfoSBI[4].colHeading
      ) {
        format = "SBI";
        readRow = true;
      }
    });
    return format;
  };

  extractExcelData = (excelData, dataIndex) => {
    let rows = [],
      columns = [];
    let readRow = false;
    // console.log('excelFormats', this.state.excelFormats)
    let excelFormat = this.state.excelFormats[dataIndex];
    let columnInfo = excelFormat.import_index;
    excelData.map((rowData, index) => {
      if (
        readRow === true &&
        (rowData[columnInfo[0].index] !== null ||
          rowData[columnInfo[1].index] !== null ||
          rowData[columnInfo[2].index] !== null ||
          rowData[columnInfo[3].index] !== null ||
          rowData[columnInfo[4].index] !== null)
      ) {
        // console.log((rowData[3] === null ? "" : rowData[3]) + "   " + (rowData[5] === null ? "" : rowData[5]) + "        " + (rowData[8] === null ? "" : rowData[8]) + "          " + (rowData[9] === null ? "" : rowData[9]) + "         " + (rowData[10] === null ? "" : rowData[10]))
        rows.push({
          [columnInfo[0].colHeading]:
            rowData[columnInfo[0].index] === null
              ? ""
              : rowData[columnInfo[0].index],
          [columnInfo[1].colHeading]:
            rowData[columnInfo[1].index] === null
              ? ""
              : rowData[columnInfo[1].index],
          [columnInfo[2].colHeading]:
            rowData[columnInfo[2].index] === null
              ? ""
              : rowData[columnInfo[2].index],
          [columnInfo[3].colHeading]:
            rowData[columnInfo[3].index] === null
              ? ""
              : rowData[columnInfo[3].index],
          [columnInfo[4].colHeading]:
            rowData[columnInfo[4].index] === null
              ? ""
              : rowData[columnInfo[4].index],
        });
      }
      if (
        rowData[columnInfo[0].index] == columnInfo[0].colHeading &&
        rowData[columnInfo[1].index] == columnInfo[1].colHeading &&
        rowData[columnInfo[2].index] == columnInfo[2].colHeading &&
        rowData[columnInfo[3].index] == columnInfo[3].colHeading &&
        rowData[columnInfo[4].index] == columnInfo[4].colHeading
      ) {
        readRow = true;
      }
    });
    columnInfo.map((column) => {
      columns.push({ id: column.colHeading, label: column.colHeading });
    });
    // console.log("rows, columns", { rows, columns })

    return { rows, columns };
  };

  render() {
    let rowsCount = this.state.rows.length;
    // this.state.excelFormats[0].import_index.map((row) => {
    // console.log("row", row.colHeading);
    // })
    // console.log("this.state.rows", this.state.rows)
    return (
      <div>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          marginTop={2}
        >
          <Grid item>
            <label style={{ fontSize: "30px", color: "#515151" }}>
              <b>Import Bank Data</b>
            </label>
          </Grid>
        </Grid>

        <form>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            marginTop={2}
          >
            <Grid item>
              <input type="file" id="input" />
              <CtBtn label="Read Excel" onClick={this.ReadExcel} />
            </Grid>
            <Grid item style={{ width: "95%" }}>
              {
                <TableList
                  columns={this.state.columns}
                  rows={this.state.rows}
                  rowsCount={rowsCount}
                  rowsPerPage={this.state.rowsPerPage}
                />
                /* this.state.rows.length > 0 ?
                                    <TableList
                                        columns={this.state.columns}
                                        rows={this.state.rows}
                                        rowsCount={rowsCount}
                                        rowsPerPage={this.state.rowsPerPage}
                                    /> : '' */
              }
            </Grid>
          </Grid>
          {/* <br />
                        <table style={{ borderCollapse: "collapse", margin: "10px auto", border: "1px solid black" }}>
                            <thead>
                                <tr>
                                    {this.state.excelFormats[0].import_index.map((row, i) => {
                                        return <th style={{ border: "1px solid black" }} key={i}>{row.colHeading}</th>
                                    })}

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.rows.map((data, i) => {
                                    return <tr>
                                        <td style={{ border: "1px solid black" }} key={i}>{data["Txn Date"]}</td>
                                        <td style={{ border: "1px solid black" }} key={i}>{data["Description"]}</td>
                                        <td style={{ border: "1px solid black" }} key={i}>{data["Cheque No."]}</td>
                                        <td style={{ border: "1px solid black" }} key={i}>{data["Cr Amount"]}</td>
                                        <td style={{ border: "1px solid black" }} key={i}>{data["Dr Amount"]}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table> */}
        </form>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapSetActiveMenu_MenuVisibility_ToProps
)(HOCVerifyIsUser(HoCtToastContainer(withRouter(ImportBankData))));
