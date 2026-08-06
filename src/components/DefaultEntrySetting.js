import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../components/hoc/withRouter";
import {
  mapSetActiveMenu_MenuVisibility_ToProps,
  mapStatetoProps,
} from "../store/mapReduxProps";
import { Box, Grid, Typography } from "@mui/material";
import CtDtp from "./CustomTool/CtDtp";
import { Check, Delete, Edit, Payment } from "@mui/icons-material";
import TableList from "./CustomTool/TableList";
// import Checkbox from './CustomTool/CtCheckBox';
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CtBtn from "./CustomTool/CtBtn";
import { CtCmbEditable } from "./CustomTool/CtCmbEditable";
import { CtCmb } from "./CustomTool/CtCmb";
import { CtTxtAmt } from "./CustomTool/CtTxtAmt";
import HoCtToastContainer from "../components/hoc/HoCtToastContainer";
import HOCVerifyIsUser from "../components/hoc/HOCVerifyIsUser";
import { fetchDefaultEntrySetting } from "./API";
import { getRowData } from "../utils/SystemUtility";

class DefaultEntrySetting extends Component {
  state = {
    AccountYear: [],
    PaymentDefault: [],
    PaymentDefault2: [],
    PaymentDefault3: [],
    PaymentDefault4: [],
    PaymentDefault5: [],
    PaymentDefault6: [],
    DefaultEntrySetting: [],
    columns: [
      {
        id: "Action",
        label: "Default",
        name: "DefaultTransaction",
      },
      { id: "Type", label: "Transaction Type" },
      {
        id: "Payment",
        label: "Payment Default To",
        type: "CtCmb",
        CtrlProps: {
          colID: "vac_ledgername",
          items: [],
          width: 150,
          visiblecondition: [
            {
              colID: "Type",
              value: "Remain",
              relationalOperator: "!==",
            },
          ],
        },
      },
    ],
    rows: [
      {
        Type: "Remain",
        Payment: "",
      },
      {
        Type: "Paid",
        Payment: "",
      },
    ],
    actionList: [
      {
        name: "SelectCompany",
        icon: "", //<CheckBoxOutlineBlankIcon color="primary" />,
        link: "CompanyList:",
        actionType: "Chk",
        CtrlProps: { behaviour: "radio" },
      },
    ],

    columns2: [
      { id: "Action", label: "Default", name: "DefaultTransaction2" },
      { id: "Type", label: "Transaction Type" },
      {
        id: "Payment",
        label: "Payment Default To",
        type: "CtCmb",
        CtrlProps: {
          colID: "vac_ledgername",
          items: [],
          width: 150,
          visiblecondition: [
            {
              colID: "Type",
              value: "Remain",
              relationalOperator: "!==",
            },
          ],
        },
      },
    ],
    rows2: [
      {
        Type: "Remain",
        Payment: "",
      },
      {
        Type: "Paid",
        Payment: "",
      },
    ],
    actionList2: [
      {
        name: "SelectCompany",
        icon: "", //<CheckBoxOutlineBlankIcon color="primary" />,
        link: "CompanyList:",
        actionType: "Chk",
        CtrlProps: { behaviour: "radio" },
      },
    ],

    columns5: [
      { id: "Action", label: "Default", name: "DefaultTransaction2" },
      { id: "Type", label: "Transaction Type" },
      {
        id: "Payment",
        label: "Payment Default To",
        type: "CtCmb",
        CtrlProps: {
          colID: "vac_ledgername",
          items: [],
          width: 150,
          visiblecondition: [
            {
              colID: "Type",
              value: "Remain",
              relationalOperator: "!==",
            },
          ],
        },
      },
    ],
    rows5: [
      {
        Type: "Remain",
        Payment: "",
      },
      {
        Type: "Paid",
        Payment: "",
      },
    ],
    actionList5: [
      {
        name: "SelectCompany",
        icon: "", //<CheckBoxOutlineBlankIcon color="primary" />,
        link: "CompanyList:",
        actionType: "Chk",
        CtrlProps: { behaviour: "radio" },
      },
    ],

    columns3: [
      { id: "Type", label: "Transaction Type" },
      {
        id: "Payment",
        label: "Payment Default To",
        type: "CtCmb",
        CtrlProps: { colID: "vac_ledgername", items: [], width: 150 },
      },
    ],
    rows3: [
      {
        Type: "Receipt",
        Payment: "",
      },
      {
        Type: "Payment",
        Payment: "",
      },
    ],
    columns4: [
      { id: "Type", label: "Entry Module" },
      {
        id: "Payment",
        label: "Payment Default To",
        type: "CtCmb",
        CtrlProps: { colID: "vac_ledgername", items: [], width: 150 },
      },
    ],
    rows4: [
      {
        Type: "Trip Receipt",
        Payment: "",
      },
      {
        Type: "Truck Expance",
        Payment: "",
      },
    ],
    columns6: [
      {
        id: "Action",
        label: "Default",
        name: "DefaultTransaction",
      },
      { id: "Type", label: "Transaction Type" },
      {
        id: "Payment",
        label: "Payment Default To",
        type: "CtCmb",
        CtrlProps: {
          colID: "vac_ledgername",
          items: [],
          width: 150,
          visiblecondition: [
            {
              colID: "Type",
              value: "બાકી",
              relationalOperator: "!==",
            },
          ],
        },
      },
    ],
    rows6: [
      {
        Type: "બાકી",
        Payment: "",
      },
      {
        Type: "ચૂકવેલ",
        Payment: "",
      },
    ],
    actionList6: [
      {
        name: "SelectCompany",
        icon: "", //<CheckBoxOutlineBlankIcon color="primary" />,
        link: "CompanyList:",
        actionType: "Chk",
        CtrlProps: { behaviour: "radio" },
      },
    ],
    searchColumns: [],
    searchRows: [],
    searchOpen: false,
    searchRowsCount: 0,

    rowsCount: 0,
    rowsCount2: 0,
    rowsCount3: 0,
    rowsCount4: 0,
    rowsCount5: 0,
    rowsCount6: 0,
    rowsPerPage: 5,
    rowsPerPage2: 5,
    rowsPerPage3: 5,
    rowsPerPage4: 5,
    rowsPerPage5: 5,
    rowsPerPage6: 5,
  };

  componentDidMount() {
    document.title = "RA : Default Entry Setting";
    this.props.setActiveMenu("DefaultEntrySetting");
    this.loadDefaultEnrtySettingList();
  }

  handleChangeRowsPerPage = (rowsPerPage) => {
    this.setState({ rowsPerPage });
  };

  handleChangeRowsPerPage2 = (rowsPerPage2) => {
    this.setState({ rowsPerPage2 });
  };

  handleChangeRowsPerPage3 = (rowsPerPage3) => {
    this.setState({ rowsPerPage3 });
  };
  handleChangeRowsPerPage4 = (rowsPerPage4) => {
    this.setState({ rowsPerPage4 });
  };
  handleChangeRowsPerPage5 = (rowsPerPage5) => {
    this.setState({ rowsPerPage5 });
  };
  handleChangeRowsPerPage6 = (rowsPerPage6) => {
    this.setState({ rowsPerPage6 });
  };

  handleOnRowDataChange = (rows, handledRowIndex, colID) => {
    this.setState({ rows, rowsCount: rows.length });
  };

  handleOnRowDataChange2 = (rows2, handledRowIndex, colID) => {
    this.setState({ rows2, rowsCount2: rows2.length });
  };

  handleOnRowDataChange3 = (rows3, handledRowIndex, colID) => {
    this.setState({ rows3, rowsCount3: rows3.length });
  };
  handleOnRowDataChange4 = (rows4, handledRowIndex, colID) => {
    this.setState({ rows4, rowsCount4: rows4.length });
  };
  handleOnRowDataChange5 = (rows5, handledRowIndex, colID) => {
    this.setState({ rows5, rowsCount5: rows5.length });
  };
  handleOnRowDataChange6 = (rows6, handledRowIndex, colID) => {
    this.setState({ rows6, rowsCount6: rows6.length });
  };
  setCmbItem = () => {
    let columns = this.state.columns;
    columns = columns.map((col) => {
      if (col.id === "Payment") {
        col.CtrlProps.items = this.state.PaymentDefault;
      }
      return col;
    });
    this.setState({ columns }, () => {});
  };

  setCmbItem2 = () => {
    let columns2 = this.state.columns2;
    columns2 = columns2.map((col2) => {
      if (col2.id === "Payment") {
        col2.CtrlProps.items = this.state.PaymentDefault2;
      }
      return col2;
    });
    this.setState({ columns2 }, () => {});
  };

  setCmbItem3 = () => {
    let columns3 = this.state.columns3;
    columns3 = columns3.map((col3) => {
      if (col3.id === "Payment") {
        col3.CtrlProps.items = this.state.PaymentDefault3;
      }
      return col3;
    });
    this.setState({ columns3 }, () => {});
  };
  setCmbItem5 = () => {
    let columns5 = this.state.columns5;
    columns5 = columns5.map((col5) => {
      if (col5.id === "Payment") {
        col5.CtrlProps.items = this.state.PaymentDefault5;
      }
      return col5;
    });
    this.setState({ columns5 }, () => {});
  };
  setCmbItem4 = () => {
    let columns4 = this.state.columns4;
    columns4 = columns4.map((col4) => {
      if (col4.id === "Payment") {
        col4.CtrlProps.items = this.state.PaymentDefault4;
      }
      return col4;
    });
    this.setState({ columns4 }, () => {});
  };
  setCmbItem6 = () => {
    let columns6 = this.state.columns6;
    columns6 = columns6.map((col6) => {
      if (col6.id === "Payment") {
        col6.CtrlProps.items = this.state.PaymentDefault6;
      }
      return col6;
    });
    this.setState({ columns6 }, () => {});
  };

  loadDefaultEnrtySettingList = () => {
    const reqData = {
      Op: "GetDefaultEntrySetting",
      bint_acid: localStorage.getItem("acid"),
      vac_entrytype: "",
    };
    fetchDefaultEntrySetting(reqData)
      .then((res) => {
        this.props.updateProcessing(res.data.msgType, res.data.message);
        let PaymentDefault = res.data.LedgerNameList,
          PaymentDefault2 = res.data.LedgerNameList,
          PaymentDefault3 = res.data.LedgerNameList,
          PaymentDefault4 = res.data.LedgerNameList,
          PaymentDefault5 = res.data.LedgerNameList,
          PaymentDefault6 = res.data.LedgerNameList,
          DefaultEntrySetting = res.data.DefaultEntrySettingList;
        this.setState(
          {
            PaymentDefault,
            PaymentDefault2,
            PaymentDefault3,
            PaymentDefault4,
            PaymentDefault5,
            PaymentDefault6,
            DefaultEntrySetting,
          },
          () => {
            this.setCmbItem();
            this.setCmbItem2();
            this.setCmbItem3();
            this.setCmbItem4();
            this.setCmbItem5();
            this.setCmbItem6();

            const filterLedger = (filterId) => {
              return filterId.some((item) =>
                this.state.DefaultEntrySetting.some(
                  (row) => row.vac_entrytype === item
                )
              );
            };

            let rows = filterLedger(["Sales"]) ? [] : this.state.rows,
              rows2 = filterLedger(["Purchase"]) ? [] : this.state.rows2,
              rows3 = filterLedger(["Receipt", "Payment"])
                ? []
                : this.state.rows3,
              rows4 = filterLedger(["Trip Receipt", "Truck Expance"])
                ? []
                : this.state.rows4,
              rows6 = filterLedger(["Farmer"]) ? [] : this.state.rows6,
              rows5 = filterLedger(["Trip"]) ? [] : this.state.rows5;
            let DefaultEntrySetting = this.state.DefaultEntrySetting.map(
              (row) => {
                if (row.vac_entrytype === "Sales") {
                  if (row.int_default === 0) {
                    row["Action"] = true;
                  }
                  row["Type"] = row.vac_transacationtype;
                  row["Payment"] = row.vac_ledgername;
                  rows.push(row);
                  // return rows
                } else if (row.vac_entrytype === "Purchase") {
                  if (row.int_default === 0) {
                    row["Action"] = true;
                  }
                  row["Type"] = row.vac_transacationtype;
                  row["Payment"] = row.vac_ledgername;
                  rows2.push(row);
                  // return rows2
                } else if (row.vac_entrytype === "Trip") {
                  if (row.int_default === 0) {
                    row["Action"] = true;
                  }
                  row["Type"] = row.vac_transacationtype;
                  row["Payment"] = row.vac_ledgername;
                  rows5.push(row);
                  // return rows2
                } else if (
                  row.vac_entrytype === "Receipt" ||
                  row.vac_entrytype === "Payment"
                ) {
                  row["Type"] = row.vac_entrytype;
                  row["Payment"] = row.vac_ledgername;
                  rows3.push(row);
                } else if (
                  row.vac_entrytype === "Trip Receipt" ||
                  row.vac_entrytype === "Truck Expance"
                ) {
                  row["Type"] = row.vac_entrytype;
                  row["Payment"] = row.vac_ledgername;
                  rows4.push(row);
                } else if (row.vac_entrytype === "Farmer") {
                  if (row.int_default === 0) {
                    row["Action"] = true;
                  }
                  row["Type"] = row.vac_transacationtype;
                  row["Payment"] = row.vac_ledgername;
                  rows6.push(row);
                  // return rows2
                }
              }
            );
            // console.log("before this.state.rows", this.state.rows)
            // console.log("before this.state.rows2", this.state.rows2)
            // console.log("before this.state.rows3", this.state.rows3)
            this.setState(
              {
                rows,
                rows2,
                rows3,
                rows4,
                rows5,
                rows6,
              },
              () => {
                // console.log("After this.state.rows", this.state.rows)
                // console.log("After this.state.rows2", this.state.rows2)
                // console.log("After this.state.rows3", this.state.rows3)
              }
            );
          }
        );
      })
      .catch((err) => {
        console.log("Unknown error occurred in getInfo.", err);
        this.props.updateProcessing(
          "error",
          "Unknown error occurred in loading . " + err
        );
      });
    // document.getElementById("cmbType").focus();
  };

  settingValidation = () => {
    let rows = this.state.rows;
    // console.log("rows", rows);
    let row = getRowData(rows, "Type", "Paid");
    console.log("row", row);
    if (row.Payment.length <= 0) {
      this.props.toastErrorMsg("Select Sales Paid Payment Type");
      return false;
    }
    // console.log("row", row);
    let rows2 = this.state.rows2;
    // console.log("rows2", rows2);
    let row2 = getRowData(rows2, "Type", "Paid");
    if (row2.Payment.length <= 0) {
      this.props.toastErrorMsg("Select Purchase Paid Payment Type");
      return false;
    }
    let rows3 = this.state.rows3;
    // console.log("rows3", rows3)
    let PaymentRow = getRowData(rows3, "Type", "Payment"),
      recieptRow = getRowData(rows3, "Type", "Receipt");
    if (recieptRow.Payment.length <= 0) {
      this.props.toastErrorMsg("Select Receipt-Payment Receipt Type");
      return false;
    } else if (PaymentRow.Payment.length <= 0) {
      this.props.toastErrorMsg("Select Receipt-Payment Payment Type");
      return false;
    }
    if (this.props.userPrivilege["Trip"]) {
      let rows5 = this.state.rows5;
      let PaidRow = getRowData(rows5, "Type", "Paid");
      if (PaidRow.Payment.length <= 0) {
        this.props.toastErrorMsg(
          "Select Trip Way Bridge charge Paid Payment Type"
        );
        return false;
      }
      let rows4 = this.state.rows4;
      let TripReceiptRow = getRowData(rows4, "Type", "Trip Receipt"),
        TruckExpanceRow = getRowData(rows4, "Type", "Truck Expance");
      if (TripReceiptRow.Payment.length <= 0) {
        this.props.toastErrorMsg("Select Trip Receipt Type");
        return false;
      } else if (TruckExpanceRow.Payment.length <= 0) {
        this.props.toastErrorMsg("Select Truck Expance Type");
        return false;
      }
      return true;
    }
    if (this.props.userPrivilege["ખેડૂતબિલ"]) {
      let rows6 = this.state.rows6;
      let PaidRow = getRowData(rows6, "Type", "ચૂકવેલ");
      if (PaidRow.Payment.length <= 0) {
        this.props.toastErrorMsg("Select ખેડૂતબિલ Paid Payment Type");
        return false;
      }
    }
    return true;
  };

  getNewDefaultSettingValue = (
    vac_entrytype,
    vac_transacationtype,
    vac_groupname,
    vac_ledgername,
    int_default
  ) => {
    return {
      vac_entrytype,
      vac_transacationtype,
      vac_groupname,
      vac_ledgername,
      int_default,
    };
  };

  saveDfaultEntrySetting = () => {
    let rows = this.state.rows,
      rows2 = this.state.rows2,
      rows3 = this.state.rows3,
      rows4 = this.state.rows4,
      rows6 = this.state.rows6,
      rows5 = this.state.rows5;

    let data = [];
    rows = rows.map((row) => {
      data.push(
        this.getNewDefaultSettingValue(
          "Sales",
          row.Type,
          row.vac_groupname,
          row.Payment,
          row.Action == true ? 0 : 1
        )
      );
    });
    rows2 = rows2.map((row) => {
      data.push(
        this.getNewDefaultSettingValue(
          "Purchase",
          row.Type,
          row.vac_groupname,
          row.Payment,
          row.Action == true ? 0 : 1
        )
      );
    });
    rows3 = rows3.map((row) => {
      const type = row.Type === "Receipt" ? "Receipt" : "Payment";
      data.push(
        this.getNewDefaultSettingValue(
          type,
          row.Type,
          row.vac_groupname,
          row.Payment,
          row.Action == true ? 0 : 1
        )
      );
    });
    rows4 = rows4.map((row) => {
      const type =
        row.Type === "Trip Receipt" ? "Trip Receipt" : "Truck Expance";
      data.push(
        this.getNewDefaultSettingValue(
          type,
          row.Type,
          row.vac_groupname,
          row.Payment,
          row.Action == true ? 0 : 1
        )
      );
    });
    rows5 = rows5.map((row) => {
      data.push(
        this.getNewDefaultSettingValue(
          "Trip",
          row.Type,
          row.vac_groupname,
          row.Payment,
          row.Action == true ? 0 : 1
        )
      );
    });
    rows6 = rows6.map((row) => {
      data.push(
        this.getNewDefaultSettingValue(
          "Farmer",
          row.Type,
          row.vac_groupname,
          row.Payment,
          row.Action == true ? 0 : 1
        )
      );
    });

    console.log("data", data);
    if (this.settingValidation()) {
      this.props.notifyProcessing();
      const reqData = {
        Op: "SaveDefaultEntrySetting",
        bint_acid: localStorage.getItem("acid"),
        data: data,
      };
      fetchDefaultEntrySetting(reqData)
        .then((res) => {
          this.props.updateProcessing(res.data.msgType, res.data.message);
        })
        .catch((error) => {
          console.log("Unknown error occurred in onCustomerLoad.", error);
        });
    }
  };

  render() {
    const modulesConfig = [
      {
        name: "Sales",
        columns: this.state.columns,
        rows: this.state.rows,
        rowsCount: this.state.rowsCount,
        rowsPerPage: this.state.rowsPerPage,
        handleChangeRowsPerPage: this.handleChangeRowsPerPage,
        actionList: this.state.actionList,
        handleOnRowDataChange: this.handleOnRowDataChange,
      },
      {
        name: "Purchase",
        columns: this.state.columns2,
        rows: this.state.rows2,
        rowsCount: this.state.rowsCount2,
        rowsPerPage: this.state.rowsPerPage2,
        handleChangeRowsPerPage: this.handleChangeRowsPerPage2,
        actionList: this.state.actionList2,
        handleOnRowDataChange: this.handleOnRowDataChange2,
      },
      {
        name: "Trip",
        columns: this.state.columns5,
        rows: this.state.rows5,
        rowsCount: this.state.rowsCount5,
        rowsPerPage: this.state.rowsPerPage5,
        handleChangeRowsPerPage: this.handleChangeRowsPerPage5,
        actionList: this.state.actionList5,
        handleOnRowDataChange: this.handleOnRowDataChange5,
      },
      {
        name: "ખેડૂતબિલ",
        columns: this.state.columns6,
        rows: this.state.rows6,
        rowsCount: this.state.rowsCount6,
        rowsPerPage: this.state.rowsPerPage6,
        handleChangeRowsPerPage: this.handleChangeRowsPerPage6,
        actionList: this.state.actionList6,
        handleOnRowDataChange: this.handleOnRowDataChange6,
      },
      {
        lable: "Receipt-Payment",
        name: "Sales",
        columns: this.state.columns3,
        rows: this.state.rows3,
        rowsCount: this.state.rowsCount3,
        rowsPerPage: this.state.rowsPerPage3,
        handleChangeRowsPerPage: this.handleChangeRowsPerPage3,
        actionList: [],
        handleOnRowDataChange: this.handleOnRowDataChange3,
        isPaired: true,
      },
      {
        lable: "Trip Reciept & Truck Expance",
        name: "Trip",
        columns: this.state.columns4,
        rows: this.state.rows4,
        rowsCount: this.state.rowsCount4,
        rowsPerPage: this.state.rowsPerPage4,
        handleChangeRowsPerPage: this.handleChangeRowsPerPage4,
        actionList: [],
        handleOnRowDataChange: this.handleOnRowDataChange4,
        isPaired: true,
      },
    ];

    // Separate the modules into regular ones and paired ones
    const regularModules = modulesConfig.filter((module) => !module.isPaired);
    const pairedModules = modulesConfig.filter((module) => module.isPaired);

    return (
      <div>
        {/* Render regular modules */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={8}
        >
          {regularModules.map(
            (module, index) =>
              this.props.userPrivilege[module.name] && (
                <Grid item key={module.name}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <label
                      htmlFor="Title"
                      style={{ fontSize: "24px", color: "#515151" }}
                    >
                      <b>{module.name}</b>
                    </label>
                    <Grid item>
                      <TableList
                        columns={module.columns}
                        counter={this.state.counter}
                        rows={module.rows}
                        rowsCount={module.rowsCount}
                        rowsPerPage={module.rowsPerPage}
                        handleChangeRowsPerPage={module.handleChangeRowsPerPage}
                        handleOnActionClick={this.handleARDonActionClick}
                        actionList={module.actionList}
                        keyColumn={this.state.keyColumn}
                        handleOnSearchChange={this.handleOnSearchChange}
                        searchColumns={this.state.searchColumns}
                        searchData={this.state.searchData}
                        handleOnNewEntryClick={this.handleOnNewEntryClick}
                        handleOnRowDataChange={module.handleOnRowDataChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Box
                      display={{ xs: "none" }}
                      style={{ textAlign: "right" }}
                    >
                      {this.state.ARD}
                    </Box>
                  </Grid>
                </Grid>
              )
          )}
        </Grid>

        {/* Render paired modules */}
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={8}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={8}
            >
              {pairedModules.map(
                (module, index) =>
                  this.props.userPrivilege[module.name] && (
                    <Grid item key={module.name}>
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                        marginTop={3}
                        marginBottom={0}
                      >
                        <label
                          htmlFor="Title"
                          style={{ fontSize: "24px", color: "#515151" }}
                        >
                          <b>{module.lable}</b>
                        </label>
                        <Grid item>
                          <TableList
                            columns={module.columns}
                            counter={this.state.counter}
                            rows={module.rows}
                            rowsCount={module.rowsCount}
                            rowsPerPage={module.rowsPerPage}
                            handleChangeRowsPerPage={
                              module.handleChangeRowsPerPage
                            }
                            handleOnActionClick={this.handleARDonActionClick}
                            actionList={module.actionList}
                            keyColumn={this.state.keyColumn}
                            handleOnSearchChange={this.handleOnSearchChange}
                            searchColumns={this.state.searchColumns}
                            searchData={this.state.searchData}
                            handleOnNewEntryClick={this.handleOnNewEntryClick}
                            handleOnRowDataChange={module.handleOnRowDataChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Grid item marginTop={1} marginBottom={1.5}>
              <CtBtn label="Save" onClick={this.saveDfaultEntrySetting} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box display={{ xs: "none" }} style={{ textAlign: "right" }}>
            {this.state.ARD}
          </Box>
        </Grid>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStatetoProps,
    mapSetActiveMenu_MenuVisibility_ToProps
  )(HOCVerifyIsUser(HoCtToastContainer(DefaultEntrySetting)))
);
