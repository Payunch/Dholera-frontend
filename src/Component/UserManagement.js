import React, { Component } from "react";
import { Grid, Box } from "@mui/material";
import TableList from "./CustomTool/TableList";
import CtTxt from "./CustomTool/CtTxt";
import CtBtn from "./CustomTool/CtBtn";
import { Edit, Delete } from "@mui/icons-material";
import Progress from "./CustomTool/Progress";
import { connect } from "react-redux";
import {
  mapStatetoProps,
  mapSetActiveMenu_MenuVisibility_ToProps,
} from "../mapRedux/mapReduxProps";
import AlertResponsiveDialog from "./CustomTool/AlertResponsiveDialog";
import HoCtToastContainer from "../HOC/HoCtToastContainer";
import CtTextFieldPWD from "./CustomTool/CtTxtPWD";
import { fetchUser } from "./API";
import HOCVerifyIsUser from "../HOC/HOCVerifyIsUser";
import CtTxtNum from "./CustomTool/CtTxtNum";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  applyTrimOnObjectValues,
  csvFileName,
  getRowOfRT,
  setKeyboardShortcuts,
} from "../SystemUtility/SystemUtility";
import CtART from "./CustomTool/ResponsiveTable";
import ControlledCheckbox from "./CustomTool/CtCheckBox";
class UserManagement extends Component {
  state = {
    removeKeyboardShortCuts: null,
    columnsdata: [
      { accessorKey: "vac_userid", header: "User ID" },
      { accessorKey: "vac_username", header: "Person Name" },
      { accessorKey: "vac_mobileno", header: "Mobile No" },
      { accessorKey: "vac_email", header: "Email" },
      { accessorKey: "vac_password", header: "Password", hide: "true" },
      {
        accessorKey: "vac_confirmpassword",
        header: "Confirm Password",
        hide: "true",
      },
      { accessorKey: "bint_ci", header: "bint_ci", hide: "true" },
      { accessorKey: "int_sa", header: "int_sa" },
      { accessorKey: "int_admin", header: "int_admin" },
    ],
    columns: [
      { id: "Action", label: "Search", name: "Search" },
      { id: "vac_userid", label: "User ID" },
      { id: "vac_username", label: "Person Name" },
      { id: "vac_mobileno", label: "Mobile No" },
      { id: "vac_email", label: "Email" },
      { id: "vac_password", label: "Password", hide: "true" },
      { id: "vac_confirmpassword", label: "Confirm Password", hide: "true" },
      { id: "bint_ci", label: "bint_ci", hide: "true" },
      { id: "int_sa", label: "int_sa", hide: "true" },
      { id: "int_admin", label: "int_admin", hide: "true" },
    ],
    rows: [],
    actionList: [
      {
        name: "Edit",
        icon: <Edit />,
        link: "UserManagement:",
        actionType: "AlertResponsive",
      },
      {
        name: "Delete",
        icon: <Delete />,
        link: "UserManagement:",
        actionType: "AlertResponsive",
        visiblecondition: [
          {
            colID: "int_sa",
            value: 1,
            relationalOperator: "!==",
          },
        ],
      },
    ],

    formData: {
      txtPersonName: "",
      EditUserID: "",
      txtUserId: "",
      txtPassword: "",
      txtConfirmPassword: "",
      txtMobileNo: "",
      txtEmail: "",
      txtCI: "",
      chkAdmin: false,
      EditUserIsAdmin: 0,
      EditUserIsSupperAdmin: 0,
    },

    dataLoadStatus: true,
    ARD: null,
    rowsCount: 0,
    rowsPerPage: 50,
    allModuleList: [
      {
        main: "Master",
        children: [
          { main: "Company", type: "A" },
          { main: "Customer", type: "A" },
          { main: "Supplier", type: "A" },
          { main: "User Management", type: "R" },
        ],
      },
      {
        main: "Entry",
        children: [
          {
            main: "Sales",
            type: "R",
            children: [
              { main: "Sales Read", type: "A" },
              { main: "Sales Write", type: "A" },
            ],
          },
          {
            main: "Purchase",
            type: "R",
            children: [
              { main: "Purchase Read", type: "A" },
              { main: "Purchase Write", type: "A" },
            ],
          },
        ],
      },
      {
        main: "Report",
        children: [
          {
            main: "Sales Report",
            children: [
              { main: "Date wise sales", type: "A" },
              { main: "Customer wise sales", type: "A" },
            ],
          },
          {
            main: "Purchase Report",
            children: [
              { main: "Date wise Purchase", type: "A" },
              { main: "Customer wise Purchase", type: "A" },
            ],
          },
        ],
      },
      {
        main: "Setting",
        children: [
          { main: "General Setting", type: "A" },
          { main: "Invoice Setting", type: "A" },
        ],
      },
    ],
    nodeexapmleList: [
      {
        value: "Master",
        label: "Master",
        children: [
          { value: "Company:Allow", label: "Company" },
          { value: "Customer:Allow", label: "Customer" },
          { value: "Supplier:Allow", label: "Supplier" },
        ],
      },
      {
        value: "Entry",
        label: "Entry",
        children: [
          {
            value: "Sales",
            label: "Sales",
            children: [
              { value: "Sales:Read", label: "Read" },
              { value: "Sales:Write", label: "Write" },
              { value: "Sales:Modify", label: "Modify" },
            ],
          },
          {
            value: "P3 child 1",
            label: "P3 child 1",
            children: [
              {
                value: "P3 child 4",
                label: "P3 child 4",
                children: [
                  { value: "P3 child 4.1", label: "P3 child 4.1" },
                  { value: "P3 child 4.2", label: "P3 child 4.2" },
                  { value: "P3 child 4.3", label: "P3 child 4.3" },
                  { value: "P3 child 4.4", label: "P3 child 4.4" },
                ],
              },
              { value: "P3 child 5", label: "P3 child 5" },
              { value: "P3 child 6", label: "P3 child 6" },
            ],
          },
          { value: "P3 child 2", label: "P3 child 2" },
        ],
      },
      {
        value: "Report",
        label: "Report",
        children: [{ value: "Day Book", label: "Day Book" }],
      },
    ],
    treeNodeList: [],
    checked: [],
    expanded: [],
  };

  //#region Component
  componentDidMount() {
    document.title = "RA : User Management";
    this.props.setActiveMenu("UserManagement");
    this.ShortCut();
    // this.getInfo();
    this.props.verifyUserID(
      this.getInfo,
      this.props.navInfo.subMenuMaster,
      this.props.setSubMenu_Master_Entry,
      this.props.setUserPrivileges,
    );
    // this.setSearchColumns();
    // this.setPrivilegesToTree()
  }
  componentWillUnmount() {
    this.removeKeyboardShortCuts();
  }
  removeKeyboardShortCuts = () => {
    if (this.state.removeKeyboardShortCuts) {
      this.state.removeKeyboardShortCuts();
      this.setState({ removeKeyboardShortCuts: null });
    }
  };
  //#endregion Component

  //#region handle
  handleOnChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
  };

  handleOnCheckChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.checked,
        EditUserIsAdmin: e.target.checked == true ? 1 : 0,
      },
    });
  };

  handleChangeRowsPerPage = (rowsPerPage) => {
    this.setState({ rowsPerPage });
  };

  handleARDonActionClick = (rtRow) => {
    const row = getRowOfRT(rtRow, [
      "vac_userid",
      "vac_userid",
      "vac_username",
      "vac_mobileno",
      "vac_email",
      "bint_ci",
      "int_admin",
      "int_sa",
      "actionName",
    ]);
    console.log("row", row);
    const txtUserId = row.vac_userid,
      EditUserID = row.vac_userid,
      txtPersonName = row.vac_username,
      txtPassword = "",
      txtConfirmPassword = "",
      txtMobileNo = row.vac_mobileno,
      txtEmail = row.vac_email,
      txtCI = row.bint_ci,
      actionName = row.actionName;

    if (actionName === "Edit") {
      const EditUserIsAdmin = row.int_admin,
        EditUserIsSupperAdmin = row.int_sa,
        chkAdmin =
          EditUserIsAdmin === 1 || EditUserIsSupperAdmin === 1 ? true : false;
      this.setState(
        {
          formData: {
            ...this.state.formData,
            txtUserId,
            EditUserID,
            txtPersonName,
            txtPassword,
            txtConfirmPassword,
            txtMobileNo,
            txtEmail,
            txtCI,
            chkAdmin,
            EditUserIsAdmin,
            EditUserIsSupperAdmin,
          },
        },
        () => {
          // console.log("this.state.allModuleList", this.state.allModuleList);
          this.setPrivilegesToTree(this.state.allModuleList);
          this.getPrivilegesOfUserID(txtUserId);
        },
      );
    } else if (actionName === "Delete") {
      this.DeleteData(EditUserID);
    }
  };

  handleARDonActionClick_Delete = (rtRow) => {
    const row = getRowOfRT(rtRow, ["vac_userid"]),
      EditUserID = row.vac_userid;
    this.DeleteData(EditUserID);
  };

  handleARDonActionClick_Edit = (rtRow) => {
    const row = getRowOfRT(rtRow, [
      "vac_userid",
      "vac_userid",
      "vac_username",
      "vac_mobileno",
      "vac_email",
      "bint_ci",
      "int_admin",
      "int_sa",
    ]);
    const txtUserId = row.vac_userid,
      EditUserID = row.vac_userid,
      txtPersonName = row.vac_username,
      txtPassword = "",
      txtConfirmPassword = "",
      txtMobileNo = row.vac_mobileno,
      txtEmail = row.vac_email,
      txtCI = row.bint_ci,
      EditUserIsAdmin = row.int_admin,
      EditUserIsSupperAdmin = row.int_sa,
      chkAdmin =
        EditUserIsAdmin === 1 || EditUserIsSupperAdmin === 1 ? true : false;

    this.setState(
      {
        formData: {
          ...this.state.formData,
          txtUserId,
          EditUserID,
          txtPersonName,
          txtPassword,
          txtConfirmPassword,
          txtMobileNo,
          txtEmail,
          txtCI,
          chkAdmin,
          EditUserIsAdmin,
          EditUserIsSupperAdmin,
        },
      },
      () => {
        // console.log("this.state.allModuleList", this.state.allModuleList);
        this.setPrivilegesToTree(this.state.allModuleList);
        this.getPrivilegesOfUserID(txtUserId);
      },
    );
  };

  //#endregion handle

  //#region function

  ShortCut = () => {
    this.setState(
      {
        removeKeyboardShortCuts: setKeyboardShortcuts({
          // handleOnclickSave: this.SaveUserManagement,
          handleOnclickSave: () => {
            if (
              this.state.formData.EditUserID.length > 0 &&
              this.state.formData.EditUserIsSupperAdmin === 1 &&
              this.props.userPrivilege.AdminType !== "SA"
            ) {
              this.props.toastErrorMsg("Save Action Not Allowed.");
            } else {
              this.SaveUserManagement();
            }
          },
          handleOnclickNew: this.clearInfo,
          handleOnclickDelete: () => {
            if (this.state.formData.EditUserIsSupperAdmin !== 1) {
              this.DeleteData(this.state.formData.EditUserID);
            } else {
              this.props.toastErrorMsg("Delete Action Not Allowed.");
            }
          },
        }),
      },
      // this.saveSales(true)
    );
  };
  trimFormData = (nextFunctionCall) => {
    let formData = applyTrimOnObjectValues({
      formData: this.state.formData,
      excludeKeysArray: ["txtPassword", "txtConfirmPassword", "chkAdmin"],
    });
    this.setState({ formData }, () => {
      if (nextFunctionCall) {
        nextFunctionCall();
      }
    });
  };

  validateUserManagement = () => {
    let result = false;
    // console.log("this.state.formData.EditUserID", this.state.formData.EditUserID);
    if (this.state.formData.txtPersonName.length <= 0) {
      this.props.toastErrorMsg("Enter Person Name", "txtPersonName");
    } else if (this.state.formData.txtUserId.length <= 0) {
      this.props.toastErrorMsg("Enter UserId", "txtUserId");
    } else if (
      this.state.formData.EditUserID == "" &&
      this.state.formData.txtPassword.length < 4
    ) {
      this.props.toastErrorMsg(
        "Enter Password Alteast a 4 Characters",
        "txtPassword",
      );
    } else if (
      this.state.formData.EditUserID.length > 0 &&
      this.state.formData.txtPassword.length > 0 &&
      this.state.formData.txtPassword.length < 4
    ) {
      this.props.toastErrorMsg(
        "Enter Password Alteast a 4 Characters",
        "txtPassword",
      );
      // } else if (this.state.formData.txtConfirmPassword.length <= 0) {
      //   this.props.toastErrorMsg("Enter Confirm Password", "txtConfirmPassword");
    } else if (
      this.state.formData.txtPassword !== this.state.formData.txtConfirmPassword
    ) {
      this.props.toastErrorMsg(
        "Password and Confirm Password Must Be Same",
        "txtPassword",
      );
    } else if (this.state.formData.txtMobileNo <= 0) {
      this.props.toastErrorMsg("Enter Mobile No", "txtMobileNo");
    } else if (this.state.formData.txtMobileNo.trim().length < 10) {
      this.props.toastErrorMsg("Enter 10 Digit Mobile No", "txtMobileNo");
    } else if (this.state.formData.txtEmail.trim().length <= 0) {
      this.props.toastErrorMsg("Enter Email", "txtEmail");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        this.state.formData.txtEmail,
      )
    ) {
      this.props.toastErrorMsg("Enter valid Email", "txtEmail");
    } else if (this.state.checked.length <= 0) {
      this.props.toastMsg("error", "Please assign Privileges to User");
    } else {
      result = true;
    }
    return result;
  };

  // setSearchColumns = () => {
  //   let searchColumns = [];
  //   searchColumns.push(
  //     {
  //       cType: "CtTxt",
  //       id: "vac_userid",
  //       label: "LogIn ID",
  //       value: this.state.searchData.vac_userid,
  //       handleOnChange: this.handleOnSearchInputChange,
  //       width: "100",
  //       maxLength: "100",
  //     },
  //     {
  //       cType: "CtTxt",
  //       id: "vac_username",
  //       label: "Person Name",
  //       value: this.state.searchData.vac_username,
  //       handleOnChange: this.handleOnSearchInputChange,
  //       width: "100",
  //       maxLength: "100",
  //     },
  //     {
  //       cType: "CtTxt",
  //       id: "vac_mobileno",
  //       label: "Mobile No",
  //       value: this.state.searchData.vac_mobileno,
  //       handleOnChange: this.handleOnSearchInputChange,
  //       width: "100",
  //       maxLength: "100",
  //     },
  //     {
  //       cType: "CtTxt",
  //       id: "vac_email",
  //       label: "Email",
  //       value: this.state.searchData.vac_email,
  //       handleOnChange: this.handleOnSearchInputChange,
  //       width: "100",
  //       maxLength: "100",
  //     }
  //   );
  //   this.setState({ searchColumns });
  // };

  SaveUserManagement = () => {
    if (this.validateUserManagement()) {
      const dataLoadStatus = false;
      this.props.notifyProcessing();
      this.setState({ dataLoadStatus }, () => {
        const reqData = {
          Op: "SaveUser",
          // editloginid: this.state.formData.EditLoginID,
          bint_ci:
            this.state.formData.EditUserID != ""
              ? this.state.formData.txtCI
              : localStorage.getItem("CI"),
          edit_userid: this.state.formData.EditUserID,
          vac_username: this.state.formData.txtPersonName,
          vac_userid: this.state.formData.txtUserId,
          vac_password: this.state.formData.txtPassword,
          // vac_confirmpassword: this.state.formData.txtConfirmPassword,
          vac_mobileno: this.state.formData.txtMobileNo,
          vac_email: this.state.formData.txtEmail,
          beprivileges: this.getLastCheckedPrivileges(),
          int_admin: this.state.formData.EditUserIsAdmin,
          int_superadmin: this.state.formData.EditUserIsSupperAdmin,
        };
        // console.log("reqData", reqData);
        fetchUser(reqData)
          .then((res) => {
            this.props.updateProcessing(res.data.msgType, res.data.message);
            if (res.data.msgType === "success") {
              this.getInfo();
              this.clearInfo(true);
            }
          })
          .catch((error) => {
            this.props.updateProcessing(
              "Unknown error occurred in Save User Management." + error,
            );
          });
      });
    }
  };

  DeleteData = (EditUserID) => {
    if (EditUserID.length > 0) {
      this.setState({ ARD: null }, () => {
        let ARD = (
          <AlertResponsiveDialog
            labelAgree="Delete"
            labelDisagree="Cancel"
            alertTitle={"Do you want to Delete Login Id : " + EditUserID + " ?"}
            alertMessage=""
            handleOnClickYes={() => {
              return this.DeleteUserManagement(EditUserID);
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

  onDeleteClick = () => {
    const LogIn = this.state.formData.txtUserId;
    if (LogIn !== "") {
      this.setState({ ARD: null }, () => {
        let ARD = (
          <AlertResponsiveDialog
            labelAgree="Delete"
            labelDisagree="Cancel"
            alertTitle={"Do you want to Delete Log In Id. : " + LogIn + " ?"}
            alertMessage=""
            handleOnClickYes={() => {
              return this.DeleteUserManagement(LogIn);
            }}
            defaultOpenDialog={true}
            onYesClickCloseIfExeSuccessfully={true}
          />
        );
        this.setState({ ARD });
      });
    } else {
      this.props.toastMsg("error", "No records to Delete");
    }
  };

  DeleteUserManagement = (edit_userid) => {
    this.props.notifyProcessing();
    this.setState({ dataLoadStatus: false }, () => {
      const reqData = {
        Op: "DeleteUser",
        edit_userid: edit_userid,
        // edit_userid,
        // editloginid: this.state.formData.EditLoginID,
      };
      fetchUser(reqData)
        .then((res) => {
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
            "Unknown error occurred in Delete User Manageement. " + error,
          );
        });
    });
    return false;
  };

  getInfo = () => {
    let dataLoadStatus = false;
    this.setState({ dataLoadStatus }, () => {
      const reqData = {
        Op: "UserList",
        bint_ci: localStorage.getItem("CI"),
        admin_cat: this.props.userPrivilege.AdminType,
      };
      fetchUser(reqData)
        .then((res) => {
          // console.log(res.data);
          dataLoadStatus = true;
          let rows = res.data.UserList,
            rowsCount = rows.length,
            allModuleList = [];
          if (res.data.ModuleList) {
            allModuleList = res.data.ModuleList;
          }
          this.setState(
            {
              dataLoadStatus,
              rows,
              rowsCount,
              allModuleList,
            },
            () => {
              this.setPrivilegesToTree(this.state.allModuleList);
              // console.log("this.state.privileges", this.state.privileges);
            },
          );
        })
        .catch((error) => {
          this.props.updateProcessing(
            "Unknown error occurred in getInfo.",
            error,
          );
          this.setState({ dataLoadStatus: true });
        });
    });
    document.getElementById("txtPersonName").focus();
  };

  clearInfo = () => {
    const txtPersonName = "",
      txtLogin = "",
      EditUserID = "",
      txtUserId = "",
      txtPassword = "",
      txtConfirmPassword = "",
      txtMobileNo = "",
      txtEmail = "",
      chkAdmin = false;
    this.setState(
      {
        formData: {
          ...this.state.formData,
          txtPersonName,
          txtLogin,
          EditUserID,
          txtUserId,
          txtPassword,
          txtConfirmPassword,
          txtMobileNo,
          txtEmail,
          chkAdmin,
          EditUserIsAdmin: 0,
          EditUserIsSupperAdmin: 0,
        },
        checked: [],
        expanded: [],
      },
      () => {
        document.getElementById("txtPersonName").focus();
      },
    );
  };

  onCheck = (checked) => {
    this.setState({ checked });
  };

  onExpand = (expanded) => {
    this.setState({ expanded });
  };

  setPrivilegesToTree = (Arrprivileges, bolreturnvalue = false) => {
    // console.log("Arrprivileges", Arrprivileges);
    let privileges = Arrprivileges,
      treeNodeList = [],
      children = [],
      childrenC = [],
      rowCType = "",
      rowCCType = "",
      parentArrType = [],
      childArrType = [];
    if (privileges.length > 0) {
      privileges.map((rowP) => {
        if (rowP.children && rowP.children.length > 0) {
          // console.log("rowP", rowP);
          children = [];
          rowCType = "";
          rowP.children.map((rowC) => {
            parentArrType = [];
            if (rowC.type == "A") {
              rowCType = "Allow";
            } else if (rowC.type == "R") {
              rowCType = "Read";
              parentArrType.push(
                {
                  value: rowP.main + ":" + rowC.main + ":" + "Read",
                  label: "Read",
                },
                {
                  value: rowP.main + ":" + rowC.main + ":" + "Write",
                  label: "Write",
                },
                {
                  value: rowP.main + ":" + rowC.main + ":" + "Modify",
                  label: "Modify",
                },
              );
            }
            // console.log("parentArrType",parentArrType);
            if (rowC.children && rowC.children.length > 0) {
              childrenC = [];
              rowCCType = "";
              rowC.children.map((rowCC) => {
                childArrType = [];
                if (rowCC.type == "A") {
                  rowCCType = "Allow";
                } else if (rowCC.type == "R") {
                  rowCCType = "Read";
                  childArrType.push(
                    {
                      value:
                        rowP.main +
                        ":" +
                        rowC.main +
                        ":" +
                        rowCC.main +
                        ":" +
                        "Read",
                      label: "Read",
                    },
                    {
                      value:
                        rowP.main +
                        ":" +
                        rowC.main +
                        ":" +
                        rowCC.main +
                        ":" +
                        "Write",
                      label: "Write",
                    },
                    {
                      value:
                        rowP.main +
                        ":" +
                        rowC.main +
                        ":" +
                        rowCC.main +
                        ":" +
                        "Modify",
                      label: "Modify",
                    },
                  );
                }
                if (childArrType.length > 0) {
                  childrenC.push({
                    value: rowP.main + ":" + rowC.main + ":" + rowCC.main,
                    label: rowCC.main,
                    children: childArrType,
                  });
                } else {
                  childrenC.push({
                    value: rowP.main + ":" + rowC.main + ":" + rowCC.main,
                    label: rowCC.main,
                  });
                }
              });
              if (childrenC.length > 0) {
                children.push({
                  value: rowP.main + ":" + rowC.main + ":" + rowCType,
                  label: rowC.main,
                  children: childrenC,
                });
              } else {
                children.push({
                  value: rowP.main + ":" + rowC.main + ":" + rowCType,
                  label: rowC.main,
                });
              }
            } else {
              if (parentArrType.length > 0) {
                children.push({
                  value: rowP.main + ":" + rowC.main,
                  label: rowC.main,
                  children: parentArrType,
                });
              } else {
                children.push({
                  value: rowP.main + ":" + rowC.main + ":" + rowCType,
                  label: rowC.main,
                });
              }
              // console.log("children", children);
            }
          });
          treeNodeList.push({ value: rowP.main, label: rowP.main, children });
        } else {
          treeNodeList.push({ value: rowP.main, label: rowP.main });
        }
        // console.log("treeNodeList",treeNodeList);
      });
    }
    if (bolreturnvalue) {
      return treeNodeList;
    } else {
      this.setState(
        {
          treeNodeList,
        },
        () => {
          // console.log("this.state.treeNodeList", this.state.treeNodeList);
          // console.log("nodeexapmleList", this.state.nodeexapmleList);
        },
      );
    }
  };

  pushRWM_toChecked = (
    checked,
    readPrivilege,
    writePrivilege,
    modifyPrivilege,
    privilegeIndex = "",
  ) => {
    if (readPrivilege || writePrivilege || modifyPrivilege) {
      if (modifyPrivilege) {
        checked.push(modifyPrivilege);
      } else if (writePrivilege) {
        checked.push(writePrivilege);
      } else if (readPrivilege) {
        checked.push(readPrivilege);
      }
      readPrivilege = undefined;
      writePrivilege = undefined;
      modifyPrivilege = undefined;
      // console.log("checked at the index :: " + privilegeIndex, checked);
    }
    return { checked, readPrivilege, writePrivilege, modifyPrivilege };
  };

  getLastCheckedPrivileges = () => {
    let checked = [];
    if (this.state.checked.length > 0) {
      let readPrivilege = undefined,
        writePrivilege = undefined,
        modifyPrivilege = undefined,
        prePartPrivilege = undefined;
      this.state.checked.map((curPrivilege, privilegeIndex) => {
        let privilegeInfo = curPrivilege.split(":"),
          curPartPrivilege = privilegeInfo[0] + ":" + privilegeInfo[1];
        if (
          prePartPrivilege !== undefined &&
          prePartPrivilege !== curPartPrivilege
        ) {
          let result = this.pushRWM_toChecked(
            checked,
            readPrivilege,
            writePrivilege,
            modifyPrivilege,
            privilegeIndex,
          );
          checked = result.checked;
          readPrivilege = result.readPrivilege;
          writePrivilege = result.writePrivilege;
          modifyPrivilege = result.modifyPrivilege;
        }
        prePartPrivilege = curPartPrivilege;
        if (privilegeInfo[2] == "Read") {
          readPrivilege = curPrivilege;
        } else if (privilegeInfo[2] == "Write") {
          writePrivilege = curPrivilege;
        } else if (privilegeInfo[2] == "Modify") {
          modifyPrivilege = curPrivilege;
        } else {
          checked.push(curPrivilege);
        }
      });
      let result = this.pushRWM_toChecked(
        checked,
        readPrivilege,
        writePrivilege,
        modifyPrivilege,
      );
      checked = result.checked;
    }
    // console.log("checked at the end of the Function => ", checked);
    return checked;
  };

  checkChkBoxOnUpdate = () => {
    let checked = [];
    if (this.state.checked.length > 0) {
      this.state.checked.map((curPrivilege, privilegeIndex) => {
        let privilegeInfo = curPrivilege.split(":"),
          curPartPrivilege = ""; //privilegeInfo[0] + ':' + privilegeInfo[1]
        if (privilegeInfo[2] == "Read") {
          checked.push(curPrivilege);
        } else if (privilegeInfo[2] == "Write") {
          curPartPrivilege =
            privilegeInfo[0] + ":" + privilegeInfo[1] + ":" + "Read";
          checked.push(curPartPrivilege);
          checked.push(curPrivilege);
        } else if (privilegeInfo[2] == "Modify") {
          curPartPrivilege =
            privilegeInfo[0] + ":" + privilegeInfo[1] + ":" + "Read";
          checked.push(curPartPrivilege);
          curPartPrivilege =
            privilegeInfo[0] + ":" + privilegeInfo[1] + ":" + "Write";
          checked.push(curPartPrivilege);
          checked.push(curPrivilege);
        } else {
          checked.push(curPrivilege);
        }
      });
      this.setState({
        checked,
      });
    }
  };

  getPrivilegesOfUserID = (UserID) => {
    let checked = [];
    this.state.rows.map((i) => {
      if (i.vac_userid == UserID) {
        if (i.privileges && i.privileges.length > 0) {
          checked = i.privileges;
        }
      }
    });
    this.setState(
      {
        checked,
      },
      () => {
        this.checkChkBoxOnUpdate();
      },
    );
  };
  //#endregion function

  render() {
    return (
      <form>
        <Progress
          color="primary"
          display={this.state.dataLoadStatus !== true}
        />
        {/* <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="title"
        >
          <label htmlFor="Title" style={{ fontSize: "30px", color: "#515151" }}>
            <b>User Management</b>
          </label>
        </Grid> */}
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          spacing={4}
          marginTop={0}
        >
          <Grid item sm={12} lg={8}>
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
                  id="txtPersonName"
                  value={this.state.formData.txtPersonName}
                  label="Person Name*"
                  handleOnChange={this.handleOnChange}
                  // width={230}
                  maxLength={50}
                  onKeyDown={this.props.onKeyDown}
                  nextCtrlID="txtUserId"
                />
              </Grid>
              <Grid item>
                <CtTxt
                  id="txtUserId"
                  value={this.state.formData.txtUserId}
                  label="User ID*"
                  handleOnChange={this.handleOnChange}
                  // width={240}
                  maxLength={50}
                  onKeyDown={this.props.onKeyDown}
                  nextCtrlID="txtPassword"
                />
              </Grid>
              <Grid item>
                <CtTextFieldPWD
                  id="txtPassword"
                  label="Password*"
                  maxLength={50}
                  // width='190'
                  value={this.state.formData.txtPassword}
                  onKeyDown={this.props.onKeyDown}
                  handleOnChange={this.handleOnChange}
                  autoFillPassword={false}
                  nextCtrlID="txtConfirmPassword"
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
                <CtTextFieldPWD
                  id="txtConfirmPassword"
                  label="Confirm Password*"
                  maxLength={50}
                  // width='190'
                  value={this.state.formData.txtConfirmPassword}
                  onKeyDown={this.props.onKeyDown}
                  handleOnChange={this.handleOnChange}
                  autoFillPassword={false}
                  nextCtrlID="txtMobileNo"
                />
              </Grid>
              <Grid item>
                <CtTxtNum
                  id="txtMobileNo"
                  label="Mobile No*"
                  maxLength={10}
                  // width="130"
                  width={
                    this.props.userPrivilege.AdminType == "Admin" ||
                    this.props.userPrivilege.AdminType == "SA"
                      ? "130"
                      : ""
                  }
                  value={this.state.formData.txtMobileNo}
                  onKeyDown={this.props.onKeyDown}
                  handleOnChange={this.handleOnChange}
                  nextCtrlID="txtEmail"
                />
              </Grid>
              <Grid item>
                <CtTxt
                  id="txtEmail"
                  label="Email*"
                  maxLength={50}
                  // width="200"
                  width={
                    this.props.userPrivilege.AdminType == "Admin" ||
                    this.props.userPrivilege.AdminType == "SA"
                      ? "170"
                      : ""
                  }
                  value={this.state.formData.txtEmail}
                  onKeyDown={this.props.onKeyDown}
                  defaultAction={() => {
                    this.trimFormData(() => {
                      this.SaveUserManagement();
                    });
                  }}
                  handleOnChange={this.handleOnChange}
                />
              </Grid>
              {(this.props.userPrivilege.AdminType == "Admin" ||
                this.props.userPrivilege.AdminType == "SA") && (
                <Grid item marginTop={3}>
                  <ControlledCheckbox
                    id="chkAdmin"
                    checked={this.state.formData.chkAdmin}
                    label="Admin"
                    // width='400'
                    value={this.state.formData.chkAdmin}
                    // onKeyDown={this.props.onKeyDown}
                    handleCheckChange={this.handleOnCheckChange}
                    disabled={
                      this.state.formData.EditUserIsSupperAdmin === 1
                        ? true
                        : false
                    }
                  />
                </Grid>
              )}
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
                <CtBtn
                  label="Save"
                  onClick={() => {
                    this.trimFormData(() => {
                      this.SaveUserManagement();
                    });
                  }}
                  disabled={
                    this.state.formData.EditUserID.length > 0 &&
                    this.state.formData.EditUserIsSupperAdmin === 1 &&
                    this.props.userPrivilege.AdminType !== "SA"
                      ? true
                      : false
                  }
                />
              </Grid>
              <Grid item>
                <CtBtn
                  label="New"
                  onClick={this.clearInfo}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <CtBtn
                  label="Delete"
                  onClick={() => {
                    this.DeleteData(this.state.formData.EditUserID);
                  }}
                  disabled={
                    this.state.formData.EditUserIsSupperAdmin === 1
                      ? true
                      : false
                  }
                />
                {/* // onClick={this.onDeleteClick} */}
              </Grid>
            </Grid>
            <br />
            <TableList
              columns={this.state.columns}
              counter={this.state.counter}
              rows={this.state.rows}
              rowsCount={this.state.rowsCount}
              rowsPerPage={this.state.rowsPerPage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              handleOnActionClick={this.handleARDonActionClick}
              actionList={this.state.actionList}
              provideSearch={true}
            />
            {/* <CtART
              rowsdata={this.state.rows}
              columnsdata={this.state.columnsdata}
              rowsPerPage={this.state.rowsPerPage}
              tblmaxHeight={500}
              csvFileName={csvFileName("Customer")}
              rowIconAction={[
                {
                  label: "Edit",
                  onClick: this.handleARDonActionClick_Edit,
                  icon: "Edit",
                  className: "secondary-button",
                },
                {
                  label: "Delete",
                  onClick: this.handleARDonActionClick_Delete,
                  icon: "delete",
                  className: "delete-button",
                },
                // this.props.userPrivilege["Entry:Proposal"] == "M"
                //   ? {
                //       label: "Delete",
                //       onClick: this.handleARDonActionClick_Delete,
                //       icon: "delete",
                //       className: "delete-button",
                //     }
                //   : "",
              ]}
              showColumnFilters={false}
              actionColSize={90}
              hideColIdList={[
                "vac_password",
                "vac_confirmpassword",
                "bint_ci",
                "int_sa",
                "int_admin",
              ]}
              density={"compact"}
            /> */}
          </Grid>
          <Grid item sm={12} lg={4}>
            <div item className="SimpleTreeview">
              <CheckboxTree
                nodes={this.state.treeNodeList}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={this.onCheck}
                onExpand={this.onExpand}
                iconsClass="fa4"
              />
            </div>
          </Grid>
        </Grid>
        <Grid item>
          <Box display={{ xs: "none" }} style={{ textAlign: "right" }}>
            {this.state.ARD}
          </Box>
        </Grid>
      </form>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapSetActiveMenu_MenuVisibility_ToProps,
)(HOCVerifyIsUser(HoCtToastContainer(UserManagement)));
