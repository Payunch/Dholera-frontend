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
import TableList from "./CustomTool/TableList";
import readXlsxFile from "read-excel-file";
import { fetchBillSetting, fetchImportDetails } from "./API";
import Progress from "./CustomTool/Progress";
import CtCheckBox from "./CustomTool/CtCheckBox";

class ImportSalesData extends Component {
  state = {
    rows: [],
    SalesColumnsName: [
      "Date",
      "Bill",
      "Type",
      "vac_BillNo",
      "Bill No",
      "Cutomer",
      "Ship To",
      "Reference",
      "Dis. Amt",
      "Taxable",
      "CGST",
      "SGST",
      "IGST",
      "Grand Total",
      "TDS",
      "Amount",
      "Adv",
      "Payment",
      "Round Off",
      "Net Payment",
      "Transaction Type",
      "Remark",
      "Sr No.",
      "Store Name",
      "Item Name",
      "HSN",
      "Packing",
      "Qty",
      "Rate",
      "Basic Amt",
      "	Dis (%)",
      "Dis Amt",
      "Taxable",
      "Tax",
      "CGST",
      "SGST",
      "IGST",
      "Total",
      "Amount",
      "Remark",
    ],
    CustomerColumnsName: [
      "GST IN",
      "Customer Name",
      "Billing Name",
      "Person Name",
      "Reference Name",
      "Address",
      "City",
      "State",
      "State",
      "Code",
      "PAN NO",
      "Mobile 1",
      "Mobile 2",
      "Email 1",
      "Email 2",
      "Cr/Dr",
      "Opening Amount",
      "Remark",
    ],
    ItemColumnsName: [
      "Item",
      "Name",
      "Unit",
      "HSN",
      "Code",
      "Purchase",
      "Rate",
      "Sales",
      "Rate",
      "Tax",
      "CGST",
      "SGST",
      "IGST",
    ],
    SupplierColumnsName: [
      "GST No",
      "Supplier Name",
      "Billing",
      "Name",
      "Person Name",
      "Address",
      "City",
      "State",
      "State Code",
      "Pan No",
      "Mobile No 1",
      "Mobile No 2",
      "Email 1",
      "Email 2",
      "Cr/Dr",
      "Opening Amount",
      "Remark",
    ],
    PurchaseColumnsName: [
      "Date",
      "Supplier Name",
      "Bill No",
      "Discount Amount",
      "Taxable",
      "CGST",
      "SGST",
      "IGST",
      "Grand Total",
      "Adv. Payment",
      "Net Payment",
      "Transaction Type",
      "Remark",
      "Sr No.",
      "Store Name",
      "Item Name",
      "Packing",
      "Qty",
      "Rate",
      "Basic Amt",
      "Dis (%)",
      "Dis",
      "Amt",
      "Taxable",
      "Tax",
      "CGST",
      "SGST",
      "IGST",
      "Total",
      "Amount",
      "Remark",
    ],
    ReceiptColumnsName: [
      "Receipt No.",
      "Date",
      "Legder Group",
      "Legder",
      "Amount",
      "Remark",
      "Payment Mode Ledger",
      "Payment Mode Amount",
      "Cheque No",
      "Reference No",
      "Transaction Date",
      "Remark",
    ],
    PaymentColumnsName: [
      "Voucher No",
      "Date",
      "Legder Group",
      "Legder",
      "Amount",
      "Remark",
      "Payment Mode Ledger",
      "Payment Mode Amount",
      "Cheque No",
      "Reference No",
      "Transaction Date",
      "Remark",
    ],
    excelFormats: [
      {
        format: "PNB",
        import_index: [
          { colHeading: "Srno" },
          { index: 3, colHeading: "Txn Date" },
          {
            id: "vac_groupname",
            colHeading: "Group Name",
            type: "CtCmb",
            CtrlProps: {
              colID: "vac_groupname",
              items: [],
              width: 150,
            },
          },
          {
            id: "vac_ledgername",
            colHeading: "Legder Name",
            type: "CtCmb",
            CtrlProps: {
              colID: "vac_ledgername",
              items: [],
              width: 150,
            },
          },
          { index: 5, colHeading: "Description" },
          { index: 8, colHeading: "Cheque No." },
          { index: 9, colHeading: "Dr Amount" },
          { index: 10, colHeading: "Cr Amount" },
        ],
      },
      {
        format: "SBI",
        import_index: [
          { colHeading: "Srno" },
          { index: 0, colHeading: "Txn Date" },
          {
            id: "vac_groupname",
            colHeading: "Group Name",
            type: "CtCmb",
            CtrlProps: {
              colID: "vac_groupname",
              items: [],
              width: 150,
            },
          },
          {
            id: "vac_ledgername",
            colHeading: "Legder Name",
            type: "CtCmb",
            CtrlProps: {
              colID: "vac_ledgername",
              items: [],
              width: 150,
            },
          },
          { index: 2, colHeading: "Description" },
          { index: 3, colHeading: "Ref No./Cheque No." },
          { index: 5, colHeading: "Debit" },
          { index: 6, colHeading: "Credit" },
        ],
      },
    ],
    // formData: {
    //   txtLegderName: "",
    //   cmbGroupName: ""
    // },
    // keyColumn: [
    //   "vac_ledgername",
    //   "vac_groupname",
    // ],
    ExcelType: [
      { excelType: "Sales Entry" },
      { excelType: "Customer Entry" },
      { excelType: "Item Entry" },
      { excelType: "Supplier Entry" },
      { excelType: "Purchase Entry" },
      { excelType: "Receipt Entry" },
      { excelType: "Payment Entry" },
      { excelType: "Bank Entry" },
    ],
    rowsCount: 0,
    rowsPerPage: 50,
    columns: [],
    billnoString: "",
    formData: {
      chkOverwriteData: false,
      cmbType: "Sales Entry",
    },
    diableChk: true,
    InvoiceFormat: [],
  };
  //#region Component
  componentDidMount() {
    document.title = "RA : Import Sales Data";
    this.getInvoicePrefixFormate();
  }
  //#endregion Component

  //#region  function

  getInvoicePrefixFormate = () => {
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
          let InvoiceFormat = res.data.InvoiceSettingList.map((row) => {
            return [row.vac_invoiceprefix, row.vac_invoicetype];
          });
          this.setState({
            dataLoadStatus,
            InvoiceFormat,
          });
        })
        .catch((error) => {
          console.log("Unknown error occurred in getInfo.", error);
        });
    });
  };

  validateReadExcel = () => {
    let result = false;
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let FileElement = document.getElementById("input");
    let selectedFile = FileElement.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        result = true;
      } else {
        this.props.toastErrorMsg("Please Select Vaild Exel File", "input");
      }
    } else {
      this.props.toastErrorMsg("Please Select Your File", "input");
    }
    // console.log("selectedFile", selectedFile);
    return result;
  };

  ReadExcelBank = () => {
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
        rowData[columnInfoPNB[1].index] == columnInfoPNB[1].colHeading &&
        rowData[columnInfoPNB[4].index] == columnInfoPNB[4].colHeading &&
        rowData[columnInfoPNB[5].index] == columnInfoPNB[5].colHeading &&
        rowData[columnInfoPNB[6].index] == columnInfoPNB[6].colHeading &&
        rowData[columnInfoPNB[7].index] == columnInfoPNB[7].colHeading
      ) {
        format = "PNB";
        readRow = true;
      }

      if (
        rowData[columnInfoSBI[1].index] == columnInfoSBI[1].colHeading &&
        rowData[columnInfoSBI[4].index] == columnInfoSBI[4].colHeading &&
        rowData[columnInfoSBI[5].index] == columnInfoSBI[5].colHeading &&
        rowData[columnInfoSBI[6].index] == columnInfoSBI[6].colHeading &&
        rowData[columnInfoSBI[7].index] == columnInfoSBI[7].colHeading
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
    let Srno = 0;
    excelData.map((rowData, index) => {
      if (
        readRow === true &&
        // rowData[columnInfo[0].index] !== null ||
        (rowData[columnInfo[1].index] !== null ||
          rowData[columnInfo[4].index] !== null ||
          rowData[columnInfo[5].index] !== null ||
          rowData[columnInfo[6].index] !== null ||
          rowData[columnInfo[7].index] !== null)
      ) {
        Srno++;
        rows.push({
          Srno: Srno,
          [columnInfo[1].colHeading]:
            rowData[columnInfo[1].index] === null
              ? ""
              : rowData[columnInfo[1].index],
          [columnInfo[4].colHeading]:
            rowData[columnInfo[4].index] === null
              ? ""
              : rowData[columnInfo[4].index],
          [columnInfo[5].colHeading]:
            rowData[columnInfo[5].index] === null
              ? ""
              : rowData[columnInfo[5].index],
          [columnInfo[6].colHeading]:
            rowData[columnInfo[6].index] === null
              ? ""
              : rowData[columnInfo[6].index],
          [columnInfo[7].colHeading]:
            rowData[columnInfo[7].index] === null
              ? ""
              : rowData[columnInfo[7].index],
        });
      }
      if (
        rowData[columnInfo[1].index] == columnInfo[1].colHeading &&
        // rowData[columnInfo[3].index] == columnInfo[3].colHeading &&
        rowData[columnInfo[4].index] == columnInfo[4].colHeading &&
        rowData[columnInfo[5].index] == columnInfo[5].colHeading &&
        rowData[columnInfo[6].index] == columnInfo[6].colHeading &&
        rowData[columnInfo[7].index] == columnInfo[7].colHeading
      ) {
        readRow = true;
      }
    });
    columnInfo.map((column) => {
      let curColumn = {};
      curColumn["id"] = column.colHeading;
      curColumn["label"] = column.colHeading;
      if (column.id !== undefined && column.id !== null) {
        curColumn["id"] = column.id;
      }
      if (column.type !== undefined && column.type !== null) {
        curColumn["type"] = column.type;
      }
      if (column.CtrlProps !== undefined && column.CtrlProps !== null) {
        curColumn["CtrlProps"] = column.CtrlProps;
      }
      columns.push(curColumn);
    });
    // console.log("rows, columns", { rows, columns })

    return { rows, columns };
  };

  CallReadExcel = () => {
    if (this.state.formData.cmbType === "Bank Entry") {
      this.ReadExcelBank();
    } else {
      this.ReadExcel();
    }
  };

  ReadExcel = () => {
    if (this.validateReadExcel() === true) {
      const input = document.getElementById("input");
      let i = 0,
        columns = [],
        rows = [],
        billNoArray = [],
        billNoStringArray = [],
        billnoString = "";
      readXlsxFile(input.files[0]).then((c_row) => {
        c_row.map((r) => {
          if (i == 0) {
            columns = this.createColumn(r);
          } else {
            rows.push(this.createRow(r));
          }
          i = i + 1;
        });
        //   console.log("columns", columns);
        // console.log("rows", rows);
        rows.forEach((col) => {
          this.state.InvoiceFormat.find((formatType) => {
            // console.log("col.col2", col.col2);
            if (col.col1 === formatType[1]) {
              // console.log("formatType[1]", formatType[1]);
              let Y1 = localStorage.getItem("ACY").slice(2, 4);
              // console.log("y1", Y1);
              let Y2 = (parseInt(Y1) + 1).toString();
              // console.log("y2", Y2);
              let SemiFormate = formatType[0]
                .replace("<Y1>", Y1)
                .replace("<Y2>", Y2);
              // console.log("SemiFormate", SemiFormate);
              let indexOfHash = SemiFormate.indexOf("#");
              // console.log("indexOfHash", indexOfHash);
              let prestring = SemiFormate.slice(0, indexOfHash);
              let poststring = SemiFormate.slice(
                indexOfHash,
                SemiFormate.length - 1
              );
              // console.log("prestring", prestring);
              // console.log("poststring", poststring);
              let Num = col.col2.replace(prestring, "").replace(poststring, "");
              // console.log("Num", Num);
              let bill_no = Number(Num);
              col.col3 = bill_no;
              // console.log("bill_no", bill_no);
              if (bill_no && bill_no !== NaN) {
                // console.log("not Change Bgcolor of cells");
                billNoArray.push(col.col2);
              } else {
                // console.log("Change Bgcolor of cells");
              }
            }
          });
        });
        // console.log("billNoArray", billNoArray);
        billNoStringArray = billNoArray.map((billno) => {
          return `'${billno}'`;
        });
        // console.log("billNoStringArray", billNoStringArray);
        billnoString = billNoStringArray.join(",");
        // console.log("billnoString", billnoString);
        if (billnoString) {
          let dataLoadStatus = false;
          let diableChk = true;
          let chkTick = false;
          this.props.notifyProcessing();
          this.setState({ dataLoadStatus }, () => {
            const reqData = {
              Op: "CheckImportedBillNoExists",
              bint_acyear: localStorage.getItem("ACY"),
              bint_acid: localStorage.getItem("acid"),
              vac_billno: billnoString,
            };
            fetchImportDetails(reqData)
              .then((res) => {
                dataLoadStatus = true;
                if (res.data.message === "No Bill No Exists") {
                  this.props.closeUpdateProcessing();
                } else {
                  this.props.updateProcessing(
                    res.data.msgType,
                    res.data.message
                  );
                  if (res.data.msgType === "info") {
                    diableChk = false;
                    chkTick = true;
                  }
                }
                //   let InvoiceFormat = res.data.InvoiceSettingList.map((row) => {
                //     return [row.vac_invoiceprefix, row.vac_invoicetype];
                //   });
                this.setState({
                  dataLoadStatus,
                  diableChk,
                  formData: {
                    ...this.state.formData,
                    chkOverwriteData: chkTick,
                  },
                });
              })
              .catch((error) => {
                console.log("Unknown error occurred in getInfo.", error);
              });
          });
        }
        this.setState(
          {
            columns,
            rows,
            billnoString,
          },
          () => {}
        );
      });
    }
  };

  ImportData = () => {
    let salesData = [],
      salesItemData = [],
      selecteSalesItemData = {},
      selectSalesData = {},
      customer_data = {},
      customerData = [],
      itemData = [],
      supplierData = [],
      purchaseData = [],
      purchaseItemData = [],
      selectePurchaseItemData = {},
      selectPurchaseData = {},
      previousCol2Value = "";

    if (this.state.formData.cmbType == "Sales Entry") {
      this.GetRowNameOfSalesData = (i) => {
        let salesDataGetRowName = [
          "dat_salesdate", //Sales Keys
          "vac_billtype",
          "vac_billno",
          "bint_billno",
          "vac_customer",
          "vac_customershipto",
          "vac_referencename",
          "dec_discamt",
          "dec_taxable",
          "dec_cgst",
          "dec_sgst",
          "dec_igst",
          "dec_grtotal",
          "dec_tdsamount",
          "dec_advancepayment",
          "dec_roundoff",
          "dec_netpayment",
          "vac_salestransactiontype",
          "vac_remark",
          "bint_itemsrno", //Sales Item Keys
          "vac_storename",
          "vac_itemname",
          "vac_hsncode",
          "vac_unit",
          "dec_qty",
          "dec_rate",
          "dec_basicamt",
          "dec_disper",
          "dec_disamt",
          "dec_taxable",
          "vac_taxname",
          "dec_cgstamt",
          "dec_sgstamt",
          "dec_igstamt",
          "dec_totalamt",
          "vac_remark",
          // "bint_acid",
          // "vac_company",
          // "bint_salessrno",
          // "bint_vouno",
        ];
        // salesDataGetRowName.map((rowname) => {
        //   console.log("rowname[i]", rowname[i]);
        // });
        // console.log("salesDataGetRowName" + [i], salesDataGetRowName[i]);

        return salesDataGetRowName[i];
      };

      this.state.rows.map((row, index) => {
        // console.log("index", index);
        // console.log("row", row);
        // console.log("previousCol2Value before confition", previousCol2Value);
        if (row.col2 && row.col2 !== previousCol2Value) {
          if (salesItemData.length > 0) {
            selectSalesData["itemdata"] = salesItemData;
            salesData.push(selectSalesData);
            salesItemData = [];
          }
          previousCol2Value = row.col2;
          // console.log("previousCol2Value", previousCol2Value);
          // console.log("row.col2", row.col2);
          // console.log("row[index - 1].col2", row[index - 1].col2);
          // console.log("formated date", getYMDfromDMY(row.col0));

          selectSalesData = {};
          /**#Read Sales Data */
          selectSalesData["dat_salesdate"] = getYMDfromDMY(row.col0);
          for (let i = 1; i <= 18; i++) {
            selectSalesData[this.GetRowNameOfSalesData(i)] = row[`col${i}`];
          }
          selectSalesData["bint_acid"] = localStorage.getItem("acid");
          selectSalesData["vac_company"] = localStorage.getItem("CompanyName");
          selectSalesData["bint_salessrno"] = 0;
          selectSalesData["bint_vouno"] = 0;
          selectSalesData["bolinvoiceprint"] = false;

          /**#Read Sales Item Data */
          selecteSalesItemData = {};
          for (let i = 20; i <= 35; i++) {
            selecteSalesItemData[this.GetRowNameOfSalesData(i)] =
              row[`col${i}`];
          }
          selecteSalesItemData["bint_salessrno"] = 0;
          selecteSalesItemData["bint_itemsrno"] = 0;
          salesItemData.push(selecteSalesItemData);
        } else {
          selecteSalesItemData = {};
          for (let i = 20; i <= 35; i++) {
            selecteSalesItemData[this.GetRowNameOfSalesData(i)] =
              row[`col${i}`];
          }
          selecteSalesItemData["bint_salessrno"] = 0;
          selecteSalesItemData["bint_itemsrno"] = 0;
          salesItemData.push(selecteSalesItemData);
        }
        if (index == this.state.rows.length - 1) {
          if (salesItemData.length > 0) {
            selectSalesData["itemdata"] = salesItemData;
            salesData.push(selectSalesData);
          }
        }
      });
      // console.log("salesData", salesData);
      if (salesData && salesData.length > 0) {
        let dataLoadStatus = false;
        this.props.notifyProcessing();
        this.setState({ dataLoadStatus }, () => {
          const reqData = {
            Op: "ImportSalesData",
            bint_acyear: localStorage.getItem("ACY"),
            bint_acid: localStorage.getItem("acid"),
            bint_ci: localStorage.getItem("CI"),
            vac_username: localStorage.getItem("UserName"),
            sales_data: salesData,
          };
          fetchImportDetails(reqData)
            .then((res) => {
              dataLoadStatus = true;
              this.props.updateProcessing(res.data.msgType, res.data.message);
              this.setState({
                dataLoadStatus,
              });
            })
            .catch((error) => {
              console.log("Unknown error occurred in getInfo.", error);
            });
        });
      }
    } else if (this.state.formData.cmbType == "Customer Entry") {
      this.GetRowNameOfCustomerData = (i) => {
        let customerDataGetRowName = [
          "vac_gstin",
          "vac_customer",
          "vac_billingname",
          "vac_personname",
          "vac_referencename",
          "vac_address",
          "vac_city",
          "vac_state",
          "vac_statecode",
          "vac_panno",
          "vac_mobileno1",
          "vac_mobileno2",
          "vac_email1",
          "vac_email2",
          "vac_openingamountcrdr",
          "dec_openingamount",
          "vac_remark",
          "vac_pincode",
        ];

        return customerDataGetRowName[i];
      };
      this.state.rows.map((row) => {
        let curData = {};
        curData["edit_customer"] = "";
        for (let i = 0; i <= 16; i++) {
          curData[this.GetRowNameOfCustomerData(i)] = row[`col${i}`];
        }
        curData[this.GetRowNameOfCustomerData(17)] = "";
        // curData["vac_pincode"] = "";
        // console.log("curData", curData);
        customerData.push(curData);
        // return { customer_data };
      });
      // console.log("customerData", customerData);

      if (customerData && customerData.length > 0) {
        let dataLoadStatus = false;
        this.props.notifyProcessing();
        this.setState({ dataLoadStatus }, () => {
          const reqData = {
            Op: "ImportCustomerData",
            bint_acyear: localStorage.getItem("ACY"),
            bint_acid: localStorage.getItem("acid"),
            vac_company: localStorage.getItem("CompanyName"),
            customer_data: customerData,
          };
          fetchImportDetails(reqData)
            .then((res) => {
              dataLoadStatus = true;
              this.props.updateProcessing(res.data.msgType, res.data.message);
              this.setState({
                dataLoadStatus,
              });
            })
            .catch((error) => {
              console.log("Unknown error occurred in getInfo.", error);
            });
        });
      }
    } else if (this.state.formData.cmbType == "Item Entry") {
      this.GetRowNameOfItemData = (i) => {
        let itemDataGetRowName = [
          "vac_itemname",
          "vac_unit",
          "vac_hsncode",
          "dec_purchaserate",
          "dec_salesrate",
          "vac_taxname",
          "dec_cgst",
          // "dec_cgstamo",
          "dec_sgst",
          // "dec_sgstamo",
          "dec_igst",
          // "dec_igstamo",
          // "edit_itemname",
          // "edit_unit",
        ];

        return itemDataGetRowName[i];
      };
      this.state.rows.map((row) => {
        let curData = {};
        // console.log("row", row);
        curData["edit_itemname"] = "";
        curData["edit_unit"] = "";
        for (let i = 0; i <= 8; i++) {
          curData[this.GetRowNameOfItemData(i)] = row[`col${i}`];
        }
        curData["dec_cgstamo"] = row["col6"] / 100;
        curData["dec_sgstamo"] = row["col7"] / 100;
        curData["dec_igstamo"] = row["col8"] / 100;
        // console.log("curData", curData);
        itemData.push(curData);
        // return { customer_data };
      });
      // console.log("itemData", itemData);

      if (itemData && itemData.length > 0) {
        let dataLoadStatus = false;
        this.props.notifyProcessing();
        this.setState({ dataLoadStatus }, () => {
          const reqData = {
            Op: "ImportItemData",
            bint_acyear: localStorage.getItem("ACY"),
            bint_acid: localStorage.getItem("acid"),
            Item_data: itemData,
          };
          fetchImportDetails(reqData)
            .then((res) => {
              dataLoadStatus = true;
              this.props.updateProcessing(res.data.msgType, res.data.message);
              this.setState({
                dataLoadStatus,
              });
            })
            .catch((error) => {
              console.log("Unknown error occurred in getInfo.", error);
            });
        });
      }
    } else if (this.state.formData.cmbType == "Supplier Entry") {
      this.GetRowNameOfSupplirerData = (i) => {
        let SupplierDataGetRowName = [
          "vac_gstno",
          "vac_supplier",
          "vac_billingname",
          "vac_personname",
          "vac_address",
          "vac_city",
          "vac_state",
          "vac_statecode",
          "vac_panno",
          "vac_mobileno1",
          "vac_mobileno2",
          "vac_email1",
          "vac_email2",
          "vac_openingamountcrdr",
          "dec_openingamount",
          "vac_remark",
        ];

        return SupplierDataGetRowName[i];
      };
      this.state.rows.map((row) => {
        let curData = {};
        // console.log("row", row);
        curData["edit_supplier"] = "";
        for (let i = 0; i <= 15; i++) {
          curData[this.GetRowNameOfSupplirerData(i)] = row[`col${i}`];
        }
        // console.log("curData", curData);
        supplierData.push(curData);
        // return { customer_data };
      });
      // console.log("supplierData", supplierData);

      if (supplierData && supplierData.length > 0) {
        let dataLoadStatus = false;
        this.props.notifyProcessing();
        this.setState({ dataLoadStatus }, () => {
          const reqData = {
            Op: "ImportSupplierData",
            bint_acyear: localStorage.getItem("ACY"),
            bint_acid: localStorage.getItem("acid"),
            vac_company: localStorage.getItem("CompanyName"),
            supplier_data: supplierData,
          };
          fetchImportDetails(reqData)
            .then((res) => {
              dataLoadStatus = true;
              this.props.updateProcessing(res.data.msgType, res.data.message);
              this.setState({
                dataLoadStatus,
              });
            })
            .catch((error) => {
              console.log("Unknown error occurred in getInfo.", error);
            });
        });
      }
      // console.log("in Supplire Entry Import");
    } else if (this.state.formData.cmbType == "Purchase Entry") {
      // console.log("in purchase entry");
      this.GetRowNameOfPurchaseData = (i) => {
        let PurchaseDataGetRowName = [
          // "bint_acyear", //Purcahse key
          // "bint_acid",
          // "vac_company",
          // "bint_purchaseno",
          // "bint_vouno",
          // "dec_roundoff",
          "dat_purchasedate",
          "vac_supplier",
          "vac_billno",
          "dec_discamt",
          "dec_taxableamount",
          "dec_cgst",
          "dec_sgst",
          "dec_igst",
          "dec_grandtotal",
          "dec_advpay",
          "dec_netpay",
          "vac_transactiontype",
          "vac_remark",
          // "bint_acid", // Purchase Item Key
          // "vac_company",
          // "bint_purchaseno",
          "bint_itemsrno",
          "vac_storename",
          "vac_itemname",
          "vac_unit",
          "dec_qty",
          "dec_rate",
          "dec_basicamt",
          "dec_cashdisper",
          "dec_cashdisamt",
          "dec_taxableamount",
          "vac_taxname",
          "dec_cgstamt",
          "dec_sgstamt",
          "dec_igstamt",
          "dec_totalamount",
          "vac_remark",
        ];
        // PurchaseDataGetRowName.map((rowname) => {
        //   console.log("rowname[i]", rowname[i]);
        // });
        // console.log("PurchaseDataGetRowName" + [i], PurchaseDataGetRowName[i]);
        return PurchaseDataGetRowName[i];
      };
      this.state.rows.map((row, index) => {
        // console.log("index", index);
        if (row.col0 && row.col0 !== "") {
          if (purchaseItemData.length > 0) {
            selectPurchaseData["itemdata"] = purchaseItemData;
            purchaseData.push(selectPurchaseData);
            purchaseItemData = [];
          }
          // console.log("row.col0", row);
          // console.log("formated date", getYMDfromDMY(row.col0));
          selectPurchaseData = {};
          /**#Read Purchase Data */
          selectPurchaseData["dat_purchasedate"] = getYMDfromDMY(row.col0);
          selectPurchaseData["dec_roundoff"] = 0;
          for (let i = 1; i <= 12; i++) {
            selectPurchaseData[this.GetRowNameOfPurchaseData(i)] =
              row[`col${i}`];
          }
          selectPurchaseData["bint_acid"] = localStorage.getItem("acid");
          selectPurchaseData["bint_acyear"] = localStorage.getItem("ACY");
          selectPurchaseData["vac_company"] =
            localStorage.getItem("CompanyName");
          selectPurchaseData["bint_purchaseno"] = 0;
          selectPurchaseData["bint_vouno"] = 0;
          // selectPurchaseData["bolinvoiceprint"] = false;
          /**#Read Sales Item Data */
          selectePurchaseItemData = {};
          for (let i = 14; i <= 28; i++) {
            selectePurchaseItemData[this.GetRowNameOfPurchaseData(i)] =
              row[`col${i}`];
          }
          selectePurchaseItemData["bint_itemsrno"] = 0;
          selectePurchaseItemData["bint_acid"] = localStorage.getItem("acid");
          selectePurchaseItemData["vac_company"] =
            localStorage.getItem("CompanyName");
          selectePurchaseItemData["bint_purchaseno"] = 0;
          purchaseItemData.push(selectePurchaseItemData);
        } else {
          selectePurchaseItemData = {};
          for (let i = 14; i <= 28; i++) {
            selectePurchaseItemData[this.GetRowNameOfPurchaseData(i)] =
              row[`col${i}`];
          }
          selectePurchaseItemData["bint_itemsrno"] = 0;
          selectePurchaseItemData["bint_acid"] = localStorage.getItem("acid");
          selectePurchaseItemData["vac_company"] =
            localStorage.getItem("CompanyName");
          selectePurchaseItemData["bint_purchaseno"] = 0;
          purchaseItemData.push(selectePurchaseItemData);
        }
        if (index == this.state.rows.length - 1) {
          if (purchaseItemData.length > 0) {
            selectPurchaseData["itemdata"] = purchaseItemData;
            purchaseData.push(selectPurchaseData);
          }
        }
      });
      // console.log("purchaseData", purchaseData);
      if (purchaseData && purchaseData.length > 0) {
        let dataLoadStatus = false;
        this.props.notifyProcessing();
        this.setState({ dataLoadStatus }, () => {
          const reqData = {
            Op: "ImportPurchaseData",
            bint_acyear: localStorage.getItem("ACY"),
            bint_acid: localStorage.getItem("acid"),
            Purchase_data: purchaseData,
          };
          fetchImportDetails(reqData)
            .then((res) => {
              dataLoadStatus = true;
              this.props.updateProcessing(res.data.msgType, res.data.message);
              this.setState({
                dataLoadStatus,
              });
            })
            .catch((error) => {
              console.log("Unknown error occurred in getInfo.", error);
            });
        });
      }
    }
  };

  createColumn = (columns) => {
    let cols = [];
    columns.map((c, index) => {
      cols.push({ id: "col" + index, label: c });
    });
    return cols;
  };

  createRow = (rows) => {
    // console.log("rows faizan", rows);
    let returnrow = {};
    rows.map((c, index) => {
      if (c == undefined || c == null) {
        c = "";
      }
      if (this.state.formData.cmbType === "Sales Entry") {
        if (index == 0 && (c != "" || c == undefined || c == null)) {
          c = this.convert(c);
        } else if (index == 22 && (c != "" || c == undefined || c == null)) {
          c = c.toString();
        } else if (index == 30 && (c != "" || c == undefined || c == null)) {
          let per = c == "Nil" ? "" : "%";
          if (Number(c) > 0) {
            c = (c * 100).toFixed(0) + per;
          }
        }
      }
      if (this.state.formData.cmbType === "Item Entry") {
        if (index == 5 && (c != "" || c == undefined || c == null)) {
          let per = c == "Nil" ? "" : "%";
          c = (c * 100).toFixed(0) + per;
        }
      }
      if (this.state.formData.cmbType === "Purchase Entry") {
        if (index == 0 && (c != "" || c == undefined || c == null)) {
          c = this.convert(c);
        } else if (index == 2 && (c != "" || c == undefined || c == null)) {
          c = c.toString();
        } else if (index == 23 && (c != "" || c == undefined || c == null)) {
          let per = c == "Nil" ? "" : "%";
          c = (c * 100).toFixed(0) + per;
        }
      }
      if (
        this.state.formData.cmbType === "Receipt Entry" ||
        this.state.formData.cmbType === "Payment Entry"
      ) {
        if (index == 1 && (c != "" || c == undefined || c == null)) {
          // console.log("c", c);
          c = this.convert(c);
        }
      }
      returnrow["col" + index] = c;
    });
    // console.log("returnrow", returnrow);
    return returnrow;
  };

  convert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  };

  //#endregion funtion

  //#region handle

  handleChangeRowsPerPage = (rowsPerPage) => {
    this.setState({ rowsPerPage });
  };

  handleOnChkChange = (e) => {
    // console.log("e.target.checked", e.target.checked);
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.checked,
      },
    });
  };

  handleOnChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
  };

  //#endregion handle
  render() {
    let rowsCount = this.state.rows.length;
    let ColumnsString = "";
    if (this.state.formData.cmbType == "Sales Entry") {
      ColumnsString = this.state.SalesColumnsName.join(" , ");
    } else if (this.state.formData.cmbType == "Customer Entry") {
      ColumnsString = this.state.CustomerColumnsName.join(" , ");
    } else if (this.state.formData.cmbType == "Item Entry") {
      ColumnsString = this.state.ItemColumnsName.join(" , ");
    } else if (this.state.formData.cmbType == "Supplier Entry") {
      ColumnsString = this.state.SupplierColumnsName.join(" , ");
    } else if (this.state.formData.cmbType == "Purchase Entry") {
      ColumnsString = this.state.PurchaseColumnsName.join(" , ");
    } else if (this.state.formData.cmbType == "Receipt Entry") {
      ColumnsString = this.state.ReceiptColumnsName.join(" , ");
    } else if (this.state.formData.cmbType == "Payment Entry") {
      ColumnsString = this.state.PaymentColumnsName.join(" , ");
    }
    // console.log("this.state.diableChk", this.state.diableChk);
    // console.log("this.state.chkOverwriteData", this.state.chkOverwriteData);
    return (
      <div>
        <Progress
          color="primary"
          display={this.state.dataLoadStatus !== true}
        />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          marginRight={1}
        >
          <Grid item>
            <label style={{ fontSize: "30px", color: "#515151" }}>
              <b>Import Data</b>
            </label>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginTop={3}
        >
          {/* <Grid item marginTop={2}> */}
          <CtCmb
            id="cmbType"
            label="Excel Read Type*"
            items={this.state.ExcelType}
            value={this.state.formData.cmbType}
            handleOnChange={this.handleOnChange}
            width={200}
            maxLength={100}
            colID="excelType"
          />
          {this.state.formData.cmbType == "Sales Entry" ? (
            <label
              style={{
                fontSize: "15px",
                color: "red",
                fontWeight: "600",
                margin: "10px 0",
              }}
            >
              Note that you have imported Customer and Item data before import
              of Sales Data.
            </label>
          ) : (
            ""
          )}
          {/* </Grid> */}
        </Grid>
        <form>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            marginTop={this.state.formData.cmbType == "Sales Entry" ? "" : 1}
          >
            <Grid item>
              <input type="file" id="input" />
              <CtBtn label="Read Excel" onClick={this.CallReadExcel} />
            </Grid>
            <Grid item style={{ display: "flex", flexDirection: "row" }}>
              <Grid item marginRight={5}>
                <CtCheckBox
                  id="chkOverwriteData"
                  name="chkOverwriteData"
                  label="Overwrite Existing Data"
                  checked={this.state.formData.chkOverwriteData}
                  handleCheckChange={this.handleOnChkChange}
                  disabled={this.state.diableChk}
                  // onKeyDown={this.props.onKeyDown}
                  // nextCtrlID="cmbInvoiceFormat"
                ></CtCheckBox>
              </Grid>
              <Grid item>
                <CtBtn label="Import Data" onClick={this.ImportData} />
              </Grid>
            </Grid>
            <Grid item>
              <label
                style={{
                  fontSize: "15px",
                  color: "black",
                  fontWeight: "600",
                  margin: "10px 0",
                }}
              >
                Column Formate : {ColumnsString}
              </label>
            </Grid>
            <Grid item style={{ width: "96%" }}>
              <TableList
                columns={this.state.columns}
                rows={this.state.rows}
                rowsCount={rowsCount}
                rowsPerPage={this.state.rowsPerPage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                // handleOnActionClick={this.handleARDonActionClick}
                // actionList={this.state.actionList}
                keyColumn={this.state.keyColumn}
                // handleOnSearchChange={this.handleOnSearchChange}
                // searchColumns={this.state.searchColumns}
                // searchData={this.state.searchData}
                // provideSearch={true}
                // handleOnNewEntryClick={this.handleOnNewEntryClick}
                // toolTipNewEntry="Reciept Entry"
              />
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapSetActiveMenu_MenuVisibility_ToProps
)(HOCVerifyIsUser(HoCtToastContainer(withRouter(ImportSalesData))));
