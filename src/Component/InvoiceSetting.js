import React, { Component } from "react";
import CtTxt from "./CustomTool/CtTxt";
import CtDtp from "./CustomTool/CtDtp";
import CtCmb from "./CustomTool/CtCmb";
import CtBtn from "./CustomTool/CtBtn";
import TableList from "./CustomTool/TableList";
import { withRouter } from "../HOC/withRouter";
import { connect } from "react-redux";
import {
  mapSetActiveMenu_MenuVisibility_ToProps,
  mapStatetoProps,
} from "../mapRedux/mapReduxProps";
import { Box, Grid } from "@mui/material";
import HOCVerifyIsUser from "../HOC/HOCVerifyIsUser";
import { fetchBillSetting } from "./API";
import HoCtToastContainer from "../HOC/HoCtToastContainer";
import { Delete, Edit } from "@mui/icons-material";
import AlertResponsiveDialog from "./CustomTool/AlertResponsiveDialog";
import Progress from "./CustomTool/Progress";
import CtCheckBox from "./CustomTool/CtCheckBox";
import CtCmbEditable from "./CustomTool/CtCmbEditable";
import CtMultiLineText from "./CustomTool/CtMultiLineText";
import {
  applyTrimOnObjectValues,
  isValidItem,
} from "../SystemUtility/SystemUtility";

class InvoiceSetting extends Component {
  state = {
    InvoiceFormat: [],
    InvoicePaper: [],
    columns: [
      { id: "Action", label: "Search", name: "Search" },
      { id: "vac_invoicetype", label: "Invoice Type" },
      { id: "vac_invoiceprefix", label: "Invoice No Prefix" },
      { id: "vac_invoiceheading", label: "Invoice Heading" },
      { id: "int_default", label: "Set As Default Invoice Type" },
      { id: "vac_invoiceformatname", label: "Invoice Format" },
      { id: "vac_ewaybillsubtype", label: "E-Way Bill Sub Type" },
      // { id: "vac_invoicepaper", label: "Invoice Paper" },
    ],
    searchData: {
      vac_invoicetype: "",
      vac_invoiceprefix: "",
      vac_invoiceheading: "",
      int_default: "",
      vac_invoiceformatname: "",
      vac_invoicepaper: "",
      vac_ewaybillsubtype: "",
    },
    keyColumn: [
      "vac_invoicetype",
      "vac_invoiceprefix",
      "vac_invoiceheading",
      "int_default",
      "vac_invoiceformatname",
      "vac_invoicepaper",
      "vac_ewaybillsubtype",
    ],
    formData: {
      txtInvoiceType: "",
      txtInvoicePrefix: "",
      txtInvoiceNoPrefixNote:
        "# = Minimum total digits used to represent the number.\nIf not mentioned then number will be display as it is, which is equal to single #.\n# must added before the InvoiceNumber and after the < sign without any space.",
      txtInvoiceNoPrefixPreview: "",
      txtInvoiceHeading: "",
      chkDefaultInvoice: "",
      cmbInvoiceFormat: "",
      cmbInvoicePaper: "",
      EditInvoiceType: "",
      cmbEwayBillSubType: "",
    },
    EWayBillSubType: [
      { vac_ewaybillsubtype: "Supply" },
      { vac_ewaybillsubtype: "Job Work" },
    ],
    actionList: [
      {
        name: "Edit",
        icon: <Edit />,
        link: "CustomerMaster:",
        actionType: "AlertResponsive",
      },
      {
        name: "Delete",
        icon: <Delete />,
        link: "CustomerMaster:",
        actionType: "AlertResponsive",
      },
    ],
    rows: [],
    ARD: null,
    rowsCount: 0,
    rowsPerPage: 50,
    searchColumns: [],
    searchRows: [],
    searchOpen: false,
    searchRowsCount: 0,
  };

  //#region Component
  componentDidMount() {
    document.title = "RA : Bill Setting";
    this.props.setActiveMenu("InvoiceSetting");
    this.setSearchColumns();
    this.props.verifyUserID(
      this.getInfo,
      this.props.navInfo.subMenuMaster,
      this.props.setSubMenu_Master_Entry,
      this.props.setUserPrivileges
    );
  }
  //#endregion Component

  //#region Handle
  handleOnSearchChange = (searchOpen) => {
    let searchRows = [];
    if (searchOpen === true && this.state.rows.length > 0) {
      this.state.rows.map((row, index) => {
        if (
          searchOpen === true &&
          (this.state.searchData.vac_invoicetype.length === 0 ||
            (row["vac_invoicetype"] &&
              row["vac_invoicetype"]
                .toString()
                .toLowerCase()
                .includes(
                  this.state.searchData.vac_invoicetype.toLowerCase()
                ))) &&
          (this.state.searchData.vac_invoiceprefix.length === 0 ||
            (row["vac_invoiceprefix"] &&
              row["vac_invoiceprefix"]
                .toString()
                .toLowerCase()
                .includes(
                  this.state.searchData.vac_invoiceprefix.toLowerCase()
                ))) &&
          (this.state.searchData.vac_invoiceheading.length === 0 ||
            (row["vac_invoiceheading"] &&
              row["vac_invoiceheading"]
                .toString()
                .toLowerCase()
                .includes(
                  this.state.searchData.vac_invoiceheading.toLowerCase()
                ))) &&
          (this.state.searchData.int_default.length === 0 ||
            (row["int_default"] !== undefined &&
              Number(row["int_default"]) ===
                Number(this.state.searchData.int_default))) &&
          (this.state.searchData.vac_invoiceformatname === "" ||
            (row["vac_invoiceformatname"] &&
              row["vac_invoiceformatname"]
                .toString()
                .toLowerCase()
                .includes(
                  this.state.searchData.vac_invoiceformatname.toLowerCase()
                ))) &&
          (this.state.searchData.vac_invoicepaper === "" ||
            (row["vac_invoicepaper"] &&
              row["vac_invoicepaper"]
                .toString()
                .toLowerCase()
                .includes(
                  this.state.searchData.vac_invoicepaper.toLowerCase()
                ))) &&
          (this.state.searchData.vac_ewaybillsubtype === "" ||
            (row["vac_ewaybillsubtype"] &&
              row["vac_ewaybillsubtype"]
                .toString()
                .toLowerCase()
                .includes(
                  this.state.searchData.vac_ewaybillsubtype.toLowerCase()
                )))
        ) {
          searchRows.push(row);
        }
      });
      const searchRowsCount = searchRows.length;
      this.setState({
        searchOpen,
        searchRows,
        searchRowsCount,
        counter: this.state.counter + 1,
      });
    } else {
      this.setState({ searchOpen });
    }
  };

  handleOnChange = (e) => {
    this.setState(
      {
        formData: { ...this.state.formData, [e.target.name]: e.target.value },
      },
      () => {
        if (e.target.name === "txtInvoicePrefix") {
          let txtInvoiceNoPrefixPreview = this.InvoiceNoPrefixPreview(
            this.state.formData.txtInvoicePrefix
          );
          this.setState({
            formData: {
              ...this.state.formData,
              txtInvoiceNoPrefixPreview,
            },
          });
        }
      }
    );
  };

  handleChangeRowsPerPage = (rowsPerPage) => {
    this.setState({ rowsPerPage });
  };

  handleOnSearchInputChange = (e) => {
    this.setState(
      {
        searchData: {
          ...this.state.searchData,
          [e.target.name]: e.target.value,
        },
      },
      () => {
        this.handleOnSearchChange(this.state.searchOpen);
        // console.log(this.state.searchData)
      }
    );
  };

  handleOnChkChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.checked,
      },
    });
  };

  handleARDonActionClick = (row) => {
    const EditInvoiceType = row.vac_invoicetype,
      txtInvoiceType = row.vac_invoicetype,
      txtInvoicePrefix = row.vac_invoiceprefix,
      txtInvoiceHeading = row.vac_invoiceheading,
      chkDefaultInvoice = row.int_default,
      cmbInvoiceFormat = row.vac_invoiceformatname,
      cmbInvoicePaper = row.vac_invoicepaper,
      actionName = row.actionName,
      cmbEwayBillSubType = row.vac_ewaybillsubtype;
    if (actionName === "Edit") {
      // this.props.toastErrorMsg("edit alert called")
      let txtInvoiceNoPrefixPreview =
        this.InvoiceNoPrefixPreview(txtInvoicePrefix);
      this.setState({
        formData: {
          ...this.state.formData,
          EditInvoiceType,
          txtInvoiceType,
          txtInvoicePrefix,
          txtInvoiceHeading,
          chkDefaultInvoice,
          cmbInvoiceFormat,
          cmbInvoicePaper,
          txtInvoiceNoPrefixPreview,
          cmbEwayBillSubType,
        },
      });
      window.scrollTo(0, 0);
      document.getElementById("txtInvoiceType").focus();
    } else if (actionName === "Delete") {
      this.DeleteData(EditInvoiceType);
    } else {
      let rows = this.state.rows.filter((row) => {
        if (
          row.vac_invoicetype !== txtInvoiceType &&
          row.vac_invoiceprefix !== txtInvoicePrefix &&
          row.vac_invoiceheading !== txtInvoiceHeading
        )
          return row;
      });
      const rowsCount = rows.length;
      this.setState({ rows, rowsCount });
    }
  };
  //#endregion Handle

  //#region Function
  validateInvoiceFormat = () => {
    let result = false;
    if (this.state.formData.cmbInvoiceFormat.length > 0) {
      this.state.InvoiceFormat.map((row) => {
        if (
          row.vac_invoiceformatname === this.state.formData.cmbInvoiceFormat
        ) {
          result = true;
        }
      });
    }
    return result;
  };

  validateInvoicePaper = () => {
    let result = false;
    if (this.state.formData.cmbInvoicePaper.length > 0) {
      this.state.InvoicePaper.map((row) => {
        if (row.vac_invoicepaper === this.state.formData.cmbInvoicePaper) {
          result = true;
        }
      });
    }
    return result;
  };

  validateInvoice = () => {
    let result = false;
    if (this.state.formData.txtInvoiceType.length <= 0) {
      this.props.toastErrorMsg("Enter Invoice Type", "txtInvoiceType");
    } else if (this.state.formData.txtInvoicePrefix.length <= 0) {
      this.props.toastErrorMsg("Enter Invoice Prefix", "txtInvoicePrefix");
    } else if (
      this.state.formData.cmbEwayBillSubType.length > 0 &&
      !isValidItem(
        this.state.EWayBillSubType,
        "vac_ewaybillsubtype",
        this.state.formData.cmbEwayBillSubType
      )
    ) {
      this.props.toastErrorMsg(
        "Select valid Eway Bill Sub Type",
        "cmbEwayBillSubType"
      );
    } else if (this.state.formData.txtInvoiceHeading.length <= 0) {
      this.props.toastErrorMsg("Enter Invoice Heading", "txtInvoiceHeading");
    } else if (this.state.formData.cmbInvoiceFormat.length <= 0) {
      this.props.toastErrorMsg("Select Invoice Format", "cmbInvoiceFormat");
    } else if (this.validateInvoiceFormat() === false) {
      this.props.toastErrorMsg(
        "Select valid Invoice Format",
        "cmbInvoiceFormat"
      );
      // } else if (this.state.formData.cmbInvoicePaper.length <= 0) {
      //   this.props.toastErrorMsg("Select Invoice Paper", "cmbInvoicePaper");
      // } else if (this.validateInvoicePaper() === false) {
      //   this.props.toastErrorMsg(
      //     "Select valid Invoice Paper",
      //     "cmbInvoicePaper"
      //   );
    } else {
      result = true;
    }
    return result;
  };

  clearInfo = () => {
    const bint_srno = "",
      EditInvoiceType = "",
      txtInvoiceType = "",
      txtInvoicePrefix = "",
      txtInvoiceNoPrefixPreview = "",
      txtInvoiceHeading = "",
      chkDefaultInvoice = "",
      cmbInvoiceFormat = "",
      cmbInvoicePaper = "",
      cmbEwayBillSubType = "";

    this.setState(
      {
        formData: {
          ...this.state.formData,
          bint_srno,
          EditInvoiceType,
          txtInvoiceType,
          txtInvoicePrefix,
          txtInvoiceNoPrefixPreview,
          txtInvoiceHeading,
          chkDefaultInvoice,
          cmbInvoiceFormat,
          cmbInvoicePaper,
          cmbEwayBillSubType,
        },
      },
      () => {
        document.getElementById("txtInvoiceType").focus();
      }
    );
  };

  getInfo = () => {
    let dataLoadStatus = false;
    this.setState({ dataLoadStatus }, () => {
      const reqData = {
        Op: "InvoiceSettingList",
        bint_acid: localStorage.getItem("acid"),
        bolInvoiceFormatList: true,
      };
      fetchBillSetting(reqData)
        .then((res) => {
          dataLoadStatus = true;
          let rows = res.data.InvoiceSettingList,
            rowsCount = rows.length,
            InvoiceFormat = res.data.InvoiceFormatNameList;
          this.setState({
            dataLoadStatus,
            rows,
            rowsCount,
            InvoiceFormat,
          });
        })
        .catch((error) => {
          console.log("Unknown error occurred in getInfo.", error);
        });
    });
  };

  trimFormData = (nextFunctionCall) => {
    // console.log("this.state.formData before SetSate", this.state.formData);
    let formData = applyTrimOnObjectValues({
      formData: this.state.formData,
      excludeKeysArray: ["chkDefaultInvoice"],
    });
    this.setState({ formData }, () => {
      // console.log("this.state.formData After SetSate", this.state.formData);
      if (nextFunctionCall) {
        nextFunctionCall();
      }
    });
  };

  SaveBillSetting = () => {
    if (this.validateInvoice()) {
      const dataLoadStatus = false;
      this.props.notifyProcessing();
      this.setState({ dataLoadStatus }, () => {
        const reqData = {
          Op: "SaveInvoiceSetting",
          bint_acid: localStorage.getItem("acid"),
          vac_invoicetype: this.state.formData.txtInvoiceType,
          vac_invoiceprefix: this.state.formData.txtInvoicePrefix,
          vac_invoiceheading: this.state.formData.txtInvoiceHeading,
          int_default: this.state.formData.chkDefaultInvoice,
          vac_invoiceformatname: this.state.formData.cmbInvoiceFormat,
          vac_invoicepaper: this.state.formData.cmbInvoicePaper,
          edit_invoicetype: this.state.formData.EditInvoiceType,
          vac_ewaybillsubtype: this.state.formData.cmbEwayBillSubType,
        };
        fetchBillSetting(reqData)
          .then((res) => {
            this.props.updateProcessing(res.data.msgType, res.data.message);
            if (res.data.msgType === "success") {
              this.getInfo();
              this.clearInfo(true);
            }
          })
          .catch((error) => {
            console.log("Unknown error occurred in SaveLedgerDetail.", error);
          });
      });
    }
  };

  DeleteData = (EditInvoiceType) => {
    if (EditInvoiceType.length > 0) {
      this.setState({ ARD: null }, () => {
        let ARD = (
          <AlertResponsiveDialog
            labelAgree="Delete"
            labelDisagree="Cancel"
            alertTitle={
              "Do you want to Delete this Bill : " + EditInvoiceType + " ?"
            }
            alertMessage=""
            handleOnClickYes={() => {
              return this.DeleteInvoice(EditInvoiceType);
            }}
            defaultOpenDialog={true}
            onYesClickCloseIfExeSuccessfully={true}
          />
        );

        this.setState({ ARD });
      });
    } else {
      this.props.toastErrorMsg("Select a record for deletion.");
    }
  };

  DeleteInvoice = (edit_invoicetype) => {
    this.props.notifyProcessing();
    this.setState({ dataLoadStatus: false }, () => {
      const reqData = {
        Op: "DeleteInvoiceSetting",
        bint_acid: localStorage.getItem("acid"),
        edit_invoicetype: edit_invoicetype,
      };
      fetchBillSetting(reqData)
        .then((res) => {
          // console.log("res", res.data);
          this.props.updateProcessing(res.data.msgType, res.data.message);
          if (res.data.msgType === "success") {
            this.setState({ ARD: null }, () => {
              this.getInfo();
              this.clearInfo(true);
            });
          } else {
            this.setState({ dataLoadStatus: true });
          }
        })
        .catch((error) => {
          this.props.updateProcessing(
            "error",
            "Unknown error occurred in delete DeleteLedgerDetail. " + error
          );
        });
    });
    return false;
  };

  setSearchColumns = () => {
    let searchColumns = [];
    searchColumns.push(
      {
        cType: "CtTxt",
        id: "vac_invoicetype",
        label: "Invoice Type",
        value: this.state.searchData.vac_invoicetype,
        handleOnChange: this.handleOnSearchInputChange,
        width: "150",
        maxLength: "100",
      },
      {
        cType: "CtTxt",
        id: "vac_invoiceprefix",
        label: "Invoice No Prefix",
        value: this.state.searchData.vac_invoiceprefix,
        handleOnChange: this.handleOnSearchInputChange,
        width: "150",
        maxLength: "100",
      },
      {
        cType: "CtTxt",
        id: "vac_invoiceheading",
        label: "Invoice Heading",
        value: this.state.searchData.vac_invoiceheading,
        handleOnChange: this.handleOnSearchInputChange,
        width: "150",
        maxLength: "100",
      },
      {
        cType: "CtTxt",
        id: "int_default",
        label: "Set As Default Invoice Type",
        value: this.state.searchData.int_default,
        handleOnChange: this.handleOnSearchInputChange,
        width: "150",
        maxLength: "100",
      },
      {
        cType: "CtTxt",
        id: "vac_invoiceformatname",
        label: "Invoice Format",
        items: this.state.InvoiceFormat,
        value: this.state.searchData.vac_invoiceformatname,
        handleOnChange: this.handleOnSearchInputChange,
        width: "150",
        maxLength: "100",
      },
      {
        cType: "CtTxt",
        id: "vac_invoicepaper",
        label: "Invoice Format",
        items: this.state.InvoicePaper,
        value: this.state.searchData.vac_invoicepaper,
        handleOnChange: this.handleOnSearchInputChange,
        width: "150",
        maxLength: "100",
      },
      {
        cType: "CtCmb",
        id: "vac_ewaybillsubtype",
        label: "E-Way Bill Sub Type",
        items: this.state.EWayBillSubType,
        value: this.state.searchData.vac_ewaybillsubtype,
        handleOnChange: this.handleOnSearchInputChange,
        width: "150",
        maxLength: "100",
      }
    );
    this.setState({ searchColumns });
  };

  InvoiceNoPrefixPreview = (txtInvoicePrefix) => {
    // this.props.toastMsg('warning','InvoiceNoPrefixPreview function called')
    const bint_acyear = localStorage.getItem("ACY");
    const int_Year = parseInt(bint_acyear.substring(2, 4), 10);

    let invoicePrefix = txtInvoicePrefix; //this.state.formData.txtInvoicePrefix;
    const startIndex = invoicePrefix.indexOf("#");
    const endIndex = invoicePrefix.lastIndexOf("#");
    const hashStr = invoicePrefix.substring(startIndex, Number(endIndex + 1));

    let invoiceNo = invoicePrefix
      .replace("<Y1>", int_Year)
      .replace("<Y2>", int_Year + 1);

    if (hashStr.length > 0) {
      let int_invoiceno = "1";
      invoiceNo = invoiceNo.replace(
        hashStr,
        int_invoiceno.toString().padStart(hashStr.length, "0")
      );
    }
    return invoiceNo;
  };
  //#endregion Function

  render() {
    let rows = this.state.searchOpen ? this.state.searchRows : this.state.rows;
    let rowsCount = this.state.searchOpen
      ? this.state.searchRowsCount
      : this.state.rowsCount;
    return (
      <form>
        <Progress
          color="primary"
          display={this.state.dataLoadStatus !== true}
        />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="title"
        >
          <label htmlFor="Title" style={{ fontSize: "30px", color: "#515151" }}>
            <b>Invoice Setting</b>
          </label>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0}
          marginTop={0}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              marginTop={0}
            >
              <Grid item>
                <CtTxt
                  id="txtInvoiceType"
                  label="Invoice Type"
                  handleOnChange={this.handleOnChange}
                  value={this.state.formData.txtInvoiceType}
                  width={170}
                  maxLength={50}
                  onKeyDown={this.props.onKeyDown}
                  nextCtrlID="txtInvoicePrefix"
                />
              </Grid>
              <Grid item>
                <CtTxt
                  id="txtInvoicePrefix"
                  label="Invoice No Prefix"
                  handleOnChange={this.handleOnChange}
                  value={this.state.formData.txtInvoicePrefix}
                  width={170}
                  maxLength={30}
                  onKeyDown={this.props.onKeyDown}
                  nextCtrlID="cmbEwayBillSubType"
                />
              </Grid>
              <Grid item>
                <Grid item>
                  <CtCmbEditable
                    id="cmbEwayBillSubType"
                    label="E-Way Bill Sub Type"
                    items={this.state.EWayBillSubType}
                    value={this.state.formData.cmbEwayBillSubType}
                    handleOnChange={this.handleOnChange}
                    width={190}
                    maxLength={100}
                    colID="vac_ewaybillsubtype"
                    onKeyDown={this.props.onKeyDown}
                    nextCtrlID="txtInvoiceHeading"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              marginTop={0}
            >
              <Grid item xs={10} sm={12}>
                <CtMultiLineText
                  id="txtInvoiceNoPrefixNote"
                  label="Invoice No Prefix Note"
                  handleOnChange={this.handleOnChange}
                  value={this.state.formData.txtInvoiceNoPrefixNote}
                  width={"100%"}
                  maxLength={1000}
                  disabled={true}
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              marginTop={0}
            >
              <Grid item>
                <CtTxt
                  id="txtInvoiceNoPrefixPreview"
                  label="Invoice No Prefix Preview"
                  handleOnChange={this.handleOnChange}
                  value={this.state.formData.txtInvoiceNoPrefixPreview}
                  width={170}
                  maxLength={100}
                  disabled={true}
                />
              </Grid>
              <Grid item>
                <CtTxt
                  id="txtInvoiceHeading"
                  label="Invoice Heading"
                  handleOnChange={this.handleOnChange}
                  value={this.state.formData.txtInvoiceHeading}
                  width={170}
                  maxLength={50}
                />
              </Grid>
              <Grid item>
                <CtCheckBox
                  id="chkDefaultInvoice"
                  name="chkDefaultInvoice"
                  label="Set As Default Invoice Type"
                  checked={this.state.formData.chkDefaultInvoice}
                  handleCheckChange={this.handleOnChkChange}
                  // onKeyDown={this.props.onKeyDown}
                  // nextCtrlID="cmbInvoiceFormat"
                ></CtCheckBox>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              marginTop={0}
            >
              <Grid item>
                <CtCmbEditable
                  id="cmbInvoiceFormat"
                  label="Invoice Format"
                  items={this.state.InvoiceFormat}
                  value={this.state.formData.cmbInvoiceFormat}
                  handleOnChange={this.handleOnChange}
                  width={300}
                  maxLength={100}
                  colID="vac_invoiceformatname"
                />
              </Grid>
              {/* <Grid item>
                <CtCmbEditable
                  id="cmbInvoicePaper"
                  label="Invoice Paper"
                  items={this.state.InvoiceFormat}
                  value={this.state.formData.cmbInvoicePaper}
                  handleOnChange={this.handleOnChange}
                  width={300}
                  maxLength={100}
                  colID="vac_invoiceformatname"
                />
              </Grid> */}
              {/* </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              marginTop={0}
            > */}
              <Grid item>
                <CtBtn
                  label="Save"
                  onClick={() => {
                    this.trimFormData(() => {
                      this.SaveBillSetting();
                    });
                  }}
                />
              </Grid>
              <Grid item>
                <CtBtn label="New" onClick={this.clearInfo} />
              </Grid>
              <Grid item>
                <CtBtn
                  label="Close"
                  onClick={() => {
                    this.props.navigateTo("Dashboard");
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop={5}
        >
          <TableList
            columns={this.state.columns}
            counter={this.state.counter}
            rows={rows}
            rowsCount={rowsCount}
            rowsPerPage={this.state.rowsPerPage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            handleOnActionClick={this.handleARDonActionClick}
            actionList={this.state.actionList}
            keyColumn={this.state.keyColumn}
            handleOnSearchChange={this.handleOnSearchChange}
            searchColumns={this.state.searchColumns}
            searchData={this.state.searchData}
            provideSearch={true}
            // handleOnNewEntryClick={this.handleOnNewEntryClick}
            // toolTipNewEntry='New Product Entry'
          />
        </Grid>
        <Box display={{ xs: "none" }} style={{ textAlign: "right" }}>
          {this.state.ARD}
        </Box>
      </form>
    );
  }
}
export default connect(
  mapStatetoProps,
  mapSetActiveMenu_MenuVisibility_ToProps
)(HOCVerifyIsUser(HoCtToastContainer(withRouter(InvoiceSetting))));
