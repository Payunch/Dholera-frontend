export const setActiveMenu = (ActiveMenu) => {
  return {
    type: "SET_ActiveMenu",
    ActiveMenu,
  };
};

export const setSubMenu_Master_Entry = (subMenuMaster, subMenuEntry, subMenuReport, subMenuSetting) => {
  return {
    type: "SET_SubMenu_Master_Entry",
    subMenuMaster,
    subMenuEntry,
    subMenuReport,
    subMenuSetting
  };
};