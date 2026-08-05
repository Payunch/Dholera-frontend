import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import CustomerMaster from "./CustomerMaster";
import CompanyMaster from "./CompanyMaster";
//import LedgerDetail from './LedgerDetail'
import { ToastContainer, Zoom } from "react-toastify";
import LedgerGroup from "./LedgerGroup";
import LedgerMaster from "./LedgerMaster";
import TaxMaster from "./TaxMaster";
import SupplierMaster from "./SupplierMaster";
import ItemMaster from "./ItemMaster";
import PurchaseEntry from "./PurchaseEntry";
import SalesEntry from "./SalesEntry";
import PurchaseItemEntry from "./PurchaseItemEntry";
import SalesItemEntry from "./SalesItemEntry";
import PurchaseList from "./PurchaseList";
import SalesList from "./SalesList";
import PaymentEntry from "./PaymentEntry";
import ReceiptEntry from "./ReceiptEntry";
import Dashboard from "./Dashboard";
import SalesReport from "./SalesReport";
import PurchaseReport from "./PurchaseReport";
import SalesPurchaseSummary from "./SalesPurchaseSummary";
import Gst from "./Gst";
import PieChartPractice from "../PieChartPractice";
import ReactApexChart from "../ReactApexChart";
import PieChart1 from "../PieChart1";
import UserManagement from "./UserManagement";
import PaymentList from "./PaymentList";
import ReceiptList from "./ReceiptList";
import OrderEntry from "./OrderEntry";
import OrderItemEntry from "./OrderItemEntry";
import VehicleMaster from "./VehicleMaster";
import VehicleList from "./VehicleList";
import VehicleLoadEntry from "./VehicleLoadEntry";
import VehicleLoadItemEntry from "./VehicleLoadItemEntry";
import VehicleUnload from "./VehicleUnload";
import JobInList from "./JobInList";
import JobInEntry from "./JobInEntry";
import JobInItemEntry from "./JobInItemEntry";
import JobOutItemEntry from "./JobOutItemEntry";
import JobOutList from "./JobOutList";
import JobOutEntry from "./JobOutEntry";
import Menu from "./Menu";
import DetailMaster from "./DetailMaster";
import InvoiceSetting from "./InvoiceSetting";
import TransportMaster from "./TransportMaster";
import PaymentMode from "./PaymentMode";
import Login from "./Login";
import CompanyList from "./CompanyList";
import StoreMaster from "./StoreMaster";
import CustomerDateWiseSales from "./CustomerDateWiseSales";
import DayBookReport from "./DayBookReport";
import StockReport from "./StockReport";
import AccountBookReport from "./AccountBookReport";
import DefaultEntrySetting from "./DefaultEntrySetting";
import GeneralSetting from "./GeneralSetting";
import OrderList from "./OrderList";
import ReferenceMaster from "./ReferenceMaster";
import OutstandingReport from "./OutstandingReport";
import VehicleLoadUnloadList from "./VehicleLoadUnloadList";
import UnloadList from "./UnloadList";
import OrderSelection from "./OrderSelection";
import ImportSalesData from "./ImportSalesData";
import SalesPurchaseReport from "./SalesPurchaseReport";
import ExcelGSTR3B from "./ExcelGSTR3B";
import CarryForwardLedgerBalance from "./CarryForwardLedgerBalance";
import MultipleGSTReturn from "./MultipleGSTReturn";
import ExcelGSTR1 from "./ExcelGSTR1";
import TrialBalanceReport from "./TrialBalanceReport";
import SalesE_WayBill from "./SalesE_WayBill";
import ProductionEntry from "./ProductionEntry";
import ProductionList from "./ProductionList";
import ProductionMaster2 from "./ProductionMaster2";
import ProductionList2 from "./ProductionList2";
import ProductionEntry2 from "./ProductionEntry2";
import Dashboard2 from "./Dashboard2";
import Subscription from "./Subscription";
// import Dashboardcopy from "./Dashboard2 copy";

import ItemRow from "./Purchasenew";
import SalesNew from "./SalesNew";
import OrderList1 from "./OrderList1";
import ChallanList from "./ChallanList";
import ProformaList from "./ProformaList";
import ProformaEntry from "./ProformaEntry";

import OrderEntry1 from "./OrderEntry1";
import Dashboard3 from "./Dashboard3";

import ChallanEntry from "./ChallanEntry";

import "./Table.css";
import Dashboard2Copy from "./Dashboard2 copy";
import TripList from "./TripList";
import TripEntry from "./TripEntry";
import TruckMaster from "./TruckMaster";
import TripReceiptEntry from "./TripReceiptEntry";
import TripReceiptList from "./TripReceiptList";
import TruckExpenseEntry from "./TruckExpenseEntry";
import TruckExpenseList from "./TruckExpenseList";
import DriverMaster from "./DriverMaster";
import FarmerBillList from "./FarmerBillList";
import FarmerBillEntry from "./FarmerBillEntry";
import FarmerBillItemEntry from "./FarmerBillItemEntry";
import FarmerBillPrint from "./FarmerBillPrint";
import FarmerMaster from "./FarmerMaster";
import ItemMaster2 from "./ItemMaster2";
import CommisionAgentMaster from "./CommisionAgentMaster";
import PlaceMaster from "./PlaceMaster";
import WayBridgeChargeMaster from "./WayBridgeChargeMaster";
import WayBridgeMaster from "./WayBridgeMaster";
import DriverTripRateMaster from "./DriverTripRateMaster";
import VepariBillPrint from "./VepariBillPrint";
import MarketFeeBillPrint from "./MarketFeeBillPrint";
import KhedutBillPrint from "./KhedutBillPrint";
import SalesNewOne from "./SalesNewOne";
import PaymentPrint from "./PaymentPrint";
import { Box, useMediaQuery } from "@mui/material";

function WithMediaQuery(props) {
  const isMobile = useMediaQuery("(min-width:500px)");
  return <props.component {...props} isMobile={isMobile} />;
}

class AppNavigation extends Component {
  render() {
    // const isLargeScreenForYear = useMediaQuery("(min-width:550px)");
    return (
      <div className="AppNavigation">
        <Menu bolMenuVisibleForAgro={true} bolMenuVisibleForJobWork={false} />
        <br />
        <Box sx={{ paddingTop: this.props.isMobile ? "0px" : "36px" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/SalesEntry/:EditSalesSrNo" element={<SalesEntry />} />
            <Route path="/OrderEntry/:EditOrderSrNo" element={<OrderEntry />} />
            <Route
              path="/PurchaseEntry/:EditPurchaseSrNo"
              element={<PurchaseEntry />}
            />
            <Route
              path="/VehicleLoadEntry/:EditLoadingsSrNo"
              element={<VehicleLoadEntry />}
            />
            <Route path="SalesE_WayBill" element={<SalesE_WayBill />} />
            {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
            <Route path="/Dashboard" element={<Dashboard2Copy />} />
            <Route path="/Dashboardold" element={<Dashboard />} />

            <Route path="/CompanyMaster" element={<CompanyMaster />} />
            {/* <Route path="/LedgerDetail" element={<LedgerDetail />} /> */}
            <Route path="/CustomerMaster" element={<CustomerMaster />} />
            <Route path="/LedgerGroup" element={<LedgerGroup />} />
            <Route path="/LedgerMaster" element={<LedgerMaster />} />
            <Route path="/TaxMaster" element={<TaxMaster />} />
            <Route path="/SupplierMaster" element={<SupplierMaster />} />
            <Route path="/ItemMaster" element={<ItemMaster />} />
            <Route path="/PurchaseEntry" element={<PurchaseEntry />} />
            <Route path="/SalesEntry" element={<SalesEntry />} />
            <Route path="/PurchaseItemEntry" element={<PurchaseItemEntry />} />
            <Route path="/SalesItemEntry" element={<SalesItemEntry />} />
            <Route path="/PurchaseList" element={<PurchaseList />} />
            <Route path="/PurchaseList:Text" element={<PurchaseList />} />
            <Route path="/SalesList" element={<SalesList />} />
            <Route path="/SalesList:Text" element={<SalesList />} />
            <Route path="/PaymentEntry" element={<PaymentEntry />} />
            <Route path="/PaymentList" element={<PaymentList />} />
            <Route path="/ReceiptEntry" element={<ReceiptEntry />} />
            <Route path="/ReceiptList" element={<ReceiptList />} />
            <Route path="/SalesReport" element={<SalesReport />} />
            <Route path="/PurchaseReport" element={<PurchaseReport />} />
            <Route
              path="/SalesPurchaseSummary"
              element={<SalesPurchaseSummary />}
            />
            <Route path="/PieChartPractice" element={<PieChartPractice />} />
            <Route path="/ReactApexChart" element={<ReactApexChart />} />
            <Route path="/Gst" element={<Gst />} />
            <Route path="/Gst:Title" element={<Gst />} />
            <Route path="/Gst:Title" element={<Gst />} />
            <Route path="/PieChart1" element={<PieChart1 />} />
            <Route path="/UserManagement" element={<UserManagement />} />
            <Route path="/OrderEntry" element={<OrderEntry />} />
            <Route path="/OrderItemEntry" element={<OrderItemEntry />} />
            <Route path="/VehicleMaster" element={<VehicleMaster />} />
            <Route path="/VehicleList" element={<VehicleList />} />
            <Route path="/VehicleLoadEntry" element={<VehicleLoadEntry />} />
            <Route
              path="/VehicleLoadItemEntry"
              element={<VehicleLoadItemEntry />}
            />
            <Route path="/VehicleUnload" element={<VehicleUnload />} />
            <Route path="/JobInList" element={<JobInList />} />
            <Route path="/JobInEntry" element={<JobInEntry />} />
            <Route path="/JobInItemEntry" element={<JobInItemEntry />} />
            <Route path="/JobOutList" element={<JobOutList />} />
            <Route path="/JobOutEntry" element={<JobOutEntry />} />
            <Route path="/JobOutItemEntry" element={<JobOutItemEntry />} />
            <Route path="/DetailMaster" element={<DetailMaster />} />
            <Route path="/InvoiceSetting" element={<InvoiceSetting />} />
            <Route path="/TransportMaster" element={<TransportMaster />} />
            <Route path="/PaymentMode" element={<PaymentMode />} />
            <Route path="/CompanyList" element={<CompanyList />} />
            <Route path="/StoreMaster" element={<StoreMaster />} />
            <Route
              path="/CustomerDateWiseSales"
              element={<CustomerDateWiseSales />}
            />
            <Route path="/DayBookReport" element={<DayBookReport />} />
            <Route path="/StockReport" element={<StockReport />} />
            <Route path="/BookReport/:Book" element={<AccountBookReport />} />
            <Route
              path="/DefaultEntrySetting"
              element={<DefaultEntrySetting />}
            />
            <Route path="/GeneralSetting" element={<GeneralSetting />} />
            <Route path="/ImportSalesData" element={<ImportSalesData />} />
            <Route path="/OrderList" element={<OrderList />} />
            <Route path="/ReferenceMaster" element={<ReferenceMaster />} />
            <Route path="/OutstandingReport" element={<OutstandingReport />} />
            <Route
              path="/VehicleLoadUnloadList"
              element={<VehicleLoadUnloadList />}
            />
            <Route path="/UnloadList" element={<UnloadList />} />
            <Route path="/OrderSelection" element={<OrderSelection />} />
            <Route
              path="/SalesPurchaseReport"
              element={<SalesPurchaseReport />}
            />
            <Route path="/ExcelGSTR3B" element={<ExcelGSTR3B />} />
            <Route
              path="/CarryForwardLedgerBalance"
              element={<CarryForwardLedgerBalance />}
            />
            <Route path="/ExcelGSTR1" element={<ExcelGSTR1 />} />
            <Route path="/MultipleGSTReturn" element={<MultipleGSTReturn />} />
            <Route
              path="/TrialBalanceReport"
              element={<TrialBalanceReport />}
            />
            <Route path="/ProductionEntry" element={<ProductionEntry />} />
            <Route path="/ProductionList" element={<ProductionList />} />
            <Route path="/ProductionMaster2" element={<ProductionMaster2 />} />
            <Route path="/ProductionList2" element={<ProductionList2 />} />
            <Route path="/ProductionEntry2" element={<ProductionEntry2 />} />
            <Route path="/Dashboard2" element={<Dashboard2 />} />
            <Route path="/Dashboardcopy" element={<Dashboard2Copy />} />
            <Route path="/Purchasenew" element={<ItemRow />} />
            <Route path="/Salesnew" element={<SalesNew />} />
            <Route path="/ProformaList" element={<ProformaList />} />
            <Route path="/ChallanList" element={<ChallanList />} />
            <Route path="/OrderList1" element={<OrderList1 />} />
            <Route path="/ProformaEntry" element={<ProformaEntry />} />
            <Route path="/ChallanEntry" element={<ChallanEntry />} />
            <Route path="/OrderEntry1" element={<OrderEntry1 />} />
            <Route path="/Dashboard3" element={<Dashboard3 />} />
            <Route path="/TripList" element={<TripList />} />
            <Route path="/TripReceiptList" element={<TripReceiptList />} />
            <Route path="/TripReceiptEntry" element={<TripReceiptEntry />} />
            <Route path="/TripEntry" element={<TripEntry />} />
            <Route path="/TruckMaster" element={<TruckMaster />} />
            <Route path="/TruckExpenseEntry" element={<TruckExpenseEntry />} />
            <Route path="/TruckExpenseList" element={<TruckExpenseList />} />
            <Route path="/DriverMaster" element={<DriverMaster />} />
            <Route path="/FarmerBillList" element={<FarmerBillList />} />
            <Route path="/FarmerBillEntry" element={<FarmerBillEntry />} />
            <Route
              path="/FarmerBillItemEntry"
              element={<FarmerBillItemEntry />}
            />
            <Route path="/FarmerBillPrint" element={<FarmerBillPrint />} />
            <Route path="/FarmerMaster" element={<FarmerMaster />} />
            <Route path="/ItemMaster2" element={<ItemMaster2 />} />
            <Route
              path="/CommisionAgentMaster"
              element={<CommisionAgentMaster />}
            />
            <Route path="/PlaceMaster" element={<PlaceMaster />} />
            <Route
              path="/WayBridgeChargeMaster"
              element={<WayBridgeChargeMaster />}
            />
            <Route path="/WayBridgeMaster" element={<WayBridgeMaster />} />
            <Route
              path="/DriverTripRateMaster"
              element={<DriverTripRateMaster />}
            />
            <Route path="/VepariBillPrint" element={<VepariBillPrint />} />
            <Route
              path="/MarketFeeBillPrint"
              element={<MarketFeeBillPrint />}
            />
            <Route path="/KhedutBillPrint" element={<KhedutBillPrint />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/SalesNewOne" element={<SalesNewOne />} />
            <Route path="/PaymentPrint" element={<PaymentPrint />} />

            {/* <Route path="/BookReport:Customer" element={<AccountBookReport />} />
                    <Route path="/BookReport:Supplier" element={<AccountBookReport />} /> */}
          </Routes>
        </Box>
      </div>
    );
  }
}
// export default AppNavigation;

export default (props) => (
  <WithMediaQuery component={AppNavigation} {...props} />
);
