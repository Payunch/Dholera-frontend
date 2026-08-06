import React, { useState } from "react";
import { fetchCompany } from "../components/API";
import AlertResponsiveDialog from "../components/CustomTool/AlertResponsiveDialog";
import CompanyList from "../components/CompanyList";
import { getAcYear_YYYY } from "../utils/SystemUtility";
import { setMenuPrivileges } from "../utils/MenuUtility";

const HOCReduxData = (ReduxDataValidator) => {
  const setInfo = ({
    defaultCompany,
    handleOnChangleProgressBarStatus,
    setAcYearCompanyList,
    navigateTo,
    handleOnChangeARD,
    handleOnARDClose,
    displayARDSelection,
    setPrevAcYearCompany,
    setSubMenu_Master_Entry,
    setUserPrivileges,
  }) => {
    handleOnChangleProgressBarStatus(false);
    const reqData = {
      Op: "CompanyNameList",
      bolLoadAcYear: true,
      bint_ci: localStorage.getItem("CI"),
      bolMenuInfo: true,
      vac_userid: localStorage.getItem("logInID"),
    };
    fetchCompany(reqData)
      .then((res) => {
        handleOnChangleProgressBarStatus(true);
        if (res.data.CompanyNameList.length > 0) {
          setAcYearCompanyList({
            YearList: res.data.AcYear,
            CompanyList: res.data.CompanyNameList,
          });
          if (
            displayARDSelection !== undefined &&
            displayARDSelection === true
          ) {
            displayAcYearCompanySelection({
              DefYear: res.data.DefYear,
              defaultCompany,
              handleOnARDClose,
              handleOnChangeARD,
              CompanyNameList: res.data.CompanyNameList,
              AcYear: res.data.AcYear,
              setPrevAcYearCompany,
            });
          }
        } else {
          setACY_info(res.data.DefYear);
          navigateTo("CompanyMaster");
        }
        if (res.data.vac_privileges) {
          setMenuPrivileges(
            res.data.vac_privileges,
            setSubMenu_Master_Entry,
            setUserPrivileges,
            res.data.admin_cat
          );
        }
      })
      .catch((error) => {
        console.log("Unknown error occurred in setInfo.", error);
      });
  };

  const setACY_info = (FullACY) => {
    localStorage.setItem("ACY", getAcYear_YYYY(FullACY));
    localStorage.setItem("FullACY", FullACY);
  };

  const displayAcYearCompanySelection = ({
    CompanyNameList,
    AcYear,
    DefYear,
    defaultCompany,
    handleOnARDClose,
    handleOnChangeARD,
    setPrevAcYearCompany,
  }) => {
    let ARD = null;
    ARD = (
      <AlertResponsiveDialog
        labelDisagree="Continue"
        alertMessage={
          <CompanyList
            CompanyNameList={CompanyNameList}
            AcYear={AcYear}
            DefYear={DefYear}
            defaultCompany={defaultCompany}
            setPrevAcYearCompany={setPrevAcYearCompany}
            handleOnARDClose={handleOnARDClose}
          />
        }
        defaultOpenDialog={true}
        onYesClickCloseIfExeSuccessfully={true}
        // handleOnClickYes={() => {
        //   if (handleOnARDClose) {
        //     handleOnARDClose();
        //   }
        // }}
        handleOnClickNo={() => {
          if (handleOnARDClose) {
            handleOnARDClose();
          }
        }}
      />
    );
    handleOnChangeARD(ARD);
  };

  const checkAndSetReduxData = ({
    lists,
    handleOnChangleProgressBarStatus,
    setAcYearCompanyList,
    navigateTo,
    handleOnChangeARD,
    handleOnARDClose,
    displayARDSelection,
    setPrevAcYearCompany,
    setSubMenu_Master_Entry,
    setUserPrivileges,
  }) => {
    if (!(lists.CompanyList && lists.CompanyList.length > 0)) {
      setInfo({
        defaultCompany: localStorage.getItem("CompanyName"),
        handleOnChangleProgressBarStatus,
        setAcYearCompanyList,
        navigateTo,
        handleOnChangeARD,
        handleOnARDClose,
        displayARDSelection,
        setPrevAcYearCompany,
        setSubMenu_Master_Entry,
        setUserPrivileges,
      });
    }
  };

  return (props) => {
    return (
      <div className="ReduxDataValidator">
        <ReduxDataValidator
          {...props}
          checkAndSetReduxData={checkAndSetReduxData}
          setAcYearCompanyInfo={setInfo}
        />
      </div>
    );
  };
};
export default HOCReduxData;
