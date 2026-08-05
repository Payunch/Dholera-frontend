import {
  ListAlt,
  Assessment,
  Business,
  Hail,
  Hiking,
  PostAdd,
  AccountCircle,
  ReceiptOutlined,
} from "@mui/icons-material";
//#region Constants
export const PROCESSING = "Processing";
export const NO_DATA_FOUND = "No Data Found";
export const SUCCESS = "success";
export const ERROR = "error";
export let subMenuMaster = [
  {
    menuIcon: Business,
    menuText: "Company",
    LinkSlug: "CompanyMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Hail,
    menuText: "Customer",
    LinkSlug: "CustomerMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: ListAlt,
    menuText: "Ledger Group",
    LinkSlug: "LedgerGroup",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: ListAlt,
    menuText: "Ledger",
    LinkSlug: "LedgerMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Hiking,
    menuText: "Supplier",
    LinkSlug: "SupplierMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: PostAdd,
    menuText: "Item",
    LinkSlug: "ItemMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: AccountCircle,
    menuText: "User Management",
    LinkSlug: "UserManagement",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: AccountCircle,
    menuText: "Vehicle",
    LinkSlug: "VehicleMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Assessment,
    menuText: "Tax",
    LinkSlug: "TaxMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Assessment,
    menuText: "Detail",
    LinkSlug: "DetailMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Assessment,
    menuText: "Reference",
    LinkSlug: "ReferenceMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Assessment,
    menuText: "Transport",
    LinkSlug: "TransportMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: AccountCircle,
    menuText: "Store",
    LinkSlug: "StoreMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: AccountCircle,
    menuText: "Truck",
    LinkSlug: "TruckMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: AccountCircle,
    menuText: "Driver",
    LinkSlug: "DriverMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: AccountCircle,
    menuText: "Place",
    LinkSlug: "PlaceMaster",

    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: AccountCircle,
    menuText: "જણસી",
    LinkSlug: "ItemMaster2",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: AccountCircle,
    menuText: "Way Bridge",
    LinkSlug: "WayBridgeMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: AccountCircle,
    menuText: "Driver Trip Rate",
    LinkSlug: "DriverTripRateMaster",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: AccountCircle,
    menuText: "પાર્ટી",
    LinkSlug: "CommisionAgentMaster",
    privilege: "A",
    setVisible: false,
  },
];
export let subMenuEntry = [
  {
    menuIcon: Business,
    menuText: "Order",
    LinkSlug: "OrderList1",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Challan",
    LinkSlug: "ChallanList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Proforma",
    LinkSlug: "ProformaList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Sales",
    LinkSlug: "SalesList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Hail,
    menuText: "Purchase",
    LinkSlug: "PurchaseList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: ReceiptOutlined,
    menuText: "Receipt",
    LinkSlug: "ReceiptList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: ListAlt,
    menuText: "Payment",
    LinkSlug: "PaymentList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: ReceiptOutlined,
    menuText: "Order",
    LinkSlug: "OrderList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: ReceiptOutlined,
    menuText: "Load",
    LinkSlug: "VehicleLoadUnloadList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: ReceiptOutlined,
    menuText: "Unload",
    LinkSlug: "UnloadList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: ReceiptOutlined,
    menuText: "Job In",
    LinkSlug: "JobInList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: ReceiptOutlined,
    menuText: "Job Out",
    LinkSlug: "JobOutList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Trip",
    LinkSlug: "TripList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Trip Receipt",
    LinkSlug: "TripReceiptList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Truck Expense",
    LinkSlug: "TruckExpenseList",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "ખેડૂત બિલ",
    LinkSlug: "FarmerBillList",
    privilege: "A",
    setVisible: false,
  },
];
export let subMenuSetting = [
  {
    menuIcon: Business,
    menuText: "Invoice Setting",
    LinkSlug: "InvoiceSetting",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Default Entry Setting",
    LinkSlug: "DefaultEntrySetting",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "General Setting",
    LinkSlug: "GeneralSetting",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Import Sales Data",
    LinkSlug: "ImportSalesData",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Carry Forward Ledger Balance",
    LinkSlug: "CarryForwardLedgerBalance",
    privilege: "A",
    setVisible: false,
  },
];
export let subMenuReport = [
  {
    menuIcon: Business,
    menuText: "Sales Report",
    LinkSlug: "SalesReport",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Purchase Report",
    LinkSlug: "PurchaseReport",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Day Book",
    LinkSlug: "DayBookReport",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Ledger Book",
    LinkSlug: "BookReport/:Ledger",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Customer Book",
    LinkSlug: "BookReport/:Customer",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Supplier Book",
    LinkSlug: "BookReport/:Supplier",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Outstanding Report",
    LinkSlug: "OutstandingReport",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Stock Report",
    LinkSlug: "StockReport",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "Trial Balance Report",
    LinkSlug: "TrialBalanceReport",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "GST Report",
    LinkSlug: "MultipleGSTReturn",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "વેપારી બિલ પ્રિન્ટ",
    LinkSlug: "VepariBillPrint",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "માર્કેટ ફી બિલ પ્રિન્ટ",
    LinkSlug: "MarketFeeBillPrint",
    privilege: "A",
    setVisible: false,
  },
  {
    menuIcon: Business,
    menuText: "ખેડૂત બિલ પ્રિન્ટ",
    LinkSlug: "KhedutBillPrint",
    privilege: "A",
    setVisible: false,
  },
];
//#endregion

//#region Function
export function setMenuPrivileges(
  vac_privileges,
  setSubMenu_Master_Entry,
  setUserPrivileges,
  adminType,
) {
  vac_privileges.map((parent) => {
    if (parent.main == "Master") {
      if (parent.children.length > 0) {
        parent.children.map((child) => {
          subMenuMaster.map((master, index) => {
            // console.log("child.main == master.menuText", child.main +"--"+ master.menuText);
            if (child.main == master.menuText) {
              subMenuMaster[index].setVisible = true;
            }
          });
        });
      }
    } else if (parent.main == "Entry") {
      // console.log("vac_privileges", vac_privileges);
      // console.log("parent.children",parent.children);
      if (parent.children.length > 0) {
        parent.children.map((child) => {
          subMenuEntry.map((master, index) => {
            if (child.main == master.menuText) {
              subMenuEntry[index].setVisible = true;
            }
          });
        });
      }
    } else if (parent.main == "Settings") {
      if (parent.children.length > 0) {
        parent.children.map((child) => {
          subMenuSetting.map((master, index) => {
            if (child.main == master.menuText) {
              subMenuSetting[index].setVisible = true;
            }
          });
        });
      }
    } else if (parent.main == "Report") {
      if (parent.children.length > 0) {
        parent.children.map((child) => {
          subMenuReport.map((master, index) => {
            // console.log("subMenuReport", child.main, master.menuText);
            if (child.main == master.menuText) {
              subMenuReport[index].setVisible = true;
            }
          });
        });
      }
    }
  });

  setUserPrivileges_ToRedux(vac_privileges, setUserPrivileges, adminType);
  setSubMenu_Master_Entry(
    subMenuMaster,
    subMenuEntry,
    subMenuReport,
    subMenuSetting,
  );
}

export function setMenuPrivilegesToFalse(
  setSubMenu_Master_Entry,
  setUserPrivileges,
) {
  subMenuMaster = subMenuMaster.map((subMenu) => {
    return { ...subMenu, setVisible: false };
  });
  subMenuEntry = subMenuEntry.map((subMenu) => {
    return { ...subMenu, setVisible: false };
  });
  subMenuReport = subMenuReport.map((subMenu) => {
    return { ...subMenu, setVisible: false };
  });
  subMenuSetting = subMenuSetting.map((subMenu) => {
    return { ...subMenu, setVisible: false };
  });
  setSubMenu_Master_Entry(
    subMenuMaster,
    subMenuEntry,
    subMenuReport,
    subMenuSetting,
  );
  setUserPrivileges({
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
    Load: "",
    Unload: "",
    Order: "",
    SalesReport: "",
    Trip: "",
    TripReceipt: "",
    TruckExpense: "",
    Truck: "",
    Driver: "",
    Place: "",
    WayBridgeCharge: "",
    WayBridge: "",
    DriverTripRate: "",
    PurchaseReport: "",
    DayBook: "",
    LedgerBook: "",
    CustomerBook: "",
    SupplierBook: "",
    Reference: "",
    OutstandingReport: "",
    GSTReport: "",
    જણસી: "",
    પાર્ટી: "",
    ખેડૂતબિલ: "",
    AdminType: "",
  });
}

export function setUserPrivileges_ToRedux(
  vac_privileges,
  setUserPrivileges,
  adminType,
) {
  let UserPrivileges = {};
  vac_privileges.map((parent) => {
    if (parent.children.length > 0) {
      parent.children.map((child) => {
        UserPrivileges[child["main"]] = child.p;
      });
    }
  });
  UserPrivileges["AdminType"] = adminType;
  setUserPrivileges(UserPrivileges);
}
//#endregion
