const initState = {
  navInfo: {
    activeMenu: "",
    subMenuMaster: [],
    subMenuEntry: [],
    subMenuSetting: [],
    subMenuReport: [],
  },
  userPrivilege: {
    Company: "",
    UserManagement: "",
    Customer: "",
    Supplier: "",
    LedgerGroup: "",
    Ledger: "",
    Item: "",
    Detail: "",
    Store: "",
    Sales: "",
    Purchase: "",
    Receipt: "",
    Payment: "",
    VehicleLoadUnloadEntry: "",
    Order: "",
    SalesReport: "",
    PurchaseReport: "",
    DayBook: "",
    LedgerBook: "",
    CustomerBook: "",
    SupplierBook: "",
    SalesPurchaseSummary: "",
    GSTR1: "",
    GSTR3B: "",
    TrialBalance: "",
    Trip: "",
    TripReceipt: "",
    TruckExpense: "",
    Truck: "",
    Driver: "",
    Place: "",
    WayBridgeCharge: "",
    WayBridge: "",
    DriverTripRate: "",
    જણસી: "",
    પાર્ટી: "",
    ખેડૂતબિલ: "",
    AdminType: "",
  },
  defAcYearCompany: {
    CompanyName: "",
    acid: "",
    ACY: "",
    PrevCompanyName: localStorage.getItem("CompanyName"),
    PrevACY: localStorage.getItem("FullACY"),
  },
  lists: {
    YearList: [],
    CompanyList: [],
    StateList: [],
  },
};

const RootReducers = (state = initState, action) => {
  if (action.type === "SET_ActiveMenu") {
    return {
      ...state,
      navInfo: { ...state.navInfo, activeMenu: action.ActiveMenu },
    };
  } else if (action.type === "SET_DefAcYearCompany") {
    return {
      ...state,
      defAcYearCompany: {
        ...state.defAcYearCompany,
        CompanyName: action.defAcYearCompany.CompanyName,
        acid: action.defAcYearCompany.acid,
        ACY: action.defAcYearCompany.ACY,
      },
    };
  } else if (action.type === "SET_PrevAcYearCompany") {
    return {
      ...state,
      defAcYearCompany: {
        ...state.defAcYearCompany,
        PrevCompanyName: action.prevAcYearCompany.PrevCompanyName,
        PrevACY: action.prevAcYearCompany.PrevACY,
      },
    };
  } else if (action.type === "SET_ACYEAR_COMPANY_LIST") {
    return {
      ...state,
      lists: {
        ...state.lists,
        YearList: action.lists.YearList,
        CompanyList: action.lists.CompanyList,
      },
    };
  } else if (action.type === "SET_SubMenu_Master_Entry") {
    let newstate = {
      ...state,
      navInfo: {
        ...state.navInfo,
        subMenuMaster: action.subMenuMaster,
        subMenuEntry: action.subMenuEntry,
        subMenuReport: action.subMenuReport,
        subMenuSetting: action.subMenuSetting,
      },
    };
    return newstate;
  } else if (action.type === "SET_UserPrivileges") {
    let newstate = {
      ...state,
      userPrivilege: {
        ...state.userPrivilege,
        Truck: ["Truck"],
        Driver: ["Driver"],
        Place: ["Place"],
        WayBridgeCharge: ["Way-Bridge Charge"],
        WayBridge: ["Way-Bridge"],
        DriverTripRate: ["Driver Trip Rate"],
        Company: action.UserPrivileges["Company"],
        UserManagement: action.UserPrivileges["User Management"],
        Customer: action.UserPrivileges["Customer"],
        Reference: action.UserPrivileges["Reference"],
        Supplier: action.UserPrivileges["Supplier"],
        LedgerGroup: action.UserPrivileges["Ledger Group"],
        Ledger: action.UserPrivileges["Ledger"],
        Item: action.UserPrivileges["Item"],
        Detail: action.UserPrivileges["Detail"],
        Store: action.UserPrivileges["Store"],
        Sales: action.UserPrivileges["Sales"],
        Proforma: action.UserPrivileges["Proforma"],
        Challan: action.UserPrivileges["Challan"],
        Purchase: action.UserPrivileges["Purchase"],
        Receipt: action.UserPrivileges["Receipt"],
        Payment: action.UserPrivileges["Payment"],
        Load: action.UserPrivileges["Load"],
        Trip: action.UserPrivileges["Trip"],
        TripReceipt: ["Trip Receipt"],
        TruckExpense: ["Truck Expense"],
        Unload: action.UserPrivileges["Unload"],
        Order: action.UserPrivileges["Order"],
        SalesReport: action.UserPrivileges["Sales Report"],
        PurchaseReport: action.UserPrivileges["Purchase Report"],
        DayBook: action.UserPrivileges["Day Book"],
        LedgerBook: action.UserPrivileges["Ledger Book"],
        CustomerBook: action.UserPrivileges["Customer Book"],
        SupplierBook: action.UserPrivileges["Supplier Book"],
        StockReport: action.UserPrivileges["Stock Report"],
        TrialBalance: action.UserPrivileges["Trial Balance Report"],
        OutstandingReport: action.UserPrivileges["Outstanding Report"],
        GSTReport: action.UserPrivileges["GST Report"],
        SalesPurchaseSummary: action.UserPrivileges["Sales Purchase Summary"],
        GSTR1: action.UserPrivileges["GSTR-1"],
        GSTR3B: action.UserPrivileges["GSTR-3B"],
        જણસી: action.UserPrivileges["જણસી"],
        પાર્ટી: action.UserPrivileges["પાર્ટી"],
        ખેડૂતબિલ: action.UserPrivileges["ખેડૂત બિલ"],
        AdminType: action.UserPrivileges["AdminType"],
      },
    };
    return newstate;
  } else if (action.type === "SET_UserAdmin") {
    let newstate = {
      ...state,
      AdminType: action.admin,
    };
    return newstate;
  }
  return state;
};
export default RootReducers;
