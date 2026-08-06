import React, { Component } from "react";
import { Grid, Box } from "@mui/material";
import CtCmb from "./CustomTool/CtCmb";
import CtBtn from "./CustomTool/CtBtn";
import { connect } from "react-redux";
import {
  mapStatetoProps,
  mapSetActiveMenu_MenuVisibility_ToProps,
} from "../store/mapReduxProps";
import { apiURL, fetchGeneralSetting } from "./API";
import { withRouter } from "../components/hoc/withRouter";
import HOCVerifyIsUser from "../components/hoc/HOCVerifyIsUser";
import HoCtToastContainer from "../components/hoc/HoCtToastContainer";
import { getRowData } from "../utils/SystemUtility";

class GeneralSetting extends Component {
  state = {
    sales: [{ type: "Auto" }, { type: "Manually" }],
    salesDefaultPrnt: [{ type: "Letterhead" }, { type: "Blank Page" }],
    Optional: [{ type: "Optional" }, { type: "Mandatory" }],
    paymentPrint: [{ type: "English Data" }, { type: "Gujarati Data" }],
    Signature_stamp: [{ type: "Yes" }, { type: "No" }],
    PrintOption: [{ type: "Checked" }, { type: "Unchecked" }],
    formData: {
      cmbSalesInvoice: "Auto",
      cmbSalesDefaultPrint: "Letterhead",
      cmbAddress: "Optional",
      cmbMobo1: "Optional",
      cmbMobo2: "Optional",
      cmbSupAddress: "Optional",
      cmbSupMobo1: "Optional",
      cmbSupMobo2: "Optional",
      cmbPaymentPrint: "English Data",
      cmbSignature_stamp: "Yes",
      cmbReceipt: "Yes",
      cmbPrintOption: "Unchecked",
    },
  };
  //#region Component
  componentDidMount() {
    document.title = "RA : General Setting";
    this.loadData();
  }
  //#endregion Component

  //#region  function
  loadData = () => {
    let dataLoadStatus = false;
    const reqData = {
      Op: "GetGeneralSettings",
      bint_acid: localStorage.getItem("acid"),
    };
    fetchGeneralSetting(reqData)
      .then((res) => {
        dataLoadStatus = true;
        let Cus_Address = "",
          Cust_MobileNo_1Validation = "",
          Cust_MobileNo_2Validation = "",
          Sup_Address = "",
          Sup_MobileNo_1Validation = "",
          Sup_MobileNo_2Validation = "",
          Sales_InvoiceGeneration = "",
          Signature_stamp = "",
          Signature_Recipt = "",
          Sales_InvoiceDefaultPrint = "",
          PaymentPrintFormat = "",
          PrintOption_report = "";
        res.data.GeneralSettingList.map((row) => {
          if (row.vac_module === "Customer") {
            if (row.vac_key === "Address Validation") {
              Cus_Address = row.vac_value;
            } else if (row.vac_key === "Mobile No. 1 Validation") {
              Cust_MobileNo_1Validation = row.vac_value;
            } else if (row.vac_key === "Mobile No. 2 Validation") {
              Cust_MobileNo_2Validation = row.vac_value;
            }
          } else if (row.vac_module === "Supplier") {
            if (row.vac_key === "Address Validation") {
              Sup_Address = row.vac_value;
            } else if (row.vac_key === "Mobile No. 1 Validation") {
              Sup_MobileNo_1Validation = row.vac_value;
            } else if (row.vac_key === "Mobile No. 2 Validation") {
              Sup_MobileNo_2Validation = row.vac_value;
            }
          } else if (row.vac_module === "Sales") {
            if (row.vac_key === "Sales Invoice Generation") {
              Sales_InvoiceGeneration = row.vac_value;
            } else if (row.vac_key === "Sales Invoice Default Print") {
              Sales_InvoiceDefaultPrint = row.vac_value;
            }
          } else if (row.vac_module === "Payment") {
            if (row.vac_key === "Print Format") {
              PaymentPrintFormat = row.vac_value;
            }
          } else if (row.vac_module === "Signature & Stamp") {
            if (row.vac_key === "In Sales (Default)") {
              Signature_stamp = row.vac_value;
            } else if (row.vac_key === "In Receipt (Default)") {
              Signature_Recipt = row.vac_value;
            }
          } else if (row.vac_module === "Report") {
            if (row.vac_key === "Sales Report Item Remark Print Option") {
              PrintOption_report = row.vac_value;
            }
          }
        });
        this.setState(
          {
            dataLoadStatus,
            formData: {
              ...this.state.formData,
              cmbAddress: Cus_Address,
              cmbMobo1: Cust_MobileNo_1Validation,
              cmbMobo2: Cust_MobileNo_2Validation,
              cmbSupAddress: Sup_Address,
              cmbSupMobo1: Sup_MobileNo_1Validation,
              cmbSupMobo2: Sup_MobileNo_2Validation,
              cmbSalesInvoice: Sales_InvoiceGeneration,
              cmbSalesDefaultPrint: Sales_InvoiceDefaultPrint,
              cmbPaymentPrint: PaymentPrintFormat,
              cmbSignature_stamp: Signature_stamp,
              cmbReceipt: Signature_Recipt,
              cmbPrintOption: PrintOption_report,
            },
          },
          () => {
            // console.log(
            //   "this.state.formData.cmbReceipt",
            //   this.state.formData.cmbReceipt
            // );
            // console.log(
            //   "this.state.formData.cmbSignature_stamp",
            //   this.state.formData.cmbSignature_stamp
            // );
          }
        );
      })
      .catch((error) => {
        console.log("Unknown error occurred in onCustomerLoad.", error);
      });
  };

  saveGenrealSetting = () => {
    this.props.notifyProcessing();
    let data = [];
    data.push(
      this.getNewGeneralSettingValue(
        "Sales",
        "CtCmb",
        "Sales Invoice Generation",
        this.state.formData.cmbSalesInvoice
      )
    );
    data.push(
      this.getNewGeneralSettingValue(
        "Sales",
        "CtCmb",
        "Sales Invoice Default Print",
        this.state.formData.cmbSalesDefaultPrint
      )
    );
    data.push(
      this.getNewGeneralSettingValue(
        "Customer",
        "CtCmb",
        "Address Validation",
        this.state.formData.cmbAddress
      )
    );
    data.push(
      this.getNewGeneralSettingValue(
        "Customer",
        "CtCmb",
        "Mobile No. 1 Validation",
        this.state.formData.cmbMobo1
      )
    );
    data.push(
      this.getNewGeneralSettingValue(
        "Customer",
        "CtCmb",
        "Mobile No. 2 Validation",
        this.state.formData.cmbMobo2
      )
    );
    data.push(
      this.getNewGeneralSettingValue(
        "Supplier",
        "CtCmb",
        "Address Validation",
        this.state.formData.cmbSupAddress
      )
    );
    data.push(
      this.getNewGeneralSettingValue(
        "Supplier",
        "CtCmb",
        "Mobile No. 1 Validation",
        this.state.formData.cmbSupMobo1
      )
    );
    data.push(
      this.getNewGeneralSettingValue(
        "Supplier",
        "CtCmb",
        "Mobile No. 2 Validation",
        this.state.formData.cmbSupMobo2
      )
    );
    data.push(
      this.getNewGeneralSettingValue(
        "Payment",
        "CtCmb",
        "Print Format",
        this.state.formData.cmbPaymentPrint
      )
    );
    data.push(
      this.getNewGeneralSettingValue(
        "Signature & Stamp",
        "CtCmb",
        "In Sales (Default)",
        this.state.formData.cmbSignature_stamp
      )
    );
    data.push(
      this.getNewGeneralSettingValue(
        "Signature & Stamp",
        "CtCmb",
        "In Receipt (Default)",
        this.state.formData.cmbReceipt
      )
    );
    data.push(
      this.getNewGeneralSettingValue(
        "Report",
        "CtCmb",
        "Sales Report Item Remark Print Option",
        this.state.formData.cmbPrintOption
      )
    );
    const reqData = {
      Op: "SaveGeneralSettings",
      bint_acid: localStorage.getItem("acid"),
      setting: data,
    };
    fetchGeneralSetting(reqData)
      .then((res) => {
        this.props.updateProcessing(res.data.msgType, res.data.message);
        // if (res.data.msgType === "success") {
        //     this.loadData();
        // }
      })
      .catch((error) => {
        console.log("Unknown error occurred in onCustomerLoad.", error);
      });
  };

  getNewGeneralSettingValue = (
    vac_module,
    vac_ctrltype,
    vac_key,
    vac_value
  ) => {
    return { vac_module, vac_ctrltype, vac_key, vac_value };
  };

  //#endregion funtion

  //#region handle

  handleOnChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
  };

  openPaymentPrint = () => {
    this.props.notifyProcessing();
    let Op = "";
    if (this.state.formData.cmbPaymentPrint === "Gujarati Data") {
      Op = "VoucherPrint_HTML";
    } else {
      Op = "VoucherPrint";
    }
    let reqData = [
      { name: "Op", value: Op },
      { name: "bint_acyear", value: "2023" },
      { name: "bint_acid", value: "7" },
      { name: "bint_expensesrno", value: "1" },
      { name: "boldemo", value: true },
    ];

    // Create a query string from the request data
    let queryString = reqData
      .map(
        (data) =>
          encodeURIComponent(data.name) + "=" + encodeURIComponent(data.value)
      )
      .join("&");

    // Set the URL of the popup window
    let popupURL = apiURL + "expenseentrydetail.php?" + queryString;

    // Open the popup window
    window.open(
      popupURL,
      "PaymentList",
      "width=" +
        window.screen.availWidth +
        ",height=" +
        window.screen.availHeight
    );

    this.props.updateProcessing("success", "PDF Open in popup.");
  };

  //#endregion handle
  render() {
    return (
      <div>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <label style={{ fontSize: "30px", color: "#515151" }}>
              <b>General Setting</b>
            </label>
          </Grid>
          <Grid item>
            <CtBtn label="Save" onClick={this.saveGenrealSetting} />
          </Grid>
        </Grid>
        {/* <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    marginTop={3}
                >
                    <CtBtn label="Save" onClick={this.saveGenrealSetting} />
                </Grid> */}
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginTop={0}
          spacing={2}
        >
          <Grid item>
            <label style={{ fontSize: "20px", color: "#515151" }}>
              <b>Sales</b>
            </label>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <CtCmb
                  id="cmbSalesInvoice"
                  label="Sales Invoice Generation"
                  value={this.state.formData.cmbSalesInvoice}
                  handleOnChange={this.handleOnChange}
                  items={this.state.sales}
                  width={200}
                  colID="type"
                />
              </Grid>
              <Grid item>
                <CtCmb
                  id="cmbSalesDefaultPrint"
                  label="Sales Invoice Default Print"
                  value={this.state.formData.cmbSalesDefaultPrint}
                  handleOnChange={this.handleOnChange}
                  items={this.state.salesDefaultPrnt}
                  width={200}
                  colID="type"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginTop={1}
          spacing={2}
        >
          <Grid item>
            <label style={{ fontSize: "20px", color: "#515151" }}>
              <b>Customer</b>
            </label>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <CtCmb
                  id="cmbAddress"
                  label="Address"
                  value={this.state.formData.cmbAddress}
                  handleOnChange={this.handleOnChange}
                  items={this.state.Optional}
                  width={120}
                  colID="type"
                />
              </Grid>
              <Grid item>
                <CtCmb
                  id="cmbMobo1"
                  label="Mobile No. 1"
                  value={this.state.formData.cmbMobo1}
                  handleOnChange={this.handleOnChange}
                  items={this.state.Optional}
                  width={120}
                  colID="type"
                />
              </Grid>
              <Grid item>
                <CtCmb
                  id="cmbMobo2"
                  label="Mobile No. 2"
                  value={this.state.formData.cmbMobo2}
                  handleOnChange={this.handleOnChange}
                  items={this.state.Optional}
                  width={120}
                  colID="type"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginTop={1}
          spacing={2}
          marginBottom={3}
        >
          <Grid item>
            <label style={{ fontSize: "20px", color: "#515151" }}>
              <b>Supplier</b>
            </label>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <CtCmb
                  id="cmbSupAddress"
                  label="Address"
                  value={this.state.formData.cmbSupAddress}
                  handleOnChange={this.handleOnChange}
                  items={this.state.Optional}
                  width={120}
                  colID="type"
                />
              </Grid>
              <Grid item>
                <CtCmb
                  id="cmbSupMobo1"
                  label="Mobile No. 1"
                  value={this.state.formData.cmbSupMobo1}
                  handleOnChange={this.handleOnChange}
                  items={this.state.Optional}
                  width={120}
                  colID="type"
                />
              </Grid>
              <Grid item>
                <CtCmb
                  id="cmbSupMobo2"
                  label="Mobile No. 2"
                  value={this.state.formData.cmbSupMobo2}
                  handleOnChange={this.handleOnChange}
                  items={this.state.Optional}
                  width={120}
                  colID="type"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginTop={1}
          spacing={2}
          marginBottom={3}
        >
          <Grid item>
            <label style={{ fontSize: "20px", color: "#515151" }}>
              <b>Payment</b>
            </label>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <CtCmb
                  id="cmbPaymentPrint"
                  label="Payment Print"
                  value={this.state.formData.cmbPaymentPrint}
                  handleOnChange={this.handleOnChange}
                  items={this.state.paymentPrint}
                  width={150}
                  colID="type"
                />
              </Grid>
              <Grid item>
                <CtBtn label="Preview" onClick={this.openPaymentPrint} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginTop={1}
          spacing={2}
          marginBottom={3}
        >
          <Grid item>
            <label style={{ fontSize: "20px", color: "#515151" }}>
              <b>Signature & Stamp</b>
              <b>Report</b>
            </label>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <CtCmb
                  id="cmbSignature_stamp"
                  label="In Sales (Default)"
                  value={this.state.formData.cmbSignature_stamp}
                  handleOnChange={this.handleOnChange}
                  items={this.state.Signature_stamp}
                  width={170}
                  colID="type"
                />
              </Grid>
              <Grid item>
                <CtCmb
                  id="cmbReceipt"
                  label="In Receipt (Default)"
                  value={this.state.formData.cmbReceipt}
                  handleOnChange={this.handleOnChange}
                  items={this.state.Signature_stamp}
                  width={170}
                  colID="type"
                />
              </Grid>
              <Grid item>
                <CtCmb
                  id="cmbPrintOption"
                  label="Sales Report Item Remark Print Option"
                  value={this.state.formData.cmbPrintOption}
                  handleOnChange={this.handleOnChange}
                  items={this.state.PrintOption}
                  width={300}
                  colID="type"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapSetActiveMenu_MenuVisibility_ToProps
)(HOCVerifyIsUser(HoCtToastContainer(withRouter(GeneralSetting))));
