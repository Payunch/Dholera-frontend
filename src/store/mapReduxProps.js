import { SatelliteAlt } from "@mui/icons-material";
import { setActiveMenu, setSubMenu_Master_Entry } from "../store/navAction";
import { setDefAcYearCompany, setPrevAcYearCompany } from '../store/defSelectionAction'
import { setAcYearCompanyList } from '../store/listAction'
import { setUserPrivileges } from '../store/privilegesAction'

export const mapStatetoProps = (state) => {
  return {
    navInfo: state.navInfo,
    defAcYearCompany: state.defAcYearCompany,
    lists: state.lists,
    userPrivilege:state.userPrivilege,
  };
};

export const mapSetActiveMenuToProps = (dispatch) => {
  return {
    setActiveMenu: (ActiveMenu) => {
      dispatch(setActiveMenu(ActiveMenu));
    },
  };
};

export const mapSetActiveMenu_DefAcYearCompany_SetLists_MenuVisibility_ToProps = (dispatch) => {
  return {
    setActiveMenu: (ActiveMenu) => {
      dispatch(setActiveMenu(ActiveMenu));
    },
    setDefAcYearCompany: (defAcYearCompany) => { dispatch(setDefAcYearCompany(defAcYearCompany)) },
    setPrevAcYearCompany: (prevAcYearCompany) => { dispatch(setPrevAcYearCompany(prevAcYearCompany)) },
    setAcYearCompanyList: (acYearCompanyList) => { dispatch(setAcYearCompanyList(acYearCompanyList)) },
    setSubMenu_Master_Entry: (subMenuMaster, subMenuEntry, subMenuReport, subMenuSetting) => {
      dispatch(setSubMenu_Master_Entry(subMenuMaster, subMenuEntry, subMenuReport, subMenuSetting));
    },
    setUserPrivileges: (UserPrivileges) => {
      dispatch(setUserPrivileges(UserPrivileges));
    },
  };
};

export const mapSetActiveMenu_MenuVisibility_ToProps = (dispatch) => {
  return {
    setActiveMenu: (ActiveMenu) => {
      dispatch(setActiveMenu(ActiveMenu));
    },
    setSubMenu_Master_Entry: (subMenuMaster, subMenuEntry, subMenuReport, subMenuSetting) => {
      dispatch(setSubMenu_Master_Entry(subMenuMaster, subMenuEntry, subMenuReport, subMenuSetting));
    },
    setUserPrivileges: (UserPrivileges) => {
      dispatch(setUserPrivileges(UserPrivileges));
    },
  };
}