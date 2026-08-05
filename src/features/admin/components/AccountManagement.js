"use client";

import * as React from "react";
import { Folder, Users, Settings, Table, Upload, Database } from "lucide-react";
import UserManagement from "@/Component/UserManagement";
import GeneralSetting from "@/Component/GeneralSetting";
import InvoiceSetting from "@/Component/InvoiceSetting";
import DefaultEntrySetting from "@/Component/DefaultEntrySetting";
import TableList from "@/components/CustomTool/TableList";
import ImportSalesData from "@/Component/ImportSalesData";
import ImportBankData from "@/Component/ImportBankData";

export function AccountManagement() {
  const [subTab, setSubTab] = React.useState("tblmng");

  // Sample columns for Table Management demo view
  const sampleColumns = [
    { id: "vac_company", label: "Company", editable: true },
    { id: "vac_gstno", label: "GST No", editable: true },
    { id: "vac_name", label: "Account Name", editable: true },
    { id: "dec_amount", label: "Opening Amount", editable: true, type: "amount" },
  ];

  const sampleRows = [
    { vac_company: "Dholera Developers", vac_gstno: "24AAACD1234E1Z1", vac_name: "Sales Ledger", dec_amount: "50000.00" },
    { vac_company: "Smart City Infra", vac_gstno: "24BBBCD5678F1Z2", vac_name: "Purchase Ledger", dec_amount: "35000.00" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-3">
            <Folder className="h-6 w-6 text-orange-500" />
            General Account Management
          </h2>
          <p className="text-xs font-semibold text-slate-400 mt-1">
            Rite Mng Table Management, User Privileges, System Settings & Data Imports
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setSubTab("tblmng")}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
              subTab === "tblmng" ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <Table className="h-4 w-4" />
            Rite Mng
          </button>
          <button
            onClick={() => setSubTab("users")}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
              subTab === "users" ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="h-4 w-4" />
            Users
          </button>
          <button
            onClick={() => setSubTab("settings")}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
              subTab === "settings" ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button
            onClick={() => setSubTab("import")}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
              subTab === "import" ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            <Upload className="h-4 w-4" />
            Data Import
          </button>
        </div>
      </div>

      {/* Sub Tab Content */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl">
        {subTab === "tblmng" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Rite Table Management (MUI React JS)</h3>
            <TableList title="Dynamic Account Tables" columns={sampleColumns} rows={sampleRows} />
          </div>
        )}

        {subTab === "users" && <UserManagement />}

        {subTab === "settings" && (
          <div className="space-y-6">
            <GeneralSetting />
            <InvoiceSetting />
            <DefaultEntrySetting />
          </div>
        )}

        {subTab === "import" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImportSalesData />
            <ImportBankData />
          </div>
        )}
      </div>
    </div>
  );
}
