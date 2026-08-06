import React, { useState } from "react";
import { fetchUser, loginPath } from "../components/api";
import { toast } from "react-toastify";
import { setMenuPrivileges } from "../utils/MenuUtility";

const HOCVerifyIsUser = (UserArea) => {
  const verifyUserID = (
    funCallForValidUser,
    navInfo_MenuList,
    setSubMenu_Master_Entry,
    setUserPrivileges
  ) => {
    const userID = localStorage.getItem("logInID");
    // console.log("userID", userID);
    if (userID && userID.length > 0) {
      const reqData = {
        Op: "VerifyUserID",
        vac_userid: userID,
        bint_ci: localStorage.getItem("CI"),
        bolMenuInfo:
          navInfo_MenuList && navInfo_MenuList.length > 0 ? false : true,
      };
      fetchUser(reqData).then((res) => {
        // console.log("res.data", res.data);
        if (res.data.msgType && res.data.msgType === "success") {
          // console.log("navInfo_MenuList.length", navInfo_MenuList.length);
          // console.log("res.data.vac_privileges", res.data.vac_privileges);
          if (
            navInfo_MenuList &&
            navInfo_MenuList.length <= 0 &&
            res.data.vac_privileges &&
            res.data.vac_privileges.length > 0
          ) {
            setMenuPrivileges(
              res.data.vac_privileges,
              setSubMenu_Master_Entry,
              setUserPrivileges,
              res.data.admin_cat
            );
          }
          if (funCallForValidUser) {
            funCallForValidUser();
          }
        } else {
          navigateToLogin();
        }
      });
    } else {
      navigateToLogin();
    }
  };

  const navigateToLogin = () => {
    // alert("navigateToLogin Called : " + i);
    clearLocalStorage();
    window.location.assign(loginPath);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("UI");
  };

  return (props) => {
    return (
      <div className="UserArea">
        <UserArea {...props} verifyUserID={verifyUserID} />
      </div>
    );
  };
};
export default HOCVerifyIsUser;
