export const apiURL = process.env.REACT_APP_API_URL;

export const apiTransportURL = apiURL + "Transport/";
// export const apiTransportURL =
//   "http://127.0.0.1/Development/general-account-transport-backend/";

export const apiFarmerURL = apiURL + "Farmer/";

export const loginPath = "./";

const axios = require("axios");
const axiosInstance = axios.create({
  baseURL: apiURL,
});

const axiosTransportInstance = axios.create({
  baseURL: apiTransportURL,
});

const axiosFarmerInstance = axios.create({
  baseURL: apiFarmerURL,
});

// const axiosComagentInstance = axios.create({
//   baseURL: apiFarmerURL,
// });
export function fetchDashboardDetail(data) {
  return axiosInstance.post("dashboarddetail.php", data);
}
export function fetchtruckReciept(data) {
  return axiosTransportInstance.post("truckexpancedetail.php", data);
}

export function fetchCIDetail(data) {
  return axiosInstance.post("cidetail.php", data);
}

export function fetchtripReciept(data) {
  return axiosTransportInstance.post("tripreceiptdetail.php", data);
}
export function fetchFarmerBillDetail(data) {
  return axiosFarmerInstance.post("farmerbilldetail.php", data);
}

export function fetchTripDetail(data) {
  return axiosTransportInstance.post("tripdetail.php", data);
}

export function fetchPlaceDetail(data) {
  return axiosTransportInstance.post("placedetail.php", data);
}

export function fetchFarmerDetail(data) {
  return axiosFarmerInstance.post("farmerdetail.php", data);
}

export function fetchComagentDetail(data) {
  return axiosFarmerInstance.post("comagentdetail.php", data);
}

export function fetchItemDetail(data) {
  return axiosFarmerInstance.post("itemdetail.php", data);
}
export function fetchTruckDetail(data) {
  return axiosTransportInstance.post("truckdetail.php", data);
}

export function fetchDriverDetail(data) {
  return axiosTransportInstance.post("driverdetail.php", data);
}

export function fetchWayBridgeChargeDetail(data) {
  return axiosTransportInstance.post("waybridgechargedetail.php", data);
}

export function fetchWayBridgeDetail(data) {
  return axiosTransportInstance.post("waybridgedetail.php", data);
}

export function fetchDriverTripRateDetail(data) {
  return axiosTransportInstance.post("drivertripratedetail.php", data);
}

export function fetchAccountDetail(data) {
  return axiosInstance.post("accountreportdetail.php", data);
}

export function fetchOutstandingReportDetail(data) {
  return axiosInstance.post("outstandingreportdetail.php", data);
}

export function fetchStockDetail(data) {
  return axiosInstance.post("stockbalancedetail.php", data);
}

export function fetchDashboard(data) {
  return axiosInstance.post("dashboarddetail.php", data);
}

export function fetchGSTInfo(data) {
  return axiosInstance.post("gstinfodetail.php", data);
}

export function fetchPayment(data) {
  return axiosInstance.post("expenseentrydetail.php", data);
}

export function fetchReciept(data) {
  return axiosInstance.post("incomeentrydetail.php", data);
}

export function fetchUser(data) {
  return axiosInstance.post("userdetail.php", data);
}

export function fetchSales(data) {
  return axiosInstance.post("salesdetail.php", data);
}
export function fetchOrder(data) {
  return axiosInstance.post("orderentrydetail.php", data);
}

export function fetchPurchase(data) {
  return axiosInstance.post("purchaseentrydetail.php", data);
}

export function fetchTblMng(data) {
  return axiosInstance.post("tblmngdetail.php", data);
}

export function fetchCompany(data) {
  return axiosInstance.post("companydetail.php", data);
}

export function fetchLedgeGroup(data) {
  return axiosInstance.post("ledgergroupdetail.php", data);
}

export function fetchSupplierMaster(data) {
  return axiosInstance.post("supplierdetail.php", data);
}

export function fetchTaxMaster(data) {
  return axiosInstance.post("taxdetail.php", data);
}

export function fetchCustomerMaster(data) {
  return axiosInstance.post("customerdetail.php", data);
}
export function fetchGSTDetailsformail(data) {
  return axiosInstance.post("GST_large_process_detail.php", data);
}
export function fetchGSTDetails(data) {
  return axiosInstance.post("GSTdetail.php", data);
}

export function fetchLedgerMaster(data) {
  return axiosInstance.post("ledgerdetail.php", data);
}

export function fetchItemMaster(data) {
  return axiosInstance.post("itemdetail.php", data);
}

export function fetchStoreMaster(data) {
  return axiosInstance.post("storemasterdetail.php", data);
}

export function fetchDetailMaster(data) {
  return axiosInstance.post("detailmasterdetail.php", data);
}
export function fetchReferenceMaster(data) {
  return axiosInstance.post("referencedetail.php", data);
}

export function fetchBillSetting(data) {
  return axiosInstance.post("invoicesettingdetail.php", data);
}
export function fetchGeneralSetting(data) {
  return axiosInstance.post("generalsettingsdetail.php", data);
}

export function fetchDefaultEntrySetting(data) {
  return axiosInstance.post("defaultentrysettingdetail.php", data);
}

export function fetchImportDetails(data) {
  return axiosInstance.post("importdetail.php", data);
}

export function fetchLoadUnload(data) {
  return axiosInstance.post("loadunloaddetail.php", data);
}

export function imageFrontEndBaseURL() {
  return apiURL;
}

export function imageBackEndBaseURL() {
  return "images/";
}

export function removeImage(formData) {
  return axiosInstance.post("ImageUpload.php", formData);
}

export function imageUpload(formData, config) {
  return axiosInstance.post("ImageUpload.php", formData, config);
}

export function fetchLedgerBalance(data) {
  return axiosInstance.post("ledgerbalancedetail.php", data);
}
